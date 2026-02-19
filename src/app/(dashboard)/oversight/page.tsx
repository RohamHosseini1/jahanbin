'use client';

import { useState, useEffect } from 'react';
import { ModuleHeader } from '@/components/layout/ModuleHeader';
import { StatusTag } from '@/components/shared/StatusTag';
import { getAuditLog } from '@/lib/mock-data';
import type { AuditEntry } from '@/lib/types';
import { Eye, Radio, X } from 'lucide-react';

const TABS = ['Audit Log', 'Judicial Authorizations', 'Access Control', 'Transparency Report'];

type AuthRequest = {
  id: string;
  type: string;
  requestedBy: string;
  subject: string;
  requested: string;
  deadline: string;
  status: 'pending' | 'approved' | 'expired';
  legalBasis?: string;
};

const authRequests: AuthRequest[] = [
  { id: 'AUTH-2026-0089', type: 'SIGINT collection continuance (30d)', requestedBy: 'JB-0471', subject: 'Taghavi network', requested: '2026-02-03', deadline: '2026-02-05', status: 'pending', legalBasis: 'Intelligence Act §23 — Judicial oversight required for SIGINT collection exceeding 30 days.' },
  { id: 'AUTH-2026-0088', type: 'Asset freeze — UAE accounts', requestedBy: 'JB-0344', subject: 'Ansari / Al-Furqan Trading', requested: '2026-02-03', deadline: '2026-02-04', status: 'pending', legalBasis: 'Asset Recovery Act §12 — Freeze requires judicial authorization within 24h.' },
  { id: 'AUTH-2026-0085', type: 'Border watch — 9 subjects', requestedBy: 'JB-0471', subject: 'Taghavi cell members', requested: '2026-01-31', deadline: '—', status: 'approved' },
  { id: 'AUTH-2026-0081', type: 'Watchlist extension — Ansari', requestedBy: 'JB-0892', subject: 'Colonel Davoud Ansari', requested: '2026-01-28', deadline: '—', status: 'approved' },
  { id: 'AUTH-2026-0071', type: 'FININT access — Setad accounts', requestedBy: 'JB-0201', subject: 'Setad entities', requested: '2026-01-15', deadline: 'Expired', status: 'expired' },
];

const roleMatrix = [
  { role: 'Analyst (L2)', access: ['Read/Write own', 'Read only', 'Read only', 'Read only', '—', '—', 'Query only'], current: false },
  { role: 'Senior Analyst (L3)', access: ['Full', 'Read/Write', 'Read/Write', 'Read', 'Briefings', 'Audit log', 'Full'], current: true },
  { role: 'Module Lead (L4)', access: ['Full', 'Full', 'Full', 'Full', 'Full', 'Audit log', 'Full'], current: false },
  { role: 'Inspector General (L5)', access: ['Read only', 'Read only', 'Read only', 'Read only', 'Full', 'Full', 'Audit log'], current: false },
];

const accessHeaders = ['CT-OPS', 'FIN-ENF', 'BDR-SEC', 'TRC-SUP', 'Executive', 'Oversight', 'JAHAN AI'];

const actorColors: Record<string, string> = {
  'JAHAN-AI': '#8B5CF6',
  'SYSTEM': '#475569',
  'JB-0471': '#3B82F6',
  'JB-0892': '#06B6D4',
  'JB-0344': '#10B981',
  'JB-0201': '#F59E0B',
};

export default function OversightPage() {
  const [activeTab, setActiveTab] = useState('Audit Log');
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [selectedAuth, setSelectedAuth] = useState<AuthRequest | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    setAuditLog(getAuditLog());
  }, []);

  return (
    <div className="module-content" style={{ backgroundColor: '#0d111c' }}>
      <ModuleHeader
        title="Oversight Console"
        subtitle="Every analyst action is recorded immutably. No exceptions."
        status="Live"
        statusColor="#3B82F6"
      />

      <div className="border-b px-6 flex gap-0" style={{ borderColor: '#1e2533' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#F1F5F9' : '#64748B',
              borderBottomColor: activeTab === tab ? '#3B82F6' : 'transparent',
              fontWeight: activeTab === tab ? 500 : 400,
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Audit Log' && (
          <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: '#1e2533' }}>
              <Radio size={12} style={{ color: '#10B981' }} />
              <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Real-time audit log</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#10B981' }} />
                <span className="text-[10px]" style={{ color: '#10B981' }}>Live</span>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: '#1e2533' }}>
              {auditLog.map((entry, i) => (
                <div key={i}>
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[#161b27] transition-colors"
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                    <span className="text-[11px] font-mono flex-shrink-0 w-20 tabular-nums" style={{ color: '#475569' }}>
                      {entry.timestamp.slice(11, 19)}
                    </span>
                    <span className="text-[11px] font-medium w-20 flex-shrink-0"
                      style={{ color: actorColors[entry.actor] || '#3B82F6' }}>
                      {entry.actor}
                    </span>
                    <span className="text-[11px] flex-1 truncate" style={{ color: '#94A3B8' }}>{entry.action}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: '#1e2533', color: '#64748B' }}>{entry.module}</span>
                    <button className="text-[10px] flex-shrink-0 hover:opacity-80" style={{ color: '#3B82F6' }}>View</button>
                  </div>
                  {expandedRow === i && entry.detail && (
                    <div className="px-4 py-3 border-t" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#64748B' }}>{entry.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Judicial Authorizations' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-3">
              <div className="text-[11px]" style={{ color: '#64748B' }}>
                Collection, retention, and action authorities require judicial review — Oversight Protocol §7
              </div>
              <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e2533' }}>
                      {['Status', 'Reference', 'Request type', 'Requested by', 'Deadline'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                    {authRequests.map(req => (
                      <tr key={req.id}
                        onClick={() => req.status === 'pending' ? setSelectedAuth(selectedAuth?.id === req.id ? null : req) : null}
                        className="transition-colors hover:bg-[#161b27]"
                        style={{
                          cursor: req.status === 'pending' ? 'pointer' : 'default',
                          backgroundColor: req.status === 'pending' && selectedAuth?.id === req.id ? '#161b27' : 'transparent',
                        }}>
                        <td className="px-4 py-3"><StatusTag status={req.status} /></td>
                        <td className="px-4 py-3 text-[11px] font-mono"
                          style={{ color: req.status === 'pending' ? '#F59E0B' : '#64748B' }}>{req.id}</td>
                        <td className="px-4 py-3 text-[12px]" style={{ color: '#94A3B8' }}>{req.type}</td>
                        <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#64748B' }}>{req.requestedBy}</td>
                        <td className="px-4 py-3 text-[11px] font-mono"
                          style={{ color: req.deadline === 'Expired' ? '#EF4444' : '#64748B' }}>{req.deadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedAuth ? (
              <div className="rounded-lg border p-4 slide-in-panel" style={{ backgroundColor: '#0f1117', borderColor: '#2d3a52' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium" style={{ color: '#F1F5F9' }}>Authorization review</span>
                  <button onClick={() => setSelectedAuth(null)} className="p-1 rounded hover:bg-[#1e2533]">
                    <X size={13} style={{ color: '#475569' }} />
                  </button>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-mono" style={{ color: '#F59E0B' }}>{selectedAuth.id}</div>
                  <div className="text-[13px] font-medium" style={{ color: '#F1F5F9' }}>{selectedAuth.type}</div>
                  <div className="text-[11px]" style={{ color: '#64748B' }}>Subject: {selectedAuth.subject}</div>
                  <div className="text-[11px]" style={{ color: '#64748B' }}>By: {selectedAuth.requestedBy} · {selectedAuth.requested}</div>
                  <div className="text-[11px]" style={{ color: '#64748B' }}>Deadline: {selectedAuth.deadline}</div>
                </div>
                {selectedAuth.legalBasis && (
                  <div className="p-3 rounded-md mb-4" style={{ backgroundColor: '#161b27', border: '1px solid #1e2533' }}>
                    <div className="text-[10px] uppercase tracking-[0.06em] mb-1" style={{ color: '#475569' }}>Legal basis</div>
                    <p className="text-[11px]" style={{ color: '#94A3B8' }}>{selectedAuth.legalBasis}</p>
                  </div>
                )}
                <div className="text-[10px] mb-3 italic" style={{ color: '#475569' }}>
                  Approval requires judicial officer credentials (Level 5 access)
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Approve', color: '#10B981' },
                    { label: 'Reject', color: '#EF4444' },
                    { label: 'Request additional info', color: '#94A3B8' },
                  ].map(btn => (
                    <button key={btn.label}
                      className="w-full py-2 rounded text-[12px] font-medium"
                      style={{
                        backgroundColor: btn.color === '#94A3B8' ? '#1e2533' : `${btn.color}20`,
                        color: btn.color,
                        border: btn.color !== '#94A3B8' ? `1px solid ${btn.color}30` : 'none',
                      }}>
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border flex items-center justify-center" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533', minHeight: 200 }}>
                <div className="text-center">
                  <Eye size={24} style={{ color: '#1e2533', margin: '0 auto 8px' }} />
                  <p className="text-[12px]" style={{ color: '#475569' }}>Select a pending request</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Access Control' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[12px]" style={{ color: '#64748B' }}>
                Current session: <span className="font-mono" style={{ color: '#3B82F6' }}>JB-0471 — Senior Analyst — Level 3</span>
              </div>
              <div className="text-[12px]" style={{ color: '#64748B' }}>
                Active sessions: <span style={{ color: '#F1F5F9' }}>12 analysts</span>
              </div>
            </div>
            <div className="rounded-lg border overflow-x-auto" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2533' }}>
                    <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.06em]" style={{ color: '#475569' }}>Role</th>
                    {accessHeaders.map(h => (
                      <th key={h} className="px-3 py-2.5 text-[10px] uppercase tracking-[0.06em] font-mono text-center" style={{ color: '#475569' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#1e2533' }}>
                  {roleMatrix.map(row => (
                    <tr key={row.role}
                      style={{ backgroundColor: row.current ? '#1e3a5215' : 'transparent' }}>
                      <td className="px-4 py-3">
                        <span className="text-[12px]" style={{ color: row.current ? '#3B82F6' : '#94A3B8' }}>
                          {row.role}
                          {row.current && <span className="ml-2 text-[10px]" style={{ color: '#3B82F6' }}>← current session</span>}
                        </span>
                      </td>
                      {row.access.map((a, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          <span className="text-[10px]"
                            style={{ color: a === '—' ? '#2d3a52' : a === 'Full' ? '#10B981' : '#64748B' }}>
                            {a}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Transparency Report' && (
          <div className="max-w-xl">
            <div className="rounded-lg border" style={{ backgroundColor: '#0f1117', borderColor: '#1e2533' }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: '#1e2533', backgroundColor: '#0d0f15' }}>
                <div className="text-[13px] font-semibold mb-0.5" style={{ color: '#F1F5F9' }}>February 2026 — Transparency Summary</div>
                <div className="text-[11px] font-mono" style={{ color: '#475569' }}>
                  Generated: 3 February 2026 | Classification: PUBLIC (redacted version available)
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-2.5">
                  {[
                    { label: 'Queries executed', value: '1,847' },
                    { label: 'Entity profiles accessed', value: '412' },
                    { label: 'Intelligence products issued', value: '34' },
                    { label: 'Judicial authorizations requested', value: '12' },
                    { label: 'Authorizations approved', value: '9' },
                    { label: 'Authorizations rejected', value: '2' },
                    { label: 'Authorizations pending', value: '1' },
                    { label: 'Watch list entries — active', value: '4,847' },
                    { label: 'New entries added (month)', value: '23' },
                    { label: 'Entries expired / removed', value: '47 / 12' },
                    { label: 'Unauthorized access attempts', value: '0' },
                    { label: 'Policy violations', value: '0' },
                    { label: 'Next scheduled audit review', value: '1 March 2026' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-0.5">
                      <span className="text-[11px]" style={{ color: '#64748B' }}>{item.label}</span>
                      <span className="text-[12px] font-mono font-medium" style={{ color: '#94A3B8' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-5 pt-4 border-t" style={{ borderColor: '#1e2533' }}>
                  <button className="px-4 py-2 rounded text-[12px] font-medium"
                    style={{ backgroundColor: '#3B82F620', color: '#3B82F6', border: '1px solid #3B82F630' }}>
                    Download public summary
                  </button>
                  <button className="px-4 py-2 rounded text-[12px] font-medium" style={{ backgroundColor: '#1e2533', color: '#94A3B8' }}>
                    Submit to oversight committee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
