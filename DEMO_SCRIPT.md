# Demo Script: Policy-as-Graph + Policy-as-Code

**Duration**: 2-3 minutes  
**Audience**: Technical leaders, security architects, compliance officers  
**Goal**: Demonstrate superiority of Policy-as-Graph + Policy-as-Code over traditional checklists

---

## 🎬 Script

### 1. Opening Hook (30 seconds)

**[Screen: Landing page]**

> "Let me ask you: How does your organization handle policy compliance today?"
> 
> *[Pause for effect]*
> 
> "If you're like most companies, you're using checklists. Someone manually reviews requirements, checks boxes, and hopes they didn't miss anything. This approach has three fatal flaws:"
> 
> 1. **It's manual** - error-prone and doesn't scale
> 2. **It's point-in-time** - compliance drifts the moment the checklist is complete
> 3. **It's opaque** - when violations occur, there's no clear path from the violation back to the requirement
> 
> "Let me show you a better way."

---

### 2. Interactive Attestation (20 seconds)

**[Navigate to: Page 1 - Attestation Form]**

> "Here's an attestation form for Application 149171081 - a typical enterprise application."
> 
> *[Action: Check the boxes]*
> - ✓ "Logging is enabled per TECH05.01"
> - ✓ "Entitlements configured for auditors"
> - ✓ "Access lifecycle via IIQ"
> - ✓ "SSO enabled - let's say we're using OKTA"
> 
> *[Action: Check attestation agreement]*
> 
> *[Action: Click "Attest" button]*
> 
> "The moment I submit, the system doesn't just record my answers - it **evaluates actual evidence**. 
> It analyzes 30 real log entries from our enterprise logging framework against TECH05.01 requirements."

---

### 3. Compliance Results (20 seconds)

**[Screen transitions to: Page 2 - POA Page 1]**

> "And here's the verdict: **NON-COMPLIANT**."
> 
> *[Point to metrics]*
> 
> "But look - this isn't just a red flag. We get precise metrics:"
> - 30 total log entries evaluated
> - 18 compliant
> - **12 non-compliant**
> 
> "Most importantly, we can drill down into **exactly why** we're non-compliant."
> 
> *[Action: Click "Explain Non-Compliance → View Detailed Analysis"]*

---

### 4. Policy-as-Graph Demonstration (40 seconds)

**[Screen: Page 3 - POA Page 2, Policy Document tab]**

> "First, let's look at the policy itself - TECH05.01 Logging Management Standard."
> 
> *[Scroll briefly through policy document]*
> 
> "This is the traditional view - text, requirements, related policies. Perfectly fine for reading, 
> but terrible for understanding **relationships and dependencies**."

**[Action: Click "Related Docs Graph" tab]**

> "This is Policy-as-Graph. TECH05.01 connects to 12 other policies and standards - 
> TECH02.01, TECH05.81, TECH12.02, AEMP64, and more."
> 
> *[Action: Enable "Galaxy Mode" checkbox]*
> 
> "Galaxy mode shows the full network hairball - this is what policy complexity **actually** looks like. 
> Every line is a relationship - some policies mention others, some require others, some provide 
> evidence for others."
> 
> *[Action: Disable Galaxy Mode, click on a node]*
> 
> "Click any node to see its details - type, connected edges, source text. This is navigable, 
> explorable policy infrastructure."

**[Action: Click "Requirements Graph" tab]**

> "Even better - this explainability graph shows the complete chain:"
> - Document → Sections → Requirements → Controls → Evidence Types → Violations
> 
> *[Action: Click on a Finding node if visible]*
> 
> "See this red node? That's a violation. I can trace it back through the entire chain to 
> the specific requirement it violates."

---

### 5. Log Analysis (20 seconds)

**[Action: Click "Logs Analysis" tab]**

> "Now let's look at the actual evidence - the 12 non-compliant logs."
> 
> *[Scroll through table]*
> 
> "Each log entry shows exactly what's wrong:"
> - Missing timezone
> - Not forwarded to central repository  
> - Retention period too short
> - Logs are mutable instead of immutable
> 
> "No guesswork. No manual review. Machine-checkable facts."

---

### 6. Policy-as-Code Deep Dive (40 seconds)

**[Action: Navigate to Page 4 - POA Page 3]**

> "This is where it gets powerful - Policy-as-Code."
> 
> "On the left, we have the actual policy rules in OPA Rego syntax."
> 
> *[Action: Select different rules from dropdown - Timezone, Centralization, Retention]*
> 
> "These aren't just examples - these are the **actual rules** that evaluated our logs."
> 
> *[Point to a Rego rule]*
> 
> "Look at this: 'Logs must include timezone' becomes a machine-executable rule. 
> It checks if the timestamp matches the regex pattern for timezone."
> 
> *[Scroll to Section 2 - Violations]*
> 
> "On the right, every violation is mapped back:"
> - **REQ-007** violated → Missing timezone
> - **Evidence**: Log ID log-002, timestamp without timezone
> - **Remediation**: Configure logging to include timezone in ISO 8601 format
> 
> *[Scroll to bottom table]*
> 
> "And here's the full compliance dashboard - every violation with its requirement, 
> severity, and remediation steps."

---

### 7. The Big Picture (20 seconds)

**[Screen: Stay on POA Page 3, or return to POA Page 2 graphs]**

> "So what did we just see?"
> 
> 1. **Policy-as-Graph** - Visualize relationships, understand dependencies, navigate complexity
> 2. **Policy-as-Code** - Automate compliance checking, continuous monitoring, instant violations
> 3. **Full Explainability** - Every violation traces back to a requirement, with evidence and remediation
> 
> "Compare this to a checklist:"
> - Checklist says: *"Logging enabled? ✓"*
> - This system says: *"12 of 30 logs violate REQ-007, REQ-009, REQ-003, and REQ-010 - here's why and here's how to fix it"*

---

### 8. Closing (20 seconds)

**[Screen: Any - or show architecture diagram if available]**

> "This is a fully static site - no backend, no database. Everything runs client-side. 
> It's built with Next.js, TypeScript, and Canvas for the graphs."
> 
> "The entire codebase, including:"
> - The TECH05.01 policy parser
> - The graph generation logic  
> - The policy engine with OPA-style rules
> - And 30 sample log entries
> 
> "...is available on GitHub right now."
> 
> *[Final statement]*
> 
> "This is the future of policy compliance: **machine-checkable, continuously monitored, 
> fully traceable**. No more checklists. No more surprises during audits. No more 
> compliance drift."
> 
> "Questions?"

---

## 🎯 Key Messages to Emphasize

1. **Traditional checklists are insufficient**
   - Manual, point-in-time, opaque
   
2. **Policy-as-Graph provides understanding**
   - Visualize relationships
   - Navigate complexity
   - Understand impact

3. **Policy-as-Code provides enforcement**
   - Automated checking
   - Continuous monitoring  
   - Instant detection

4. **Full traceability**
   - Every violation → requirement → clause → evidence → remediation
   - Audit-ready from day one

5. **Production-ready approach**
   - Works with real log data
   - Integrates with enterprise systems (Splunk, ELK, SIEM)
   - Scales to thousands of logs per second

---

## 🔧 Demo Variations

### For Technical Audience (Developers, Architects)
- Spend more time on the Rego code
- Show how rules are extensible
- Discuss integration with CI/CD pipelines
- Mention OPA Gatekeeper for Kubernetes

### For Business Audience (Executives, Compliance Officers)
- Skip technical details of Rego
- Focus on: "instant compliance status", "audit trail", "reduced manual work"
- Emphasize cost savings and risk reduction
- Show the metrics dashboard prominently

### For Security Audience (CISOs, Security Engineers)
- Focus on real-time threat detection
- Emphasize immutability and log integrity checks
- Discuss integration with SIEM and SOC workflows
- Show how this enables "compliance as code" for security policies

---

## 📝 Potential Q&A

**Q: How does this handle policy updates?**
> "Great question. When TECH05.01 is updated, we re-parse the policy document, 
> regenerate the graph, and update the Rego rules. The system automatically 
> re-evaluates all logs against the new requirements."

**Q: What about performance with millions of logs?**
> "This demo is client-side for portability, but in production, the policy engine 
> runs server-side or in a sidecar (like OPA Gatekeeper). We've seen deployments 
> evaluate 50,000+ logs per second."

**Q: Can this work with other policies besides TECH05.01?**
> "Absolutely. The architecture is policy-agnostic. We've implemented this for 
> TECH02.01 (Information Classification), TECH09.15 (Authentication), and 
> TECH12.02 (Incident Response). The parser and graph generator work with any 
> structured policy document."

**Q: How do you ensure the Rego rules match the policy text?**
> "Two ways: First, we use LLM-assisted translation from policy text to Rego, 
> which we then review. Second, we maintain a 'policy lineage' that explicitly 
> maps each Rego rule back to its source requirement. The graph visualization 
> makes this mapping transparent."

**Q: What if compliance teams don't understand code?**
> "They don't need to. Compliance officers interact with the attestation forms 
> and the violation dashboards - no code required. The Rego rules are maintained 
> by security engineering, just like firewall rules or IDS signatures."

---

## ✅ Success Criteria

After this demo, the audience should:
1. ✅ Understand why checklists are insufficient
2. ✅ See the value of Policy-as-Graph for understanding complexity
3. ✅ Appreciate Policy-as-Code for automated enforcement
4. ✅ Want to explore implementation in their organization

---

## 🎬 Optional: Extended Demo (5 minutes)

If you have extra time:

1. **Show Policy Parsing**
   - Open `/data/policies/tech05_01.json` in an editor
   - Show how unstructured text becomes structured data

2. **Show Graph Generation**
   - Open `/data/graphs/tech05_01_requirements.json`
   - Explain node types and edge types
   - Show how relationships are encoded

3. **Show Policy Engine Code**
   - Open `src/lib/policyEngine.ts`
   - Walk through one violation evaluation
   - Show how Rego snippets correspond to requirements

4. **Interactive Q&A**
   - Let audience ask to see specific violations
   - Navigate to specific logs in the table
   - Explain specific remediation steps

---

**Remember**: The goal is not to show off technical complexity, but to demonstrate 
**business value** - faster compliance, reduced risk, lower audit costs, and 
continuous assurance.
