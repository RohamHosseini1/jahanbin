import { confidenceColor } from '@/lib/utils';

interface ConfidenceBarProps {
  value: number;
  showLabel?: boolean;
  height?: number;
  className?: string;
}

export function ConfidenceBar({ value, showLabel = true, height = 4, className }: ConfidenceBarProps) {
  const color = confidenceColor(value);
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: `${height}px`, backgroundColor: '#1e2533' }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-mono tabular-nums w-8 text-right" style={{ color }}>
          {value}%
        </span>
      )}
    </div>
  );
}
