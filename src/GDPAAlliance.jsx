import { useState, useEffect, useRef } from "react";

// ============================================================
// PIANO SDK CONFIGURATION
// ============================================================
const PIANO_CONFIG = {
  AID: "gtdSyi74su",
  SANDBOX: true,
  PIANO_JS_URL: "https://sandbox.tinypass.com/xbuilder/experience/load?aid=gtdSyi74su",
};

// ============================================================
// MOCK DATA - Privacy Professional Content
// ============================================================
const CERTIFICATIONS = [
  { id: 1, title: "Certified Information Privacy Professional (CIPP/E)", level: "Professional", duration: "3 months", description: "Comprehensive European privacy law certification covering GDPR, DPD, and emerging regulations across EU member states.", locked: true },
  { id: 2, title: "Certified Information Privacy Manager (CIPM)", level: "Management", duration: "2 months", description: "Privacy program management certification focusing on operational frameworks, vendor management, and organizational compliance.", locked: true },
  { id: 3, title: "Privacy Fundamentals Certificate", level: "Foundation", duration: "4 weeks", description: "Introduction to global privacy principles, key regulations, and foundational concepts for professionals new to privacy.", locked: false },
  { id: 4, title: "Certified Information Privacy Technologist (CIPT)", level: "Technical", duration: "3 months", description: "Technical privacy certification covering privacy engineering, security controls, and privacy-enhancing technologies.", locked: true },
];

const TRAINING = [
  { id: 1, code: "GDPR-301", title: "Advanced GDPR Enforcement Trends 2026", instructor: "Sarah Chen, CIPP/E", date: "Apr 15, 2026", seats: 45, duration: "90 min", locked: true },
  { id: 2, code: "AI-200", title: "AI Governance & Privacy Risk Assessment", instructor: "Dr. Marcus Rodriguez", date: "Apr 22, 2026", seats: 60, duration: "120 min", locked: true },
  { id: 3, code: "INTRO-100", title: "Privacy Law Fundamentals Webinar", instructor: "Jennifer Park, CIPP/US", date: "Apr 8, 2026", seats: 200, duration: "60 min", locked: false },
  { id: 4, code: "CPRA-250", title: "CPRA Implementation Workshop", instructor: "Kevin Thompson, CIPM", date: "Apr 29, 2026", seats: 35, duration: "180 min", locked: true },
];

const RESOURCES = [
  { id: 1, title: "Global Privacy Enforcement Tracker 2026", type: "Research Report", date: "Mar 2026", pages: 142, description: "Comprehensive analysis of global privacy enforcement actions, penalties, and regulatory trends across 85 jurisdictions.", locked: true },
  { id: 2, title: "Data Transfer Mechanisms: Post-Schrems II Landscape", type: "White Paper", date: "Feb 2026", pages: 28, description: "Practical guidance on implementing valid data transfer mechanisms following major CJEU decisions.", locked: true },
  { id: 3, title: "Privacy by Design: Implementation Checklist", type: "Tool", date: "Mar 2026", pages: 8, description: "Free checklist for integrating privacy considerations into product development and business processes.", locked: false },
  { id: 4, title: "AI Privacy Impact Assessment Template", type: "Template", date: "Jan 2026", pages: 15, description: "Customizable DPIA template specifically designed for AI/ML systems and algorithmic decision-making.", locked: true },
];

const NEWS = [
  { id: 1, title: "EU Council Approves AI Act: Privacy Professionals Respond", date: "Apr 4, 2026", category: "Regulation", excerpt: "The European Council's final approval of the AI Act marks a watershed moment for algorithmic governance. Privacy professionals weigh in on compliance implications.", locked: false },
  { id: 2, title: "GDPA Annual Conference 2026 Registration Now Open", date: "Apr 2, 2026", category: "Events", excerpt: "Join 5,000+ privacy professionals in Barcelona this September for the world's largest privacy conference featuring 200+ sessions and workshops.", locked: false },
  { id: 3, title: "California Privacy Protection Agency Issues First Enforcement Action", date: "Mar 29, 2026", category: "Enforcement", excerpt: "CPPA's inaugural enforcement proceeding signals aggressive stance on CPRA violations. Analysis of penalties and compliance takeaways.", locked: true },
  { id: 4, title: "New Research: Privacy Professionals Salary Survey Results", date: "Mar 26, 2026", category: "Industry", excerpt: "Comprehensive compensation analysis reveals 18% year-over-year salary growth for privacy professionals amid global talent shortage.", locked: true },
];

// ============================================================
// STYLED COMPONENTS - IAPP-inspired Design
// ============================================================
const COLORS = {
  primary: "#48843B",      // IAPP green
  primaryLight: "#71BF4B",
  primaryDark: "#3A6B2F",
  secondary: "#0078B7",    // IAPP blue
  neutral: "#231F20",
  neutralLight: "#F4F4F4",
  border: "#E5E5E5",
  success: "#227845",
  warning: "#8E242A",
};

const LockBadge = ({ locked }) => (
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

const ContentCard = ({ children, onClick, style }) => (
  <div onClick={onClick} style={{
    background: "white", borderRadius: 8, padding: "24px 28px",
    border: `1px solid ${COLORS.border}`, cursor: onClick ? "pointer" : "default",
    transition: "all 0.25s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    ...style,
  }}
  onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.boxShadow = "0 4px 16px rgba(72,132,59,0.12)"; }}}
  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
  >
    {children}
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
export default function GDPAAlliance() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const pianoAccountRef = useRef(null);

  // Set up Piano ID callbacks
  useEffect(() => {
    const setupPianoCallbacks = () => {
      if (typeof window !== 'undefined' && window.tp) {
        console.log("Setting up Piano ID callbacks");
        window.tp.push(["init", function() {
          console.log("Piano initialized");

          // Set up login callback
          window.tp.push(["addHandler", "loginSuccess", function(data) {
            console.log("Piano ID logged in:", data);
            setIsLoggedIn(true);
            setUserName(`${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email);
            setUserEmail(data.user.email);

            // Check for site license access
            window.tp.api.callApi("/access/list", {}, function(response) {
              console.log("Access list response:", response);
              if (response && response.data) {
                const hasSiteLicense = response.data.some(access =>
                  access.resource && access.resource.name &&
                  access.resource.name.toLowerCase().includes('site')
                );
                setHasLicense(hasSiteLicense);
                console.log("Has site license:", hasSiteLicense);

                // Redirect after login/signup
                console.log("Redirecting user...");
                if (hasSiteLicense) {
                  setCurrentPage("account"); // Go to My Account if they have a license
                } else {
                  setCurrentPage("home"); // Go to home page
                }
              } else {
                console.log("No access data, redirecting to home");
                setCurrentPage("home"); // Default redirect
              }
            });
          }]);
        }]);
      } else {
        // Retry after a short delay if Piano SDK not loaded yet
        setTimeout(setupPianoCallbacks, 100);
      }
    };

    setupPianoCallbacks();
  }, []);

  // Real Piano ID login
  const handleLogin = () => {
    console.log("handleLogin called");
    if (typeof window !== 'undefined' && window.tp) {
      console.log("Piano SDK available, showing login");
      window.tp.push(["init", function() {
        // Use register screen which doesn't require existing auth
        window.tp.pianoId.show({
          screen: "register",
          displayMode: "modal",
          loggedIn: function(data) {
            console.log("🔵 Piano ID loggedIn callback fired!", data);

            // Close the Piano ID modal
            try {
              window.tp.pianoId.hide();
            } catch (e) {
              console.log("Could not close modal:", e);
            }

            setIsLoggedIn(true);
            setUserName(`${data.user.given_name || ''} ${data.user.family_name || ''}`.trim() || data.user.email);
            setUserEmail(data.user.email);

            // Simple redirect first - just go to account page
            console.log("🔵 Redirecting to account page...");
            setCurrentPage("account");

            // Check for site license access in background
            window.tp.api.callApi("/access/list", {}, function(response) {
              console.log("Access list response:", response);
              if (response && response.data) {
                const hasSiteLicense = response.data.some(access =>
                  access.resource && access.resource.name &&
                  access.resource.name.toLowerCase().includes('site')
                );
                setHasLicense(hasSiteLicense);
                console.log("Has site license:", hasSiteLicense);
              }
            });
          }
        });
      }]);
    } else {
      console.error("Piano SDK not loaded yet");
      // Retry after a short delay
      setTimeout(handleLogin, 200);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined' && window.tp) {
      window.tp.pianoId.logout();
    }
    // Also update local state immediately
    setIsLoggedIn(false);
    setHasLicense(false);
    setUserName("");
    setUserEmail("");
    setCurrentPage("home");
  };

  const activateLicense = () => {
    setHasLicense(true);
    setShowLicenseModal(false);
  };

  const navItems = [
    { key: "home", label: "Home" },
    { key: "certifications", label: "Certifications" },
    { key: "training", label: "Training" },
    { key: "resources", label: "Resources" },
    { key: "news", label: "News" },
  ];
  if (isLoggedIn) navItems.push({ key: "account", label: "My Account" });

  const handleContentClick = (locked) => {
    if (!isLoggedIn) {
      handleLogin();
    } else if (locked && !hasLicense) {
      setShowLicenseModal(true);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.neutral, background: COLORS.neutralLight, minHeight: "100vh" }}>

      {/* HEADER */}
      <header style={{ background: "white", borderBottom: `1px solid ${COLORS.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

            {/* Logo */}
            <div onClick={() => setCurrentPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, background: COLORS.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: "white", fontFamily: "'Lato', sans-serif" }}>
                G
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, color: COLORS.neutral, fontFamily: "'Lato', sans-serif", lineHeight: 1.2 }}>GDPA</div>
                <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.5px" }}>Global Data Privacy Alliance</div>
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ display: "flex", gap: 32 }}>
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontWeight: currentPage === item.key ? 700 : 500,
                    fontSize: 14, color: currentPage === item.key ? COLORS.primary : COLORS.neutral,
                    fontFamily: "'Lato', sans-serif", textTransform: "uppercase",
                    letterSpacing: "0.5px", padding: "8px 0",
                    borderBottom: currentPage === item.key ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={e => { if (currentPage !== item.key) e.currentTarget.style.color = COLORS.neutral; }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Auth Button */}
            {!isLoggedIn ? (
              <button onClick={handleLogin} style={{
                background: COLORS.primary, color: "white", border: "none",
                padding: "10px 24px", borderRadius: 6, fontWeight: 600,
                fontSize: 14, cursor: "pointer", fontFamily: "'Lato', sans-serif",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
              >
                Sign In
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.neutral }}>{userName}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{userEmail}</div>
                </div>
                <button onClick={handleLogout} style={{
                  background: "white", color: COLORS.neutral, border: `1px solid ${COLORS.border}`,
                  padding: "8px 16px", borderRadius: 6, fontWeight: 500,
                  fontSize: 13, cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.color = COLORS.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.neutral; }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>

        {/* HOME PAGE */}
        {currentPage === "home" && (
          <div>
            {/* Hero Section */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`, borderRadius: 12, padding: "64px 48px", marginBottom: 48, color: "white" }}>
              <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16, fontFamily: "'Lato', sans-serif", lineHeight: 1.2 }}>
                Advancing Privacy Excellence<br/>Across the Globe
              </h1>
              <p style={{ fontSize: 20, opacity: 0.95, maxWidth: 680, lineHeight: 1.6 }}>
                Join 30,000+ privacy professionals advancing their careers through world-class certifications, training, and resources from the leading global privacy community.
              </p>
              {!hasLicense && (
                <button onClick={() => isLoggedIn ? setShowLicenseModal(true) : handleLogin()} style={{
                  background: "white", color: COLORS.primary, border: "none",
                  padding: "14px 32px", borderRadius: 6, fontWeight: 700,
                  fontSize: 16, cursor: "pointer", marginTop: 32,
                  transition: "transform 0.2s ease", fontFamily: "'Lato', sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {isLoggedIn ? "Activate Site License" : "Get Started"}
                </button>
              )}
            </div>

            {/* Feature Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              <ContentCard onClick={() => setCurrentPage("certifications")}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>🎓</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Certifications</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Industry-recognized credentials that demonstrate your privacy expertise and advance your career.</p>
              </ContentCard>

              <ContentCard onClick={() => setCurrentPage("training")}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>📚</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Training</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Expert-led courses and webinars covering GDPR, AI governance, and emerging privacy regulations.</p>
              </ContentCard>

              <ContentCard onClick={() => setCurrentPage("resources")}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>📖</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Resources</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Research reports, templates, and tools to support your privacy program implementation.</p>
              </ContentCard>
            </div>
          </div>
        )}

        {/* CERTIFICATIONS PAGE */}
        {currentPage === "certifications" && (
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy Certifications</h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Industry-recognized credentials that validate your expertise and advance your privacy career.</p>

            <div style={{ display: "grid", gap: 20 }}>
              {CERTIFICATIONS.map(cert => (
                <ContentCard key={cert.id} onClick={() => handleContentClick(cert.locked)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>{cert.title}</h3>
                      <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666", marginBottom: 8 }}>
                        <span>📊 {cert.level}</span>
                        <span>⏱ {cert.duration}</span>
                      </div>
                    </div>
                    <LockBadge locked={cert.locked} />
                  </div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, filter: cert.locked && !hasLicense ? "blur(3px)" : "none" }}>
                    {cert.description}
                  </p>
                </ContentCard>
              ))}
            </div>
          </div>
        )}

        {/* TRAINING PAGE */}
        {currentPage === "training" && (
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Training & Webinars</h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Expert-led sessions on GDPR, AI governance, and emerging privacy regulations.</p>

            <div style={{ display: "grid", gap: 20 }}>
              {TRAINING.map(course => (
                <ContentCard key={course.id} onClick={() => handleContentClick(course.locked)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginBottom: 4, fontFamily: "'Lato', sans-serif" }}>{course.code}</div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>{course.title}</h3>
                      <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666" }}>
                        <span>👤 {course.instructor}</span>
                        <span>📅 {course.date}</span>
                        <span>⏱ {course.duration}</span>
                      </div>
                    </div>
                    <LockBadge locked={course.locked} />
                  </div>
                  <div style={{ marginTop: 12, padding: "8px 12px", background: COLORS.neutralLight, borderRadius: 4, fontSize: 13, color: "#666" }}>
                    {course.seats} seats available
                  </div>
                </ContentCard>
              ))}
            </div>
          </div>
        )}

        {/* RESOURCES PAGE */}
        {currentPage === "resources" && (
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy Resources</h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Research reports, whitepapers, templates, and tools for privacy professionals.</p>

            <div style={{ display: "grid", gap: 20 }}>
              {RESOURCES.map(resource => (
                <ContentCard key={resource.id} onClick={() => handleContentClick(resource.locked)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>{resource.title}</h3>
                      <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666", marginBottom: 8 }}>
                        <span>📄 {resource.type}</span>
                        <span>📅 {resource.date}</span>
                        <span>📖 {resource.pages} pages</span>
                      </div>
                    </div>
                    <LockBadge locked={resource.locked} />
                  </div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, filter: resource.locked && !hasLicense ? "blur(3px)" : "none" }}>
                    {resource.description}
                  </p>
                </ContentCard>
              ))}
            </div>
          </div>
        )}

        {/* NEWS PAGE */}
        {currentPage === "news" && (
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Privacy News</h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Latest updates on privacy regulations, enforcement actions, and industry developments.</p>

            <div style={{ display: "grid", gap: 20 }}>
              {NEWS.map(article => (
                <ContentCard key={article.id} onClick={() => handleContentClick(article.locked)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'Lato', sans-serif" }}>{article.category}</div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.neutral, marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>{article.title}</h3>
                      <div style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>📅 {article.date}</div>
                    </div>
                    <LockBadge locked={article.locked} />
                  </div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, filter: article.locked && !hasLicense ? "blur(3px)" : "none" }}>
                    {article.excerpt}
                  </p>
                </ContentCard>
              ))}
            </div>
          </div>
        )}

        {/* MY ACCOUNT PAGE */}
        {currentPage === "account" && (
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>My Account</h2>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Manage your profile, certifications, and membership.</p>

            {/* Account Summary */}
            <ContentCard style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{ width: 80, height: 80, background: COLORS.primary, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "white", fontWeight: 700, fontFamily: "'Lato', sans-serif" }}>
                  {userName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>{userName}</h3>
                  <p style={{ fontSize: 14, color: "#666", marginBottom: 2 }}>{userEmail}</p>
                  <div style={{ display: "inline-block", padding: "4px 12px", background: hasLicense ? "rgba(72, 132, 59, 0.1)" : "rgba(142, 36, 42, 0.1)", color: hasLicense ? COLORS.primary : COLORS.warning, borderRadius: 20, fontSize: 12, fontWeight: 600, marginTop: 8 }}>
                    {hasLicense ? "✓ Site License Active" : "No Active License"}
                  </div>
                </div>
              </div>

              {!hasLicense && (
                <button onClick={() => setShowLicenseModal(true)} style={{
                  background: COLORS.primary, color: "white", border: "none",
                  padding: "12px 24px", borderRadius: 6, fontWeight: 600,
                  fontSize: 14, cursor: "pointer", width: "100%",
                  transition: "background 0.2s ease", fontFamily: "'Lato', sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
                >
                  Activate Site License
                </button>
              )}
            </ContentCard>

            {/* Piano My Account Widget Container */}
            <ContentCard>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Account Settings</h3>
              <div
                id="piano-my-account"
                ref={pianoAccountRef}
                style={{ minHeight: 400, padding: 20, background: COLORS.neutralLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
                  <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Piano My Account Widget</p>
                  <p style={{ fontSize: 14 }}>Wire up tp.myaccount.show() here in production</p>
                  <code style={{ display: "block", marginTop: 16, padding: 12, background: "white", borderRadius: 6, fontSize: 12, color: COLORS.neutral, fontFamily: "monospace" }}>
                    tp.myaccount.show(&#123;containerSelector: "#piano-my-account"&#125;)
                  </code>
                </div>
              </div>
            </ContentCard>
          </div>
        )}

      </main>

      {/* LICENSE ACTIVATION MODAL */}
      {showLicenseModal && (
        <div onClick={() => setShowLicenseModal(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 12, padding: 48, maxWidth: 480, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, color: COLORS.neutral, fontFamily: "'Lato', sans-serif" }}>Activate Site License</h3>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>Your organization has provided GDPA membership access. Activate your license to unlock all member content.</p>

            <div id="piano-license-container" style={{ minHeight: 200, padding: 24, background: COLORS.neutralLight, borderRadius: 8, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Piano offer template would appear here</p>
                <button onClick={activateLicense} style={{
                  background: COLORS.primary, color: "white", border: "none",
                  padding: "12px 32px", borderRadius: 6, fontWeight: 600,
                  fontSize: 14, cursor: "pointer", fontFamily: "'Lato', sans-serif",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
                onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
                >
                  Activate License
                </button>
              </div>
            </div>

            <button onClick={() => setShowLicenseModal(false)} style={{
              background: "transparent", color: "#666", border: "none",
              padding: "12px", width: "100%", borderRadius: 6,
              fontSize: 14, cursor: "pointer", transition: "color 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.neutral}
            onMouseLeave={e => e.currentTarget.style.color = "#666"}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: COLORS.neutral, color: "white", padding: "48px 32px", marginTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, fontFamily: "'Lato', sans-serif" }}>GDPA</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>Global Data Privacy Alliance</div>
          <div style={{ fontSize: 13, opacity: 0.6 }}>
            © 2026 GDPA. Demo site for Piano Site Licensing capabilities.
          </div>
        </div>
      </footer>
    </div>
  );
}
