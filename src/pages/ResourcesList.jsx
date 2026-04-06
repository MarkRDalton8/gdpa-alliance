import Layout from '../components/Layout';
import { ContentCard, LockBadge } from '../components/SharedComponents';
import { COLORS, RESOURCES } from '../data';

export default function ResourcesList() {
  return (
    <Layout>
      <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy Resources</h2>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Research reports, whitepapers, templates, and tools for privacy professionals.</p>

      <div style={{ display: "grid", gap: 20 }}>
        {RESOURCES.map(resource => (
          <ContentCard key={resource.id} to={`/resources/${resource.slug}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>{resource.title}</h3>
                <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666", marginBottom: 8 }}>
                  <span>📄 {resource.type}</span>
                  <span>📅 {resource.date}</span>
                  <span>📖 {resource.pages} pages</span>
                </div>
              </div>
              <LockBadge locked={resource.locked} />
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{resource.description}</p>
          </ContentCard>
        ))}
      </div>
    </Layout>
  );
}
