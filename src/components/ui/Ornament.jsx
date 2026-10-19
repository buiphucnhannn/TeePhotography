import { cn } from "@/lib/utils";

/**
 * Họa tiết line-art tối giản hợp chủ đề nhiếp ảnh/Hội An, dùng lấp khoảng trống.
 * Dùng: <Ornament name="aperture" className="absolute right-10 top-20 w-28 text-ink/[0.08]" float />
 */
const shapes = {
  // Khẩu độ máy ảnh: 6 lá
  aperture: (
    <>
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="18" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1="50" y1="32" x2="78" y2="12" transform={`rotate(${a} 50 50)`} />
      ))}
    </>
  ),
  // Đèn lồng Hội An
  lantern: (
    <>
      <line x1="50" y1="2" x2="50" y2="16" />
      <rect x="40" y="16" width="20" height="5" rx="1" />
      <ellipse cx="50" cy="50" rx="30" ry="28" />
      <path d="M32 30c-4 12-4 28 0 40M68 30c4 12 4 28 0 40M50 22v56" />
      <rect x="40" y="78" width="20" height="5" rx="1" />
      <path d="M44 83v12M50 83v15M56 83v12" />
    </>
  ),
  // Khung ngắm (góc viền giống logo)
  frame: (
    <>
      <path d="M4 26V4h22M74 4h22v22M96 74v22H74M26 96H4V74" />
      <circle cx="50" cy="50" r="3" />
    </>
  ),
  // Tia sáng / sparkle
  sparkle: <path d="M50 4c2 24 10 42 46 46-36 4-44 22-46 46-2-24-10-42-46-46 36-4 44-22 46-46z" />,
  // Mặt trời mọc trên sông
  sun: (
    <>
      <path d="M14 62a36 36 0 0 1 72 0" />
      <path d="M4 72h92M14 84h72M26 96h48" />
      <path d="M50 8v8M24 20l5 5M76 20l-5 5" />
    </>
  ),
};

export default function Ornament({ name, className, float = false, delay = 0, strokeWidth = 1.2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      className={cn("pointer-events-none", float && "animate-float", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {shapes[name]}
    </svg>
  );
}
