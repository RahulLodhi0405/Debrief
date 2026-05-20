import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "What is Logical Thinking?",
    desc: "Logical thinking means solving problems step-by-step using conditions, loops, and decision making.",
    code: `// Example idea
if(condition) {
  // do something
} else {
  // do something else
}`,
  },
  {
    name: "Breaking Problem",
    desc: "Always break big problem into small steps (input → condition → output).",
    code: `// Example
1. Take input
2. Apply condition
3. Print result`,
  },
  {
    name: "Multi-Condition Logic",
    desc: "Real problems use multiple conditions together.",
    code: `if(a > 10 && b < 5) {
  cout << "Valid";
}`,
  },
  {
    name: "Combining Loop + If",
    desc: "Most real problems use loops with conditions.",
    code: `for(int i=1;i<=10;i++){
  if(i % 2 == 0){
    cout << i;
  }
}`,
  },
  {
    name: "Real World Logic",
    desc: "Like ATM, billing system, grading — all are logic-based problems.",
    code: `if(balance >= amount){
  balance -= amount;
}else{
  cout<<"Insufficient";
}`,
  },
  {
    name: "Golden Rule",
    desc: "Always dry run your code before writing it.",
    code: `// Dry run example
n = 123
123 → 12 → 1`,
  },
];

export default function Logicalquestions() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const t = topics[active];

  return (
    <div style={container}>
      <div style={wrapper}>

        {/* Back */}
        <button onClick={() => navigate("/dashboard")} style={btn("#22c55e")}>
          ← Dashboard
        </button>

        <h1 style={{ marginTop: "20px" }}>Logical Questions</h1>
        <p style={{ color: "#64748b" }}>
          Learn how to think and solve real coding problems
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

        {/* Button */}
        <button
          onClick={() => navigate("/logical/practice")}
          style={btn("#3b82f6")}
        >
          Practice Logical Questions →
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
  padding: "20px",
  fontFamily: "'Sora', sans-serif",
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