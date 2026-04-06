import Layout from '../components/Layout';
import { COLORS } from '../data';

export default function AccountPage() {
  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>My Account</h1>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>Manage your profile, certifications, and membership.</p>

        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: COLORS.neutral }}>Account Settings</h3>
          <div id="piano-my-account" style={{ minHeight: 400, padding: 20, background: COLORS.neutralLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Piano My Account Widget</p>
              <p style={{ fontSize: 14, color: "#666" }}>Wire up tp.myaccount.show() here in production</p>
              <code style={{ display: "block", marginTop: 16, padding: 12, background: "white", borderRadius: 6, fontSize: 12, color: COLORS.neutral, fontFamily: "monospace" }}>
                tp.myaccount.show(&#123;containerSelector: "#piano-my-account"&#125;)
              </code>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
