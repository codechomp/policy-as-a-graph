# Using Policy Graph with CustomGPT

## Overview

You can upload the graph JSON files to a CustomGPT to enable natural language queries about policy relationships, requirements, and compliance.

## Files to Upload

1. **Requirements Graph**: `/data/graphs/tech05_01_requirements.json`
   - Contains: Document → Sections → Requirements → Controls → Evidence → Violations
   - Best for: "What requirements does TECH05.01 have?", "Show me violations for REQ-007"

2. **Related Docs Graph**: `/data/graphs/tech05_01_related.json`
   - Contains: TECH05.01 → Related Policies → Standards → Documents
   - Best for: "What policies are related to TECH05.01?", "Show dependencies"

3. **Policy Document**: `/data/policies/tech05_01.json`
   - Contains: Full policy text, requirements, metadata
   - Best for: "Explain REQ-003", "What are retention requirements?"

4. **Sample Logs**: `/data/logs/sample.json`
   - Contains: 30 log entries with compliance status
   - Best for: "Show non-compliant logs", "Why is log-002 failing?"

## Example Queries for CustomGPT

### Policy Structure Queries
```
Q: What are all the sections in TECH05.01?
A: TECH05.01 has 7 sections: General Requirements, Classification, Retention, 
   Monitoring and Reporting, Time and Zones, Security and Audit Log Requirements, 
   and Event Record Attributes.

Q: Show me the relationship between REQ-007 and violations
A: REQ-007 (Timestamp with Timezone) is violated by finding:no-timezone. 
   6 logs violate this requirement: log-002, log-008, log-011, log-015, 
   log-020, log-023.

Q: What controls does REQ-003 require?
A: REQ-003 requires 2 controls: ctrl:central-repo (Centralized Logging Repository) 
   and ctrl:retention-12m (12 Month Retention).
```

### Relationship Queries
```
Q: What policies does TECH05.01 relate to?
A: TECH05.01 relates to 8 policies: TECH05 (Architecture), TECH02.01 (Information 
   Management), TECH05.81 (Infrastructure Core Config), TECH08.01 (Physical Access), 
   TECH12.02 (Incident Response), AEMP08 (Record Risk), AEMP64 (InfoSec Management), 
   AEMP70 (Enterprise Data Management).

Q: Show me the dependency chain from TECH05.01 to findings
A: TECH05.01 → has_section → Retention → has_requirement → REQ-003 → violated_by 
   → finding:short-retention
```

### Compliance Queries
```
Q: How many logs are non-compliant and why?
A: 12 of 30 logs are non-compliant. Breakdown:
   - 6 logs: missing timezone
   - 4 logs: not centralized
   - 7 logs: retention < 12 months
   - 4 logs: logs mutable
   - 8 logs: missing required attributes

Q: What needs to be fixed for log-008 to be compliant?
A: Log log-008 has 4 violations:
   1. Add timezone to timestamp (REQ-007)
   2. Enable central forwarding (REQ-009)
   3. Increase retention from 180 to 365 days (REQ-003)
   4. Add required attributes: identity, sourceId, sessionId (REQ-013)
```

### Graph Navigation Queries
```
Q: What are all the node types in the requirements graph?
A: 11 node types: Document, Section, Requirement, Control, EvidenceType, 
   Finding, Policy, Standard, RegulatoryGuideline, SupportingDoc, Identifier

Q: Show me all edges from REQ-007
A: REQ-007 has 3 outgoing edges:
   - requires → ctrl:timezone
   - evidenced_by → evid:log-records
   - violated_by → finding:no-timezone
```

## CustomGPT Instructions

Add this to your CustomGPT instructions:

```
You are a Policy Compliance Expert. You have access to TECH05.01 Logging Management 
Standard and its associated graphs.

When answering questions:
1. Always cite specific requirement IDs (e.g., REQ-007)
2. Show the full relationship chain when explaining connections
3. Use the graph structure to trace dependencies
4. Provide remediation guidance for violations
5. Format responses with clear sections and bullet points

Graph Structure:
- Node types: Document, Section, Requirement, Control, EvidenceType, Finding, etc.
- Edge types: has_section, has_requirement, requires, evidenced_by, violated_by, 
  relate_to, mention, supported_by

When asked about compliance:
- Reference specific log IDs
- Explain which requirements are violated
- Provide clear remediation steps
- Show the policy clause that is violated
```

## Sample Conversation Flow

**User**: "Why is my logging non-compliant?"

**GPT**: "Based on analysis of 30 log entries against TECH05.01, 12 logs are 
non-compliant. The main issues are:

1. **Missing Timezone** (REQ-007) - 6 logs
   - Affected: log-002, log-008, log-011, log-015, log-020, log-023
   - Fix: Configure logging to include timezone in ISO 8601 format

2. **Not Centralized** (REQ-009) - 4 logs
   - Affected: log-003, log-008, log-013, log-017
   - Fix: Enable log forwarding to central SIEM (Splunk/ELK)

3. **Retention Too Short** (REQ-003) - 7 logs
   - Affected: log-004, log-008, log-013, log-015, log-017, log-020, log-023
   - Fix: Update retention policy to >= 365 days

Would you like detailed remediation steps for a specific requirement?"

---

**User**: "Show me the graph path from TECH05.01 to missing timezone violation"

**GPT**: "Here's the complete path:

```
TECH05.01 (Document)
  └─[has_section]→ Time and Zones (Section)
      └─[has_requirement]→ REQ-007: Timestamp with Timezone (Requirement)
          ├─[requires]→ ctrl:timezone (Control)
          ├─[evidenced_by]→ evid:log-records (EvidenceType)
          └─[violated_by]→ finding:no-timezone (Finding)
              └─ Affects 6 logs: log-002, log-008, log-011, log-015, log-020, log-023
```

**Requirement Text**: "Logs must include an accurate timestamp with time zone 
identification that enables automated processing."

**Violation Reason**: Log entries do not contain timezone information in timestamp.

**Remediation**: Configure logging system to include timezone (preferably UTC) in 
all timestamps. Format: ISO 8601 with timezone (e.g., 2026-02-11T14:23:45Z)"

## Advanced Queries

### Multi-Hop Reasoning
```
Q: If I fix centralized logging, how many logs become compliant?
A: Fixing centralized logging (REQ-009) would resolve violations for 4 logs: 
   log-003, log-008, log-013, log-017. However:
   - log-008 has 3 additional violations (timezone, retention, attributes)
   - log-013 has 1 additional violation (retention)
   - log-017 has 2 additional violations (retention, identity)
   Only log-003 would become fully compliant by fixing centralization alone.
```

### Cross-Policy Reasoning
```
Q: Does TECH02.01 impact TECH05.01 compliance?
A: Yes. REQ-002 states: "Logs must be classified per the Information Security (IS) 
   Information Management Standard (TECH02.01) and secured based upon their content."
   
   This creates a dependency: TECH05.01 → supported_by → TECH02.01
   
   If logs contain sensitive data per TECH02.01 classification, they require 
   additional security controls beyond basic TECH05.01 requirements.
```

## Export for GPT Knowledge

You can also create a combined knowledge file:

```bash
# Combine all data into one file for GPT
cd /sessions/amazing-gallant-shannon/mnt/shark-policyasagraph
cat > gpt_knowledge.json << 'GPTKB'
{
  "policy": $(cat data/policies/tech05_01.json),
  "requirements_graph": $(cat data/graphs/tech05_01_requirements.json),
  "related_graph": $(cat data/graphs/tech05_01_related.json),
  "sample_logs": $(cat data/logs/sample.json)
}
GPTKB
```

## Query Performance Tips

1. **Specific over general**: "Show violations for REQ-007" > "Show all violations"
2. **Use IDs**: Reference req:007, log-002, ctrl:timezone for precision
3. **Request structure**: Ask for "path from X to Y" for graph traversal
4. **Scope queries**: "In requirements graph..." vs "In related docs graph..."
