import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PODPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    applicationId: '149171081',
    loggingEnabled: false,
    entitlementsConfigured: false,
    accessLifecycle: false,
    ssoEnabled: false,
    ssoProvider: 'okta' as 'okta' | 'authblue' | 'activedirectory',
    attested: false
  });

  const handleAttest = () => {
    if (!formData.attested) {
      alert('Please check the attestation checkbox before submitting.');
      return;
    }

    // Store attestation in localStorage
    localStorage.setItem('attestation', JSON.stringify(formData));
    
    // Navigate to POA Page 1
    router.push('/poa1');
  };

  return (
    <>
      <Head>
        <title>Application Entitlement Manager - Attestation</title>
      </Head>
      
      <div className="header">
        <div className="container">
          <h1>Application Entitlement Manager</h1>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <h2 style={{ fontSize: '24px', marginBottom: '24px', fontWeight: 600 }}>
            Attestation Form for {formData.applicationId}
          </h2>

          <div style={{ marginBottom: '30px' }}>
            <label className="label">
              <input
                type="text"
                className="input"
                value={formData.applicationId}
                onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
                style={{ maxWidth: '300px' }}
              />
            </label>
          </div>

          <p style={{ marginBottom: '20px', fontWeight: 600 }}>
            Check all that apply to your application:
          </p>

          <div style={{ marginBottom: '30px' }}>
            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.loggingEnabled}
                onChange={(e) => setFormData({ ...formData, loggingEnabled: e.target.checked })}
              />
              <span>
                Logging is in place per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH05.01 Logging Management Standard
                </a>
              </span>
            </label>

            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.entitlementsConfigured}
                onChange={(e) => setFormData({ ...formData, entitlementsConfigured: e.target.checked })}
              />
              <span>
                Entitlements have been setup in this application specifically for auditors and regulators (read only), per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.15 Authentication and Authorization Management Standard
                </a>
              </span>
            </label>

            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.accessLifecycle}
                onChange={(e) => setFormData({ ...formData, accessLifecycle: e.target.checked })}
              />
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
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.ssoEnabled}
                onChange={(e) => setFormData({ ...formData, ssoEnabled: e.target.checked })}
              />
              <span>
                Single Sign On (SSO) is enabled via enterprise solutions, per{' '}
                <a href="#" style={{ color: '#2c5282', textDecoration: 'underline' }}>
                  TECH09.15 Authentication and Authorization Management Standard
                </a>
              </span>
            </label>

            {formData.ssoEnabled && (
              <div style={{ marginLeft: '30px', marginTop: '12px' }}>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    name="ssoProvider"
                    checked={formData.ssoProvider === 'okta'}
                    onChange={() => setFormData({ ...formData, ssoProvider: 'okta' })}
                  />
                  OKTA
                </label>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    name="ssoProvider"
                    checked={formData.ssoProvider === 'authblue'}
                    onChange={() => setFormData({ ...formData, ssoProvider: 'authblue' })}
                  />
                  AuthBlue
                </label>
                <label className="label">
                  <input
                    type="radio"
                    className="radio"
                    name="ssoProvider"
                    checked={formData.ssoProvider === 'activedirectory'}
                    onChange={() => setFormData({ ...formData, ssoProvider: 'activedirectory' })}
                  />
                  ActiveDirectory
                </label>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '30px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: 600, marginBottom: '12px' }}>Attest:</p>
            <label className="label">
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.attested}
                onChange={(e) => setFormData({ ...formData, attested: e.target.checked })}
              />
              <span>
                By clicking attest, I agree that as Application Owner for the application, the entitlement attribution
                details and my response to the questions below are accurate and will allow for Leaders and other
                decision makers reviewing user access to make informed decisions.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="button button-secondary" onClick={() => router.push('/')}>
              ← Back to Architecture
            </button>
            <button
              className="button"
              onClick={handleAttest}
              disabled={!formData.attested}
            >
              Attest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
