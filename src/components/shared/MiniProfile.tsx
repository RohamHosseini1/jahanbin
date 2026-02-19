'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, ExternalLink } from 'lucide-react';
import type { Entity } from '@/lib/types';
import { StatusTag } from './StatusTag';

interface MiniProfileProps {
  entity: Entity;
  onClose: () => void;
  position?: { x: number; y: number };
}

export function MiniProfile({ entity, onClose, position }: MiniProfileProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const threatColors: Record<string, string> = {
    critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#10B981',
  };

  return (
    <div
      ref={ref}
      className="fixed z-[100] shadow-xl rounded-lg border overflow-hidden"
      style={{
        width: 320,
        top: position ? Math.min(position.y, window.innerHeight - 400) : '50%',
        left: position ? Math.min(position.x, window.innerWidth - 340) : '50%',
        transform: position ? 'none' : 'translate(-50%, -50%)',
        backgroundColor: '#0f1117',
        borderColor: '#1e2533',
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-start justify-between gap-2"
        style={{ borderColor: '#1e2533', backgroundColor: '#161b27' }}>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold truncate" style={{ color: '#F1F5F9' }}>{entity.name}</div>
          {entity.nameLocal && (
            <div className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>{entity.nameLocal}</div>
          )}
        </div>
        <button onClick={onClose} className="flex-shrink-0 p-1 rounded hover:bg-[#1e2533] transition-colors">
          <X size={13} style={{ color: '#64748B' }} />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-3">
        {/* ID and status */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono" style={{ color: '#475569' }}>{entity.id}</span>
          <StatusTag status={entity.status} />
        </div>

        {/* Threat level */}
        {entity.threatLevel && (
          <div className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: '#64748B' }}>Threat level</span>
            <span className="text-[11px] font-medium" style={{ color: threatColors[entity.threatLevel] || '#64748B' }}>
              {entity.threatLevel.charAt(0).toUpperCase() + entity.threatLevel.slice(1)}
            </span>
          </div>
        )}

        {/* Role */}
        {!!entity.metadata?.role && (
          <div>
            <span className="text-[11px]" style={{ color: '#64748B' }}>{entity.metadata.role as string}</span>
          </div>
        )}

        {/* Aliases */}
        {entity.aliases && entity.aliases.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.06em] mb-1.5" style={{ color: '#475569' }}>Aliases</div>
            <div className="flex flex-wrap gap-1">
              {entity.aliases.map(alias => (
                <span key={alias} className="text-[11px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: '#161b27', color: '#94A3B8', border: '1px solid #1e2533' }}>
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modules */}
        {entity.modules.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.06em] mb-1.5" style={{ color: '#475569' }}>Module presence</div>
            <div className="space-y-1.5">
              {entity.modules.map(m => (
                <div key={m.module} className="flex items-start gap-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: '#1e2533', color: '#64748B' }}>
                    {m.module.toUpperCase()}
                  </span>
                  <span className="text-[11px]" style={{ color: '#94A3B8' }}>{m.summary}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
        <button
          onClick={() => { router.push(`/entity/${entity.id}`); onClose(); }}
          className="flex items-center gap-1.5 text-[12px] font-medium transition-colors hover:text-blue-400"
          style={{ color: '#3B82F6' }}
        >
          <ExternalLink size={12} />
          Open full profile
        </button>
      </div>
    </div>
  );
}
