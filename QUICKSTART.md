# Quick Start Guide

Get the demo running in **under 2 minutes**! 🚀

## Prerequisites
- Node.js 18+ installed
- npm 9+ installed

## Installation (30 seconds)

```bash
# Install dependencies
npm install
```

## Run Development Server (10 seconds)

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Flow (2 minutes)

### Step 1: Attestation Form (20 seconds)
- You'll see "Application Entitlement Manager" page
- Application ID is pre-filled: **149171081**
- Check these boxes:
  - ✓ Logging is in place per TECH05.01
  - ✓ Entitlements configured (optional)
  - ✓ Access lifecycle via IIQ (optional)
  - ✓ SSO enabled → Select **OKTA**
- Check the attestation agreement
- Click **Attest**

### Step 2: Compliance Result (20 seconds)
- You'll see **NON-COMPLIANT** status (this is expected!)
- Metrics show: 30 total checks, 18 compliant, 12 non-compliant
- See the red "Non-Compliant - View Details" link next to logging requirement
- Click **"Explain Non-Compliance → View Detailed Analysis"** button

### Step 3: Deep Dive Analysis (40 seconds)
Navigate through the tabs:

1. **Policy Document Tab**
   - Shows full TECH05.01 with requirements
   
2. **Related Docs Graph Tab**
   - Interactive graph showing TECH05.01 and 12 related policies
   - Toggle **"Galaxy Mode"** to see full hairball network
   - Click any node to see details
   
3. **Requirements Graph Tab**
   - Shows Document → Section → Requirement → Control → Violation chain
   - Click nodes to explore
   
4. **Logs Analysis Tab**
   - Table of 12 non-compliant log entries
   - Each shows specific violations
   
5. **Findings Tab**
   - Logstash-style violation cards
   - Full details with remediation

### Step 4: Policy-as-Code (40 seconds)
- Click **"View Policy-as-Code →"** button at bottom
- **Left side**: Select different Rego rules from dropdown
  - Timezone Validation
  - Centralization Check
  - Retention Policy
  - Immutability Control
  - Required Attributes
- **Right side**: Live violations mapped to rules
- **Bottom**: Full violations table with remediation

---

## What You Just Saw

✅ **Policy-as-Graph**: Visualized TECH05.01 and all relationships  
✅ **Policy-as-Code**: Automated compliance checking with OPA/Rego  
✅ **Full Traceability**: Every violation mapped to requirement with evidence  
✅ **Actionable Insights**: Specific remediation for each issue  

---

## Build for Production

```bash
# Create static export
npm run build

# Output will be in /out directory
# Deploy to GitHub Pages, Netlify, Vercel, or any static host
```

---

## Need More Details?

- **README.md** - Full feature list and architecture
- **DEMO_SCRIPT.md** - Detailed 2-3 minute presentation script
- **SETUP.md** - Deployment and configuration guide
- **ARCHITECTURE.md** - Technical deep dive
- **PROJECT_SUMMARY.md** - Complete project overview

---

## Troubleshooting

**Nothing happens when I click "Attest"?**
→ Make sure you checked the attestation agreement checkbox

**Graph not showing?**
→ Check browser console for errors, ensure Canvas API is supported

**Want to see compliant status?**
→ Edit `/data/logs/sample.json` and set more logs to `"compliant": true`

---

## Key Files to Explore

```
data/policies/tech05_01.json       # Structured policy document
data/graphs/tech05_01_*.json       # Graph data
data/logs/sample.json              # Log entries (edit to see different results)
src/lib/policyEngine.ts            # Policy evaluation logic
src/components/GraphViewer.tsx     # Graph visualization
src/pages/poa3.tsx                 # Policy-as-Code showcase
```

---

**Ready to dive deeper?** Check out the full documentation! 📚
