/**
 * 对话记忆管理
 * 基于内存存储，最多保留 10 轮对话（20 条消息）
 * 按 sessionId 隔离会话
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const MAX_EXCHANGES = 10; // 最多保留 10 轮问答

class ConversationMemory {
  private store = new Map<string, ChatMessage[]>();

  /**
   * 获取指定会话的消息列表
   */
  getHistory(sessionId: string): ChatMessage[] {
    return this.store.get(sessionId) || [];
  }

  /**
   * 追加一条消息
   */
  addMessage(sessionId: string, message: ChatMessage): void {
    const history = this.getHistory(sessionId);
    history.push(message);

    // 裁剪超出部分：保留最近 N 轮消息
    // 每轮 = 1 user + 1 assistant = 2 条
    const maxMessages = MAX_EXCHANGES * 2;
    if (history.length > maxMessages) {
      this.store.set(sessionId, history.slice(-maxMessages));
    } else {
      this.store.set(sessionId, history);
    }
  }

  /**
   * 追加一轮问答
   */
  addExchange(
    sessionId: string,
    userMessage: string,
    assistantMessage: string,
  ): void {
    this.addMessage(sessionId, { role: "user", content: userMessage });
    this.addMessage(sessionId, { role: "assistant", content: assistantMessage });
  }

  /**
   * 清除会话
   */
  clear(sessionId: string): void {
    this.store.delete(sessionId);
  }
}

// 全局单例
export const conversationMemory = new ConversationMemory();
