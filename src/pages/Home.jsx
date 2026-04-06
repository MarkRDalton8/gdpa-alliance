import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS } from '../data';

export default function Home() {
  return (
    <Layout>
      <div style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`, borderRadius: 12, padding: "64px 48px", marginBottom: 48, color: "white" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, fontFamily: "'Lato', sans-serif", lineHeight: 1.2 }}>
          Advancing Privacy Excellence<br/>Across the Globe
        </h1>
        <p style={{ fontSize: 20, opacity: 0.95, maxWidth: 680, lineHeight: 1.6 }}>
          Join 30,000+ privacy professionals advancing their careers through world-class certifications, training, and resources from the leading global privacy community.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        <Link to="/certifications" style={{ background: "white", borderRadius: 8, padding: "24px 28px", border: `1px solid ${COLORS.border}`, textDecoration: "none", display: "block", transition: "all 0.25s ease" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🎓</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Certifications</h3>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Industry-recognized credentials that demonstrate your privacy expertise.</p>
        </Link>

        <Link to="/training" style={{ background: "white", borderRadius: 8, padding: "24px 28px", border: `1px solid ${COLORS.border}`, textDecoration: "none", display: "block", transition: "all 0.25s ease" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📚</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Training</h3>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Expert-led courses covering GDPR, AI governance, and emerging regulations.</p>
        </Link>

        <Link to="/resources" style={{ background: "white", borderRadius: 8, padding: "24px 28px", border: `1px solid ${COLORS.border}`, textDecoration: "none", display: "block", transition: "all 0.25s ease" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📖</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Resources</h3>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Research reports, templates, and tools for privacy professionals.</p>
        </Link>

        <Link to="/news" style={{ background: "white", borderRadius: 8, padding: "24px 28px", border: `1px solid ${COLORS.border}`, textDecoration: "none", display: "block", transition: "all 0.25s ease" }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📰</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>News</h3>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Latest updates on privacy regulations and enforcement.</p>
        </Link>
      </div>
    </Layout>
  );
}
