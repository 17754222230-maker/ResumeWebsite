import { cn } from "@/lib/utils";

/**
 * 「金水相生 · W」品牌标
 *
 * 设计语言：一条主笔画同时承载三重语义 —— 字母 W / 雪山峰谷 / 水波。
 * 上段锐角金色（金 · 日照金山高光）→ 交界冰银（金生水的相变点）→ 下段圆润水蓝（水）。
 * 中峰用 miter 保留金属锐角，两处波谷用二次曲线保持水的圆润，刚柔在同一笔中完成转换。
 *
 * 用法：
 *   <Logo />                        // Navbar / 卡片：精简版（W + 金色句点）
 *   <Logo variant="full" size={96} />  // 展示位：完整版（含水波涟漪）
 *   <Logo tone="light" />           // 白底 / 浅色场景
 *   <Logo tone="mono" />            // 单色，继承 currentColor（水印、印刷、单色场景）
 *   <Logo gold />                   // 金色联动态（配合 Navbar 星空互动模式）
 */

/** 主笔画：M 起笔 → 波谷（Q）→ 中峰（尖角，miter 尖端为全标最高点即主峰）→ 波谷（Q）→ 收笔 */
const STROKE_PATH =
  "M 8 15 L 16.5 37 Q 20 45 23.5 37 L 32 19 L 40.5 37 Q 44 45 47.5 37 L 56 15";
/** 水波涟漪：W 下方的水面余韵 */
const RIPPLE_PATH = "M 14 51 q 6 -3.5 12 0 t 12 0";

/** 渐变色阶：金 → 暖香槟 → 冰银 → 水蓝 */
const STOPS = {
  /** 深色底（主用）：取 gold-400/500 与 water-blue-300，中段冰银模拟金属反光。
   *  下段取 300 而非 500，是为了在 Hero 中蓝天空背景上仍能与背景拉开明度差 */
  dark: ["#FFE259", "#FFA751", "#F2D9BE", "#DCE6EE", "#9EC6E6", "#71A9D4"],
  /** 浅色底：整体压深，下段落到 deep-blue-700 承担对比度（金色在白底本身对比不足） */
  light: ["#F0A82E", "#E08A2B", "#A9895F", "#6E8FA8", "#2F6F9E", "#163450"],
} as const;
const OFFSETS = [0, 0.26, 0.46, 0.58, 0.76, 1] as const;

export interface LogoProps {
  /** 视觉高度（px），默认 28（Navbar 尺度） */
  size?: number;
  /** full = 含水波涟漪（≥64px 展示位）；compact = 仅 W + 句点（Navbar / 小尺寸） */
  variant?: "full" | "compact";
  /** 配色：深色底 / 浅色底 / 单色（继承 currentColor） */
  tone?: "dark" | "light" | "mono";
  /** 金色联动态：主笔画整体转为满金（渐变叠加淡入，避免 stop-color 过渡的兼容问题） */
  gold?: boolean;
  /** 是否附加投影（叠在照片类背景上时保证边缘可读） */
  shadow?: boolean;
  className?: string;
  /** 装饰性使用时留空即可（aria-hidden）；作为唯一品牌标识时传入文案 */
  title?: string;
}

export default function Logo({
  size = 28,
  variant = "compact",
  tone = "dark",
  gold = false,
  shadow = false,
  className,
  title,
}: LogoProps) {
  const full = variant === "full";
  // 同一外观共享一组渐变 id（重复定义无副作用），不同外观隔离，避免同页互相覆盖
  const uid = `jsw-${tone}-${variant}`;
  const mono = tone === "mono";
  const stops = STOPS[tone === "light" ? "light" : "dark"];
  const rippleColor = tone === "light" ? "#3B78A8" : "#71A9D4";
  const dotColor = tone === "light" ? "#E08A2B" : "#FFE259";

  return (
    <svg
      // compact 版收紧 viewBox，去掉涟漪留下的下方空白，保证 Navbar 内视觉居中
      viewBox={full ? "0 0 64 64" : "2 7 60 43"}
      height={size}
      width={size * (full ? 1 : 60 / 43)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("overflow-visible", className)}
      style={
        shadow
          ? {
              // 双层投影：贴边硬阴影勾轮廓 + 外扩柔光压背景，保证叠在照片/中蓝天空上仍可读
              filter:
                "drop-shadow(0 1px 2px rgba(10, 22, 38, 0.55)) drop-shadow(0 0 6px rgba(10, 22, 38, 0.35))",
            }
          : undefined
      }
    >
      {!mono && (
        <defs>
          <linearGradient
            id={`${uid}-stroke`}
            gradientUnits="userSpaceOnUse"
            x1="32"
            y1="10"
            x2="32"
            y2="46"
          >
            {stops.map((color, i) => (
              <stop key={color} offset={OFFSETS[i]} stopColor={color} />
            ))}
          </linearGradient>
          <linearGradient
            id={`${uid}-gold`}
            gradientUnits="userSpaceOnUse"
            x1="32"
            y1="10"
            x2="32"
            y2="46"
          >
            <stop offset="0" stopColor="#FFE259" />
            <stop offset="1" stopColor="#FFA751" />
          </linearGradient>
          {full && (
            <linearGradient
              id={`${uid}-ripple`}
              gradientUnits="userSpaceOnUse"
              x1="14"
              y1="51"
              x2="50"
              y2="51"
            >
              <stop offset="0" stopColor={rippleColor} stopOpacity="0" />
              <stop offset="0.5" stopColor={rippleColor} stopOpacity="0.85" />
              <stop offset="1" stopColor={rippleColor} stopOpacity="0" />
            </linearGradient>
          )}
        </defs>
      )}

      <g
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="miter"
      >
        <path
          d={STROKE_PATH}
          stroke={mono ? "currentColor" : `url(#${uid}-stroke)`}
        />
        {/* 满金态：叠加层淡入淡出，主笔画渐变本体不动 */}
        {!mono && (
          <path
            d={STROKE_PATH}
            stroke={`url(#${uid}-gold)`}
            className={cn(
              "transition-opacity duration-300",
              gold ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </g>

      {full && (
        <path
          d={RIPPLE_PATH}
          fill="none"
          stroke={mono ? "currentColor" : `url(#${uid}-ripple)`}
          strokeOpacity={mono ? 0.5 : 1}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}

      {/* 品牌句点：延续原「W.」标识，底边与 W 基线对齐 */}
      <circle cx="57" cy="41.7" r="2.8" fill={mono ? "currentColor" : dotColor} />
    </svg>
  );
}
