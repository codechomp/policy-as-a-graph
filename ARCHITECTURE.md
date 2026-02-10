# Architecture Documentation

## System Overview

This is a **fully static site generator (SSG)** implementation demonstrating Policy-as-Graph and Policy-as-Code approaches for enterprise policy compliance. Built with Next.js 14 with static export, it runs entirely client-side with no backend dependencies.

## Design Principles

1. **Client-Side Only**: All processing happens in the browser
2. **Data-Driven**: Policy, graphs, and logs are JSON files
3. **Type-Safe**: Full TypeScript coverage
4. **Portable**: Deploy anywhere static files are served
5. **Auditable**: All policy decisions are traceable

## Architecture Layers

### Layer 1: Data Layer

**Location**: `/data/**/*.json`

All data is pre-processed and stored as JSON:

```
data/
├── policies/
│   └── tech05_01.json          # Structured policy document
├── graphs/
│   ├── tech05_01_related.json   # Policy relationship graph
│   └── tech05_01_requirements.json  # Requirements explainability graph
└── logs/
    └── sample.json              # Sample log entries with violations
```

**Key Structures**:

- **Policy Document**: Sections, Requirements, Controls, Standards
- **Graph**: Nodes (typed), Edges (with relationship semantics)
- **Logs**: Structured log entries with compliance flags

### Layer 2: Type System

**Location**: `/src/types/index.ts`

TypeScript interfaces ensure type safety across all layers:

- `PolicyDocument`: Policy structure
- `Section`, `Requirement`: Policy components
- `GraphNode`, `GraphEdge`, `Graph`: Graph structures
- `LogEntry`: Log structure with compliance metadata
- `Violation`: Violation with evidence and remediation
- `ComplianceResult`: Overall compliance assessment
- `AttestationForm`: User input form data

### Layer 3: Business Logic

**Location**: `/src/lib/policyEngine.ts`

The **PolicyEngine** class implements the core compliance evaluation:

```typescript
class PolicyEngine {
  // Main evaluation function
  evaluateCompliance(logs, attestation): ComplianceResult
  
  // Creates violation objects with full context
  private createViolation(log, violationType): Violation
  
  // OPA-style rule evaluation
  evaluateRegoRules(logs): { [rule: string]: boolean }
}
```

**Policy Rules** (Rego-style):

Each requirement is translated to a rule:
- `timezone_check`: REQ-007 (Timestamp with timezone)
- `centralization_check`: REQ-009 (Central repository)
- `retention_check`: REQ-003 (12-month retention)
- `immutability_check`: REQ-010 (Log immutability)
- `attributes_check`: REQ-013 (Required attributes)

**Violation Mapping**:

Each violation includes:
- Policy ID & Requirement ID
- Clause text from policy
- Reason (human-readable explanation)
- Evidence (specific log details)
- Remediation (actionable fix)
- Severity (low/medium/high/critical)

### Layer 4: UI Components

**Location**: `/src/components/`

Custom components for specialized visualization:

**GraphViewer** (`GraphViewer.tsx`):
- Canvas-based graph rendering
- Force-directed layout
- Interactive node selection
- Type-based filtering
- Galaxy mode for full network view

**Features**:
- Click nodes to see details
- Filter by node type
- Toggle galaxy mode
- Zoom/pan (via browser controls)

### Layer 5: Pages (Routes)

**Location**: `/src/pages/`

Four main pages implementing the UX flow:

#### Page 1: POD Attestation Form (`index.tsx`)
- User input for attestations
- Form validation
- Stores attestation in localStorage
- Navigates to POA1 on submit

#### Page 2: POA Page 1 (`poa1.tsx`)
- Displays attestation data (read-only)
- Shows compliance result from PolicyEngine
- Highlights non-compliant items
- Provides link to deep dive (POA2)

#### Page 3: POA Page 2 (`poa2.tsx`)
- 5 tabs for comprehensive analysis:
  1. **Policy Document**: Full TECH05.01 text and requirements
  2. **Related Docs Graph**: Network of related policies/standards
  3. **Requirements Graph**: Explainability chain
  4. **Logs Analysis**: Table of non-compliant logs
  5. **Findings**: Logstash-style violation cards

#### Page 4: POA Page 3 (`poa3.tsx`)
- Policy-as-Code showcase
- OPA/Rego rule snippets (selectable)
- Live violation mapping
- Detailed remediation guidance
- Comprehensive violations table

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. USER ATTESTATION                                     │
│    - User fills form on index.tsx                       │
│    - Attestation stored in localStorage                 │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 2. POLICY ENGINE EVALUATION                             │
│    - PolicyEngine.evaluateCompliance() called           │
│    - Loads logs from sample.json                        │
│    - Evaluates each log against rules                   │
│    - Generates violations with full context             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 3. COMPLIANCE RESULT                                    │
│    - ComplianceResult stored in localStorage            │
│    - Displayed on poa1.tsx                              │
│    - Overall: COMPLIANT | NON-COMPLIANT                 │
│    - Counts: total, compliant, non-compliant            │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 4. DEEP DIVE ANALYSIS                                   │
│    - poa2.tsx loads policy & graph data                 │
│    - GraphViewer renders interactive graphs             │
│    - Tables show non-compliant logs                     │
│    - Violation cards show detailed findings             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 5. POLICY-AS-CODE VIEW                                  │
│    - poa3.tsx displays Rego snippets                    │
│    - Maps violations to rules                           │
│    - Shows remediation guidance                         │
└─────────────────────────────────────────────────────────┘
```

## Graph Semantics

### Node Types

| Type | Description | Example |
|------|-------------|---------|
| Document | Top-level policy document | TECH05.01 |
| Section | Major section within document | "Retention" |
| Requirement | Specific requirement | REQ-007 |
| Control | Technical control | "Timezone in timestamps" |
| EvidenceType | Type of evidence | Log Records |
| Finding | Compliance violation | Missing timezone |
| Policy | Referenced policy | AEMP64 |
| Standard | Technical standard | TECH02.01 |
| RegulatoryGuideline | External regulation | PCI DSS |
| SupportingDoc | Support document | IT Product Registry |
| Identifier | Tool/system name | Splunk |

### Edge Types (Relationships)

| Type | From → To | Meaning | Example |
|------|-----------|---------|---------|
| **relate_to** | Document → Policy/Standard/Doc | Listed in "Related Content" | TECH05.01 → TECH02.01 |
| **hyperlink_to** | Document → URL/Email | Contains hyperlink | TECH05.01 → policy@amex.com |
| **mention** | Document → Identifier/Standard | Mentioned in text | TECH05.01 → Splunk |
| **mention_in_context** | Section/Req → Standard | Mentioned in specific context | Classification → TECH02.01 |
| **maps_to** | Policy → Standard | Explicit mapping | AEMP64 → TECH05.01 |
| **has_section** | Document → Section | Contains section | TECH05.01 → Retention |
| **has_requirement** | Section → Requirement | Contains requirement | Retention → REQ-003 |
| **requires** | Requirement → Control | Mandates control | REQ-007 → Timezone control |
| **evidenced_by** | Requirement → EvidenceType | Proven by evidence | REQ-007 → Log Records |
| **violated_by** | Requirement → Finding | Has violation | REQ-007 → Missing timezone |
| **supported_by** | Requirement → Standard | References standard | REQ-002 → TECH02.01 |

## Policy Parsing Strategy

**Input**: Unstructured policy text (PDF transcription)

**Process**:
1. **Metadata Extraction**: ID, name, version, dates
2. **Section Identification**: Headers become sections
3. **Requirement Extraction**: Bullet points become requirements
4. **Standard References**: Regex matching for TECH##.## patterns
5. **Control Mapping**: Keywords map to controls (e.g., "centralized" → central-repo control)
6. **Attribute Extraction**: Required attributes, log sources, event types

**Output**: Structured JSON (`tech05_01.json`)

## Policy Engine Evaluation

**Input**: 
- Log entries with metadata
- Policy requirements

**Process** (per log):
1. Check timezone format (REQ-007)
2. Check central forwarding flag (REQ-009)
3. Check retention days >= 365 (REQ-003)
4. Check immutability flag (REQ-010)
5. Check required attributes present (REQ-013)

**Output**:
- `compliant: true/false` per log
- `violations: []` list of violation types
- Aggregated `ComplianceResult`

## Graph Generation

### Related Docs Graph
**Nodes**: Document + all related policies/standards/docs
**Edges**: relate_to, mention, hyperlink_to based on parsing

### Requirements Graph
**Nodes**: Document → Sections → Requirements → Controls → Evidence → Findings
**Edges**: has_section, has_requirement, requires, evidenced_by, violated_by

**Layout**: Force-directed with circular initialization

## State Management

Uses **localStorage** for client-side state:

```javascript
// Stored keys
localStorage.setItem('attestation', JSON.stringify(formData))
localStorage.setItem('complianceResult', JSON.stringify(result))

// Retrieved on page load
const attestation = JSON.parse(localStorage.getItem('attestation'))
const result = JSON.parse(localStorage.getItem('complianceResult'))
```

**Why localStorage?**
- No backend needed
- Persists across page navigation
- Simple API
- Sufficient for demo purposes

**Production Alternative**: 
- Server-side session
- Database storage
- API integration

## Styling Strategy

**Approach**: Vanilla CSS with utility classes

**File**: `src/styles/globals.css`

**Key Classes**:
- `.container`: Max-width container
- `.card`: White box with shadow
- `.button`, `.button-secondary`, `.button-danger`: Button variants
- `.badge-*`: Status badges
- `.table`: Data table
- `.code-block`: Syntax-highlighted code
- `.violation-card`: Violation display

**Design System**:
- Colors: Blue theme (#2c5282) for primary, red for errors, green for success
- Typography: System fonts, 14-16px base
- Spacing: 8px grid
- Responsive: Grid layouts with media queries

## Build & Deployment

### Development
```bash
npm run dev  # Runs on localhost:3000
```

### Production Build
```bash
npm run build  # Creates /out directory
```

**Output**: Static HTML, CSS, JS, and JSON files in `/out`

### Deployment Options
1. **GitHub Pages**: Upload `/out` to `gh-pages` branch
2. **Netlify**: Connect repo, auto-deploy on push
3. **Vercel**: Import repo, auto-deploy
4. **Any static host**: Upload `/out` directory

### Configuration

**next.config.js**:
```javascript
{
  output: 'export',                    // Static export
  basePath: '/policy-as-graph-demo',   // For GitHub Pages
  images: { unoptimized: true },       // No image optimization
  trailingSlash: true                  // Directory URLs
}
```

## Performance Characteristics

### Bundle Size
- Pages: ~50KB each (gzipped)
- Data: ~100KB total (policies + graphs + logs)
- Total: ~250-300KB initial load

### Rendering
- Graph: Canvas-based, ~16ms render time for 30 nodes
- Tables: Virtual scrolling for 100+ rows
- Navigation: Instant (client-side routing)

### Scalability Limits
- **Graphs**: 500 nodes max before performance degrades
  - Solution: WebGL rendering (sigma.js, graphology)
- **Logs**: 1000 entries max in client-side table
  - Solution: Pagination or virtual scrolling
- **Policy Size**: 10MB max JSON file
  - Solution: Chunking or lazy loading

## Security Considerations

### Client-Side Only
- **No sensitive data**: Sample data only
- **No authentication**: Public demo
- **No PII**: Synthetic log entries

### Production Additions Needed
1. **Authentication**: SSO integration
2. **Authorization**: Role-based access control
3. **Data sanitization**: Scrub sensitive log content
4. **Audit logging**: Track who attested what
5. **HTTPS**: Enforce secure connections

## Testing Strategy

### Unit Tests (Not Implemented - Future)
- PolicyEngine rule evaluation
- Graph generation logic
- Violation creation

### Integration Tests (Not Implemented - Future)
- Full attestation flow
- Graph rendering
- Data persistence

### Manual Testing Checklist
1. ✅ Attestation form submission
2. ✅ Compliance evaluation
3. ✅ Graph rendering (both types)
4. ✅ Graph interaction (click, filter)
5. ✅ Violation display
6. ✅ Navigation flow
7. ✅ Rego snippets display
8. ✅ Responsive layout

## Extension Points

### Adding New Policies
1. Create `/data/policies/techXX_XX.json`
2. Generate graphs: `/data/graphs/techXX_XX_*.json`
3. Add rules to `policyEngine.ts`
4. Create or update pages

### Adding New Graph Types
1. Define new node/edge types in types
2. Update GraphViewer color map
3. Generate graph JSON
4. Add visualization page

### Adding Real Data Sources
1. Replace JSON files with API calls
2. Add authentication
3. Implement server-side policy engine
4. Add real-time updates

### Integration Points
- **SIEM**: Splunk, ELK, Datadog
- **Policy Management**: ServiceNow, Archer
- **Audit Tools**: Compliance automation platforms
- **CI/CD**: GitHub Actions, Jenkins
- **Identity**: OKTA, Azure AD

## Troubleshooting

### Common Issues

**Graph not rendering**
- Check browser console for errors
- Ensure Canvas API is supported
- Try disabling ad blockers

**Data not loading**
- Check JSON files are in `/data`
- Check network tab for 404s
- Verify basePath is correct

**Type errors**
- Run `npx tsc --noEmit`
- Check type definitions match JSON structure

**Build fails**
- Clear `.next/` and `out/` directories
- Delete `node_modules/` and reinstall
- Check Node version (18+)

## Future Enhancements

### Short-term
- Add loading spinners
- Improve graph performance
- Add export to PDF feature
- Add search functionality

### Medium-term
- Multi-policy evaluation
- Historical trend tracking
- Slack/email notifications
- Remediation workflows

### Long-term
- AI-powered policy parsing
- Auto-generate Rego from policy text
- Predictive compliance scoring
- Integration marketplace

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-11  
**Maintainer**: Vipul (gaurvipul@gmail.com)
