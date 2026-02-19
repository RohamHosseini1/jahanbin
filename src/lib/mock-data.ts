import entitiesData from '@/data/entities.json';
import casesData from '@/data/cases.json';
import networkGraphData from '@/data/network-graph.json';
import financialAccountsData from '@/data/financial-accounts.json';
import timelineEventsData from '@/data/timeline-events.json';
import auditLogData from '@/data/audit-log.json';
import alertsData from '@/data/alerts.json';
import watchlistData from '@/data/watchlist.json';

import type { Entity, Case, NetworkNode, NetworkEdge, FinancialAccount, TimelineEvent, AuditEntry, Alert, WatchlistEntry } from './types';

export function getEntities(): Entity[] {
  return entitiesData as Entity[];
}

export function getEntityById(id: string): Entity | undefined {
  return (entitiesData as Entity[]).find(e => e.id === id);
}

export function getCases(): Case[] {
  return casesData as Case[];
}

export function getCaseById(id: string): Case | undefined {
  return (casesData as Case[]).find(c => c.id === id);
}

export function getNetworkGraph(): { nodes: NetworkNode[]; edges: NetworkEdge[] } {
  return networkGraphData as { nodes: NetworkNode[]; edges: NetworkEdge[] };
}

export function getFinancialAccounts(): FinancialAccount[] {
  return financialAccountsData as FinancialAccount[];
}

export function getFinancialAccountsByEntity(entityId: string): FinancialAccount[] {
  return (financialAccountsData as FinancialAccount[]).filter(a => a.entityId === entityId);
}

export function getTimelineEvents(): TimelineEvent[] {
  return timelineEventsData as TimelineEvent[];
}

export function getAuditLog(): AuditEntry[] {
  return auditLogData as AuditEntry[];
}

export function getAlerts(): Alert[] {
  return alertsData as Alert[];
}

export function getWatchlist(): WatchlistEntry[] {
  return watchlistData as WatchlistEntry[];
}

export function searchAll(query: string): {
  entities: Entity[];
  cases: Case[];
  accounts: FinancialAccount[];
} {
  const q = query.toLowerCase();
  return {
    entities: (entitiesData as Entity[]).filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      (e.nameLocal && e.nameLocal.includes(q)) ||
      (e.aliases && e.aliases.some(a => a.toLowerCase().includes(q)))
    ),
    cases: (casesData as Case[]).filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q)
    ),
    accounts: (financialAccountsData as FinancialAccount[]).filter(a =>
      a.institution.toLowerCase().includes(q) ||
      a.jurisdiction.toLowerCase().includes(q)
    ),
  };
}
