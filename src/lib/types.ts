export interface Entity {
  id: string;
  type: 'person' | 'organization' | 'location' | 'account' | 'event';
  name: string;
  nameLocal?: string;
  aliases?: string[];
  status: 'active' | 'interdicted' | 'under-investigation' | 'cleared';
  threatLevel?: 'critical' | 'high' | 'medium' | 'low';
  modules: ModuleLink[];
  metadata: Record<string, unknown>;
}

export interface ModuleLink {
  module: 'ct-ops' | 'fin-enf' | 'bdr-sec' | 'trc-sup';
  status: string;
  summary: string;
  caseRef?: string;
}

export interface Case {
  id: string;
  title: string;
  module: string;
  status: 'active' | 'pending-authorization' | 'closed';
  priority: 'critical' | 'high' | 'standard';
  subjects: string[];
  leadAnalyst: string;
  opened: string;
  lastUpdated: string;
  crossRefs: CrossRef[];
}

export interface CrossRef {
  module: string;
  type: string;
  description: string;
  status: string;
}

export interface IntelligenceProduct {
  id: string;
  title: string;
  module: string;
  preparedBy: string;
  date: string;
  status: 'pending-review' | 'disseminated' | 'pending-auth';
  disseminatedTo?: string[];
  keyJudgments: Judgment[];
  recommendedActions: string[];
  coordinationOrders: CoordOrder[];
}

export interface Judgment {
  text: string;
  confidence: number;
  confidenceLabel: 'high' | 'moderate' | 'low';
  sources: string[];
  admiralty: string;
}

export interface CoordOrder {
  module: string;
  action: string;
  status: string;
}

export interface AuditEntry {
  timestamp: string;
  actor: string;
  action: string;
  module: string;
  detail?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'location' | 'phone' | 'organization';
  cluster: 'operational' | 'logistics' | 'historical';
  entityId?: string;
  betweenness?: number;
  size?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: 'sigint' | 'financial' | 'physical' | 'historical';
  strength: 'strong' | 'weak';
  label?: string;
}

export interface FinancialAccount {
  id: string;
  entityId: string;
  institution: string;
  jurisdiction: string;
  type: 'corporate' | 'personal' | 'crypto';
  estimatedBalance: number;
  currency: string;
  status: 'monitored' | 'freeze-requested' | 'frozen' | 'flagged' | 'tracking';
  lastActivity: string;
  admiralty: string;
}

export interface WatchlistEntry {
  entityId: string;
  entityName: string;
  category: 'A' | 'B' | 'C';
  basis: string;
  authorizedBy: string;
  authRef: string;
  expires: string;
  status: 'active' | 'expired' | 'interdicted';
}

export interface TimelineEvent {
  id: string;
  date: string;
  jalaliDate: string;
  title: string;
  deaths: number;
  caseStatus: 'active' | 'prosecution-ready' | 'pending';
  commandersIdentified: number;
  victimsDocumented: number;
  evidencePackages: number;
  description?: string;
}

export interface AuthRequest {
  id: string;
  type: string;
  requestedBy: string;
  subject: string;
  subjectId?: string;
  requested: string;
  deadline: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  legalBasis?: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  type: 'MOVEMENT' | 'STRUCTURING' | 'JURISDICTIONAL' | 'CRYPTO' | 'FREEZE' | 'INVESTIGATE';
  description: string;
  amount?: string;
  entityId?: string;
  entityName?: string;
  detail?: string;
}
