import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PolicyEngine } from '@/lib/policyEngine';
import logsData from '@/../data/logs/sample.json';
import { ComplianceResult } from '@/types';

export default function POA1Page() {
  const router = useRouter();
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [attestation, setAttestation] = useState<any>(null);

  useEffect(() => {
    // Load attestation from localStorage
    const storedAttestation = localStorage.getItem('attestation');
    if (storedAttestation) {
      setAttestation(JSON.parse(storedAttestation));
    }

    // Evaluate compliance
    const engine = new PolicyEngine();
    const complianceResult = engine.evaluateCompliance(logsData.logs);
    setResult(complianceResult);
    
    // Store result in localStorage for other pages
    localStorage.setItem('complianceResult', JSON.stringify(complianceResult));
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>POA Page 1 - Compliance Result</title>
      </Head>

      <div className="header">
        <div className="container">
          <h1>Application Entitlement Manager</h1>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <h2 style={{ fontSize: '24px', marginBottom: '24px', fontWeight: 600 }}>
            Attestation Form for {attestation?.applicationId || '149171081'}
          </h2>

          <div style={{ marginBottom: '30px' }}>
            <input
              type="text"
              className="input"
              value={attestation?.applicationId || '149171081'}
              readOnly
              style={{ maxWidth: '300px' }}
            />
          </div>

          <p style={{ marginBottom: '20px', fontWeight: 600 }}>
            Check all that apply to your application:
          </p>

          <div style={{ marginBottom: '30px' }}>
            <label className="label">
              <input type="checkbox" className="checkbox" checked={attestation?.loggingEnabled} disabled />
              <span>
                Logging is in place per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH05.01 Logging Management Standard
                </a>
                {result.overall === 'NON-COMPLIANT' && (
                  <span style={{ marginLeft: '10px' }}>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); router.push('/poa2'); }}
                      style={{ color: '#e53e3e', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Non-Compliant - View Details
                    </a>
                  </span>
                )}
              </span>
            </label>

            <label className="label">
              <input type="checkbox" className="checkbox" checked={attestation?.entitlementsConfigured} disabled />
              <span>
                Entitlements have been setup in this application specifically for auditors and regulators (read only), per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.15 Authentication and Authorization Management Standard
                </a>
              </span>
            </label>

            <label className="label">
              <input type="checkbox" className="checkbox" checked={attestation?.accessLifecycle} disabled />
              <span>
                All access for internal AMEX USERS is requested, approved and reviewed/certified through IIQ, per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.01 Access Lifecycle Management Standard
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.02 ID Management Standard
                </a>
              </span>
            </label>

            <label className="label">
              <input type="checkbox" className="checkbox" checked={attestation?.ssoEnabled} disabled />
              <span>
                Single Sign On (SSO) is enabled via enterprise solutions, per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.15 Authentication and Authorization Management Standard
                </a>
              </span>
            </label>

            {attestation?.ssoEnabled && (
              <div style={{ marginLeft: '30px', marginTop: '12px' }}>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    checked={attestation?.ssoProvider === 'okta'}
                    disabled
                  />
                  OKTA
                </label>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    checked={attestation?.ssoProvider === 'authblue'}
                    disabled
                  />
                  AuthBlue
                </label>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    checked={attestation?.ssoProvider === 'activedirectory'}
                    disabled
                  />
                  ActiveDirectory
                </label>
              </div>
            )}
          </div>

          <div 
            style={{ 
              padding: '20px', 
              borderRadius: '8px',
              background: result.overall === 'COMPLIANT' ? '#c6f6d5' : '#fed7d7',
              marginBottom: '20px'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
              Compliance Status: {result.overall}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#4a5568' }}>Total Checks</div>
                <div style={{ fontSize: '24px', fontWeight: 600 }}>{result.totalChecks}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#4a5568' }}>Compliant</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#22543d' }}>
                  {result.compliantCount}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#4a5568' }}>Non-Compliant</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#742a2a' }}>
                  {result.nonCompliantCount}
                </div>
              </div>
            </div>
          </div>

          {result.overall === 'NON-COMPLIANT' && (
            <div style={{ marginBottom: '20px' }}>
              <button 
                className="button"
                onClick={() => router.push('/poa2')}
                style={{ width: '100%', fontSize: '18px', padding: '16px' }}
              >
                Explain Non-Compliance → View Detailed Analysis
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="button button-secondary" onClick={() => router.push('/')}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
