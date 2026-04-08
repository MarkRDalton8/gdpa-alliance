import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { COLORS } from '../data';

export default function ApiDemo() {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [demoEmail, setDemoEmail] = useState('demo@gdpa-example.com');
  const [demoFirstName, setDemoFirstName] = useState('Demo');
  const [demoLastName, setDemoLastName] = useState('User');
  const [contractInfo, setContractInfo] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkCsv, setBulkCsv] = useState('');
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

    // Auto-load contract info
    getContractInfo();
  }, []);

  // Format JSON for display
  const formatJson = (obj) => {
    return JSON.stringify(obj, null, 2);
  };

  // API Call: Get Contract Info
  const getContractInfo = async () => {
    try {
      const response = await fetch('/api/demo/get-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok && data.contract) {
        setContractInfo(data.contract);
      }
    } catch (error) {
      console.error('Get contract error:', error);
    }
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

        // Refresh contract info
        getContractInfo();
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
        // Status breakdown
        const statusCounts = {
          PENDING: 0,
          ACTIVE: 0,
          REVOKED: 0,
          OTHER: 0
        };

        data.users.forEach(user => {
          const status = user.status?.toUpperCase();
          if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
          } else {
            statusCounts.OTHER++;
          }
        });

        log('📋 Response:', 'info');
        log(`   Total users: ${data.total}`, 'info');
        log(`   Returned: ${data.count}`, 'info');
        log('', 'system');

        log('📊 Status Breakdown:', 'info');
        log(`   PENDING: ${statusCounts.PENDING} users (waiting for redemption)`, 'info');
        log(`   ACTIVE: ${statusCounts.ACTIVE} users (fully redeemed)`, 'info');
        if (statusCounts.REVOKED > 0) {
          log(`   REVOKED: ${statusCounts.REVOKED} users`, 'info');
        }
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

            if (user.create_date) {
              const createDate = new Date(parseInt(user.create_date) * 1000);
              log(`      Created: ${createDate.toLocaleString()}`, 'info');
            }

            if (user.redeem_date) {
              const redeemDate = new Date(parseInt(user.redeem_date) * 1000);
              log(`      Redeemed: ${redeemDate.toLocaleString()}`, 'info');
            }
          });
        }

        log('', 'system');
        log('Full JSON Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ User list retrieved', 'success');

        // Refresh contract info
        getContractInfo();
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

        // Refresh contract info
        getContractInfo();
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

  // API Call: Bulk Import
  const bulkImport = async () => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('📦 BULK IMPORT USERS', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/create (bulk)`, 'info');
    log('', 'system');

    try {
      // Parse CSV (simple: email,first_name,last_name)
      const lines = bulkCsv.trim().split('\n');
      const users = lines.slice(1).map(line => {
        const [email, first_name, last_name] = line.split(',').map(s => s.trim());
        return { email, first_name, last_name };
      }).filter(u => u.email); // Filter out empty lines

      log(`📊 Parsed ${users.length} users from CSV`, 'info');
      log('', 'system');

      const response = await fetch('/api/demo/bulk-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users })
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Results:', 'info');
        log(`   Total processed: ${data.total}`, 'info');
        log(`   ✅ Created: ${data.created}`, 'success');
        if (data.duplicates > 0) {
          log(`   ⚠️  Duplicates: ${data.duplicates}`, 'info');
        }
        if (data.failed > 0) {
          log(`   ❌ Failed: ${data.failed}`, 'error');
        }
        log('', 'system');

        log('Details:', 'info');
        data.details.forEach((detail, idx) => {
          const icon = detail.status === 'created' ? '✅' : detail.status === 'duplicate' ? '⚠️' : '❌';
          log(`   ${icon} ${detail.email} - ${detail.status}`, 'info');
        });

        log('', 'system');
        log('Full JSON Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ Bulk import complete', 'success');

        setShowBulkImport(false);
        setBulkCsv('');

        // Refresh contract info
        getContractInfo();
      } else {
        log('❌ ERROR:', 'error');
        log(formatJson(data), 'json');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // API Call: Update User
  const updateUser = async (contractUserId, updates) => {
    setLoading(true);
    log('='.repeat(70), 'system');
    log('✏️  UPDATE USER DETAILS', 'command');
    log('='.repeat(70), 'system');
    log(`Endpoint: POST /publisher/licensing/contractUser/update`, 'info');
    log(`Contract User ID: ${contractUserId}`, 'info');
    log('', 'system');

    try {
      const response = await fetch('/api/demo/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contract_user_id: contractUserId,
          ...updates
        })
      });

      const data = await response.json();

      if (response.ok) {
        log('📋 Response:', 'info');
        log(formatJson(data), 'json');
        log('', 'system');
        log('✅ SUCCESS!', 'success');
        log(`   User updated`, 'success');

        setSelectedUser(null);
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

  // Calculate contract stats
  const getContractStats = () => {
    if (!contractInfo) return null;

    const total = contractInfo.max_users || 0;
    const used = contractInfo.used_count || 0;
    const available = total - used;
    const percentUsed = total > 0 ? Math.round((used / total) * 100) : 0;

    return { total, used, available, percentUsed };
  };

  const stats = getContractStats();

  return (
    <Layout>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
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

        {/* Contract Info Panel */}
        {contractInfo && stats && (
          <div style={{
            background: '#1e1e1e',
            border: '1px solid #4ec9b0',
            borderRadius: 8,
            padding: 20,
            marginBottom: 24,
            fontFamily: "'Courier New', monospace"
          }}>
            <h3 style={{ color: '#4ec9b0', fontSize: 14, marginBottom: 16, textTransform: 'uppercase' }}>
              &gt; CONTRACT INFO
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 16 }}>
              <div>
                <div style={{ color: '#999', fontSize: 12, marginBottom: 4 }}>Contract ID</div>
                <div style={{ color: '#dcdcdc', fontSize: 14 }}>{contractInfo.contract_id}</div>
              </div>
              <div>
                <div style={{ color: '#999', fontSize: 12, marginBottom: 4 }}>Status</div>
                <div style={{ color: '#34d399', fontSize: 14 }}>
                  {contractInfo.status || 'ACTIVE'} ✅
                </div>
              </div>
              <div>
                <div style={{ color: '#999', fontSize: 12, marginBottom: 4 }}>Expires</div>
                <div style={{ color: '#dcdcdc', fontSize: 14 }}>
                  {contractInfo.end_date
                    ? new Date(contractInfo.end_date * 1000).toLocaleDateString()
                    : 'N/A'}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#999', fontSize: 12, marginBottom: 4 }}>
                Seats: {stats.used}/{stats.total} [{stats.percentUsed}%]
              </div>
              <div style={{
                background: '#0e0e0e',
                border: '1px solid #333',
                borderRadius: 4,
                height: 24,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  background: stats.percentUsed > 80 ? '#f87171' : stats.percentUsed > 60 ? '#fbbf24' : '#34d399',
                  height: '100%',
                  width: `${stats.percentUsed}%`,
                  transition: 'width 0.3s ease'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dcdcdc',
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {stats.available} seats available
                </div>
              </div>
            </div>

            {contractInfo.landing_page_url && (
              <div>
                <div style={{ color: '#999', fontSize: 12, marginBottom: 4 }}>🔗 Redemption URL</div>
                <div style={{
                  background: '#0e0e0e',
                  border: '1px solid #333',
                  borderRadius: 4,
                  padding: '8px 12px',
                  fontSize: 12,
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {contractInfo.landing_page_url}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(contractInfo.landing_page_url)}
                    style={{
                      background: '#374151',
                      color: '#9ca3af',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 12px',
                      fontSize: 11,
                      cursor: 'pointer',
                      marginLeft: 8,
                      flexShrink: 0
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
                  marginBottom: 8,
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
                onClick={() => setShowBulkImport(!showBulkImport)}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#ea580c',
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
                $ bulk_import
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

            {/* Bulk Import Panel */}
            {showBulkImport && (
              <div style={{
                background: '#1e1e1e',
                border: '1px solid #ea580c',
                borderRadius: 8,
                padding: 20,
                marginTop: 16
              }}>
                <h3 style={{
                  color: '#ea580c',
                  fontFamily: "'Courier New', monospace",
                  fontSize: 14,
                  marginBottom: 12,
                  textTransform: 'uppercase'
                }}>
                  &gt; Bulk Import CSV
                </h3>

                <p style={{ color: '#999', fontSize: 11, marginBottom: 12, fontFamily: "'Courier New', monospace" }}>
                  Format: email,first_name,last_name
                </p>

                <textarea
                  value={bulkCsv}
                  onChange={(e) => setBulkCsv(e.target.value)}
                  placeholder="email,first_name,last_name&#10;user1@example.com,John,Doe&#10;user2@example.com,Jane,Smith"
                  style={{
                    width: '100%',
                    background: '#0e0e0e',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '8px 12px',
                    color: '#dcdcdc',
                    fontFamily: "'Courier New', monospace",
                    fontSize: 12,
                    minHeight: 120,
                    marginBottom: 12,
                    resize: 'vertical'
                  }}
                />

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={bulkImport}
                    disabled={loading || !bulkCsv.trim()}
                    style={{
                      flex: 1,
                      background: '#ea580c',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 16px',
                      fontFamily: "'Courier New', monospace",
                      fontSize: 12,
                      cursor: loading || !bulkCsv.trim() ? 'not-allowed' : 'pointer',
                      opacity: loading || !bulkCsv.trim() ? 0.5 : 1
                    }}
                  >
                    Execute
                  </button>
                  <button
                    onClick={() => { setShowBulkImport(false); setBulkCsv(''); }}
                    style={{
                      background: '#374151',
                      color: '#9ca3af',
                      border: '1px solid #4b5563',
                      borderRadius: 4,
                      padding: '8px 16px',
                      fontFamily: "'Courier New', monospace",
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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
