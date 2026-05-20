import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "What is While Loop?",
    desc: "A while loop repeats a block of code as long as the condition is true.",
    code: `while(condition) {
  // code
}`,
  },
  {
    name: "Basic While Loop",
    desc: "Print numbers from 1 to 5 using while loop.",
    code: `int i = 1;
while(i <= 5) {
  cout << i << " ";
  i++;
}`,
  },
  {
    name: "Reverse Loop",
    desc: "Loop can run in reverse direction.",
    code: `int i = 5;
while(i >= 1) {
  cout << i << " ";
  i--;
}`,
  },
  {
    name: "Loop with Condition",
    desc: "Use condition inside loop.",
    code: `int i = 1;
while(i <= 10) {
  if(i % 2 == 0) {
    cout << i << " ";
  }
  i++;
}`,
  },
  {
    name: "Infinite Loop",
    desc: "Loop that never ends if condition is always true.",
    code: `while(true) {
  cout << "Infinite Loop";
}`,
  },
  {
    name: "User Input Loop",
    desc: "Loop until user enters 0.",
    code: `int n;
cin >> n;

while(n != 0) {
  cout << n;
  cin >> n;
}`,
  },
];

export default function WhileLoop() {
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

        <h1 style={{ marginTop: "20px" }}>While Loop</h1>
        <p style={{ color: "#64748b" }}>
          Learn how to repeat code using condition-based loops.
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

        {/* Practice Button */}
        <button
          onClick={() => navigate("/whileloop/practice")}
          style={btn("#3b82f6")}
        >
          Practice While Loop →
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