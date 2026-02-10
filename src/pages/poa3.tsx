import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { regoSnippets } from '@/lib/policyEngine';
import logsData from '@/../data/logs/sample.json';
import { ComplianceResult } from '@/types';

export default function POA3Page() {
  const router = useRouter();
  const [activeSnippet, setActiveSnippet] = useState<string>('timezone_check');
  const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('complianceResult');
    if (stored) {
      setComplianceResult(JSON.parse(stored));
    }
  }, []);

  const nonCompliantLogs = logsData.logs.filter(log => !log.compliant);

  const snippets = [
    { id: 'timezone_check', name: 'Timezone Validation', requirement: 'REQ-007' },
    { id: 'centralization_check', name: 'Centralization Check', requirement: 'REQ-009' },
    { id: 'retention_check', name: 'Retention Policy', requirement: 'REQ-003' },
    { id: 'immutability_check', name: 'Immutability Control', requirement: 'REQ-010' },
    { id: 'attributes_check', name: 'Required Attributes', requirement: 'REQ-013' }
  ];

  return (
    <>
      <Head>
        <title>POA Page 3 - Policy-as-Code</title>
      </Head>

      <div className="header">
        <div className="container">
          <h1>Policy-as-Code Showcase - TECH05.01</h1>
        </div>
      </div>

      <div className="container">
        <div className="card" style={{ marginBottom: '30px' }}>
          <h2 className="section-title">What is Policy-as-Code?</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            Policy-as-Code translates human-readable policy requirements into machine-executable rules. 
            This demo uses <strong>Open Policy Agent (OPA)</strong> Rego-style syntax to enforce TECH05.01 
            logging requirements automatically.
          </p>
          <div style={{ background: '#fffaf0', padding: '16px', borderRadius: '6px', fontSize: '14px' }}>
            <strong>✨ Benefits:</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Automated compliance checking - no manual review needed</li>
              <li>Continuous monitoring - violations detected in real-time</li>
              <li>Auditability - every decision is traceable to a policy rule</li>
              <li>Consistency - same rules applied uniformly across all systems</li>
            </ul>
          </div>
        </div>

        <div className="split-view">
          <div className="card">
            <h2 className="section-title">Section 1: OPA/Rego Policy Snippets</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Select Policy Rule:
              </label>
              <select 
                className="input"
                value={activeSnippet}
                onChange={(e) => setActiveSnippet(e.target.value)}
              >
                {snippets.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.requirement})
                  </option>
                ))}
              </select>
            </div>

            <div className="code-block">
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {regoSnippets[activeSnippet as keyof typeof regoSnippets]}
              </pre>
            </div>

            <div style={{ marginTop: '16px', fontSize: '13px', background: '#f7fafc', padding: '12px', borderRadius: '6px' }}>
              <strong>How it works:</strong>
              <ol style={{ marginTop: '6px', paddingLeft: '20px' }}>
                <li>Input log entry is evaluated against the rule</li>
                <li>If the rule passes, the log is compliant</li>
                <li>If the rule fails, a violation is generated with details</li>
                <li>Violations include requirement ID, message, and remediation</li>
              </ol>
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">Section 2: Live Violations with Mapping</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                <div>
                  <div style={{ color: '#4a5568' }}>Total Logs</div>
                  <div style={{ fontSize: '24px', fontWeight: 600 }}>{logsData.logs.length}</div>
                </div>
                <div>
                  <div style={{ color: '#4a5568' }}>Violations</div>
                  <div style={{ fontSize: '24px', fontWeight: 600, color: '#742a2a' }}>
                    {complianceResult?.violations.length || 0}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {complianceResult?.violations.slice(0, 8).map((violation, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '12px',
                    background: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#2c5282' }}>
                      {violation.requirementId}
                    </span>
                    <span className={`badge badge-${violation.severity === 'high' ? 'error' : 'warning'}`}>
                      {violation.severity}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                    {violation.title}
                  </div>

                  <div style={{ fontSize: '13px', color: '#4a5568', marginBottom: '8px' }}>
                    {violation.reason}
                  </div>

                  <div style={{ fontSize: '12px', background: '#f7fafc', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                    <strong>Evidence:</strong>
                    <div style={{ marginTop: '4px' }}>
                      {violation.evidence[0]}
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', background: '#fffaf0', padding: '8px', borderRadius: '4px', borderLeft: '3px solid #d69e2e' }}>
                    <strong>💡 Fix:</strong> {violation.remediation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '20px' }}>
          <h2 className="section-title">Detailed Violation Analysis</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Clause</th>
                  <th>Log ID</th>
                  <th>Violation Type</th>
                  <th>Severity</th>
                  <th>Remediation</th>
                </tr>
              </thead>
              <tbody>
                {complianceResult?.violations.slice(0, 15).map((violation, idx) => (
                  <tr key={idx}>
                    <td><code>{violation.requirementId}</code></td>
                    <td style={{ fontSize: '13px', maxWidth: '200px' }}>
                      {violation.clauseText.substring(0, 60)}...
                    </td>
                    <td><code>{violation.evidence[0]?.split(': ')[1] || 'N/A'}</code></td>
                    <td>{violation.title}</td>
                    <td>
                      <span className={`badge badge-${violation.severity === 'high' ? 'error' : 'warning'}`}>
                        {violation.severity}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', maxWidth: '300px' }}>
                      {violation.remediation.substring(0, 80)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginTop: '20px', background: '#f0fff4', borderLeft: '4px solid #38a169' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#22543d' }}>
            🎯 Next Steps for Compliance
          </h3>
          <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>Immediate:</strong> Configure all logging systems to include timezone in ISO 8601 format</li>
            <li><strong>Short-term:</strong> Enable centralized log forwarding to enterprise SIEM (Splunk/ELK)</li>
            <li><strong>Medium-term:</strong> Implement 12-month retention policy with 3-month online storage</li>
            <li><strong>Ongoing:</strong> Enable immutability controls and restrict log modification permissions</li>
            <li><strong>Validation:</strong> Deploy OPA policy engine for continuous compliance monitoring</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button className="button button-secondary" onClick={() => router.push('/poa2')}>
            ← Back to Deep Dive
          </button>
          <button className="button" onClick={() => router.push('/')}>
            🏠 Return to Attestation Form
          </button>
        </div>
      </div>
    </>
  );
}
