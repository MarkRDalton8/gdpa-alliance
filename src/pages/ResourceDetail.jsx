import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LockBadge } from '../components/SharedComponents';
import { COLORS, RESOURCES } from '../data';

export default function ResourceDetail() {
  const { slug } = useParams();
  const resource = RESOURCES.find(r => r.slug === slug);

  if (!resource) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: COLORS.neutral }}>Resource Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {resource.locked && (
        <style>{`
          .piano-container--active ~ * {
            display: none;
          }
          .piano-container--active {
            position: relative;
          }
          .piano-container--active::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            height: 200px;
            pointer-events: none;
            background-image: linear-gradient(
              to top,
              ${COLORS.neutralLight} 0%,
              ${COLORS.neutralLight} 20%,
              rgba(244, 244, 244, 0) 100%
            );
          }
        `}</style>
      )}

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, textTransform: "uppercase" }}>{resource.type}</span>
            <LockBadge locked={resource.locked} />
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: COLORS.neutral, marginBottom: 16, fontFamily: "'Lato', sans-serif", lineHeight: 1.2 }}>
            {resource.title}
          </h1>
          <div style={{ display: "flex", gap: 20, fontSize: 14, color: "#666" }}>
            <span>📅 {resource.date}</span>
            <span>📖 {resource.pages} pages</span>
          </div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: COLORS.neutral }}>Executive Summary</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            {resource.description}
          </p>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            This comprehensive report examines enforcement patterns across major jurisdictions including the EU, UK, United States (FTC, state AGs, and CPPA), Canada, and APAC regions. Key findings include a 34% year-over-year increase in total penalties issued, with GDPR fines reaching €2.1 billion collectively in 2025. The report provides detailed case studies of significant enforcement actions, emerging violation patterns, and practical compliance recommendations based on regulatory trends.
          </p>

          {/* Piano inline lock container - Piano will inject paywall here */}
          {resource.locked && <div className="piano-container"></div>}

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
            Readers will gain actionable insights into cross-border data transfer violations, cookie consent failures, data breach notification timing issues, and the rising trend of enforcement actions targeting AI and automated decision-making systems. The appendix includes a searchable database of all 2025 enforcement actions with filterable criteria.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 16, color: COLORS.neutral }}>Key Findings</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            Analysis reveals that enforcement activity increased significantly across all major jurisdictions in 2025, with particular focus on cross-border data transfers, automated decision-making systems, and cookie consent mechanisms. The report identifies emerging patterns in regulatory interpretation and provides strategic recommendations for compliance teams navigating this evolving landscape.
          </p>

          <button style={{
            background: COLORS.primary, color: "white", border: "none",
            padding: "14px 32px", borderRadius: 6, fontWeight: 700,
            fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
          onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
          >
            Download Full Report (PDF)
          </button>
        </div>
      </div>
    </Layout>
  );
}
