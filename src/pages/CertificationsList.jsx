import Layout from '../components/Layout';
import { ContentCard, LockBadge } from '../components/SharedComponents';
import { COLORS, CERTIFICATIONS } from '../data';

export default function CertificationsList() {
  return (
    <Layout>
      <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy Certifications</h2>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>Industry-recognized credentials that validate your expertise.</p>

      <div style={{ display: "grid", gap: 20 }}>
        {CERTIFICATIONS.map(cert => (
          <ContentCard key={cert.id} to={`/certifications/${cert.slug}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6 }}>{cert.title}</h3>
                <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666" }}>
                  <span>📊 {cert.level}</span>
                  <span>⏱ {cert.duration}</span>
                </div>
              </div>
              <LockBadge locked={cert.locked} />
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{cert.description}</p>
          </ContentCard>
        ))}
      </div>
    </Layout>
  );
}
