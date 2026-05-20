import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Language options ──────────────────────────────────────────────────────────
const LANGUAGES = [
  { label: "Python",     value: "python",     url: "https://onecompiler.com/python" },
  { label: "C",          value: "c",          url: "https://onecompiler.com/c" },
  { label: "C++",        value: "cpp",        url: "https://onecompiler.com/cpp" },
  { label: "Java",       value: "java",       url: "https://onecompiler.com/java" },
  { label: "JavaScript", value: "javascript", url: "https://onecompiler.com/javascript" },
];

const difficultyColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" };
const difficultyBg    = { Easy: "rgba(34,197,94,0.1)", Medium: "rgba(245,158,11,0.1)", Hard: "rgba(239,68,68,0.1)" };

// ── Questions ─────────────────────────────────────────────────────────────────
const questions = [
  { id: 1,  difficulty: "Easy",   question: "Write a function to add two numbers" },
  { id: 2,  difficulty: "Easy",   question: "Write a function to find square of a number" },
  { id: 3,  difficulty: "Easy",   question: "Write a function to print numbers from 1 to n" },
  { id: 4,  difficulty: "Easy",   question: "Write a function to check even or odd" },
  { id: 5,  difficulty: "Easy",   question: "Write a function to find maximum of two numbers" },
  { id: 6,  difficulty: "Medium", question: "Write a function to find factorial using loop" },
  { id: 7,  difficulty: "Medium", question: "Write a function to reverse a number" },
  { id: 8,  difficulty: "Medium", question: "Write a function to count digits in a number" },
  { id: 9,  difficulty: "Medium", question: "Write a function to check palindrome number" },
  { id: 10, difficulty: "Medium", question: "Write a function to find sum of digits" },
  { id: 11, difficulty: "Medium", question: "Write a function to find GCD of two numbers" },
  { id: 12, difficulty: "Medium", question: "Write a function to check prime number" },
  { id: 13, difficulty: "Medium", question: "Write a function to generate Fibonacci series" },
  { id: 14, difficulty: "Medium", question: "Write a function to find power (x^n)" },
  { id: 15, difficulty: "Medium", question: "Write a function to swap two numbers using reference" },
  { id: 16, difficulty: "Hard",   question: "Write recursive function for factorial" },
  { id: 17, difficulty: "Hard",   question: "Write recursive Fibonacci function" },
  { id: 18, difficulty: "Hard",   question: "Write function to check Armstrong number" },
  { id: 19, difficulty: "Hard",   question: "Write function to count trailing zeros in factorial" },
  { id: 20, difficulty: "Hard",   question: "Write function to convert decimal to binary" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function FunctionPractice() {
  const [current, setCurrent]           = useState(0);
  const [language, setLanguage]         = useState(LANGUAGES[0]);
  const [compilerLoaded, setCompilerLoaded] = useState(false);
  const iframeRef = useRef(null);
  const navigate  = useNavigate();

  const total           = questions.length;
  const q               = questions[current];
  const progressPercent = ((current + 1) / total) * 100;

  const handleLangChange = (e) => {
    const lang = LANGUAGES.find(l => l.value === e.target.value);
    setLanguage(lang);
    if (iframeRef.current) {
      iframeRef.current.src = lang.url;
    }
  };

  const loadCompiler = () => setCompilerLoaded(true);
  const openInNewTab = () => window.open(language.url, "_blank");

  return (
    <div style={styles.page}>

      {/* ── TOP BAR ── */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
          <span style={styles.appTitle}>Function Practice</span>
        </div>

        <div style={styles.topBarRight}>
          {/* Progress */}
          <div style={styles.progressWrap}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
            </div>
            <span style={styles.progressLabel}>{current + 1} / {total}</span>
          </div>

          {/* Language Selector */}
          <select style={styles.langSelect} value={language.value} onChange={handleLangChange}>
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>

          {/* Open in new tab */}
          <button style={styles.newTabBtn} onClick={openInNewTab}>
            Open ↗
          </button>
        </div>
      </div>

      {/* ── SPLIT BODY ── */}
      <div style={styles.splitBody}>

        {/* ══ LEFT: QUESTION PANEL ══ */}
        <div style={styles.leftPanel}>

          {/* Header */}
          <div style={styles.panelHeader}>
            <h1 style={styles.title}>Questions</h1>
            <p style={styles.subtitle}>Solve problems step-by-step using functions · basic → advanced</p>
          </div>

          {/* Question Card */}
          <div style={styles.card}>
            <div style={styles.meta}>
              <span style={styles.qNo}>Q{current + 1}</span>
              <span style={{
                ...styles.badge,
                color: difficultyColor[q.difficulty],
                background: difficultyBg[q.difficulty],
              }}>
                {q.difficulty}
              </span>
            </div>
            <p style={styles.questionText}>{q.question}</p>
          </div>

          {/* Difficulty Legend */}
          <div style={styles.legend}>
            {["Easy", "Medium", "Hard"].map(d => (
              <span key={d} style={styles.legendItem}>
                <span style={{ color: difficultyColor[d], marginRight: 4 }}>●</span>
                {d}
              </span>
            ))}
          </div>

          {/* Navigation */}
          <div style={styles.navRow}>
            <button
              disabled={current === 0}
              onClick={() => setCurrent(c => c - 1)}
              style={{
                ...styles.prevBtn,
                opacity: current === 0 ? 0.4 : 1,
                cursor: current === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrent(c => Math.min(c + 1, total - 1))}
              style={styles.nextBtn}
            >
              {current === total - 1 ? "Finish ✓" : "Next →"}
            </button>
          </div>

        </div>

        {/* ══ DIVIDER ══ */}
        <div style={styles.divider} />

        {/* ══ RIGHT: COMPILER PANEL ══ */}
        <div style={styles.rightPanel}>

          {!compilerLoaded ? (
            /* Placeholder screen */
            <div style={styles.placeholder}>
              <div style={styles.placeholderIcon}>⚡</div>
              <h2 style={styles.placeholderTitle}>Online Compiler</h2>
              <p style={styles.placeholderDesc}>
                Code your solution right here — no tab switching needed.
                Select a language above, then load the compiler.
              </p>
              <div style={styles.compilerInfo}>
                <span style={styles.infoTag}>Powered by OneCompiler</span>
                <span style={styles.infoTag}>70+ Languages</span>
                <span style={styles.infoTag}>Run & Test Instantly</span>
              </div>
              <button style={styles.loadBtn} onClick={loadCompiler}>
                Load Compiler
              </button>
              <p style={styles.placeholderNote}>
                * If compiler doesn't load inline, use the "Open ↗" button in the top bar.
              </p>
            </div>
          ) : (
            /* Embedded iframe */
            <iframe
              ref={iframeRef}
              src={language.url}
              title="Online Compiler"
              style={styles.iframe}
              allow="scripts"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
            />
          )}

        </div>
      </div>
    </div>
  );
}

/* ─────────── STYLES ─────────── */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "radial-gradient(ellipse at top left, #0f172a 0%, #020617 100%)",
    color: "#e2e8f0",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },

  /* Top Bar */
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 18px",
    background: "rgba(15,23,42,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    flexShrink: 0,
    gap: "12px",
    flexWrap: "wrap",
  },
  topBarLeft:  { display: "flex", alignItems: "center", gap: "12px" },
  topBarRight: { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" },

  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },
  appTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#f1f5f9",
  },

  progressWrap: { display: "flex", alignItems: "center", gap: "8px" },
  progressTrack: {
    width: "110px",
    height: "5px",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #4ade80)",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
  progressLabel: { fontSize: "12px", color: "#64748b", minWidth: "42px" },

  langSelect: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
  },
  newTabBtn: {
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.25)",
    color: "#22c55e",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },

  /* Split Body */
  splitBody: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  divider: {
    width: "1px",
    background: "rgba(255,255,255,0.07)",
    flexShrink: 0,
  },

  /* Left Panel */
  leftPanel: {
    width: "380px",
    minWidth: "320px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    padding: "20px 18px",
    gap: "14px",
    overflowY: "auto",
  },

  panelHeader: { paddingBottom: "2px" },
  title:    { fontSize: "22px", fontWeight: "700", color: "#f1f5f9" },
  subtitle: { fontSize: "13px", color: "#475569", marginTop: "4px" },

  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "18px",
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  qNo: { fontSize: "12px", color: "#64748b" },
  badge: {
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  questionText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#f1f5f9",
    lineHeight: "1.55",
  },

  legend: {
    display: "flex",
    gap: "14px",
    fontSize: "12px",
    color: "#475569",
    paddingLeft: "2px",
  },
  legendItem: { display: "flex", alignItems: "center" },

  navRow: {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
  },
  prevBtn: {
    flex: 1,
    padding: "11px",
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    transition: "opacity 0.2s",
  },
  nextBtn: {
    flex: 1,
    padding: "11px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },

  /* Right Panel */
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0,
  },

  iframe: {
    flex: 1,
    border: "none",
    display: "block",
    width: "100%",
    height: "100%",
  },

  /* Placeholder */
  placeholder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "32px 24px",
    textAlign: "center",
  },
  placeholderIcon:  { fontSize: "48px", lineHeight: 1, marginBottom: "4px" },
  placeholderTitle: { fontSize: "20px", fontWeight: "700", color: "#f1f5f9" },
  placeholderDesc: {
    fontSize: "14px",
    color: "#64748b",
    maxWidth: "320px",
    lineHeight: "1.6",
  },
  compilerInfo: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  infoTag: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#94a3b8",
  },
  loadBtn: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "4px",
  },
  placeholderNote: {
    fontSize: "11px",
    color: "#334155",
    maxWidth: "280px",
  },
};