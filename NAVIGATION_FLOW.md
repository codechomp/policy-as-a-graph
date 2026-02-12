# 🧭 Navigation Flow

## Page Sequence

```
┌─────────────────────────────────────────┐
│  1. Architecture (Landing Page)         │  ← http://localhost:3000/
│     /index.tsx (was /architecture.tsx)  │
└─────────────────┬───────────────────────┘
                  │
                  ▼
         [Continue to Attestation Form]
                  │
                  ▼
┌─────────────────────────────────────────┐
│  2. POD Attestation Form                │  ← http://localhost:3000/pod
│     /pod.tsx (was /index.tsx)           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
            [Click Attest]
                  │
                  ▼
┌─────────────────────────────────────────┐
│  3. POA Page 1 - Compliance Results     │  ← http://localhost:3000/poa1
│     /poa1.tsx                            │
└─────────────────┬───────────────────────┘
                  │
                  ▼
     [Explain Non-Compliance]
                  │
                  ▼
┌─────────────────────────────────────────┐
│  4. POA Page 2 - Deep Dive Analysis     │  ← http://localhost:3000/poa2
│     /poa2.tsx                            │
│     - Policy Document                    │
│     - Related Docs Graph                 │
│     - Requirements Graph                 │
│     - Logs Analysis                      │
│     - Findings                           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
      [Continue to Policy-as-Code]
                  │
                  ▼
┌─────────────────────────────────────────┐
│  5. POA Page 3 - Policy-as-Code         │  ← http://localhost:3000/poa3
│     /poa3.tsx                            │
│     - OPA/Rego Rules                     │
│     - Violations                         │
│     - Remediation Guidance               │
└─────────────────────────────────────────┘
```

## Changes Made

### 1. File Renames
- **OLD**: `src/pages/index.tsx` (POD Attestation Form)
- **NEW**: `src/pages/pod.tsx` (POD Attestation Form)

- **OLD**: `src/pages/architecture.tsx` (Architecture Page)
- **NEW**: `src/pages/index.tsx` (Architecture Page - now landing)

### 2. Navigation Updates

**Architecture Page (index.tsx)**
- Primary button: "Continue to Attestation Form" → `/pod`
- Secondary button: "Skip to Policy-as-Code Demo" → `/poa3`

**POD Page (pod.tsx)**
- Back button: "← Back to Architecture" → `/`
- Primary button: "Attest" → `/poa1`

**POA Page 3 (poa3.tsx)**
- Architecture button: "🚀 View Architecture" → `/`
- Return button: "🏠 Return to Attestation Form" → `/pod`

### 3. Removed Content
- **Removed**: 45-second executive summary from Architecture page
- **Kept**: Clean diagram, benefits, POC vs Production comparison

## URL Structure

| Page | URL | Purpose |
|------|-----|---------|
| Architecture (Landing) | `/` | Executive overview of proposed solution |
| POD Attestation | `/pod` | Attestation form entry point |
| POA Page 1 | `/poa1` | Compliance results |
| POA Page 2 | `/poa2` | Deep dive analysis with graphs |
| POA Page 3 | `/poa3` | Policy-as-code showcase |

## User Journey

1. **User lands on site** → Sees architecture diagram
2. **Clicks "Continue"** → Goes to attestation form
3. **Fills form & attests** → Sees compliance results
4. **Clicks "Explain"** → Deep dive with graphs
5. **Explores tabs** → Policy docs, graphs, logs, findings
6. **Continues** → Policy-as-code implementation
7. **Can return to architecture** from any page

## Key Points

- ✅ Architecture is now the **landing page** (/)
- ✅ POD attestation is now at **/pod**
- ✅ Clean linear flow: Arch → POD → Demo
- ✅ Executive summary **removed** (diagram-only landing)
- ✅ All navigation links updated
- ✅ No broken links
