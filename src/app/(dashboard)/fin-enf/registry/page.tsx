'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import stateAssets from '@/data/state-assets.json';

const tabs = ['Registry', 'Privatization Queue', 'Commission Reports'];

const flagLabels: Record<string, { label: string; color: string }> = {
  'privatization-candidate': { label: 'Privatization candidate', color: 'text-blue-700 bg-blue-50' },
  'complex-ownership': { label: 'Complex ownership', color: 'text-amber-700 bg-amber-50' },
  'viable': { label: 'Viable', color: 'text-green-700 bg-green-50' },
  'strategic': { label: 'Strategic — no privatization', color: 'text-red-700 bg-red-50' },
  'setad-linked': { label: 'Setad-linked — investigate first', color: 'text-red-700 bg-red-50' },
};

const statusLabels: Record<string, string> = {
  'state-owned': 'State-owned',
  'partial-private': 'Partial private',
  'under-review': 'Under review',
};

function formatValue(val: number): string {
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
  return `$${val.toLocaleString()}`;
}

export default function StateAssetRegistryPage() {
  const [activeTab, setActiveTab] = useState('Registry');
  const [search, setSearch] = useState('');

  const filtered = stateAssets.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-[18px] font-semibold text-stone-900">Asset Recovery — State Asset Registry</h1>
          <p className="text-sm text-stone-500 mt-0.5">Inventory of state-controlled entities for privatization commission</p>
        </div>
      </div>

      <p className="text-xs text-stone-500 mb-4">
        Registry covers 47,312 state-controlled entities across 18 sectors. Privatization commission has requested assessment for 847 entities.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-stone-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-blue-600 text-blue-700 font-medium'
                : 'border-transparent text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Registry' && (
        <div>
          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search entity name or registry ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>
            <select className="px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none text-stone-700 bg-white">
              <option>All sectors</option>
              <option>Manufacturing</option>
              <option>Energy</option>
              <option>Aviation</option>
              <option>Petrochemical</option>
              <option>Finance</option>
              <option>Infrastructure</option>
            </select>
            <select className="px-3 py-2 text-sm border border-stone-200 rounded-md focus:outline-none text-stone-700 bg-white">
              <option>All statuses</option>
              <option>State-owned</option>
              <option>Partial private</option>
              <option>Under review</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-stone-200 rounded-md text-stone-700 hover:bg-stone-50 transition-colors ms-auto">
              <Plus size={13} />
              Add entity
            </button>
          </div>

          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Registry ID</th>
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Entity Name</th>
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Sector</th>
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Est. Value</th>
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Status</th>
                  <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((asset) => {
                  const flag = flagLabels[asset.flag] || { label: asset.flag, color: 'text-stone-500 bg-stone-100' };
                  return (
                    <tr key={asset.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-stone-600">{asset.id}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-stone-900">{asset.name}</div>
                        <div className="text-[11px] text-stone-400">{asset.nameLocal}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-600">{asset.sector}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-stone-900">{formatValue(asset.estimatedValue)}</td>
                      <td className="px-4 py-3 text-sm text-stone-600">{statusLabels[asset.status] || asset.status}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${flag.color}`}>
                          {flag.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Privatization Queue' && (
        <div className="border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Entity</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Sector</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Est. Value</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">JAHAN Assessment</th>
                <th className="text-start px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wide">Commission Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stateAssets
                .filter(a => a.flag === 'privatization-candidate' || a.flag === 'viable')
                .map((asset) => (
                  <tr key={asset.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-stone-900">{asset.name}</div>
                      <div className="text-[11px] font-mono text-stone-400">{asset.id}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">{asset.sector}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-stone-900">{formatValue(asset.estimatedValue)}</td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1.5 text-xs text-blue-700 hover:underline">
                        Request JAHAN assessment →
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
                        Awaiting assessment
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Commission Reports' && (
        <div className="space-y-4">
          <div className="p-4 border border-stone-200 rounded-lg bg-stone-50 text-sm text-stone-600">
            No commission reports generated yet. Use the button below to generate a sector report.
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus size={13} />
            Generate new sector report
          </button>
        </div>
      )}
    </div>
  );
}
