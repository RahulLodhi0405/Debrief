import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "What is if-else?",
    desc: "if-else is used to make decisions in a program.",
    code: `if (condition) {
  // execute if true
} else {
  // execute if false
}`,
  },
  {
    name: "Simple if",
    desc: "Executes block only when condition is true.",
    code: `int x = 10;
if (x > 5) {
  cout << "Greater";
}`,
  },
  {
    name: "if-else",
    desc: "Handles both true and false cases.",
    code: `int x = 3;
if (x % 2 == 0) {
  cout << "Even";
} else {
  cout << "Odd";
}`,
  },
  {
    name: "else if ladder",
    desc: "Used when multiple conditions exist.",
    code: `int x = 75;

if (x >= 90) cout << "A";
else if (x >= 75) cout << "B";
else if (x >= 50) cout << "C";
else cout << "Fail";`,
  },
  {
    name: "Nested if",
    desc: "if inside another if.",
    code: `int x = 10;

if (x > 0) {
  if (x % 2 == 0) {
    cout << "Positive Even";
  }
}`,
  },
];

export default function Ifelse() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const t = topics[active];

  return (
    <div style={container}>
      <div style={wrapper}>

        <button onClick={() => navigate("/dashboard")} style={btn("#22c55e")}>
          ← Dashboard
        </button>

        <h1 style={{ marginTop: "20px" }}>If-Else</h1>
        <p style={{ color: "#64748b" }}>
          Control program flow using conditions.
        </p>

        {/* Tabs */}
        <div style={tabs}>
          {topics.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                ...tabBtn,
                border: i === active ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.1)",
                background: i === active ? "rgba(34,197,94,0.1)" : "transparent",
                color: i === active ? "#22c55e" : "#64748b",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={card}>
          <p>{t.desc}</p>
        </div>

        <pre style={codeStyle}>{t.code}</pre>

        <button
          onClick={() => navigate("/ifelse/practice")}
          style={btn("#3b82f6")}
        >
          Practice If-Else →
        </button>

      </div>
    </div>
  );
}

/* Styles */
const container = {
  minHeight: "100vh",
  background: "#080d18",
  color: "#e2e8f0",
  fontFamily: "'Sora', sans-serif",
  padding: "20px",
};

const wrapper = { maxWidth: "700px", margin: "0 auto" };

const tabs = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  margin: "20px 0",
};

const tabBtn = {
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const card = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "18px",
  borderRadius: "12px",
  marginBottom: "12px",
};

const codeStyle = {
  background: "#060b16",
  padding: "16px",
  borderRadius: "10px",
  marginBottom: "20px",
  fontFamily: "monospace",
  fontSize: "13px",
  color: "#7dd3fc",
  whiteSpace: "pre-wrap",
};

const btn = (bg) => ({
  background: bg,
  border: "none",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: "600",
});