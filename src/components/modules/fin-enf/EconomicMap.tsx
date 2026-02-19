'use client';

import { useEffect, useRef, useCallback } from 'react';

interface EconomicMapProps {
  filter: string;
}

interface EconNode {
  id: string;
  label: string;
  layer: number;
  value?: string;
  status: 'center' | 'foundation' | 'holding' | 'shell' | 'sanctioned';
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const statusColors: Record<string, string> = {
  center: '#EF4444',
  foundation: '#F97316',
  holding: '#3B82F6',
  shell: '#475569',
  sanctioned: '#F59E0B',
};

const rawNodes = [
  { id: 'setad', label: 'Setad', layer: 0, status: 'center' as const, value: '$155B+' },
  { id: 'f1', label: 'Bonyad Mostazafan', layer: 1, status: 'foundation' as const, value: '$50B+' },
  { id: 'f2', label: 'Bonyad Shahid', layer: 1, status: 'foundation' as const, value: '$8B' },
  { id: 'f3', label: "Astan Quds Razavi", layer: 1, status: 'foundation' as const, value: '$30B' },
  { id: 'f4', label: 'IRGC Economic Wing', layer: 1, status: 'sanctioned' as const, value: 'Sanctioned' },
  { id: 'f5', label: 'Khatam al-Anbiya', layer: 1, status: 'sanctioned' as const, value: 'OFAC' },
  { id: 'f6', label: 'Passargad Bank', layer: 1, status: 'foundation' as const, value: '$12B' },
  { id: 'f7', label: 'Iran Air', layer: 1, status: 'holding' as const, value: '$2B' },
  { id: 'f8', label: 'NICICO', layer: 1, status: 'holding' as const, value: '$4B' },
  { id: 'h1', label: 'Al-Furqan Trading', layer: 2, status: 'sanctioned' as const, value: '$8.2M' },
  { id: 'h2', label: 'Omid Construction', layer: 2, status: 'sanctioned' as const, value: '$6.7M' },
  { id: 'h3', label: 'Dubai Holding Co.', layer: 2, status: 'holding' as const },
  { id: 'h4', label: 'Istanbul LLC', layer: 2, status: 'holding' as const },
  { id: 'h5', label: 'Armenia Shell', layer: 2, status: 'shell' as const },
  { id: 'h6', label: 'Erbil Corp.', layer: 2, status: 'shell' as const },
  { id: 'h7', label: 'Kish Trading Co.', layer: 2, status: 'holding' as const },
  { id: 'h8', label: 'Cyprus Trust', layer: 2, status: 'shell' as const },
];

const edges = [
  { source: 'setad', target: 'f1' }, { source: 'setad', target: 'f2' },
  { source: 'setad', target: 'f3' }, { source: 'setad', target: 'f4' },
  { source: 'setad', target: 'f5' }, { source: 'setad', target: 'f6' },
  { source: 'setad', target: 'f7' }, { source: 'setad', target: 'f8' },
  { source: 'f4', target: 'h1' }, { source: 'f4', target: 'h2' },
  { source: 'f5', target: 'h1' }, { source: 'f5', target: 'h2' },
  { source: 'f1', target: 'h3' }, { source: 'f1', target: 'h7' },
  { source: 'f6', target: 'h4' }, { source: 'f2', target: 'h5' },
  { source: 'f3', target: 'h8' }, { source: 'f7', target: 'h6' },
];

export function EconomicMap({ filter }: EconomicMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<EconNode[]>([]);
  const animRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const initMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const W = canvas.width;
    const H = canvas.height;

    if (!initializedRef.current) {
      initializedRef.current = true;
      nodesRef.current = rawNodes.map((n, i) => {
        let x: number, y: number;
        if (n.layer === 0) {
          x = W / 2; y = H / 2;
        } else if (n.layer === 1) {
          const idx = i - 1;
          const angle = (idx / 8) * Math.PI * 2 - Math.PI / 2;
          x = W / 2 + Math.cos(angle) * 140;
          y = H / 2 + Math.sin(angle) * 110;
        } else {
          const idx = i - 9;
          const angle = (idx / 8) * Math.PI * 2 - Math.PI / 4;
          x = W / 2 + Math.cos(angle) * 240;
          y = H / 2 + Math.sin(angle) * 185;
        }
        return { ...n, x, y, vx: 0, vy: 0 };
      });
    }

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W; canvas.height = H;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, W, H);

      const ns = nodesRef.current;

      // Repulsion
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[j].x - ns[i].x;
          const dy = ns[j].y - ns[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = -1200 / (dist * dist);
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          ns[i].vx += fx; ns[i].vy += fy;
          ns[j].vx -= fx; ns[j].vy -= fy;
        }
      }

      // Edge attraction
      edges.forEach(e => {
        const src = ns.find(n => n.id === e.source);
        const tgt = ns.find(n => n.id === e.target);
        if (!src || !tgt) return;
        const dx = tgt.x - src.x, dy = tgt.y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = src.layer === 0 ? 150 : 100;
        const force = (dist - targetDist) * 0.035;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        src.vx += fx; src.vy += fy;
        tgt.vx -= fx; tgt.vy -= fy;
      });

      ns.forEach(n => {
        n.vx += (W / 2 - n.x) * 0.002;
        n.vy += (H / 2 - n.y) * 0.002;
        n.vx *= 0.86; n.vy *= 0.86;
        n.x = Math.max(44, Math.min(W - 44, n.x + n.vx));
        n.y = Math.max(30, Math.min(H - 30, n.y + n.vy));
      });

      // Filter
      const filteredNodes = filter === 'All' ? ns
        : filter === 'Sanctioned' ? ns.filter(n => ['center', 'sanctioned'].includes(n.status))
        : filter === 'Under investigation' ? ns.filter(n => ['center', 'foundation', 'sanctioned'].includes(n.status))
        : ns.filter(n => n.status !== 'shell');
      const visibleIds = new Set(filteredNodes.map(n => n.id));

      // Draw edges
      edges.forEach(e => {
        if (!visibleIds.has(e.source) || !visibleIds.has(e.target)) return;
        const src = ns.find(n => n.id === e.source);
        const tgt = ns.find(n => n.id === e.target);
        if (!src || !tgt) return;
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = '#1e253350';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      filteredNodes.forEach(node => {
        const color = statusColors[node.status] || '#475569';
        const size = node.layer === 0 ? 24 : node.layer === 1 ? 14 : 9;

        // Glow
        if (node.status === 'sanctioned' || node.layer === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size + 6, 0, Math.PI * 2);
          ctx.fillStyle = color + '12';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color + '20';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = node.status === 'sanctioned' ? 2 : 1;
        ctx.stroke();

        ctx.fillStyle = '#94A3B8';
        ctx.font = `${node.layer === 0 ? 11 : 10}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        const shortLabel = node.label.split(' ').slice(0, 2).join(' ');
        ctx.fillText(shortLabel, node.x, node.y + size + 13);

        if (node.value) {
          ctx.fillStyle = color;
          ctx.font = `9px 'JetBrains Mono', monospace`;
          ctx.fillText(node.value, node.x, node.y + size + 23);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    draw();
  }, [filter]);

  useEffect(() => {
    initMap();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [initMap]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-3 right-3 rounded-md border px-3 py-2"
        style={{ backgroundColor: '#0f111780', borderColor: '#1e2533' }}>
        <div className="space-y-1">
          {Object.entries(statusColors).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} />
              <span className="text-[10px] capitalize" style={{ color: '#64748B' }}>{k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
