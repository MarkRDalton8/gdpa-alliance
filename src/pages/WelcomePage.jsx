import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS } from '../data';

const BENEFITS = [
  {
    icon: '📰',
    title: 'Member-Only Content',
    description: 'Full access to whitepapers, enforcement analyses, templates, and the complete GDPA resource library.',
    cta: 'Browse Resources',
    to: '/resources',
  },
  {
    icon: '🎓',
    title: 'Certification Discounts',
    description: 'Member pricing on all GDPA certifications — CIPP/E, CIPM, CIPT, and more. Your discount is applied automatically at checkout.',
    cta: 'View Certifications',
    to: '/certifications',
  },
  {
    icon: '💻',
    title: 'Training Access',
    description: 'Exclusive access to live webinars, on-demand training sessions, and member-only workshops.',
    cta: 'Browse Training',
    to: '/training',
  },
  {
    icon: '📬',
    title: 'Privacy Bulletin',
    description: 'Weekly digest covering enforcement actions, regulatory developments, and practitioner insights — delivered to your inbox.',
    cta: 'Sign Up',
    to: '/account',
  },
];

export default function WelcomePage() {
  const [purchase, setPurchase] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Read purchase details saved by checkoutComplete handler
    const stored = sessionStorage.getItem("gdpa_purchase");
    if (stored) {
      try { setPurchase(JSON.parse(stored)); } catch {}
    }

    // Get user's name from Piano ID
    const tp = window.tp || [];
    tp.push(["init", function () {
      const user = window.tp.pianoId.getUser();
      if (user) {
        setUserName(`${user.firstName || ""}`.trim() || "");
      }
    }]);
  }, []);

  const formattedExpiry = purchase?.expireDate
    ? new Date(purchase.expireDate * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <Layout>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>

        {/* Hero */}
        <div style={{
          textAlign: "center",
          padding: "48px 32px 40px",
          background: `linear-gradient(135deg, ${COLORS.primary}10 0%, ${COLORS.secondary}08 100%)`,
          borderRadius: 12,
          border: `1px solid ${COLORS.primary}25`,
          marginBottom: 40,
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h1 style={{
            fontSize: 34, fontWeight: 700, marginBottom: 12,
            color: COLORS.neutral, fontFamily: "'Lato', sans-serif",
          }}>
            Welcome{userName ? `, ${userName}` : ""}!
          </h1>
          <p style={{ fontSize: 18, color: "#444", marginBottom: 24, lineHeight: 1.5 }}>
            Your{purchase?.termName ? ` ${purchase.termName}` : " GDPA"} membership is now active.
            You have full access to everything listed below.
          </p>

          {/* Membership details pill */}
          {formattedExpiry && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "white", border: `1px solid ${COLORS.border}`,
              borderRadius: 24, padding: "10px 20px", fontSize: 13,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: COLORS.primary, display: "inline-block",
              }} />
              <span style={{ color: "#555" }}>
                Active membership · Renews <strong style={{ color: COLORS.neutral }}>{formattedExpiry}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Benefits grid */}
        <h2 style={{
          fontSize: 20, fontWeight: 700, marginBottom: 20,
          color: COLORS.neutral, fontFamily: "'Lato', sans-serif",
        }}>
          Your Member Benefits
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}>
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} style={{
              background: "white",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: 28,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{benefit.icon}</div>
              <h3 style={{
                fontSize: 16, fontWeight: 700, marginBottom: 8,
                color: COLORS.neutral, fontFamily: "'Lato', sans-serif",
              }}>
                {benefit.title}
              </h3>
              <p style={{
                fontSize: 13, color: "#666", lineHeight: 1.6,
                flex: 1, marginBottom: 20,
              }}>
                {benefit.description}
              </p>
              <Link to={benefit.to} style={{
                display: "inline-block",
                padding: "9px 20px",
                borderRadius: 6,
                border: `1px solid ${COLORS.primary}`,
                color: COLORS.primary,
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "'Lato', sans-serif",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = COLORS.primary;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = COLORS.primary;
              }}
              >
                {benefit.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* My Account CTA */}
        <div style={{
          background: COLORS.neutral,
          borderRadius: 10,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}>
          <div>
            <h3 style={{
              fontSize: 16, fontWeight: 700, color: "white",
              fontFamily: "'Lato', sans-serif", marginBottom: 4,
            }}>
              Manage your membership
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              View billing details, update payment method, or manage auto-renewal in My Account.
            </p>
          </div>
          <Link to="/account" style={{
            flexShrink: 0,
            background: "white",
            color: COLORS.neutral,
            padding: "10px 24px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 14,
            fontFamily: "'Lato', sans-serif",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Go to My Account
          </Link>
        </div>

      </div>
    </Layout>
  );
}
