import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ContentCard, LockBadge } from '../components/SharedComponents';
import { COLORS, TRAINING } from '../data';

const TRAINING_RESOURCE_ID = "BR2F9M1P";

export default function TrainingList() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const tp = window.tp || [];
    tp.push(["init", function () {
      window.tp.api.callApi("/access/check", { rid: TRAINING_RESOURCE_ID }, function (response) {
        if (response?.access?.granted || response?.data?.access?.granted) setHasAccess(true);
      });
    }]);
  }, []);

  return (
    <Layout>
      <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Training & Webinars</h2>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>Expert-led sessions on GDPR, AI governance, and emerging privacy regulations.</p>

      <div style={{ display: "grid", gap: 20 }}>
        {TRAINING.map(training => (
          <ContentCard key={training.id} to={`/training/${training.slug}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>{training.code}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6 }}>{training.title}</h3>
                <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666" }}>
                  <span>👤 {training.instructor}</span>
                  <span>📅 {training.date}</span>
                  <span>⏱ {training.duration}</span>
                </div>
              </div>
              <LockBadge locked={training.locked} hasAccess={training.locked && hasAccess} />
            </div>
            <div style={{ marginTop: 12, padding: "8px 12px", background: COLORS.neutralLight, borderRadius: 4, fontSize: 13 }}>
              {training.seats} seats available
            </div>
          </ContentCard>
        ))}
      </div>
    </Layout>
  );
}
