import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import policyData from '@/../data/policies/tech05_01.json';
import relatedGraph from '@/../data/graphs/tech05_01_related.json';
import requirementsGraph from '@/../data/graphs/tech05_01_requirements.json';
import logsData from '@/../data/logs/sample.json';
import { ComplianceResult, LogEntry } from '@/types';

const GraphViewer = dynamic(() => import('@/components/GraphViewer'), { ssr: false });

export default function POA2Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('policy');
  const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);
  const nonCompliantLogs = logsData.logs.filter(log => !log.compliant);

  useEffect(() => {
    const stored = localStorage.getItem('complianceResult');
    if (stored) {
      setComplianceResult(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Head>
        <title>POA Page 2 - Deep Dive Analysis</title>
      </Head>

      <div className="header">
        <div className="container">
          <h1>Policy Analysis & Explainability - TECH05.01</h1>
        </div>
      </div>

      <div className="container">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'policy' ? 'active' : ''}`}
            onClick={() => setActiveTab('policy')}
          >
            📄 Policy Document
          </button>
          <button 
            className={`nav-tab ${activeTab === 'related-graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('related-graph')}
          >
            🔗 Related Docs Graph
          </button>
          <button 
            className={`nav-tab ${activeTab === 'req-graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('req-graph')}
          >
            📊 Requirements Graph
          </button>
          <button 
            className={`nav-tab ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            📝 Logs Analysis
          </button>
          <button 
            className={`nav-tab ${activeTab === 'findings' ? 'active' : ''}`}
            onClick={() => setActiveTab('findings')}
          >
            🔍 Findings
          </button>
        </div>

        {activeTab === 'policy' && (
          <div className="card">
            <h2 className="section-title">Section 1: TECH05.01 Logging Management Standard</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Document Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '8px', fontSize: '14px' }}>
                <div style={{ fontWeight: 600 }}>Policy ID:</div>
                <div>{policyData.id}</div>
                <div style={{ fontWeight: 600 }}>Name:</div>
                <div>{policyData.name}</div>
                <div style={{ fontWeight: 600 }}>Organization:</div>
                <div>{policyData.organization}</div>
                <div style={{ fontWeight: 600 }}>Version:</div>
                <div>{policyData.version}</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Statement</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{policyData.statement}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Scope</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{policyData.scope}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Requirements Summary</h3>
              {policyData.sections.map((section) => (
                <div key={section.id} style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#2c5282', marginBottom: '8px' }}>
                    {section.name}
                  </h4>
                  <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
                    {section.requirements.map((req) => (
                      <li key={req.id} style={{ marginBottom: '6px' }}>
                        <strong>{req.id}:</strong> {req.text}
                        {req.mandatory && <span className="badge badge-error" style={{ marginLeft: '8px' }}>Mandatory</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Related Policies & Standards</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {policyData.relatedPolicies.map(policy => (
                  <span key={policy} className="badge badge-info">{policy}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'related-graph' && (
          <div className="card">
            <GraphViewer 
              data={relatedGraph} 
              title="Section 2: Related Documents & Policy Network"
              height={600}
            />
            <div style={{ marginTop: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              <p>
                <strong>Graph Description:</strong> This network visualization shows TECH05.01 and all related policies, 
                standards, regulatory guidelines, and supporting documents. The relationships include:
              </p>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li><strong>relate_to:</strong> Direct policy/standard relationships</li>
                <li><strong>mention:</strong> Standards mentioned within the document</li>
                <li><strong>hyperlink_to:</strong> External references and URLs</li>
              </ul>
              <p style={{ marginTop: '12px' }}>
                Use the filters above to show/hide different node types. Enable <strong>Galaxy Mode</strong> to see 
                the full network hairball view.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'req-graph' && (
          <div className="card">
            <GraphViewer 
              data={requirementsGraph} 
              title="Section 3: Requirements & Controls Graph"
              height={600}
            />
            <div style={{ marginTop: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              <p>
                <strong>Graph Description:</strong> This graph shows the explainability chain from TECH05.01 document 
                to sections, requirements, controls, evidence types, and violations. Key relationships:
              </p>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li><strong>has_section:</strong> Document contains sections</li>
                <li><strong>has_requirement:</strong> Sections contain requirements</li>
                <li><strong>requires:</strong> Requirements mandate specific controls</li>
                <li><strong>evidenced_by:</strong> Requirements proven by evidence types</li>
                <li><strong>violated_by:</strong> Requirements can have violations/findings</li>
                <li><strong>supported_by:</strong> Requirements reference other standards</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="card">
            <h2 className="section-title">Section 4: Logs from Enterprise Logging Framework</h2>
            <p style={{ marginBottom: '16px', fontSize: '14px' }}>
              Showing {nonCompliantLogs.length} non-compliant log entries out of {logsData.logs.length} total logs.
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Timestamp</th>
                    <th>Event Type</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Violations</th>
                  </tr>
                </thead>
                <tbody>
                  {nonCompliantLogs.map(log => (
                    <tr key={log.id} style={{ background: '#fff5f5' }}>
                      <td><code>{log.id}</code></td>
                      <td>{log.timestamp}</td>
                      <td>{log.eventType}</td>
                      <td>{log.sourceId || 'N/A'}</td>
                      <td>
                        <span className="badge badge-error">Non-Compliant</span>
                      </td>
                      <td>
                        {log.violations?.map(v => (
                          <span key={v} className="badge badge-warning" style={{ marginRight: '4px' }}>
                            {v}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'findings' && complianceResult && (
          <div className="card">
            <h2 className="section-title">Section 5: Commentary & Findings - Logstash Style</h2>
            <p style={{ marginBottom: '16px', fontSize: '14px' }}>
              Total Violations: <strong>{complianceResult.violations.length}</strong>
            </p>

            {complianceResult.violations.slice(0, 10).map((violation, idx) => (
              <div key={idx} className="violation-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#742a2a' }}>
                    {violation.title}
                  </h4>
                  <span className={`badge badge-${violation.severity === 'high' ? 'error' : 'warning'}`}>
                    {violation.severity.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                  <strong>Policy:</strong> {violation.policyId} | <strong>Requirement:</strong> {violation.requirementId}
                </div>
                
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  <strong>Clause:</strong> "{violation.clauseText}"
                </div>
                
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  <strong>Reason:</strong> {violation.reason}
                </div>
                
                <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                  <strong>Evidence:</strong>
                  <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                    {violation.evidence.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ fontSize: '14px', padding: '10px', background: '#fffaf0', borderRadius: '4px', marginTop: '8px' }}>
                  <strong>💡 Remediation:</strong> {violation.remediation}
                </div>
              </div>
            ))}

            {complianceResult.violations.length > 10 && (
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#4a5568' }}>
                Showing first 10 of {complianceResult.violations.length} violations. 
                Click "View Policy-as-Code" to see all violations.
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button className="button button-secondary" onClick={() => router.push('/poa1')}>
            ← Back to POA Page 1
          </button>
          <button className="button" onClick={() => router.push('/poa3')}>
            View Policy-as-Code →
          </button>
        </div>
      </div>
    </>
  );
}
