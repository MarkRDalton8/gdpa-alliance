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
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: COLORS.neutral }}>Overview</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>{resource.description}</p>

          {resource.locked ? (
            <div style={{ background: `${COLORS.primary}10`, border: `2px solid ${COLORS.primary}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.neutral, marginBottom: 12 }}>Member-Only Content</h3>
              <p style={{ fontSize: 16, color: "#666", marginBottom: 24 }}>This resource is available exclusively to GDPA members with an active site license.</p>
              <button style={{
                background: COLORS.primary, color: "white", border: "none",
                padding: "14px 32px", borderRadius: 6, fontWeight: 700,
                fontSize: 16, cursor: "pointer",
              }}>Activate Site License</button>
            </div>
          ) : (
            <button style={{
              background: COLORS.primary, color: "white", border: "none",
              padding: "12px 24px", borderRadius: 6, fontWeight: 600,
              fontSize: 14, cursor: "pointer",
            }}>Download PDF</button>
          )}
        </div>
      </div>
    </Layout>
  );
}
