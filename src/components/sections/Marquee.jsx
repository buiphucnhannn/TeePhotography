// Dải chữ serif chạy ngang, ngăn bằng chấm cam; dừng khi hover.
export default function Marquee({ items, duration = 45, className = "" }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee overflow-hidden border-y border-ink/10 py-5 ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` }}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {list.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="px-6 font-serif text-xl text-ink-soft italic sm:px-8 sm:text-2xl">{item}</span>
                <span className="size-1.5 rounded-full bg-amber" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
