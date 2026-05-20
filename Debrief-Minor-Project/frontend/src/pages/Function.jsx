import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    name: "What is a Function?",
    desc: "A function is a reusable block of code that performs a specific task.",
    code: `#include <iostream>
using namespace std;

void greet() {
  cout << "Hello!";
}

int main() {
  greet();
}`,
  },
  {
    name: "Function with Parameters",
    desc: "Functions can take inputs to perform operations.",
    code: `int add(int a, int b) {
  return a + b;
}`,
  },
  {
    name: "Return Type",
    desc: "Functions can return values using return keyword.",
    code: `int square(int x) {
  return x * x;
}`,
  },
  {
    name: "Pass by Value",
    desc: "A copy of variable is passed.",
    code: `void change(int x) {
  x = 10;
}`,
  },
  {
    name: "Pass by Reference",
    desc: "Original variable is modified.",
    code: `void change(int &x) {
  x = 10;
}`,
  },
  {
    name: "Recursion Basics",
    desc: "Function calling itself.",
    code: `int fact(int n) {
  if(n==0) return 1;
  return n * fact(n-1);
}`,
  },
];

export default function FunctionPage() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const t = topics[active];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Top Bar */}
        <div style={styles.topBar}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/dashboard")}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            ← Dashboard
          </button>

          <span style={styles.stepText}>
            Topic {active + 1} / {topics.length}
          </span>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Functions</h1>
          <p style={styles.subtitle}>
            Learn reusable code blocks — core of programming.
          </p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {topics.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                ...styles.tabBtn,
                ...(i === active ? styles.activeTab : {})
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div style={styles.card}>
          <p style={styles.desc}>{t.desc}</p>

          <div style={styles.codeBox}>
            <pre style={styles.code}>{t.code}</pre>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/function-practice")}
          style={styles.primaryBtn}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Practice Functions →
        </button>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f172a, #020617)",
    color: "#e2e8f0",
    fontFamily: "Inter, sans-serif",
    padding: "24px",
  },

  container: {
    maxWidth: "760px",
    margin: "0 auto",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    padding: "10px 14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.2s",
  },

  stepText: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "6px",
  },

  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },

  tabBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.2s",
  },

  activeTab: {
    border: "1px solid #22c55e",
    background: "rgba(34,197,94,0.1)",
    color: "#22c55e",
    fontWeight: "600",
  },

  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
  },

  desc: {
    marginBottom: "12px",
    color: "#cbd5f5",
  },

  codeBox: {
    background: "#020617",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "14px",
  },

  code: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#38bdf8",
    whiteSpace: "pre-wrap",
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    border: "none",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },
};