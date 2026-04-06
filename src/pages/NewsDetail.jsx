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
          <p style={{ fontSize: 18, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>{article.excerpt}</p>

          {article.locked ? (
            <div style={{ background: `${COLORS.primary}10`, border: `2px solid ${COLORS.primary}`, borderRadius: 8, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.neutral, marginBottom: 12 }}>Member-Only Article</h3>
              <p style={{ fontSize: 16, color: "#666", marginBottom: 24 }}>This article is available exclusively to GDPA members.</p>
              <button style={{ background: COLORS.primary, color: "white", border: "none", padding: "14px 32px", borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Activate Site License</button>
            </div>
          ) : (
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8 }}>Full article content would appear here...</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
