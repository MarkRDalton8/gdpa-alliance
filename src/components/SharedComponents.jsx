import { Link } from 'react-router-dom';
import { COLORS } from '../data';

export const LockBadge = ({ locked }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
    fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px", textTransform: "uppercase",
    background: locked ? "rgba(142, 36, 42, 0.1)" : "rgba(72, 132, 59, 0.1)",
    color: locked ? COLORS.warning : COLORS.primary,
    border: `1px solid ${locked ? "rgba(142, 36, 42, 0.2)" : "rgba(72, 132, 59, 0.2)"}`,
  }}>
    {locked ? "🔒 Member Access" : "✓ Free Access"}
  </span>
);

export const ContentCard = ({ to, children }) => (
  <Link to={to} style={{
    background: "white", borderRadius: 8, padding: "24px 28px",
    border: `1px solid ${COLORS.border}`, textDecoration: "none",
    display: "block", transition: "all 0.25s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    {children}
  </Link>
);
