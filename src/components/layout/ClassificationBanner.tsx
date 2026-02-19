export function ClassificationBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-6"
      style={{ backgroundColor: 'var(--classification-bg)' }}
    >
      <span
        className="text-[10px] font-medium tracking-[0.1em] uppercase"
        style={{ color: 'var(--classification-text)', fontFamily: 'var(--font-inter)' }}
      >
        Demonstration — Synthetic Data — Not for Operational Use
      </span>
    </div>
  );
}
