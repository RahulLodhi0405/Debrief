import { useState, useRef } from "react";

const questions = [
  // ---------- EASY ----------
  {
    id: 1,
    difficulty: "Easy",
    question: "Take a number from the user and print whether the number is Even or Odd."
  },
  {
    id: 2,
    difficulty: "Easy",
    question: "Input a number and check whether it is Positive, Negative, or Zero."
  },
  {
    id: 3,
    difficulty: "Easy",
    question: "Take age as input and print Eligible if the person is 18 years or older, otherwise print Not Eligible."
  },
  {
    id: 4,
    difficulty: "Easy",
    question: "Input two numbers and print the greater number between them."
  },
  {
    id: 5,
    difficulty: "Easy",
    question: "Check whether a number is divisible by both 3 and 5."
  },
  {
    id: 6,
    difficulty: "Easy",
    question: "Take a character as input and check whether it is a vowel (a, e, i, o, u)."
  },
  {
    id: 7,
    difficulty: "Easy",
    question: "Input student marks and print Pass if marks are 33 or more, otherwise print Fail."
  },
  {
    id: 8,
    difficulty: "Easy",
    question: "Take age as input and classify the person as Child (below 13), Teenager (13–19), or Adult (20 and above)."
  },
  {
    id: 9,
    difficulty: "Easy",
    question: "Check whether a number is divisible by 2, 3, or both."
  },
  {
    id: 10,
    difficulty: "Easy",
    question: "Take temperature as input and print Hot if temperature is above 30, otherwise print Cold."
  },
  {
    id: 11,
    difficulty: "Easy",
    question: "Input two numbers and print the smaller number."
  },
  {
    id: 12,
    difficulty: "Easy",
    question: "Check whether a character entered by the user is Uppercase or Lowercase."
  },
  {
    id: 13,
    difficulty: "Easy",
    question: "Check whether a number lies between 10 and 50."
  },
  {
    id: 14,
    difficulty: "Easy",
    question: "Check whether a number is a multiple of 10."
  },
  {
    id: 15,
    difficulty: "Easy",
    question: "Take a number and print Greater than 100 if the number is above 100, otherwise print Less than or Equal to 100."
  },
  {
    id: 16,
    difficulty: "Easy",
    question: "Check whether two numbers entered by the user are equal or not."
  },
  {
    id: 17,
    difficulty: "Easy",
    question: "Take a character and check whether it is a consonant."
  },
  {
    id: 18,
    difficulty: "Easy",
    question: "Input a number and check whether it is divisible by 7."
  },
  {
    id: 19,
    difficulty: "Easy",
    question: "Check whether a number is less than zero."
  },
  {
    id: 20,
    difficulty: "Easy",
    question: "Take marks as input and print Distinction if marks are greater than 75."
  },
  {
    id: 21,
    difficulty: "Easy",
    question: "Input salary and print High Salary if salary is greater than 50000."
  },
  {
    id: 22,
    difficulty: "Easy",
    question: "Take a character and check whether it is an alphabet or not."
  },
  {
    id: 23,
    difficulty: "Easy",
    question: "Input a number and check whether it is a single-digit or double-digit number."
  },
  {
    id: 24,
    difficulty: "Easy",
    question: "Take three numbers and check whether all three numbers are equal."
  },
  {
    id: 25,
    difficulty: "Easy",
    question: "Input a number and check whether it is divisible by 10."
  },
  {
    id: 26,
    difficulty: "Easy",
    question: "Take a person's age and check whether the person is a Senior Citizen (60 years or above)."
  },
  {
    id: 27,
    difficulty: "Easy",
    question: "Input a character and print Vowel if it is a vowel, otherwise print Consonant."
  },
  {
    id: 28,
    difficulty: "Easy",
    question: "Take two numbers and check whether both numbers are positive."
  },
  {
    id: 29,
    difficulty: "Easy",
    question: "Input a number and check whether it is divisible by 4."
  },
  {
    id: 30,
    difficulty: "Easy",
    question: "Take a number and print whether it is Greater than 50, Less than 50, or Equal to 50."
  },

  // ---------- MEDIUM ----------
  {
    id: 31,
    difficulty: "Medium",
    question: "Input three numbers and print the largest number among all three using if-else conditions."
  },
  {
    id: 32,
    difficulty: "Medium",
    question: "Take a year as input and print Leap Year if the year is divisible by 400 or divisible by 4 but not by 100, otherwise print Not a Leap Year."
  },
  {
    id: 33,
    difficulty: "Medium",
    question: "Create a grade system using marks:\n 90 and above → Grade A\n75 to 89 → Grade B\n50 to 74 → Grade C\n33 to 49 → Grade D\nBelow 33 → Fail"
  },
  {
    id: 34,
    difficulty: "Medium",
    question: "Build a simple calculator using if-else.\nTake two numbers and an operator (+, -, *, /) from the user and perform the selected operation."
  },
  {
    id: 35,
    difficulty: "Medium",
    question: "Input three sides of a triangle.\nIf all sides are equal print Equilateral.\nIf any two sides are equal print Isosceles.\nOtherwise print Scalene."
  },
  {
    id: 36,
    difficulty: "Medium",
    question: "Take a character as input.\nIf it is between A-Z or a-z print Alphabet.\nIf it is between 0-9 print Digit.\nOtherwise print Special Character."
  },
  {
    id: 37,
    difficulty: "Medium",
    question: "Take a number from 1 to 7 and print the corresponding day of the week.\nExample: 1 → Monday, 2 → Tuesday."
  },
  {
    id: 38,
    difficulty: "Medium",
    question: "Take time in 24-hour format.\n0–11 → Good Morning\n12–16 → Good Afternoon\n17–21 → Good Evening\n22–23 → Good Night"
  },
  {
    id: 39,
    difficulty: "Medium",
    question: "Input shopping amount and apply discount according to the following conditions:\nAbove 5000 → 20% Discount\n2000 to 5000 → 10% Discount\nBelow 2000 → No Discount"
  },
  {
    id: 40,
    difficulty: "Medium",
    question: "Check whether a student got Distinction, Pass, or Fail using marks:\n75 and above → Distinction\n33 to 74 → Pass\nBelow 33 → Fail"
  },
  {
    id: 41,
    difficulty: "Medium",
    question: "Input electricity units consumed and calculate the bill:\n0–100 units → ₹5 per unit\n101–300 units → ₹7 per unit\nAbove 300 units → ₹10 per unit"
  },
  {
    id: 42,
    difficulty: "Medium",
    question: "Take username and password as input.\nIf username is 'admin' and password is '1234', print Login Successful, otherwise print Invalid Credentials."
  },
  {
    id: 43,
    difficulty: "Medium",
    question: "Input three numbers and print the smallest number among all three using if-else."
  },
  {
    id: 44,
    difficulty: "Medium",
    question: "Take a month number from 1 to 12 and print the corresponding month name."
  },
  {
    id: 45,
    difficulty: "Medium",
    question: "Input basic salary and calculate bonus:\nSalary above 50000 → 20% Bonus\n20000 to 50000 → 10% Bonus\nBelow 20000 → 5% Bonus"
  },
  {
    id: 46,
    difficulty: "Medium",
    question: "Take exam marks as input.\nIf marks are 85 or above print Scholarship Eligible, otherwise print Not Eligible."
  },
  {
    id: 47,
    difficulty: "Medium",
    question: "Input age and check ticket price:\nBelow 12 years → Child Ticket\n12 to 59 years → Normal Ticket\n60 and above → Senior Citizen Ticket"
  },
  {
    id: 48,
    difficulty: "Medium",
    question: "Take internet data usage in GB:\nBelow 1GB → Basic Plan\n1GB to 5GB → Standard Plan\nAbove 5GB → Premium Plan"
  },
  {
    id: 49,
    difficulty: "Medium",
    question: "Input purchase amount.\nAdd 18% GST to the amount.\nIf final amount is above 5000, apply additional 10% discount."
  },
  {
    id: 50,
    difficulty: "Medium",
    question: "Take a number and check:\nIf divisible by 2, print Divisible by 2\nIf divisible by 3, print Divisible by 3\nIf divisible by both, print Divisible by Both"
  }
];

// Language options for the compiler
const LANGUAGES = [
  { label: "Python",     value: "python",     url: "https://onecompiler.com/python" },
  { label: "C",          value: "c",          url: "https://onecompiler.com/c" },
  { label: "C++",        value: "cpp",        url: "https://onecompiler.com/cpp" },
  { label: "Java",       value: "java",       url: "https://onecompiler.com/java" },
  { label: "JavaScript", value: "javascript", url: "https://onecompiler.com/javascript" },
];

const difficultyColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" };
const difficultyBg    = { Easy: "rgba(34,197,94,0.1)", Medium: "rgba(245,158,11,0.1)", Hard: "rgba(239,68,68,0.1)" };

export default function IfelsePractice() {
  const [current, setCurrent]     = useState(0);
  const [language, setLanguage]   = useState(LANGUAGES[0]);
  const [compilerLoaded, setCompilerLoaded] = useState(false);
  const iframeRef = useRef(null);

  const total          = questions.length;
  const q              = questions[current];
  const progressPercent = ((current + 1) / total) * 100;

  const handleLangChange = (e) => {
    const lang = LANGUAGES.find(l => l.value === e.target.value);
    setLanguage(lang);
    // Reload iframe with new language
    if (iframeRef.current) {
      iframeRef.current.src = lang.url;
    }
  };

  const loadCompiler = () => {
    setCompilerLoaded(true);
  };

  const openInNewTab = () => {
    window.open(language.url, "_blank");
  };

  return (
    <div style={styles.page}>

      {/* ── TOP BAR ── */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <button style={styles.backBtn} onClick={() => window.location.href = "/"}>
            ← Dashboard
          </button>
          <span style={styles.appTitle}>If-Else Practice</span>
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
            <p style={styles.subtitle}>Solve using if-else · basic → advanced</p>
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
  topBarLeft: { display: "flex", alignItems: "center", gap: "12px" },
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
  title: { fontSize: "22px", fontWeight: "700", color: "#f1f5f9" },
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

  taskBox: {
    background: "#020617",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  taskHeader: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 14px",
    fontSize: "11px",
    color: "#64748b",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  taskDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "inline-block",
  },
  taskCode: {
    padding: "14px 16px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: "13px",
    color: "#22c55e",
    lineHeight: "1.7",
    margin: 0,
    whiteSpace: "pre-wrap",
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
  placeholderIcon: {
    fontSize: "48px",
    lineHeight: 1,
    marginBottom: "4px",
  },
  placeholderTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#f1f5f9",
  },
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