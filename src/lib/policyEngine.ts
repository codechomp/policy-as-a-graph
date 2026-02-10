import { LogEntry, Violation, ComplianceResult, AttestationForm } from '@/types';

export class PolicyEngine {
  evaluateCompliance(
    logs: LogEntry[],
    attestation?: AttestationForm
  ): ComplianceResult {
    const violations: Violation[] = [];
    
    // Evaluate each log entry
    logs.forEach(log => {
      if (!log.compliant && log.violations) {
        log.violations.forEach(violationType => {
          violations.push(this.createViolation(log, violationType));
        });
      }
    });

    const totalChecks = logs.length;
    const nonCompliantCount = logs.filter(l => !l.compliant).length;
    const compliantCount = totalChecks - nonCompliantCount;

    return {
      overall: violations.length > 0 ? 'NON-COMPLIANT' : 'COMPLIANT',
      violations,
      compliantCount,
      nonCompliantCount,
      totalChecks
    };
  }

  private createViolation(log: LogEntry, violationType: string): Violation {
    const violationMap: Record<string, Omit<Violation, 'evidence'>> = {
      'missing-timezone': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-007',
        title: 'Missing Timezone in Timestamp',
        clauseText: 'Logs must include an accurate timestamp with time zone identification that enables automated processing.',
        reason: 'Log entry does not contain timezone information in timestamp',
        remediation: 'Configure logging system to include timezone (preferably UTC) in all timestamps. Format: ISO 8601 with timezone (e.g., 2026-02-11T14:23:45Z or 2026-02-11T14:23:45+00:00)',
        severity: 'high'
      },
      'not-centralized': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-009',
        title: 'Logs Not Forwarded to Central Repository',
        clauseText: 'Logs must be forwarded to a central repository.',
        reason: 'Log entry is not being forwarded to the centralized logging system',
        remediation: 'Configure log forwarding to enterprise logging framework (e.g., Splunk, ELK Stack). Ensure log shipping agents are installed and configured.',
        severity: 'high'
      },
      'retention-too-short': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-003',
        title: 'Retention Period Below 12 Months',
        clauseText: 'Security and Audit Logs must be forwarded to a centralized repository and retained for at least 12 months, with a minimum of 3 months online.',
        reason: `Log retention period (${log.retentionDays} days) is less than the required 365 days (12 months)`,
        remediation: 'Update retention policy to retain logs for at least 12 months (365 days) with minimum 3 months online. Configure archival for offline storage after 3 months.',
        severity: 'medium'
      },
      'logs-mutable': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-010',
        title: 'Logs Can Be Modified or Deleted',
        clauseText: 'Logs must be protected from unauthorized modification or deletion.',
        reason: 'Log entries are not protected with immutability controls',
        remediation: 'Enable write-once-read-many (WORM) storage, implement log signing, or use immutable storage backends. Restrict write/delete permissions to logging system only.',
        severity: 'high'
      },
      'missing-identity': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-013',
        title: 'Missing Required Attribute: Identity',
        clauseText: 'Event records must include: Identity or credential information (E-Mail, domain, username, account, device, group, role, key)',
        reason: 'Log entry is missing identity or credential information',
        remediation: 'Configure logging to capture identity information (user, service account, API key, etc.) for all events. Ensure authentication context is preserved.',
        severity: 'medium'
      },
      'missing-source-id': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-013',
        title: 'Missing Required Attribute: Source Identifier',
        clauseText: 'Event records must include: Unique Source Identifier (hostname, Internet Protocol (IP), instance ID)',
        reason: 'Log entry is missing unique source identifier',
        remediation: 'Configure logging to include source identifier (hostname, IP address, instance ID, or container ID). Ensure source context is captured.',
        severity: 'medium'
      },
      'missing-session-id': {
        policyId: 'TECH05.01',
        requirementId: 'REQ-013',
        title: 'Missing Required Attribute: Session/Transaction ID',
        clauseText: 'Event records must include: Unique session or transaction identifier',
        reason: 'Log entry is missing unique session or transaction identifier',
        remediation: 'Implement session tracking and include session/transaction IDs in all log entries. Use correlation IDs for distributed tracing.',
        severity: 'medium'
      }
    };

    const violationTemplate = violationMap[violationType] || {
      policyId: 'TECH05.01',
      requirementId: 'UNKNOWN',
      title: 'Unknown Violation',
      clauseText: 'Unknown requirement',
      reason: violationType,
      remediation: 'Review policy requirements',
      severity: 'medium' as const
    };

    return {
      ...violationTemplate,
      evidence: [
        `Log ID: ${log.id}`,
        `Timestamp: ${log.timestamp}`,
        `Event Type: ${log.eventType}`,
        `Source: ${log.sourceId || 'N/A'}`,
        `Identity: ${log.identity || 'N/A'}`
      ]
    };
  }

  // OPA-style rule evaluation
  evaluateRegoRules(logs: LogEntry[]): { [rule: string]: boolean } {
    return {
      'all_logs_have_timezone': logs.every(l => l.hasTimezone),
      'all_logs_centralized': logs.every(l => l.centralForwarding),
      'all_logs_retention_12months': logs.every(l => l.retentionDays >= 365),
      'all_logs_immutable': logs.every(l => l.immutable),
      'all_logs_have_required_attributes': logs.every(l => 
        l.identity && l.sourceId && l.sessionId
      )
    };
  }
}

export const regoSnippets = {
  timezone_check: `package tech05_01.timezone

default has_timezone = false

# Rule: All logs must have timezone in timestamp
has_timezone {
    input.timestamp
    regex.match("(Z|[+-]\\d{2}:\\d{2})$", input.timestamp)
}

# Violation when timezone is missing
violation[{"msg": msg, "requirement": "REQ-007"}] {
    not has_timezone
    msg := sprintf("Log entry %v missing timezone in timestamp", [input.id])
}`,

  centralization_check: `package tech05_01.centralization

default centralized = false

# Rule: Logs must be forwarded to central repository
centralized {
    input.centralForwarding == true
}

# Violation when not centralized
violation[{"msg": msg, "requirement": "REQ-009"}] {
    not centralized
    msg := sprintf("Log entry %v not forwarded to central repository", [input.id])
}`,

  retention_check: `package tech05_01.retention

default retention_compliant = false

# Rule: Security logs must be retained for at least 12 months
retention_compliant {
    input.retentionDays >= 365
}

# Violation when retention period is too short
violation[{"msg": msg, "requirement": "REQ-003"}] {
    not retention_compliant
    msg := sprintf("Log entry %v retention period (%v days) < 365 days", 
                   [input.id, input.retentionDays])
}`,

  immutability_check: `package tech05_01.immutability

default immutable = false

# Rule: Logs must be protected from modification/deletion
immutable {
    input.immutable == true
}

# Violation when logs are mutable
violation[{"msg": msg, "requirement": "REQ-010"}] {
    not immutable
    msg := sprintf("Log entry %v is not immutable", [input.id])
}`,

  attributes_check: `package tech05_01.attributes

default has_required_attributes = false

# Rule: Logs must have required attributes
has_required_attributes {
    input.identity
    input.sourceId
    input.severity
    input.outcome
    input.sessionId
}

# Violation when required attributes are missing
violation[{"msg": msg, "requirement": "REQ-013"}] {
    not has_required_attributes
    missing := missing_attributes
    msg := sprintf("Log entry %v missing required attributes: %v", 
                   [input.id, missing])
}

missing_attributes[attr] {
    not input.identity
    attr := "identity"
}

missing_attributes[attr] {
    not input.sourceId
    attr := "sourceId"
}

missing_attributes[attr] {
    not input.sessionId
    attr := "sessionId"
}`
};
