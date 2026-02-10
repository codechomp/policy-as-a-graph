export interface PolicyDocument {
  id: string;
  name: string;
  organization: string;
  type: string;
  version: string;
  statement: string;
  scope: string;
  responsibility: string;
  exceptionCriteria: string;
  adoptionDate: string;
  adoptionSchedule: string;
  sections: Section[];
  relatedPolicies: string[];
  relatedDocuments: string[];
  logSources: string[];
  eventTypes: string[];
  requiredAttributes: string[];
}

export interface Section {
  id: string;
  name: string;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  text: string;
  category: string;
  mandatory: boolean;
  standards: string[];
  controls?: string[];
}

export interface GraphNode {
  id: string;
  type: string;
  label: string;
  props: Record<string, any>;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: string;
  label?: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  eventType: string;
  identity?: string;
  sourceId?: string;
  severity?: string;
  outcome?: string;
  sessionId?: string;
  centralForwarding: boolean;
  retentionDays: number;
  immutable: boolean;
  hasTimezone: boolean;
  compliant: boolean;
  violations?: string[];
}

export interface Violation {
  policyId: string;
  requirementId: string;
  title: string;
  clauseText: string;
  reason: string;
  evidence: string[];
  remediation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ComplianceResult {
  overall: 'COMPLIANT' | 'NON-COMPLIANT';
  violations: Violation[];
  compliantCount: number;
  nonCompliantCount: number;
  totalChecks: number;
}

export interface AttestationForm {
  applicationId: string;
  attestations: {
    loggingEnabled: boolean;
    entitlementsConfigured: boolean;
    accessLifecycle: boolean;
    ssoEnabled: boolean;
    ssoProvider: 'okta' | 'authblue' | 'activedirectory';
  };
}
