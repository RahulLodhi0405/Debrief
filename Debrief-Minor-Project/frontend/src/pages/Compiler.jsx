import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  {
    label: "Python",
    value: "python",
    url: "https://onecompiler.com/python",
  },

  {
    label: "C",
    value: "c",
    url: "https://onecompiler.com/c",
  },

  {
    label: "C++",
    value: "cpp",
    url: "https://onecompiler.com/cpp",
  },

  {
    label: "Java",
    value: "java",
    url: "https://onecompiler.com/java",
  },

  {
    label: "JavaScript",
    value: "javascript",
    url: "https://onecompiler.com/javascript",
  },
];

export default function Compiler() {

  const navigate = useNavigate();

  const [language, setLanguage] = useState(
    LANGUAGES[0]
  );

  const handleChange = (e) => {

    const lang = LANGUAGES.find(
      (l) => l.value === e.target.value
    );

    setLanguage(lang);
  };

  return (
    <div style={styles.page}>

      {/* TOP BAR */}

      <div style={styles.topBar}>

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backBtn}
        >
          ← Dashboard
        </button>

        {/* HEADING */}

        <h1 style={styles.heading}>

          <span style={styles.brand}>
            Debrief
          </span>

          <span style={styles.x}>
            AI
          </span>

          <span style={styles.sub}>
            Code Studio
          </span>
        </h1>

        {/* LANGUAGE SELECT */}

        <select
          value={language.value}
          onChange={handleChange}
          style={styles.select}
        >
          {LANGUAGES.map((l) => (
            <option
              key={l.value}
              value={l.value}
            >
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* INFO BAR */}

      <div style={styles.infoBar}>

        <div style={styles.infoItem}>
          ⚡ Real-time Coding
        </div>

        <div style={styles.infoItem}>
          🤖 AI Powered Learning
        </div>

        <div style={styles.infoItem}>
          💻 Multi-language Support
        </div>
      </div>

      {/* COMPILER */}

      <iframe
        src={language.url}
        title="Compiler"
        style={styles.iframe}
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
      />

      {/* FOOTER */}

      <div style={styles.footer}>
        Built for coding interview preparation • Debrief Platform
      </div>
    </div>
  );
}

const styles = {

  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#050816",
  },

  /* TOP BAR */

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    padding: "12px 18px",
    background:
      "linear-gradient(90deg, #050816, #0f172a)",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
  },

  /* HEADING */

  heading: {
    fontSize: "16px",
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    letterSpacing: "0.5px",
  },

  /* BRAND */

  brand: {
    background:
      "linear-gradient(90deg, #a855f7, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  /* AI TEXT */

  x: {
    color: "#22d3ee",
    margin: "0 6px",
    fontWeight: "900",
    fontSize: "18px",
  },

  /* SUB */

  sub: {
    color: "#e2e8f0",
    marginLeft: "6px",
  },

  /* BUTTON */

  backBtn: {
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.2s",
  },

  /* SELECT */

  select: {
    background: "#111827",
    color: "#fff",
    border:
      "1px solid rgba(255,255,255,0.1)",
    padding: "8px 12px",
    borderRadius: "10px",
    outline: "none",
    cursor: "pointer",
  },

  /* INFO BAR */

  infoBar: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    padding: "10px",
    background: "#0b1120",
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
    flexWrap: "wrap",
  },

  infoItem: {
    color: "#cbd5e1",
    fontSize: "12px",
    background: "rgba(168,85,247,0.08)",
    border:
      "1px solid rgba(168,85,247,0.2)",
    padding: "6px 12px",
    borderRadius: "999px",
  },

  /* IFRAME */

  iframe: {
    flex: 1,
    width: "100%",
    border: "none",
    background: "#fff",
  },

  /* FOOTER */

  footer: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "12px",
    padding: "8px",
    background: "#0b1120",
    borderTop:
      "1px solid rgba(255,255,255,0.06)",
  },
};