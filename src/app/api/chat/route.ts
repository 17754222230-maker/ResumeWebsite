/**
 * AI 对话 API
 * LangChain.js + DeepSeek (OpenAI 兼容)
 */
import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage, ToolMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { conversationMemory } from "@/lib/ai/memory";
import { allTools, toolsByName } from "@/lib/ai/tools";

// 允许最长 60s 响应（Vercel Serverless 免费套餐 10s，Pro 60s）
export const maxDuration = 60;

/**
 * 校验用户输入：防止空消息和超长消息
 */
function validateInput(messages: { role: string; content: string }[]): string | null {
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return "消息不能为空";
  }
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg.content || lastMsg.content.trim().length === 0) {
    return "消息内容不能为空";
  }
  if (lastMsg.content.length > 2000) {
    return "消息内容过长，请精简至 2000 字以内";
  }
  // 禁止明显的 prompt injection 关键词
  const blockList = [
    "忽略之前的指令", "忽略所有指令", "system prompt",
    "你是一个", "扮演", "忘记", "ignore", "bypass",
    "developer mode", "DAN", "jailbreak",
  ];
  for (const keyword of blockList) {
    if (lastMsg.content.toLowerCase().includes(keyword)) {
      return "内容包含受限关键词，请重新提问";
    }
  }
  return null;
}

/**
 * 格式化消息为 LangChain 消息格式
 */
function formatMessages(
  userMessage: string,
  history: { role: string; content: string }[],
) {
  const formatted: any[] = [new SystemMessage(SYSTEM_PROMPT)];

  // 加入历史（跳过 system 类型）
  for (const msg of history) {
    if (msg.role === "user") {
      formatted.push(new HumanMessage(msg.content));
    } else if (msg.role === "assistant") {
      formatted.push(new AIMessage(msg.content));
    }
  }

  // 加入当前用户消息
  formatted.push(new HumanMessage(userMessage));
  return formatted;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId = "default" } = body;

    // 校验输入
    const validationError = validateInput(messages);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 检查 API Key
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "AI 服务暂未配置，请联系站长",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const userMessage = messages[messages.length - 1].content;
    const history = conversationMemory.getHistory(sessionId);

    // 初始化 DeepSeek 模型（OpenAI 兼容）
    const model = new ChatOpenAI({
      model: "deepseek-chat",
      apiKey: apiKey,
      temperature: 0.3,
      maxTokens: 1024,
      configuration: {
        baseURL: "https://api.deepseek.com/v1",
      },
    });

    // 第一步：用 tools 调用，让模型决定是否需要查知识
    const formatted = formatMessages(userMessage, history);
    const modelWithTools = model.bindTools(allTools);
    const firstResponse = await modelWithTools.invoke(formatted);

    // 第二步：处理工具调用
    let finalMessages = [...formatted];

    if (firstResponse.tool_calls && firstResponse.tool_calls.length > 0) {
      finalMessages.push(firstResponse);

      for (const call of firstResponse.tool_calls) {
        const tool = toolsByName[call.name!];
        if (tool) {
          try {
            const result = await tool.invoke(call.args);
            finalMessages.push(new ToolMessage({ content: result, tool_call_id: call.id! }));
          } catch (e) {
            console.error(`Tool ${call.name} error:`, e);
            finalMessages.push(
              new ToolMessage({ content: "查询失败", tool_call_id: call.id! }),
            );
          }
        }
      }

      // 第三步：将工具结果送回模型，生成最终回答（流式）
      const stream = await model.stream(finalMessages);

      const encoder = new TextEncoder();
      const responseStream = new ReadableStream({
        async start(controller) {
          let fullResponse = "";
          for await (const chunk of stream) {
            const text = chunk.content;
            if (text) {
              fullResponse += text;
              controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
            }
          }
          controller.enqueue(encoder.encode("d:finish\n"));
          controller.close();

          // 流结束后保存到记忆
          if (fullResponse) {
            conversationMemory.addExchange(sessionId, userMessage, fullResponse);
          }
        },
      });

      return new Response(responseStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // 没有工具调用，直接流式输出
    const text = firstResponse.content as string;
    const encoder = new TextEncoder();
    const directStream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
        controller.enqueue(encoder.encode("d:finish\n"));
        controller.close();
      },
    });

    // 保存记忆
    if (text) {
      conversationMemory.addExchange(sessionId, userMessage, text);
    }

    return new Response(directStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: error?.message || "服务器内部错误，请稍后重试",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
