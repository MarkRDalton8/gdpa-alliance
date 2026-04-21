import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LockBadge } from '../components/SharedComponents';
import { COLORS, CERTIFICATIONS } from '../data';

export default function CertificationDetail() {
  const { slug } = useParams();
  const cert = CERTIFICATIONS.find(c => c.slug === slug);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!cert?.resourceId) return;
    const tp = window.tp || [];
    tp.push(["init", function () {
      window.tp.api.callApi("/access/check", { rid: cert.resourceId }, function (response) {
        if (response?.data?.access?.granted) setHasAccess(true);
      });
    }]);
  }, [cert?.resourceId]);

  if (!cert) return <Layout><div style={{textAlign:"center",padding:"48px 0"}}><h1>Certification Not Found</h1></div></Layout>;

  return (
    <Layout>
      {cert.locked && (
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

          {/* Piano inline lock container */}
          {cert.locked && <div className="piano-container"></div>}

          <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 16, color: COLORS.neutral }}>Learning Outcomes</h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 24 }}>
            This globally recognized credential demonstrates your expertise to employers and clients, with 92% of certificate holders reporting career advancement within one year. The program includes access to our online learning platform, practice exams, and exclusive member forums for ongoing professional development.
          </p>

          {hasAccess ? (
            <button style={{
              background: COLORS.secondary, color: "white", border: "none",
              padding: "14px 32px", borderRadius: 6, fontWeight: 700,
              fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
            }}>
              Start Exam →
            </button>
          ) : (
            <button
              onClick={() => {
                if (cert.offerId && window.tp) {
                  window.tp.push(["init", function () {
                    window.tp.offer.show({ offerId: cert.offerId, displayMode: "modal" });
                  }]);
                }
              }}
              style={{
                background: COLORS.primary, color: "white", border: "none",
                padding: "14px 32px", borderRadius: 6, fontWeight: 700,
                fontSize: 16, cursor: "pointer", fontFamily: "'Lato', sans-serif",
              }}>
              {cert.offerId ? "Enroll Now" : "View Full Curriculum & Enroll"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
