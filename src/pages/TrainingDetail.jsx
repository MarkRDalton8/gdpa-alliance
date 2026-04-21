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
      {training.locked && (
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
          <div style={{ marginBottom: 24, padding: "12px 16px", background: COLORS.neutralLight, borderRadius: 6, fontSize: 14, color: "#666" }}>
            <strong style={{ color: COLORS.neutral }}>{training.seats} seats remaining</strong> • Live session with Q&A
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: COLORS.neutral }}>Session Overview</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            Join us for an expert-led deep dive into the latest GDPR enforcement trends shaping privacy compliance in 2026. This advanced session analyzes recent CJEU rulings, supervisory authority coordination patterns, and emerging violation categories that every privacy professional needs to understand.
          </p>

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            We'll examine 15 significant enforcement actions from Q1 2026, exploring regulatory interpretation shifts around consent mechanisms, legitimate interest balancing tests, and processor-controller liability allocation. Participants will gain practical frameworks for assessing compliance risk and implementing defensive strategies based on current enforcement priorities.
          </p>

          {/* Piano inline lock container */}
          {training.locked && <div className="piano-container"></div>}

          <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 16, color: COLORS.neutral }}>What You'll Learn</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
            The session includes live polling, case study breakouts, and dedicated Q&A time with the instructor. All registrants receive session recordings, slide decks, and a curated resource library of referenced enforcement decisions.
          </p>

          <button
            onClick={() => {
              if (training.offerId && window.tp) {
                window.tp.push(["init", function () {
                  window.tp.offer.show({ offerId: training.offerId, displayMode: "modal" });
                }]);
              }
            }}
            style={{
              background: COLORS.primary, color: "white", border: "none",
              padding: "14px 32px", borderRadius: 6, fontWeight: 700,
              fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
            }}>
            {training.offerId ? "Register Now" : "Register for Session"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
