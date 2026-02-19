'use client';

import { useState, useEffect } from 'react';
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
  { role: 'Analyst (L2)',          access: ['Read/Write own', 'Read only', 'Read only', 'Read only', '—',        '—',         'Query only'], current: false },
  { role: 'Senior Analyst (L3)',   access: ['Full',           'Read/Write', 'Read/Write', 'Read',    'Briefings', 'Audit log', 'Full'],       current: true  },
  { role: 'Module Lead (L4)',      access: ['Full',           'Full',       'Full',       'Full',    'Full',      'Audit log', 'Full'],       current: false },
  { role: 'Inspector General (L5)', access: ['Read only',    'Read only',  'Read only',  'Read only','Full',      'Full',      'Audit log'], current: false },
];

const accessHeaders = ['CT-OPS', 'FIN-ENF', 'BDR-SEC', 'TRC-SUP', 'Executive', 'Oversight', 'JAHAN AI'];

const actorColors: Record<string, string> = {
  'JAHAN-AI': '#7C3AED',
  'SYSTEM':   '#78716C',
  'JB-0471':  '#1D4ED8',
  'JB-0892':  '#0891B2',
  'JB-0344':  '#059669',
  'JB-0201':  '#D97706',
};

const statusConfig: Record<string, { label: string; bg: string; color: string; border: string }> = {
  pending:  { label: 'Pending',  bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
  approved: { label: 'Approved', bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' },
  expired:  { label: 'Expired',  bg: '#F5F5F4', color: '#78716C', border: '#E7E5E4' },
};

export default function OversightPage() {
  const [activeTab, setActiveTab]       = useState('Audit Log');
  const [auditLog, setAuditLog]         = useState<AuditEntry[]>([]);
  const [selectedAuth, setSelectedAuth] = useState<AuthRequest | null>(null);
  const [expandedRow, setExpandedRow]   = useState<number | null>(null);

  useEffect(() => {
    setAuditLog(getAuditLog());
  }, []);

  return (
    <div className="module-content" style={{ backgroundColor: '#FAFAF9', minHeight: '100%' }}>
      {/* Page header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight" style={{ color: '#1C1917' }}>
              Oversight Console
            </h1>
            <p className="text-[12px] mt-0.5" style={{ color: '#78716C' }}>
              Every analyst action is recorded immutably. No exceptions.
            </p>
          </div>
          <span
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
            Live
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mt-4 px-6 flex gap-0" style={{ borderColor: '#E7E5E4' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-[12px] transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? '#1C1917' : '#78716C',
              borderBottomColor: activeTab === tab ? '#1D4ED8' : 'transparent',
              fontWeight: activeTab === tab ? 600 : 400,
              background: 'transparent',
            }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">

        {/* ── Audit Log ── */}
        {activeTab === 'Audit Log' && (
          <div
            className="rounded-xl border overflow-hidden"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {/* Log header */}
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{ borderColor: '#E7E5E4', backgroundColor: '#F5F5F4' }}>
              <Radio size={12} style={{ color: '#059669' }} />
              <span className="text-[12px] font-semibold" style={{ color: '#1C1917' }}>
                Real-time audit log
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#059669' }} />
                <span className="text-[10px] font-medium" style={{ color: '#059669' }}>Live</span>
              </div>
            </div>

            {/* Log rows */}
            <div className="divide-y" style={{ borderColor: '#F5F5F4' }}>
              {auditLog.map((entry, i) => (
                <div key={i}>
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAF9')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                    <span
                      className="text-[11px] font-mono flex-shrink-0 w-20 tabular-nums"
                      style={{ color: '#A8A29E' }}>
                      {entry.timestamp.slice(11, 19)}
                    </span>
                    <span
                      className="text-[11px] font-semibold w-20 flex-shrink-0"
                      style={{ color: actorColors[entry.actor] || '#1D4ED8' }}>
                      {entry.actor}
                    </span>
                    <span className="text-[11px] flex-1 truncate" style={{ color: '#44403C' }}>
                      {entry.action}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: '#F5F5F4', color: '#78716C', border: '1px solid #E7E5E4' }}>
                      {entry.module}
                    </span>
                    <button
                      className="text-[10px] flex-shrink-0 font-medium hover:opacity-70 transition-opacity"
                      style={{ color: '#1D4ED8' }}>
                      View
                    </button>
                  </div>
                  {expandedRow === i && entry.detail && (
                    <div
                      className="px-4 py-3 border-t"
                      style={{ borderColor: '#E7E5E4', backgroundColor: '#FAFAF9' }}>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#78716C' }}>
                        {entry.detail}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Judicial Authorizations ── */}
        {activeTab === 'Judicial Authorizations' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-3">
              <div className="text-[11px]" style={{ color: '#78716C' }}>
                Collection, retention, and action authorities require judicial review — Oversight Protocol §7
              </div>
              <div
                className="rounded-xl border overflow-hidden"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F5F5F4' }}>
                      {['Status', 'Reference', 'Request type', 'Requested by', 'Deadline'].map(h => (
                        <th
                          key={h}
                          className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.07em] font-semibold"
                          style={{ color: '#78716C' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {authRequests.map((req, idx) => {
                      const cfg = statusConfig[req.status];
                      const isSelected = selectedAuth?.id === req.id;
                      return (
                        <tr
                          key={req.id}
                          onClick={() => req.status === 'pending' ? setSelectedAuth(isSelected ? null : req) : null}
                          className="transition-colors"
                          style={{
                            cursor: req.status === 'pending' ? 'pointer' : 'default',
                            backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                            borderBottom: idx < authRequests.length - 1 ? '1px solid #F5F5F4' : 'none',
                          }}
                          onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#FAFAF9'; }}
                          onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}>
                          <td className="px-4 py-3">
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                              {cfg.label}
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 text-[11px] font-mono"
                            style={{ color: req.status === 'pending' ? '#D97706' : '#A8A29E' }}>
                            {req.id}
                          </td>
                          <td className="px-4 py-3 text-[12px]" style={{ color: '#44403C' }}>{req.type}</td>
                          <td className="px-4 py-3 text-[11px] font-mono" style={{ color: '#78716C' }}>{req.requestedBy}</td>
                          <td
                            className="px-4 py-3 text-[11px] font-mono"
                            style={{ color: req.deadline === 'Expired' ? '#DC2626' : '#78716C' }}>
                            {req.deadline}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail panel */}
            {selectedAuth ? (
              <div
                className="rounded-xl border p-4"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-semibold" style={{ color: '#1C1917' }}>
                    Authorization review
                  </span>
                  <button
                    onClick={() => setSelectedAuth(null)}
                    className="p-1 rounded transition-colors"
                    style={{ color: '#78716C' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F5F4')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                    <X size={13} />
                  </button>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-mono font-semibold" style={{ color: '#D97706' }}>
                    {selectedAuth.id}
                  </div>
                  <div className="text-[13px] font-semibold" style={{ color: '#1C1917' }}>
                    {selectedAuth.type}
                  </div>
                  <div className="text-[11px]" style={{ color: '#78716C' }}>
                    Subject: {selectedAuth.subject}
                  </div>
                  <div className="text-[11px]" style={{ color: '#78716C' }}>
                    By: {selectedAuth.requestedBy} · {selectedAuth.requested}
                  </div>
                  <div className="text-[11px]" style={{ color: '#78716C' }}>
                    Deadline: {selectedAuth.deadline}
                  </div>
                </div>

                {selectedAuth.legalBasis && (
                  <div
                    className="p-3 rounded-lg mb-4"
                    style={{ backgroundColor: '#FAFAF9', border: '1px solid #E7E5E4' }}>
                    <div
                      className="text-[10px] uppercase tracking-[0.07em] font-semibold mb-1"
                      style={{ color: '#A8A29E' }}>
                      Legal basis
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: '#44403C' }}>
                      {selectedAuth.legalBasis}
                    </p>
                  </div>
                )}

                <div className="text-[10px] mb-3 italic" style={{ color: '#A8A29E' }}>
                  Approval requires judicial officer credentials (Level 5 access)
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Approve',               bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' },
                    { label: 'Reject',                bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' },
                    { label: 'Request additional info', bg: '#F5F5F4', color: '#78716C', border: '#E7E5E4' },
                  ].map(btn => (
                    <button
                      key={btn.label}
                      className="w-full py-2 rounded-md text-[12px] font-medium transition-opacity hover:opacity-80"
                      style={{ backgroundColor: btn.bg, color: btn.color, border: `1px solid ${btn.border}` }}>
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl border flex items-center justify-center"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', minHeight: 200 }}>
                <div className="text-center">
                  <Eye size={24} style={{ color: '#E7E5E4', margin: '0 auto 8px' }} />
                  <p className="text-[12px]" style={{ color: '#A8A29E' }}>
                    Select a pending request
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Access Control ── */}
        {activeTab === 'Access Control' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[12px]" style={{ color: '#78716C' }}>
                Current session:{' '}
                <span className="font-mono font-semibold" style={{ color: '#1D4ED8' }}>
                  JB-0471 — Senior Analyst — Level 3
                </span>
              </div>
              <div className="text-[12px]" style={{ color: '#78716C' }}>
                Active sessions:{' '}
                <span className="font-semibold" style={{ color: '#1C1917' }}>12 analysts</span>
              </div>
            </div>

            <div
              className="rounded-xl border overflow-x-auto"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F5F5F4' }}>
                    <th
                      className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.07em] font-semibold"
                      style={{ color: '#78716C' }}>
                      Role
                    </th>
                    {accessHeaders.map(h => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-[10px] uppercase tracking-[0.07em] font-mono font-semibold text-center"
                        style={{ color: '#78716C' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roleMatrix.map((row, idx) => (
                    <tr
                      key={row.role}
                      style={{
                        backgroundColor: row.current ? '#EFF6FF' : 'transparent',
                        borderBottom: idx < roleMatrix.length - 1 ? '1px solid #F5F5F4' : 'none',
                      }}>
                      <td className="px-4 py-3">
                        <span
                          className="text-[12px]"
                          style={{ color: row.current ? '#1D4ED8' : '#44403C' }}>
                          {row.role}
                          {row.current && (
                            <span className="ml-2 text-[10px]" style={{ color: '#1D4ED8' }}>
                              ← current session
                            </span>
                          )}
                        </span>
                      </td>
                      {row.access.map((a, i) => (
                        <td key={i} className="px-3 py-3 text-center">
                          <span
                            className="text-[10px] font-medium"
                            style={{
                              color: a === '—'    ? '#D1D5DB'
                                   : a === 'Full' ? '#059669'
                                   : '#78716C',
                            }}>
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

        {/* ── Transparency Report ── */}
        {activeTab === 'Transparency Report' && (
          <div className="max-w-xl">
            <div
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E7E5E4', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div
                className="px-5 py-4 border-b"
                style={{ borderColor: '#E7E5E4', backgroundColor: '#F5F5F4' }}>
                <div
                  className="text-[13px] font-semibold mb-0.5"
                  style={{ color: '#1C1917' }}>
                  February 2026 — Transparency Summary
                </div>
                <div className="text-[11px] font-mono" style={{ color: '#78716C' }}>
                  Generated: 3 February 2026 | Classification: PUBLIC (redacted version available)
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-0">
                  {[
                    { label: 'Queries executed',                  value: '1,847' },
                    { label: 'Entity profiles accessed',           value: '412' },
                    { label: 'Intelligence products issued',        value: '34' },
                    { label: 'Judicial authorizations requested',  value: '12' },
                    { label: 'Authorizations approved',            value: '9' },
                    { label: 'Authorizations rejected',            value: '2' },
                    { label: 'Authorizations pending',             value: '1' },
                    { label: 'Watch list entries — active',        value: '4,847' },
                    { label: 'New entries added (month)',           value: '23' },
                    { label: 'Entries expired / removed',          value: '47 / 12' },
                    { label: 'Unauthorized access attempts',       value: '0' },
                    { label: 'Policy violations',                  value: '0' },
                    { label: 'Next scheduled audit review',        value: '1 March 2026' },
                  ].map((item, idx, arr) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-2"
                      style={{
                        borderBottom: idx < arr.length - 1 ? '1px solid #F5F5F4' : 'none',
                      }}>
                      <span className="text-[11px]" style={{ color: '#78716C' }}>
                        {item.label}
                      </span>
                      <span
                        className="text-[12px] font-mono font-semibold"
                        style={{ color: '#1C1917' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="flex gap-3 mt-5 pt-4 border-t"
                  style={{ borderColor: '#E7E5E4' }}>
                  <button
                    className="px-4 py-2 rounded-md text-[12px] font-medium transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: '#EFF6FF',
                      color: '#1D4ED8',
                      border: '1px solid #BFDBFE',
                    }}>
                    Download public summary
                  </button>
                  <button
                    className="px-4 py-2 rounded-md text-[12px] font-medium transition-colors"
                    style={{ backgroundColor: '#F5F5F4', color: '#78716C', border: '1px solid #E7E5E4' }}>
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
