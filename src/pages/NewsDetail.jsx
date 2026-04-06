import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LockBadge } from '../components/SharedComponents';
import { COLORS, NEWS } from '../data';

export default function NewsDetail() {
  const { slug } = useParams();
  const article = NEWS.find(n => n.slug === slug);

  if (!article) return <Layout><div style={{textAlign:"center",padding:"48px 0"}}><h1>Article Not Found</h1></div></Layout>;

  return (
    <Layout>
      {article.locked && (
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
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, textTransform: "uppercase" }}>{article.category}</span>
            <LockBadge locked={article.locked} />
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: COLORS.neutral, marginBottom: 16, lineHeight: 1.2 }}>{article.title}</h1>
          <div style={{ fontSize: 14, color: "#999" }}>📅 {article.date}</div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 48 }}>
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>{article.excerpt}</p>

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            Privacy practitioners across industries are analyzing the compliance implications of the AI Act's final text, which introduces risk-based obligations for AI systems based on their potential impact on fundamental rights. High-risk AI systems face stringent requirements including human oversight, transparency obligations, and mandatory conformity assessments before deployment.
          </p>

          {/* Piano inline lock container */}
          {article.locked && <div className="piano-container"></div>}

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            The Act's interaction with GDPR remains a focal point of discussion, particularly around automated decision-making provisions and the scope of data protection impact assessments for AI systems. Organizations deploying AI in EU markets must now navigate overlapping compliance frameworks while preparing for phased implementation deadlines beginning in early 2027.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 16, color: COLORS.neutral }}>Expert Analysis</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
            GDPA's analysis includes expert commentary from data protection authorities, practical implementation checklists for privacy teams, and a comparison matrix showing how AI Act obligations align with existing GDPR requirements. Members can access the full technical analysis, including sample vendor questionnaires and risk assessment templates.
          </p>

          <button style={{
            background: COLORS.primary, color: "white", border: "none",
            padding: "14px 32px", borderRadius: 6, fontWeight: 700,
            fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
          }}>
            Read Full Analysis
          </button>
        </div>
      </div>
    </Layout>
  );
}
