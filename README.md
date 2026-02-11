# Policy-as-Graph + Policy-as-Code Demo

A static site demonstrating how **Policy-as-Graph** and **Policy-as-Code** approaches are far more effective than traditional checklists for policy compliance and enforcement.

## 🎯 What This Demonstrates

This prototype showcases three innovative approaches to policy compliance:

### 1. **Policy-as-Graph**
- Visualizes policy relationships as an interactive network graph
- Shows connections between policies, standards, requirements, controls, and violations
- Enables quick navigation and understanding of policy dependencies
- Provides two graph views:
  - **Related Documents Graph**: Shows TECH05.01 and all related policies/standards
  - **Requirements Graph**: Shows explainability chain from requirements to violations

### 2. **Policy-as-Code**
- Translates policy requirements into machine-executable OPA/Rego rules
- Enables automated compliance checking without manual review
- Provides real-time violation detection with detailed remediation guidance
- Shows exact mapping from violations back to policy requirements

### 3. **Intelligent Attestation**
- Interactive attestation form with automatic compliance evaluation
- Analyzes actual log data against TECH05.01 requirements
- Provides clear compliance status with detailed violation breakdown
- Offers drill-down capabilities for root cause analysis

## 📋 Features

- ✅ **4 Interactive Pages** following the exact UX design
- ✅ **Real Policy Parsing** from TECH05.01 Logging Management Standard
- ✅ **Interactive Graph Visualizations** with zoom, pan, filter, and node selection
- ✅ **Galaxy Mode** for full network visualization
- ✅ **Policy Engine** with OPA/Rego-style rules
- ✅ **30 Sample Logs** with 12 non-compliant entries
- ✅ **Detailed Violation Analysis** mapped to specific requirements
- ✅ **Static Site** deployable to GitHub Pages (no backend required)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ATTESTATION                         │
│                (POD Page - Attestation Form)                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               POLICY PARSING LAYER                          │
│  • Extracts requirements from TECH05.01                     │
│  • Structures into JSON (metadata, sections, requirements)  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              POLICY-AS-GRAPH LAYER                          │
│  • Related Docs Graph (relate_to, mention, hyperlink_to)   │
│  • Requirements Graph (has_section, requires, evidenced_by) │
│  • Interactive visualization with filters                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│             POLICY-AS-CODE LAYER                            │
│  • OPA/Rego rules for each requirement                      │
│  • Evaluates log data against policies                      │
│  • Generates violations with remediation                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                FINDINGS & REMEDIATION                       │
│  • Detailed violation analysis                              │
│  • Logstash-style interface                                 │
│  • Requirement-to-evidence mapping                          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for GitHub Pages

```bash
# Create static export
npm run build

# Output will be in 'out/' directory
# Deploy the 'out/' directory to GitHub Pages
```

### 🔧 Build Issues?

If `npm run build` fails on your machine (but works on another), use the fix scripts:

```bash
# First, diagnose the issue
./diagnose.sh

# Then run the fix
./fix-build.sh
```

**Common issues:**
- Different Node.js versions between machines
- Corrupted `node_modules` directory
- Old build cache in `.next` directory
- `NODE_ENV` variable set incorrectly

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

## 📁 Project Structure

```
.
├── data/
│   ├── policies/
│   │   └── tech05_01.json          # Structured policy document
│   ├── graphs/
│   │   ├── tech05_01_related.json   # Related docs graph
│   │   └── tech05_01_requirements.json  # Requirements graph
│   └── logs/
│       └── sample.json              # Sample log data (30 entries)
├── src/
│   ├── pages/
│   │   ├── index.tsx                # Page 1: POD Attestation Form
│   │   ├── poa1.tsx                 # Page 2: POA Page 1 (Results)
│   │   ├── poa2.tsx                 # Page 3: POA Page 2 (Deep Dive)
│   │   └── poa3.tsx                 # Page 4: POA Page 3 (Policy-as-Code)
│   ├── components/
│   │   └── GraphViewer.tsx          # Interactive graph component
│   ├── lib/
│   │   └── policyEngine.ts          # Policy evaluation engine
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── styles/
│       └── globals.css              # Global styles
├── next.config.js                   # Next.js config for static export
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies
```

## 📖 Usage Guide

### Page 1: POD Attestation Form
1. Review the application ID (default: 149171081)
2. Check applicable attestations:
   - Logging enabled per TECH05.01
   - Entitlements configured
   - Access lifecycle management
   - SSO enabled (select provider: OKTA/AuthBlue/ActiveDirectory)
3. Check the attestation agreement
4. Click **Attest** to submit

### Page 2: POA Page 1 (Compliance Result)
- Displays compliance status: **COMPLIANT** or **NON-COMPLIANT**
- Shows metrics: Total Checks, Compliant Count, Non-Compliant Count
- If non-compliant, provides **"Explain Non-Compliance"** button
- Click to navigate to detailed analysis

### Page 3: POA Page 2 (Deep Dive Analysis)
Navigate through 5 tabs:

1. **📄 Policy Document**: Full TECH05.01 with all requirements
2. **🔗 Related Docs Graph**: Interactive network of related policies
   - Toggle Galaxy Mode for full hairball view
   - Filter node types (Document, Standard, Policy, etc.)
   - Click nodes to see details
3. **📊 Requirements Graph**: Explainability chain
   - Shows Document → Section → Requirement → Control → Evidence → Violations
4. **📝 Logs Analysis**: Non-compliant log entries in table view
5. **🔍 Findings**: Logstash-style violations with full details

### Page 4: POA Page 3 (Policy-as-Code Showcase)
- **Section 1**: View OPA/Rego policy snippets
  - Select different rules (Timezone, Centralization, Retention, etc.)
  - See actual policy code used for evaluation
- **Section 2**: Live violations mapped to requirements
  - Each violation shows: Requirement ID, Reason, Evidence, Remediation
- **Detailed Analysis Table**: All violations in tabular format

## 🎬 Demo Script (2-3 Minutes)

### Opening (30 seconds)
> "Traditional policy compliance uses checklists - manual, error-prone, and impossible to audit at scale. 
> Let me show you a better approach: Policy-as-Graph + Policy-as-Code."

### Demo Flow (2 minutes)

**1. Attestation (20 seconds)**
- "Here's an attestation form for Application 149171081"
- "I'll check that logging is enabled per TECH05.01"
- *Check boxes and click Attest*
- "Immediately, the system evaluates 30 actual log entries"

**2. Compliance Result (20 seconds)**
- "We see NON-COMPLIANT status with 12 violations out of 30 logs"
- "Not just a red flag - we get exact counts and can drill down"
- *Click "Explain Non-Compliance"*

**3. Policy-as-Graph (30 seconds)**
- "This graph shows TECH05.01 and all 12 related policies/standards"
- *Click Related Docs Graph tab, enable Galaxy Mode*
- "Galaxy mode shows the full network - this is policy complexity visualized"
- *Click Requirements Graph tab*
- "This explainability graph traces requirements → controls → violations"
- *Click a Finding node*
- "Each violation maps back to specific requirements"

**4. Log Analysis (20 seconds)**
- *Click Logs Analysis tab*
- "Here are the 12 non-compliant logs with specific violation types"
- "Missing timezone, not centralized, retention too short, logs mutable"

**5. Policy-as-Code (30 seconds)**
- *Navigate to POA Page 3*
- "This is where Policy-as-Code shines"
- "Human-readable TECH05.01 requirements → machine-executable OPA rules"
- *Select different rules from dropdown*
- "Each rule automatically checks logs and generates violations"
- *Scroll to violations*
- "Every violation shows: requirement ID, evidence, and exact remediation steps"

### Closing (20 seconds)
> "This is the future of policy compliance:
> - **Policy-as-Graph** for understanding relationships and impact
> - **Policy-as-Code** for automated, continuous compliance
> - No more manual checklists. No more surprises during audits.
> All code and data available on GitHub - fully static, runs entirely client-side."

## 🔧 Technical Details

### Graph Implementation
- Canvas-based rendering for performance
- Force-directed layout with circular initialization
- Configurable filters by node type
- Click-to-select node details
- Galaxy mode for full network visualization

### Policy Engine
- Evaluates log entries against 5 core requirements:
  - REQ-007: Timezone in timestamps
  - REQ-009: Centralized log forwarding
  - REQ-003: 12-month retention policy
  - REQ-010: Immutable logs
  - REQ-013: Required attributes (identity, source ID, session ID)
- Generates detailed violations with:
  - Policy ID and Requirement ID
  - Clause text from original policy
  - Reason for violation
  - Evidence (specific log details)
  - Remediation guidance
  - Severity (low/medium/high/critical)

### Graph Relationships
Implemented exactly as specified:
- `relate_to`: Document to related policies/standards
- `hyperlink_to`: Document to URLs and emails
- `mention`: Document to mentioned identifiers
- `mention_in_context`: Section/Requirement to specific standards
- `maps_to`: Policy ID to Standard ID
- `has_section`: Document to sections
- `has_requirement`: Section to requirements
- `requires`: Requirement to controls
- `evidenced_by`: Requirement to evidence types
- `violated_by`: Requirement to findings
- `supported_by`: Requirement to supporting standards

## 📊 Sample Data

### Logs
- **Total**: 30 log entries
- **Compliant**: 18 entries
- **Non-Compliant**: 12 entries

### Violation Types
- Missing timezone: 6 entries
- Not centralized: 4 entries
- Retention too short: 7 entries
- Logs mutable: 4 entries
- Missing required attributes: 8 entries

## 🎨 Design Notes

- Clean enterprise UI (no fancy animations)
- Responsive layout
- Professional color scheme
- Easy navigation between pages
- Clear visual hierarchy
- Accessibility considerations

## 📝 Future Enhancements

- Real-time log ingestion via WebSocket
- Integration with actual SIEM systems (Splunk, ELK)
- Support for more TECH standards (TECH09.15, TECH02.01, etc.)
- Export compliance reports as PDF
- Historical trending of compliance metrics
- Multi-policy evaluation (evaluate against 10+ policies simultaneously)

## 🤝 Contributing

This is a demo prototype. For production use:
1. Replace sample data with actual log sources
2. Integrate with enterprise policy management systems
3. Add authentication and authorization
4. Implement audit logging
5. Add unit and integration tests

## 📄 License

MIT License - Feel free to use this as a template for your policy compliance systems.

---

Built with ❤️ using Next.js, TypeScript, and Canvas API
