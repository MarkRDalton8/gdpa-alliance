import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LockBadge } from '../components/SharedComponents';
import { COLORS, TRAINING } from '../data';

export default function TrainingDetail() {
  const { slug } = useParams();
  const training = TRAINING.find(t => t.slug === slug);

  if (!training) return <Layout><div style={{textAlign:"center",padding:"48px 0"}}><h1>Training Not Found</h1></div></Layout>;

  return (
    <Layout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, textTransform: "uppercase" }}>{training.code}</span>
            <LockBadge locked={training.locked} />
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: COLORS.neutral, marginBottom: 16, lineHeight: 1.2 }}>{training.title}</h1>
          <div style={{ display: "flex", gap: 20, fontSize: 14, color: "#666" }}>
            <span>👤 {training.instructor}</span>
            <span>📅 {training.date}</span>
            <span>⏱ {training.duration}</span>
          </div>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 48 }}>
          <div style={{ marginBottom: 24, padding: "12px 16px", background: COLORS.neutralLight, borderRadius: 6 }}>
            <strong>{training.seats} seats available</strong>
          </div>

          {training.locked ? (
            <div style={{ background: `${COLORS.primary}10`, border: `2px solid ${COLORS.primary}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.neutral, marginBottom: 12 }}>Member-Only Training</h3>
              <p style={{ fontSize: 16, color: "#666", marginBottom: 24 }}>This training session is available exclusively to GDPA members.</p>
              <button style={{ background: COLORS.primary, color: "white", border: "none", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Activate Site License</button>
            </div>
          ) : (
            <button style={{ background: COLORS.primary, color: "white", border: "none", padding: "12px 24px", borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Register Now</button>
          )}
        </div>
      </div>
    </Layout>
  );
}
