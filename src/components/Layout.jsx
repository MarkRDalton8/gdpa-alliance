import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../data';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Re-execute Composer experiences on every route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.push(["init", function () {
        window.tp.experience.execute();
      }]);
    }
  }, [location.pathname]);

  // Set up Piano ID callbacks and restore existing session on mount
  useEffect(() => {
    const setupPianoCallbacks = () => {
      if (typeof window !== 'undefined' && window.tp) {
        window.tp.push(["init", function() {
          // Restore session if user is already logged in
          const user = window.tp.pianoId.getUser();
          if (user) {
            setIsLoggedIn(true);
            setUserName(`${user.given_name || user.firstName || ''} ${user.family_name || user.lastName || ''}`.trim() || user.email);
            setUserEmail(user.email);
          }

          window.tp.push(["addHandler", "loginSuccess", function(data) {
            setIsLoggedIn(true);
            setUserName(`${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email);
            setUserEmail(data.user.email);
          }]);
          window.tp.push(["addHandler", "checkoutComplete", function(data) {
            sessionStorage.setItem("gdpa_purchase", JSON.stringify({
              termName: data.termName || "",
              chargeAmount: data.chargeAmount || 0,
              chargeCurrency: data.chargeCurrency || "USD",
              startDate: data.startDate || "",
              expireDate: data.expireDate || "",
            }));
            navigate("/welcome");
          }]);
        }]);
      } else {
        setTimeout(setupPianoCallbacks, 100);
      }
    };
    setupPianoCallbacks();
  }, []);

  const handleLogin = () => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.push(["init", function() {
        window.tp.pianoId.show({
          screen: "register",
          displayMode: "modal",
          loggedIn: function(data) {
            try {
              window.tp.pianoId.hide();
            } catch (e) {}
            setIsLoggedIn(true);
            setUserName(`${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email);
            setUserEmail(data.user.email);
            navigate("/account");
          }
        });
      }]);
    } else {
      setTimeout(handleLogin, 200);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.pianoId.logout();
    }
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    navigate("/");
  };

  const navItems = [
    { key: "certifications", label: "Certifications", path: "/certifications" },
    { key: "training", label: "Training", path: "/training" },
    { key: "resources", label: "Resources", path: "/resources" },
    { key: "news", label: "News", path: "/news" },
    { key: "membership", label: "Membership", path: "/membership" },
    { key: "account", label: "My Account", path: "/account" },
  ];

  return (
    <div style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.neutral, background: COLORS.neutralLight, minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "white", borderBottom: `1px solid ${COLORS.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            <Link to="/" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
              <div style={{ width: 48, height: 48, background: COLORS.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "white", fontFamily: "'Lato', sans-serif" }}>G</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, color: COLORS.neutral, fontFamily: "'Lato', sans-serif", lineHeight: 1.2 }}>GDPA</div>
                <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.5px" }}>Global Data Privacy Alliance</div>
              </div>
            </Link>

            <nav style={{ display: "flex", gap: 32 }}>
              {navItems.map(item => (
                <Link key={item.key} to={item.path} style={{
                  textDecoration: "none", fontWeight: 500, fontSize: 14, color: COLORS.neutral,
                  fontFamily: "'Lato', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px",
                  padding: "8px 0", borderBottom: "2px solid transparent", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.primary}
                onMouseLeave={e => e.currentTarget.style.color = COLORS.neutral}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {!isLoggedIn ? (
              <button onClick={handleLogin} style={{
                background: COLORS.primary, color: "white", border: "none",
                padding: "10px 24px", borderRadius: 6, fontWeight: 600,
                fontSize: 14, cursor: "pointer", fontFamily: "'Lato', sans-serif",
              }}>Sign In</button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.neutral }}>{userName}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{userEmail}</div>
                </div>
                <button onClick={handleLogout} style={{
                  background: "white", color: COLORS.neutral, border: `1px solid ${COLORS.border}`,
                  padding: "8px 16px", borderRadius: 6, fontWeight: 500, fontSize: 13, cursor: "pointer",
                }}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        {children}
      </main>

      <footer style={{ background: COLORS.neutral, color: "white", padding: "48px 32px", marginTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, fontFamily: "'Lato', sans-serif" }}>GDPA</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>Global Data Privacy Alliance</div>
          <div style={{ fontSize: 13, opacity: 0.6 }}>© 2026 GDPA. Demo site for Piano Site Licensing capabilities.</div>
        </div>
      </footer>
    </div>
  );
}
