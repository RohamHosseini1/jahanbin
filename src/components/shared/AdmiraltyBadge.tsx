import { admiraltyColor } from '@/lib/utils';

interface AdmiraltyBadgeProps {
  code: string;
  showTooltip?: boolean;
  className?: string;
}

const sourceReliability: Record<string, string> = {
  'A': 'Completely reliable',
  'B': 'Usually reliable',
  'C': 'Fairly reliable',
  'D': 'Not usually reliable',
  'E': 'Unreliable',
  'F': 'Cannot be judged',
};

const infoCredibility: Record<string, string> = {
  '1': 'Confirmed by other sources',
  '2': 'Probably true',
  '3': 'Possibly true',
  '4': 'Doubtful',
  '5': 'Improbable',
  '6': 'Cannot be judged',
};

export function AdmiraltyBadge({ code, showTooltip = true, className }: AdmiraltyBadgeProps) {
  const letter = code[0]?.toUpperCase();
  const number = code[1];
  const color = admiraltyColor(code);
  const sourceDesc = letter ? sourceReliability[letter] : '';
  const infoDesc = number ? infoCredibility[number] : '';
  const tooltip = `Source: ${letter} — ${sourceDesc}\nInfo: ${number} — ${infoDesc}`;

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-medium cursor-default ${className || ''}`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
      title={showTooltip ? tooltip : undefined}
    >
      {code}
    </span>
  );
}
