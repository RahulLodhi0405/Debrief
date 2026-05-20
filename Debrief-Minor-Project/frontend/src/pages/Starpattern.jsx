import { useState } from "react";
import { useNavigate } from "react-router-dom";

const patterns = [
  {
    name: "Square Pattern",
    preview: `*****
*****
*****
*****
*****`,
    code: `#include <iostream>
using namespace std;

int main() {
  int n = 5;
  for(int i=0;i<n;i++){
    for(int j=0;j<n;j++){
      cout << "* ";
    }
    cout << endl;
  }
}`,
    concept: "Fixed rows & columns → both loops run n times",
  },
  {
    name: "Right Triangle",
    preview: `*
**
***
****
*****`,
    code: `#include <iostream>
using namespace std;

int main() {
  int n = 5;
  for(int i=1;i<=n;i++){
    for(int j=1;j<=i;j++){
      cout << "* ";
    }
    cout << endl;
  }
}`,
    concept: "Inner loop depends on row → grows gradually",
  },
  {
    name: "Inverted Triangle",
    preview: `*****
****
***
**
*`,
    code: `#include <iostream>
using namespace std;

int main() {
  int n = 5;
  for(int i=n;i>=1;i--){
    for(int j=1;j<=i;j++){
      cout << "* ";
    }
    cout << endl;
  }
}`,
    concept: "Reverse logic of triangle",
  },
];

const theory = [
  {
    title: "What are Star Patterns?",
    desc: "Star patterns are basic loop problems used to build strong control over nested loops and logic building.",
  },
  {
    title: "Why Important?",
    desc: "They train your brain to think in rows & columns — critical for matrices and complex logic problems.",
  },
  {
    title: "Core Idea",
    desc: "Outer loop = rows, Inner loop = columns. Control what to print and when.",
  },
  {
    title: "Golden Rule",
    desc: "Always dry run for small n (like 3 or 5) before coding.",
  },
];

export default function StarPattern() {
  const [active, setActive] = useState(0);
  const p = patterns[active];
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080d18",
      color: "#e2e8f0",
      fontFamily: "'Sora', sans-serif",
      paddingBottom: "60px",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .chip { cursor:pointer; transition:0.2s; }
        .chip:hover { opacity:0.8; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px", maxWidth: "680px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#22c55e",
            padding: "7px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >← Dashboard</button>

        <h1 style={{ marginTop: "20px", fontSize: "32px" }}>
          Star Patterns
        </h1>
        <p style={{ color: "#64748b", marginTop: "6px" }}>
          Master loops by building patterns step by step.
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>

        {/* Theory */}
        <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
          {theory.map((t, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "14px",
              borderRadius: "10px",
            }}>
              <div style={{ fontWeight: "600" }}>{t.title}</div>
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Pattern Selector */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {patterns.map((item, i) => (
            <button
              key={i}
              className="chip"
              onClick={() => setActive(i)}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: i === active ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.1)",
                background: i === active ? "rgba(34,197,94,0.1)" : "transparent",
                color: i === active ? "#22c55e" : "#64748b",
                fontWeight: "600",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div style={{
          background: "#060b16",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "12px",
          fontFamily: "monospace",
          whiteSpace: "pre",
        }}>
          {p.preview}
        </div>

        {/* Concept */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          borderLeft: "3px solid #22c55e",
          padding: "12px",
          borderRadius: "0 10px 10px 0",
          marginBottom: "12px",
        }}>
          {p.concept}
        </div>

        {/* Code */}
        <pre style={{
          background: "#060b16",
          padding: "16px",
          borderRadius: "12px",
          overflowX: "auto",
          color: "#7dd3fc",
          fontSize: "13px",
        }}>
{p.code}
        </pre>

        {/* Button */}
        <button
          onClick={() => navigate("/star-patterns-practice")}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Done Learning → Practice 🚀
        </button>

      </div>
    </div>
  );
}