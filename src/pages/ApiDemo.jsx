import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { COLORS } from '../data';

export default function ApiDemo() {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [demoEmail, setDemoEmail] = useState('demo@gdpa-example.com');
  const [demoFirstName, setDemoFirstName] = useState('Demo');
  const [demoLastName, setDemoLastName] = useState('User');
  const outputRef = useRef(null);

  // Auto-scroll to bottom when new output appears
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Add log entry to terminal output
  const log = (content, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setOutput(prev => [...prev, { timestamp, content, type }]);
  };

  // Clear terminal
  const clearTerminal = () => {
    setOutput([]);
    log('Terminal cleared', 'system');
  };

  // Initialize demo
  useEffect(() => {
    log('='.repeat(70), 'system');
    log('  Piano Site Licensing API - Interactive Console', 'system');
    log('='.repeat(70), 'system');
    log('', 'system');
    log('✅ Configuration:', 'info');
    log('   AID: gtdSyi74su', 'info');
    log('   Contract ID: TM7SCAJ1NJXX', 'info');
    log('   Environment: Sandbox', 'info');
    log('', 'system');
    log('💡 Click any command button to execute API calls', 'info');
    log('', 'system');
  }, []);

  // Format JSON for display
  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  // API Call: Create User
  const createUser = async () => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('📝 CREATE CONTRACT USER', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/create`, 'info');
    log(`Email: ${demoEmail}`, 'info');
    log('', 'system');

    try {
      const response = await fetch('/api/demo/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: demoEmail,
          first_name: demoFirstName,
          last_name: demoLastName
        })
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ SUCCESS!', 'success');
        log(`   User created with status: ${data.contract_user?.status}`, 'success');
        log(`   Contract User ID: ${data.contract_user?.contract_user_id}`, 'success');
        log('', 'system');
      } else {
        log('❌ ERROR:', 'error');
        log(formatJson(data), 'json');
      }
    } catch (error) {
      log(`❌ Network Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // API Call: Send Invitation
  const sendInvitation = async () => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('📧 SEND INVITATION EMAIL', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/invite`, 'info');
    log(`Email: ${demoEmail}`, 'info');
    log('', 'system');

    try {
      const response = await fetch('/api/demo/send-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail })
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ SUCCESS!', 'success');
        log(`   Invitation sent to ${demoEmail}`, 'success');
      } else {
        log('❌ ERROR:', 'error');
        log(formatJson(data), 'json');
      }
    } catch (error) {
      log(`❌ Network Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // API Call: List Users
  const listUsers = async () => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('📊 LIST CONTRACT USERS', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/list`, 'info');
    log(`Contract ID: TM7SCAJ1NJXX`, 'info');
    log('', 'system');

    try {
      const response = await fetch('/api/demo/list-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Response:', 'info');
        log(`   Total users: ${data.total}`, 'info');
        log(`   Returned: ${data.count}`, 'info');
        log('', 'system');

        if (data.users && data.users.length > 0) {
          log('👥 Users (first 5):', 'info');
          data.users.slice(0, 5).forEach((user, idx) => {
            log('', 'system');
            log(`   User ${idx + 1}:`, 'info');
            log(`      Email: ${user.email}`, 'info');
            log(`      Name: ${user.first_name} ${user.last_name}`, 'info');
            log(`      Status: ${user.status}`, 'info');
            log(`      Contract User ID: ${user.contract_user_id}`, 'info');
          });
        }

        log('', 'system');
        log('Full JSON Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ User list retrieved', 'success');
      } else {
        log('❌ ERROR:', 'error');
        log(formatJson(data), 'json');
      }
    } catch (error) {
      log(`❌ Network Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // API Call: Remove User
  const removeUser = async () => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('🗑️  REMOVE USER FROM CONTRACT', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/removeAndRevoke`, 'info');
    log(`Email: ${demoEmail}`, 'info');
    log('', 'system');

    try {
      const response = await fetch('/api/demo/remove-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail })
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ SUCCESS!', 'success');
        log(`   User removed from contract`, 'success');
        log(`   Access revoked immediately`, 'success');
      } else {
        log('❌ ERROR:', 'error');
        log(formatJson(data), 'json');
      }
    } catch (error) {
      log(`❌ Network Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.neutral,
            marginBottom: 8,
            fontFamily: "'Courier New', monospace"
          }}>
            &gt; Piano Site Licensing API Console
          </h1>
          <p style={{ color: '#666', fontFamily: "'Courier New', monospace" }}>
            Live API demonstration • Contract ID: TM7SCAJ1NJXX
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 24 }}>
          {/* Left Column: Controls */}
          <div>
            {/* User Input Form */}
            <div style={{
              background: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 8,
              padding: 20,
              marginBottom: 16
            }}>
              <h3 style={{
                color: '#4ec9b0',
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                marginBottom: 16,
                textTransform: 'uppercase'
              }}>
                &gt; Demo User
              </h3>

              <div style={{ marginBottom: 12 }}>
                <label style={{
                  display: 'block',
                  color: '#999',
                  fontSize: 12,
                  marginBottom: 4,
                  fontFamily: "'Courier New', monospace"
                }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0e0e0e',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '8px 12px',
                    color: '#dcdcdc',
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13
                  }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{
                  display: 'block',
                  color: '#999',
                  fontSize: 12,
                  marginBottom: 4,
                  fontFamily: "'Courier New', monospace"
                }}>
                  First Name:
                </label>
                <input
                  type="text"
                  value={demoFirstName}
                  onChange={(e) => setDemoFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0e0e0e',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '8px 12px',
                    color: '#dcdcdc',
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13
                  }}
                />
              </div>

              <div style={{ marginBottom: 0 }}>
                <label style={{
                  display: 'block',
                  color: '#999',
                  fontSize: 12,
                  marginBottom: 4,
                  fontFamily: "'Courier New', monospace"
                }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  value={demoLastName}
                  onChange={(e) => setDemoLastName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0e0e0e',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '8px 12px',
                    color: '#dcdcdc',
                    fontFamily: "'Courier New', monospace",
                    fontSize: 13
                  }}
                />
              </div>
            </div>

            {/* Command Buttons */}
            <div style={{
              background: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 8,
              padding: 20
            }}>
              <h3 style={{
                color: '#4ec9b0',
                fontFamily: "'Courier New', monospace",
                fontSize: 14,
                marginBottom: 16,
                textTransform: 'uppercase'
              }}>
                &gt; Commands
              </h3>

              <button
                onClick={createUser}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#0e7490',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '12px 16px',
                  marginBottom: 8,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  textAlign: 'left'
                }}
              >
                $ create_user
              </button>

              <button
                onClick={sendInvitation}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '12px 16px',
                  marginBottom: 8,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  textAlign: 'left'
                }}
              >
                $ send_invitation
              </button>

              <button
                onClick={listUsers}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '12px 16px',
                  marginBottom: 8,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  textAlign: 'left'
                }}
              >
                $ list_users
              </button>

              <button
                onClick={removeUser}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '12px 16px',
                  marginBottom: 16,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 13,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  textAlign: 'left'
                }}
              >
                $ remove_user
              </button>

              <button
                onClick={clearTerminal}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#374151',
                  color: '#9ca3af',
                  border: '1px solid #4b5563',
                  borderRadius: 4,
                  padding: '8px 16px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: 12,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                $ clear
              </button>
            </div>
          </div>

          {/* Right Column: Terminal Output */}
          <div
            ref={outputRef}
            style={{
              background: '#0e0e0e',
              border: '1px solid #333',
              borderRadius: 8,
              padding: 20,
              height: '700px',
              overflowY: 'auto',
              fontFamily: "'Courier New', monospace",
              fontSize: 13,
              lineHeight: 1.6
            }}
          >
            {output.map((entry, idx) => {
              let color = '#dcdcdc';
              if (entry.type === 'system') color = '#6b7280';
              if (entry.type === 'command') color = '#fbbf24';
              if (entry.type === 'info') color = '#60a5fa';
              if (entry.type === 'success') color = '#34d399';
              if (entry.type === 'error') color = '#f87171';
              if (entry.type === 'json') color = '#c084fc';

              return (
                <div key={idx} style={{ color, marginBottom: 2, whiteSpace: 'pre-wrap' }}>
                  {entry.content}
                </div>
              );
            })}
            {loading && (
              <div style={{ color: '#fbbf24', marginTop: 8 }}>
                🔄 Executing API call...
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
