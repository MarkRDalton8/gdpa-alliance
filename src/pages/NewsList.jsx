import Layout from '../components/Layout';
import { ContentCard, LockBadge } from '../components/SharedComponents';
import { COLORS, NEWS } from '../data';

export default function NewsList() {
  return (
    <Layout>
      <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy News</h2>
      <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>Latest updates on privacy regulations, enforcement actions, and industry developments.</p>

      <div style={{ display: "grid", gap: 20 }}>
        {NEWS.map(article => (
          <ContentCard key={article.id} to={`/news/${article.slug}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginBottom: 4, textTransform: "uppercase" }}>{article.category}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6 }}>{article.title}</h3>
                <div style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>📅 {article.date}</div>
              </div>
              <LockBadge locked={article.locked} />
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{article.excerpt}</p>
          </ContentCard>
        ))}
      </div>
    </Layout>
  );
}
