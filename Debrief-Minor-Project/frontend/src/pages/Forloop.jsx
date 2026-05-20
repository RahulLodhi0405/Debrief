import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "What is For Loop?",
    desc: "A for loop is used to repeat a block of code a fixed number of times.",
    code: `for(initialization; condition; update) {
  // code
}`,
  },
  {
    name: "Basic For Loop",
    desc: "Print numbers from 1 to 5 using for loop.",
    code: `for(int i = 1; i <= 5; i++) {
  cout << i << " ";
}`,
  },
  {
    name: "Reverse Loop",
    desc: "Loop can run in reverse direction.",
    code: `for(int i = 5; i >= 1; i--) {
  cout << i << " ";
}`,
  },
  {
    name: "Increment Variations",
    desc: "You can change step size in loop.",
    code: `for(int i = 0; i <= 10; i += 2) {
  cout << i << " ";
}`,
  },
  {
    name: "Nested For Loop",
    desc: "Loop inside another loop (used in patterns).",
    code: `for(int i = 1; i <= 3; i++) {
  for(int j = 1; j <= 3; j++) {
    cout << "* ";
  }
  cout << endl;
}`,
  },
  {
    name: "Loop with Condition",
    desc: "Use condition inside loop.",
    code: `for(int i = 1; i <= 10; i++) {
  if(i % 2 == 0) {
    cout << i << " ";
  }
}`,
  },
];

export default function ForLoop() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const t = topics[active];

  return (
    <div style={container}>
      <div style={wrapper}>

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          style={btn("#22c55e")}
        >
          ← Dashboard
        </button>

        <h1 style={{ marginTop: "20px" }}>For Loop</h1>
        <p style={{ color: "#64748b" }}>
          Learn how to repeat code efficiently using loops.
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

        {/* Description */}
        <div style={card}>
          <p>{t.desc}</p>
        </div>

        {/* Code */}
        <pre style={codeStyle}>{t.code}</pre>

        {/* Button */}
        <button
          onClick={() => navigate("/forloop/practice")}
          style={btn("#3b82f6")}
        >
          Practice For Loop →
        </button>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  minHeight: "100vh",
  background: "#080d18",
  color: "#e2e8f0",
  fontFamily: "'Sora', sans-serif",
  padding: "20px",
};

const wrapper = {
  maxWidth: "700px",
  margin: "0 auto",
};

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