'use client';

import { useState } from 'react';
import { getEntityById } from '@/lib/mock-data';
import { MiniProfile } from './MiniProfile';
import { cn } from '@/lib/utils';

interface EntityTagProps {
  entityId: string;
  name?: string;
  className?: string;
}

export function EntityTag({ entityId, name, className }: EntityTagProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | undefined>();

  const entity = getEntityById(entityId);
  const displayName = name || entity?.name || entityId;

  function handleClick(e: React.MouseEvent) {
    if (!entity) return;
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.bottom + 8 });
    setShowProfile(true);
  }

  if (!entity) {
    return <span className={className} style={{ color: '#94A3B8' }}>{displayName}</span>;
  }

  const threatColors: Record<string, string> = {
    critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#10B981',
  };
  const color = entity.threatLevel ? threatColors[entity.threatLevel] : '#3B82F6';

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-1 text-left rounded px-1 py-0.5 transition-colors hover:underline',
          className
        )}
        style={{ color, textDecorationColor: color }}
      >
        {displayName}
      </button>
      {showProfile && entity && (
        <MiniProfile
          entity={entity}
          onClose={() => setShowProfile(false)}
          position={position}
        />
      )}
    </>
  );
}
