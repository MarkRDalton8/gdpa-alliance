import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { COLORS } from '../data';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Detect Piano ID session state on mount
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(["init", function () {
      const user = window.tp.pianoId.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserName(`${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email);
      }

      window.tp.pianoId.show({
        loggedIn: function (data) {
          setIsLoggedIn(true);
          setUserName(
            `${data.user.firstName || ""} ${data.user.lastName || ""}`.trim() || data.user.email
          );
        },
        loggedOut: function () {
          setIsLoggedIn(false);
          setUserName("");
        },
      });
    }]);
  }, []);

  // Mount Piano My Account widget whenever login state changes
  useEffect(() => {
    if (!isLoggedIn) return;
    const tp = window.tp || [];
    tp.push(["init", function () {
      if (window.tp.pianoId.getUser()) {
        window.tp.myaccount.show({
          displayMode: "inline",
          containerSelector: "#piano-my-account",
        });
      }
    }]);
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (window.tp && window.tp.pianoId) {
      window.tp.pianoId.show({ screen: "login" });
    }
  };

  return (
    <Layout>
      {/* Piano widget CSS overrides */}
      <style>{`
        #piano-my-account * { box-sizing: border-box; max-width: 100%; }
        #piano-my-account iframe { max-width: 100% !important; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{
          fontSize: 36, fontWeight: 700, marginBottom: 12,
          color: COLORS.neutral, fontFamily: "'Lato', sans-serif",
        }}>
          My Account
        </h2>
        <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
          Manage your profile, membership, and billing.
        </p>

        {isLoggedIn ? (
          <div style={{
            background: "white",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 32,
            minHeight: 400,
            overflow: "auto",
          }}>
            <div id="piano-my-account" />
          </div>
        ) : (
          <div style={{
            background: "white",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 64,
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🔒</div>
            <h3 style={{
              fontSize: 22, fontWeight: 700, marginBottom: 10,
              color: COLORS.neutral, fontFamily: "'Lato', sans-serif",
            }}>
              Sign In Required
            </h3>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32, maxWidth: 380, lineHeight: 1.6 }}>
              Please sign in to view and manage your account settings, membership, and billing.
            </p>
            <button
              onClick={handleLogin}
              style={{
                background: COLORS.primary, color: "white", border: "none",
                borderRadius: 6, padding: "12px 32px", fontSize: 15,
                fontWeight: 700, cursor: "pointer", fontFamily: "'Lato', sans-serif",
              }}
            >
              Sign In with Piano ID
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
