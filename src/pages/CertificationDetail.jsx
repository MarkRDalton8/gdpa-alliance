import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LockBadge } from '../components/SharedComponents';
import { COLORS, CERTIFICATIONS } from '../data';

export default function CertificationDetail() {
  const { slug } = useParams();
  const cert = CERTIFICATIONS.find(c => c.slug === slug);

  if (!cert) return <Layout><div style={{textAlign:"center",padding:"48px 0"}}><h1>Certification Not Found</h1></div></Layout>;

  return (
    <Layout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, textTransform: "uppercase" }}>{cert.level}</span>
            <LockBadge locked={cert.locked} />
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: COLORS.neutral, marginBottom: 16, lineHeight: 1.2 }}>{cert.title}</h1>
          <div style={{ fontSize: 14, color: "#666" }}>⏱ {cert.duration}</div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: COLORS.neutral }}>Program Overview</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>{cert.description}</p>

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            The certification curriculum covers 12 comprehensive modules including GDPR foundations, lawful bases for processing, data subject rights, cross-border transfers, privacy by design principles, and recent enforcement case analysis. Participants will master practical implementation strategies through real-world scenarios and interactive workshops led by practicing privacy professionals.
          </p>

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
            This globally recognized credential demonstrates your expertise to employers and clients, with 92% of certificate holders reporting career advancement within one year. The program includes access to our online learning platform, practice exams, and exclusive member forums for ongoing professional development.
          </p>

          <button style={{
            background: COLORS.primary, color: "white", border: "none",
            padding: "14px 32px", borderRadius: 6, fontWeight: 700,
            fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
          }}>
            View Full Curriculum & Enroll
          </button>
        </div>
      </div>
    </Layout>
  );
}
