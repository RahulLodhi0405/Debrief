import { useState } from "react";
import { useNavigate } from "react-router-dom";

const complexities = [
  {
    notation: "O(1)",
    name: "Constant",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.3)",
    speed: "Minimal 📦",
    what: "Uses a fixed amount of extra memory, no matter how large the input grows. It's like using a few variables that don't change with input size.",
    example:
      "Storing a few temporary variables or accessing a single array element.",
    code: `#include <vector>
using namespace std;

int getFirst(vector<int>& arr) {
    int result = arr[0]; // one fixed slot
    return result;
}`,
  },
  {
    notation: "O(n)",
    name: "Linear",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    speed: "Moderate 🚶",
    what: "Requires extra memory proportional to the size of the input. Each container like vector, stack, or queue uses O(n) space. If you use 3 containers, it's O(3n), not O(n³).",
    example:
      "Copying an array, building a result list, or storing one value per item. Multiple containers add up linearly.",
    code: `#include <vector>
using namespace std;

vector<int> duplicate(const vector<int>& arr) {
    vector<int> copy;
    for (int x : arr) {
        copy.push_back(x); // one slot per input element
    }
    return copy;
}`,
    },
];

const theoryPoints = [
  {
    title: "What is Space Complexity?",
    description:
      "Space complexity measures how much memory an algorithm uses as the input grows. It includes extra storage and recursion stack space.",
  },
  {
    title: "Why it Matters",
    description:
      "Memory limits are real. A fast algorithm can still fail if it needs too much space, especially on large datasets or constrained devices.",
  },
  {
    title: "Big O for Space",
    description:
      "Space complexity is expressed in Big O the same way as time. O(n) means memory grows linearly, O(1) means constant extra space.",
  },
  {
    title: "Optimize Memory",
    description:
      "Prefer in-place operations and reuse buffers. Reducing space complexity often makes code more scalable and easier to run on small systems.",
  },
];

export default function SpaceComplexity() {
  const [active, setActive] = useState(0);
  const sc = complexities[active];
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080d18",
        color: "#e2e8f0",
        fontFamily: "'Sora', sans-serif",
        padding: "0 0 60px",
      }}
    >
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .chip { transition: all 0.18s; cursor: pointer; }
                .chip:hover { opacity: 0.8; }
            `}</style>

      <div
        style={{ padding: "20px 20px", maxWidth: "680px", margin: "0 auto" }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#22c55e",
            padding: "7px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "inherit",
            fontWeight: "600",
          }}
        >
          ← Dashboard
        </button>

        <h1
          style={{
            fontSize: "clamp(24px,7vw,34px)",
            fontWeight: "700",
            marginTop: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          Space Complexity
        </h1>
        <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>
          Learn how algorithms use memory — choose any complexity to explore.
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            marginBottom: "24px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "10px",
          }}
        >
          {theoryPoints.map((point, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#cbd5e1",
                  marginBottom: "6px",
                }}
              >
                {point.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  lineHeight: "1.6",
                }}
              >
                {point.description}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {complexities.map((c, i) => (
            <button
              key={i}
              className="chip"
              onClick={() => setActive(i)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${
                  i === active ? c.border : "rgba(255,255,255,0.07)"
                }`,
                background: i === active ? c.bg : "rgba(255,255,255,0.03)",
                color: i === active ? c.color : "#64748b",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              {c.notation}
            </button>
          ))}
        </div>

        <div key={active} style={{ animation: "fadeUp 0.35s ease" }}>
          <div
            style={{
              background: sc.bg,
              border: `1px solid ${sc.border}`,
              borderRadius: "18px",
              padding: "22px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(28px,8vw,44px)",
                    fontWeight: "700",
                    color: sc.color,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {sc.notation}
                </span>
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "15px",
                    color: "#94a3b8",
                    fontWeight: "500",
                  }}
                >
                  {sc.name}
                </span>
              </div>
              <span
                style={{
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  color: sc.color,
                  padding: "5px 13px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                {sc.speed}
              </span>
            </div>
            <p
              style={{
                marginTop: "14px",
                fontSize: "14px",
                color: "#cbd5e1",
                lineHeight: "1.75",
              }}
            >
              {sc.what}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: `3px solid ${sc.color}`,
              borderRadius: "0 12px 12px 0",
              padding: "16px 18px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontWeight: "600",
                letterSpacing: "1px",
                marginBottom: "8px",
              }}
            >
              💡 EXAMPLE
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                lineHeight: "1.75",
              }}
            >
              {sc.example}
            </p>
          </div>

          <div
            style={{
              background: "#060b16",
              border: `1px solid ${sc.border}`,
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  color: "#475569",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {sc.notation} · C++
              </span>
            </div>
            <pre
              style={{
                padding: "18px",
                fontSize: "13px",
                lineHeight: "1.85",
                color: "#7dd3fc",
                overflowX: "auto",
                fontFamily: "'JetBrains Mono', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {sc.code}
            </pre>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {[
              {
                rule: "Count extra storage",
                tip: "Only allocate what you need.",
              },
              {
                rule: "Reuse buffers",
                tip: "Avoid new allocations inside loops.",
              },
              {
                rule: "In-place is better",
                tip: "Modify data without copies when possible.",
              },
              { rule: "Stack matters", tip: "Recursive calls also use space." },
            ].map(({ rule, tip }) => (
              <div
                key={rule}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: `2px solid ${sc.color}`,
                  borderRadius: "0 10px 10px 0",
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#e2e8f0",
                    marginBottom: "4px",
                  }}
                >
                  {rule}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tip}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/sc-practice")}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Done with Learning? 🚀 Move to Practice
          </button>
        </div>
      </div>
    </div>
  );
}
