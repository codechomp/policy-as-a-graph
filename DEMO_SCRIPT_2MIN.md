# 🎯 2-Minute Demo Script: Policy-as-Graph + Policy-as-Code

## Setup
- **Start at**: Architecture page (landing)
- **Total time**: 2 minutes
- **Tone**: Casual, relatable, slightly humorous

---

## Script Flow

### **[0:00 - 0:20] Architecture Overview (20 seconds)**

> "Quick context: We propose an agent-to-agent policy intelligence pipeline. Five AI agents work together—first building an enterprise knowledge graph from all our policies, then extracting requirements, pulling live config from IAM and Terraform, and finally running policy-as-code evaluation. The result? Continuous compliance with full traceability."

**Action**: Briefly point to the 5 layers on screen

**Click**: "Continue to Attestation Form" →

---

### **[0:20 - 0:45] Attestation Form - The Reality Check (25 seconds)**

> "Many of you have dealt with attestation forms like this one—where both business and tech have to self-attest that the app complies with tech standards like TECH05.01 Logging, Access Lifecycle, Authentication..."

*[Brief pause for nods/recognition]*

> "And on a normal day, we'd check these boxes, click 'Attest,' cross our fingers, and hope the audit team doesn't catch us sleeping. *[smile]* We've all been there, right?"

*[Let audience chuckle]*

> "But here's the difference: with our solution, policy is both **proactively and reactively enforced**. This demo shows reactive enforcement, but the same thing happens proactively—imagine this running against your central IAM or cloud infrastructure **right now**, catching violations before they become audit findings."

**Action**: Show form, check one box, click "Attest" →

---

### **[0:45 - 1:05] Policy-as-Graph - Related Docs (20 seconds)**

*[Results page appears]*

> "Immediately, the system evaluated 30 actual log entries. We're non-compliant—12 violations out of 30 logs."

**Click**: "Explain Non-Compliance" →

*[POA2 page loads with tabs]*

**Click**: "Related Docs Graph" tab

> "This is **Policy-as-Graph**. TECH05.01 doesn't exist in isolation—it references 12 other policies and standards. This graph shows all those relationships. No more hunting through SharePoint to understand dependencies."

**Action**: Briefly pan/zoom the graph if time permits

---

### **[1:05 - 1:25] Requirements Graph (20 seconds)**

**Click**: "Requirements Graph" tab

> "And this graph traces the **explainability chain**: from the policy document, to sections, to requirements, to controls, all the way down to specific violations. Every red node is a finding that maps back to a specific requirement. Full traceability—audit-ready instantly."

**Action**: Click a Finding node to show connection

---

### **[1:25 - 1:45] Log Analysis (20 seconds)**

**Click**: "Logs Analysis" tab

> "Here are the 12 non-compliant log entries. You can see exactly what's wrong:"
> - "Missing timezone in ISO format—6 logs"
> - "Not centralized to SIEM—4 logs"
> - "Retention policy too short—7 logs"
> - "Logs are mutable when they should be immutable"

> "These aren't generic errors. Each one points to a specific TECH05.01 requirement clause."

---

### **[1:45 - 2:00] Policy-as-Code Engine (15 seconds)**

**Click**: "Continue to Policy-as-Code" → (POA3 page)

> "This is where it all comes together. Human-readable policy requirements become **machine-executable OPA rules**. The system reads your actual config—IAM roles, Terraform state, log sources—evaluates them automatically, and generates violations with exact evidence and remediation steps."

*[Show OPA rule snippet on screen]*

> "No manual checklists. No human interpretation errors. Just continuous, automated compliance."

---

## **[2:00] Close**

> "That's the future: **Policy-as-Graph** for understanding relationships, **Policy-as-Code** for automated enforcement. Questions?"

---

## Quick Navigation Reference

```
Architecture (/)
    ↓
POD Attestation (/pod) - Check boxes, click "Attest"
    ↓
POA1 Results (/poa1) - Click "Explain Non-Compliance"
    ↓
POA2 Deep Dive (/poa2)
    - Tab: Related Docs Graph (1 liner)
    - Tab: Requirements Graph (1 liner)
    - Tab: Logs Analysis (read 1-2 violations)
    ↓
POA3 Policy-as-Code (/poa3) - Show OPA rules + violations
```

---

## Key Points to Hit

✅ **Relatable opening** - "We've all been there"
✅ **Humor** - "Hope audit doesn't catch us"
✅ **Value prop** - Proactive + Reactive enforcement
✅ **Graph advantage** - No more SharePoint hunting
✅ **Traceability** - Violation → Requirement → Evidence
✅ **Automation** - No manual checklists
✅ **Concrete numbers** - 12 violations, 30 logs, 6 missing timezone

---

## Timing Breakdown

| Segment | Time | Focus |
|---------|------|-------|
| Architecture | 0:20 | Quick context only |
| Attestation Form | 0:25 | Relatable humor + value prop |
| Policy-as-Graph (Related) | 0:20 | Dependency visualization |
| Requirements Graph | 0:20 | Explainability chain |
| Log Analysis | 0:20 | Concrete violations |
| Policy-as-Code | 0:15 | Automation magic |
| **Total** | **2:00** | |

---

## Pro Tips

1. **Pause after humor** - Let the "hope audit doesn't catch us" line land
2. **Use numbers** - "12 violations," "30 logs," "6 missing timezone" = concrete
3. **Point while talking** - Gesture to left panel (benefits) while introducing, then focus on diagram
4. **Don't read graphs** - Just show and narrate the concept
5. **Speed up at end** - OPA section can be faster since visual is self-explanatory

---

## Backup: If Running Over Time

**Cut these:**
- Architecture overview (start directly at Attestation)
- Requirements Graph detail (just mention "full traceability")
- Specific violation counts (just say "multiple violations")

**Keep these (non-negotiable):**
- Attestation form humor
- Proactive/reactive enforcement message
- Policy-as-Graph concept
- Policy-as-Code automation

---

## Punchlines to Remember

1. "We've all been there, right?" ← *Get nods*
2. "No more hunting through SharePoint" ← *Relatable pain*
3. "Full traceability—audit-ready instantly" ← *Value prop*
4. "No manual checklists, no human errors" ← *Automation win*

---

Good luck with the demo! 🚀
