'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getNetworkGraph } from '@/lib/mock-data';
import type { NetworkNode } from '@/lib/types';

const clusterColors: Record<string, string> = {
  operational: '#EF4444',
  logistics: '#F59E0B',
  historical: '#475569',
};

const edgeColors: Record<string, string> = {
  sigint: '#EF4444',
  financial: '#06B6D4',
  physical: '#94A3B8',
  historical: '#334155',
};

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<(NetworkNode & { x: number; y: number }) | null>(null);
  const nodesRef = useRef<Array<NetworkNode & { x: number; y: number; vx: number; vy: number }>>([]);
  const animFrameRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const graphData = getNetworkGraph();

  const initGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const W = canvas.width;
    const H = canvas.height;

    if (!initializedRef.current) {
      initializedRef.current = true;
      const { nodes } = graphData;
      const positioned = nodes.map((node, i) => {
        let x: number, y: number;
        if (node.cluster === 'operational') {
          const idx = i;
          const angle = (idx * Math.PI * 2) / 9 - Math.PI / 2;
          x = W * 0.38 + Math.cos(angle) * 95;
          y = H * 0.5 + Math.sin(angle) * 85;
        } else if (node.cluster === 'logistics') {
          const idx = i - 9;
          const angle = (idx * Math.PI * 2) / 4;
          x = W * 0.68 + Math.cos(angle) * 72;
          y = H * 0.45 + Math.sin(angle) * 62;
        } else {
          const idx = i - 13;
          const angle = (idx * Math.PI * 2) / 4;
          x = W * 0.18 + Math.cos(angle) * 55;
          y = H * 0.72 + Math.sin(angle) * 50;
        }
        return { ...node, x, y, vx: 0, vy: 0 };
      });
      nodesRef.current = positioned;
    }

    const { edges } = graphData;

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (canvas.width !== W) canvas.width = W;
      if (canvas.height !== H) canvas.height = H;

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
          const force = -1800 / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          ns[i].vx += fx; ns[i].vy += fy;
          ns[j].vx -= fx; ns[j].vy -= fy;
        }
      }

      // Attraction from edges
      edges.forEach(edge => {
        const src = ns.find(n => n.id === edge.source);
        const tgt = ns.find(n => n.id === edge.target);
        if (!src || !tgt) return;
        const dx = tgt.x - src.x;
        const dy = tgt.y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = edge.type === 'historical' ? 100 : 75;
        const force = (dist - targetDist) * 0.03;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        src.vx += fx; src.vy += fy;
        tgt.vx -= fx; tgt.vy -= fy;
      });

      // Center gravity
      ns.forEach(n => {
        n.vx += (W / 2 - n.x) * 0.002;
        n.vy += (H / 2 - n.y) * 0.002;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x = Math.max(24, Math.min(W - 24, n.x + n.vx));
        n.y = Math.max(24, Math.min(H - 24, n.y + n.vy));
      });

      // Draw edges
      edges.forEach(edge => {
        const src = ns.find(n => n.id === edge.source);
        const tgt = ns.find(n => n.id === edge.target);
        if (!src || !tgt) return;
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        const alpha = edge.type === 'historical' ? '30' : '55';
        ctx.strokeStyle = (edgeColors[edge.type] || '#475569') + alpha;
        ctx.lineWidth = edge.strength === 'strong' ? 1.5 : 0.8;
        if (edge.strength === 'weak' || edge.type === 'historical') {
          ctx.setLineDash([3, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw nodes
      ns.forEach(node => {
        const color = clusterColors[node.cluster] || '#64748B';
        const size = (node.size || 10) / 2;
        const alpha = node.cluster === 'historical' ? 0.45 : 1.0;

        ctx.globalAlpha = alpha;

        // Glow for high-betweenness nodes
        if (node.betweenness && node.betweenness > 0.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size + 5, 0, Math.PI * 2);
          ctx.fillStyle = color + '18';
          ctx.fill();
        }

        ctx.beginPath();
        if (node.type === 'location') {
          ctx.rect(node.x - size, node.y - size, size * 2, size * 2);
        } else if (node.type === 'phone') {
          ctx.moveTo(node.x, node.y - size);
          ctx.lineTo(node.x + size, node.y + size);
          ctx.lineTo(node.x - size, node.y + size);
          ctx.closePath();
        } else {
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        }
        ctx.fillStyle = color + '22';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = node.betweenness && node.betweenness > 0.6 ? 2 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Label
        const label = node.label.split(' (')[0].split(' ').slice(0, 2).join(' ');
        ctx.fillStyle = node.cluster === 'historical' ? '#334155' : '#94A3B8';
        ctx.font = `10px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + size + 11);
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    draw();
  }, [graphData]);

  useEffect(() => {
    initGraph();
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [initGraph]);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    const hit = nodesRef.current.find(n => {
      const r = (n.size || 10) / 2 + 6;
      return Math.hypot(n.x - mx, n.y - my) < r;
    });
    setHoveredNode(hit || null);
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />
      {hoveredNode && (
        <div className="absolute top-3 left-3 rounded-md border px-3 py-2 pointer-events-none z-10"
          style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52', maxWidth: 240 }}>
          <div className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>{hoveredNode.label}</div>
          <div className="text-[10px] font-mono mt-0.5 capitalize" style={{ color: '#64748B' }}>
            {hoveredNode.cluster} cluster · {hoveredNode.type}
          </div>
          {hoveredNode.betweenness && (
            <div className="text-[10px] mt-0.5" style={{ color: '#F59E0B' }}>
              Betweenness centrality: {hoveredNode.betweenness}
            </div>
          )}
          {hoveredNode.entityId && (
            <div className="text-[10px] font-mono mt-0.5" style={{ color: '#3B82F6' }}>{hoveredNode.entityId}</div>
          )}
        </div>
      )}
      {/* Legend */}
      <div className="absolute bottom-3 right-3 rounded-md border px-3 py-2"
        style={{ backgroundColor: '#0f111780', borderColor: '#1e2533' }}>
        <div className="space-y-1">
          {[
            { color: '#EF4444', label: 'Operational cell' },
            { color: '#F59E0B', label: 'Logistics/support' },
            { color: '#475569', label: 'Historical (inactive)' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px]" style={{ color: '#64748B' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
