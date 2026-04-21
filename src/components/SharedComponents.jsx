import { Link } from 'react-router-dom';
import { COLORS } from '../data';

export const LockBadge = ({ locked, hasAccess }) => {
  if (!locked) return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px", textTransform: "uppercase",
      background: "rgba(72, 132, 59, 0.1)", color: COLORS.primary,
      border: "1px solid rgba(72, 132, 59, 0.2)",
    }}>
      ✓ Free Access
    </span>
  );
  if (hasAccess) return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px", textTransform: "uppercase",
      background: "rgba(72, 132, 59, 0.1)", color: COLORS.primary,
      border: "1px solid rgba(72, 132, 59, 0.2)",
    }}>
      🔓 Member Access
    </span>
  );
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      fontFamily: "'Lato', sans-serif", letterSpacing: "0.5px", textTransform: "uppercase",
      background: "rgba(142, 36, 42, 0.1)", color: COLORS.warning,
      border: "1px solid rgba(142, 36, 42, 0.2)",
    }}>
      🔒 Member Access
    </span>
  );
};

export const ContentCard = ({ to, children }) => (
  <Link to={to} style={{
    background: "white", borderRadius: 8, padding: "24px 28px",
    border: `1px solid ${COLORS.border}`, textDecoration: "none",
    display: "block", transition: "all 0.25s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    {children}
  </Link>
);
