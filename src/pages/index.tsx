import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ArchitecturePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Proposed Solution - Agent-to-Agent Policy Intelligence</title>
      </Head>

      <div className="header">
        <div style={{ maxWidth: '100%', padding: '0 20px' }}>
          <h1>Proposed Solution: Agent-to-Agent Policy Intelligence</h1>
        </div>
      </div>

      <div style={{ maxWidth: '100%', padding: '0 20px', margin: '20px 0' }}>
        {/* Main Layout: Side-by-side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '16px',
          alignItems: 'start'
        }} className="architecture-layout">

          {/* LEFT: Key Benefits Stacked - Compact */}
          <div>
            <div style={{ marginBottom: '10px', padding: '12px', background: '#e3f2fd', borderRadius: '4px', borderLeft: '3px solid #1976d2' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#0d47a1' }}>
                🎯 Continuous Compliance
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#1565c0' }}>
                Real-time evaluation against live state
              </p>
            </div>

            <div style={{ marginBottom: '10px', padding: '12px', background: '#e8f5e9', borderRadius: '4px', borderLeft: '3px solid #388e3c' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#1b5e20' }}>
                🧠 Intelligent Context
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#2e7d32' }}>
                Relationships across policies
              </p>
            </div>

            <div style={{ marginBottom: '10px', padding: '12px', background: '#fff3e0', borderRadius: '4px', borderLeft: '3px solid #f57c00' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#e65100' }}>
                📊 Full Traceability
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#ef6c00' }}>
                Violation → requirement → evidence
              </p>
            </div>

            <div style={{ padding: '12px', background: '#f3e5f5', borderRadius: '4px', borderLeft: '3px solid #7b1fa2' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: '#4a148c' }}>
                ⚡ Zero Manual Work
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.4', color: '#6a1b9a' }}>
                No checklists or manual reviews
              </p>
            </div>
          </div>

          {/* RIGHT: Architecture Diagram - PROMINENT */}
          <div style={{ background: '#fff', borderRadius: '6px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px', fontWeight: 700, color: '#2d3748' }}>
              Agent-to-Agent Enterprise Policy Intelligence Pipeline
            </h2>

            <svg
            viewBox="0 0 1400 800"
            style={{ width: '100%', height: 'auto', background: '#f8f9fa', borderRadius: '8px' }}
          >
            {/* Layer 1: Source Layer */}
            <g id="layer1">
              <rect x="50" y="50" width="1100" height="120" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="6"/>
              <text x="600" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0d47a1">
                Layer 1: Source Layer
              </text>

              <rect x="100" y="100" width="220" height="50" fill="#fff" stroke="#1976d2" strokeWidth="1.5" rx="4"/>
              <text x="210" y="133" textAnchor="middle" fontSize="16" fill="#1976d2">📄 Policies (PDF)</text>

              <rect x="360" y="100" width="220" height="50" fill="#fff" stroke="#1976d2" strokeWidth="1.5" rx="4"/>
              <text x="470" y="133" textAnchor="middle" fontSize="16" fill="#1976d2">📋 Tech Standards</text>

              <rect x="620" y="100" width="220" height="50" fill="#fff" stroke="#1976d2" strokeWidth="1.5" rx="4"/>
              <text x="730" y="133" textAnchor="middle" fontSize="16" fill="#1976d2">📖 Guidelines</text>

              <rect x="880" y="100" width="220" height="50" fill="#fff" stroke="#1976d2" strokeWidth="1.5" rx="4"/>
              <text x="990" y="133" textAnchor="middle" fontSize="16" fill="#1976d2">📑 Procedures</text>
            </g>

            {/* Arrow 1 to 2 */}
            <defs>
              <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#1976d2" />
              </marker>
            </defs>
            <line x1="600" y1="170" x2="600" y2="195" stroke="#1976d2" strokeWidth="3" markerEnd="url(#arrowblue)"/>

            {/* Layer 2: Enterprise Knowledge Graph Agent */}
            <g id="layer2">
              <rect x="50" y="200" width="1100" height="120" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2" rx="6"/>
              <text x="600" y="240" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1b5e20">
                Layer 2: Enterprise Knowledge Graph Agent
              </text>

              <rect x="100" y="250" width="240" height="50" fill="#fff" stroke="#388e3c" strokeWidth="1.5" rx="4"/>
              <text x="220" y="283" textAnchor="middle" fontSize="15" fill="#2e7d32">Community Detection</text>

              <rect x="370" y="250" width="240" height="50" fill="#fff" stroke="#388e3c" strokeWidth="1.5" rx="4"/>
              <text x="490" y="283" textAnchor="middle" fontSize="15" fill="#2e7d32">Ontology Extraction</text>

              <rect x="640" y="250" width="240" height="50" fill="#fff" stroke="#388e3c" strokeWidth="1.5" rx="4"/>
              <text x="760" y="283" textAnchor="middle" fontSize="15" fill="#2e7d32">Topic Modeling</text>

              <rect x="910" y="250" width="190" height="50" fill="#fff" stroke="#388e3c" strokeWidth="1.5" rx="4"/>
              <text x="1005" y="283" textAnchor="middle" fontSize="15" fill="#2e7d32">Relationships</text>
            </g>

            <line x1="600" y1="320" x2="600" y2="345" stroke="#388e3c" strokeWidth="3" markerEnd="url(#arrowgreen)"/>
            <defs>
              <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#388e3c" />
              </marker>
            </defs>

            {/* Layer 3: Policy Requirement KG Agent */}
            <g id="layer3">
              <rect x="50" y="350" width="1100" height="120" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" rx="6"/>
              <text x="600" y="390" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#e65100">
                Layer 3: Policy Requirement Knowledge Graph Agent
              </text>

              <rect x="150" y="400" width="280" height="50" fill="#fff" stroke="#f57c00" strokeWidth="1.5" rx="4"/>
              <text x="290" y="433" textAnchor="middle" fontSize="15" fill="#ef6c00">Extract Policy Topics</text>

              <rect x="460" y="400" width="280" height="50" fill="#fff" stroke="#f57c00" strokeWidth="1.5" rx="4"/>
              <text x="600" y="433" textAnchor="middle" fontSize="15" fill="#ef6c00">Leverage Ontology</text>

              <rect x="770" y="400" width="280" height="50" fill="#fff" stroke="#f57c00" strokeWidth="1.5" rx="4"/>
              <text x="910" y="433" textAnchor="middle" fontSize="15" fill="#ef6c00">Build Semantic Graph</text>
            </g>

            <line x1="600" y1="470" x2="600" y2="495" stroke="#f57c00" strokeWidth="3" markerEnd="url(#arroworange)"/>
            <defs>
              <marker id="arroworange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f57c00" />
              </marker>
            </defs>

            {/* Layer 4: Configuration Management Agent */}
            <g id="layer4">
              <rect x="50" y="500" width="1100" height="120" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" rx="6"/>
              <text x="600" y="540" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#4a148c">
                Layer 4: Configuration Management Agent
              </text>

              <rect x="100" y="550" width="220" height="50" fill="#fff" stroke="#7b1fa2" strokeWidth="1.5" rx="4"/>
              <text x="210" y="583" textAnchor="middle" fontSize="15" fill="#6a1b9a">IAM / Cloud Posture</text>

              <rect x="360" y="550" width="220" height="50" fill="#fff" stroke="#7b1fa2" strokeWidth="1.5" rx="4"/>
              <text x="470" y="583" textAnchor="middle" fontSize="15" fill="#6a1b9a">Terraform / IaC</text>

              <rect x="620" y="550" width="220" height="50" fill="#fff" stroke="#7b1fa2" strokeWidth="1.5" rx="4"/>
              <text x="730" y="583" textAnchor="middle" fontSize="15" fill="#6a1b9a">App Metadata</text>

              <rect x="880" y="550" width="220" height="50" fill="#fff" stroke="#7b1fa2" strokeWidth="1.5" rx="4"/>
              <text x="990" y="583" textAnchor="middle" fontSize="15" fill="#6a1b9a">Config Mapping</text>
            </g>

            <line x1="600" y1="620" x2="600" y2="645" stroke="#7b1fa2" strokeWidth="3" markerEnd="url(#arrowpurple)"/>
            <defs>
              <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#7b1fa2" />
              </marker>
            </defs>

            {/* Layer 5: Policy-as-Code Engine */}
            <g id="layer5">
              <rect x="50" y="650" width="1100" height="120" fill="#ffebee" stroke="#c62828" strokeWidth="2" rx="6"/>
              <text x="600" y="690" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#b71c1c">
                Layer 5: Policy-as-Code Engine (OPA / Rego)
              </text>

              <rect x="150" y="700" width="220" height="50" fill="#fff" stroke="#c62828" strokeWidth="1.5" rx="4"/>
              <text x="260" y="733" textAnchor="middle" fontSize="15" fill="#c62828">Rule Evaluation</text>

              <rect x="410" y="700" width="220" height="50" fill="#fff" stroke="#c62828" strokeWidth="1.5" rx="4"/>
              <text x="520" y="733" textAnchor="middle" fontSize="15" fill="#c62828">Compliance Output</text>

              <rect x="670" y="700" width="220" height="50" fill="#fff" stroke="#c62828" strokeWidth="1.5" rx="4"/>
              <text x="780" y="733" textAnchor="middle" fontSize="15" fill="#c62828">Violation Evidence</text>

              <rect x="930" y="700" width="170" height="50" fill="#fff" stroke="#c62828" strokeWidth="1.5" rx="4"/>
              <text x="1015" y="733" textAnchor="middle" fontSize="15" fill="#c62828">Audit Trail</text>
            </g>

            {/* Side labels for outputs */}
            <text x="1180" y="110" fontSize="16" fontWeight="600" fill="#1976d2">→ Raw Docs</text>
            <text x="1180" y="260" fontSize="16" fontWeight="600" fill="#388e3c">→ KG</text>
            <text x="1180" y="410" fontSize="16" fontWeight="600" fill="#f57c00">→ Req Graph</text>
            <text x="1180" y="560" fontSize="16" fontWeight="600" fill="#7b1fa2">→ Config</text>
            <text x="1180" y="710" fontSize="16" fontWeight="600" fill="#c62828">→ Compliance</text>
          </svg>
          </div>

        </div>
        {/* End of side-by-side layout */}

        {/* Current Demo vs Proposed Solution */}
        <div className="card">
          <h2 className="section-title">From Demo to Production Pipeline</h2>
          <div className="split-view">
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#2c5282' }}>
                ✅ What This Demo Shows (POC)
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '15px' }}>
                <li>Single policy (TECH05.01) manually parsed</li>
                <li>Static knowledge graph with 32 nodes</li>
                <li>Hardcoded OPA rules for 5 requirements</li>
                <li>30 sample log entries</li>
                <li>Client-side evaluation in browser</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#38a169' }}>
                🚀 Production Implementation
              </h3>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', fontSize: '15px' }}>
                <li>All 200+ enterprise policies automatically ingested</li>
                <li>Dynamic KG with 10,000+ nodes and relationships</li>
                <li>Auto-generated OPA rules from policy requirements</li>
                <li>Real-time SIEM/IAM/Cloud integration</li>
                <li>Continuous evaluation with alerting pipeline</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
          <button
            className="button"
            onClick={() => router.push('/pod')}
          >
            Continue to Attestation Form →
          </button>
          <button
            className="button button-secondary"
            onClick={() => router.push('/poa3')}
          >
            Skip to Policy-as-Code Demo →
          </button>
        </div>
      </div>
    </>
  );
}
