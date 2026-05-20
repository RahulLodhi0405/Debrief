import { useState } from "react";
import { useNavigate } from "react-router-dom";

const complexities = [
  {
    notation: "O(1)",
    name: "Constant",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.3)",
    speed: "Instant ⚡",
    what: "Always takes the same number of steps, no matter how large the input.",
    example: "arr[0] — grabbing the first item of any list, whether it has 10 or 10 million items.",
    code: `#include <vector>
using namespace std;

int getFirst(vector<int> arr) {
  return arr[0]; // 1 step, always
}`,
  },
  {
    notation: "O(log n)",
    name: "Logarithmic",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.3)",
    speed: "Very Fast 🚀",
    what: "Cuts the problem in half every step. Doubling input barely adds any work.",
    example: "Binary search — like finding a word in a dictionary by opening the middle, then deciding left or right.",
    code: `#include <vector>
using namespace std;

int binarySearch(vector<int> arr, int target) {
  int lo = 0, hi = arr.size() - 1;
  while (lo <= hi) {
    int mid = (lo + hi) >> 1;
    if (arr[mid] == target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1; // halves problem each loop
}`,
  },
  {
    notation: "O(n)",
    name: "Linear",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    speed: "Fair 🚶",
    what: "Steps grow exactly with input. 2× input = 2× steps.",
    example: "Finding the max value — you must check every single element at least once.",
    code: `#include <vector>
using namespace std;

int findMax(vector<int> arr) {
  int max = arr[0];
  for (int x : arr) { // visits each once
    if (x > max) max = x;
  }
  return max;
}`,
  },
  {
    notation: "O(n log n)",
    name: "Linearithmic",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.3)",
    speed: "Good ⚖️",
    what: "Slightly worse than linear — the best possible for comparison-based sorting.",
    example: "Merge Sort — divide into halves (log n levels), process all n elements each level.",
    code: `#include <vector>
using namespace std;

vector<int> mergeSort(vector<int> arr) {
  if (arr.size() <= 1) return arr;
  int mid = arr.size() >> 1;
  vector<int> L(arr.begin(), arr.begin() + mid);
  vector<int> R(arr.begin() + mid, arr.end());
  // merge and combine - n work × log n levels
  return merge(mergeSort(L), mergeSort(R));
}`,
  },
  {
    notation: "O(n²)",
    name: "Quadratic",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    speed: "Slow 🐢",
    what: "Nested loops — every element pairs with every other. 10× input = 100× steps.",
    example: "Bubble sort — compare each pair, repeatedly. Gets painful fast.",
    code: `#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
  for (int i = 0; i < arr.size(); i++) {
    for (int j = 0; j < arr.size() - i; j++) {
      if (arr[j] > arr[j + 1])
        swap(arr[j], arr[j + 1]);
    } // n × n = n² steps
  }
}`,
  },
  {
    notation: "O(2ⁿ)",
    name: "Exponential",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.4)",
    speed: "Avoid! 💀",
    what: "Steps double with every new element. Useless beyond ~25 inputs.",
    example: "Naive Fibonacci — recalculates the same values millions of times. Fix it with memoization.",
    code: `// ❌ Exponential
int fib(int n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// ✅ Fixed → O(n) with memo
map<int, int> memo;
int fibFast(int n) {
  if (memo.find(n) != memo.end())
    return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibFast(n-1) + fibFast(n-2);
}`,
  },
];

const theoryPoints = [
  {
    title: "What is Time Complexity?",
    description: "Time complexity measures how the runtime of an algorithm grows as the input size increases. It helps predict performance and scalability.",
  },
  {
    title: "Why is it Important?",
    description: "Choosing the right algorithm can mean the difference between a program running in milliseconds vs days. It's crucial for performance optimization.",
  },
  {
    title: "Big O Notation",
    description: "Big O notation describes the worst-case scenario. O(n) means linear time, O(n²) means quadratic, and so on.",
  },
  {
    title: "Comparing Complexities",
    description: "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Always aim for the leftmost option when possible.",
  },
];

export default function TimeComplexity() {
  const [active, setActive] = useState(0);
  const tc = complexities[active];
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080d18",
      color: "#e2e8f0",
      fontFamily: "'Sora', sans-serif",
      padding: "0 0 60px",
    }}>
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

      {/* Nav */}
      <div style={{ padding: "20px 20px", maxWidth: "680px", margin: "0 auto" }}>
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
        >← Dashboard</button>

        <h1 style={{ fontSize: "clamp(24px,7vw,34px)", fontWeight: "700", marginTop: "20px", letterSpacing: "-0.5px" }}>
          Time Complexity
        </h1>
        <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>
          Understand how code scales — pick any complexity to explore.
        </p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>

        {/* Theory Section */}
        <div style={{ marginBottom: "24px", display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
          {theoryPoints.map((point, idx) => (
            <div key={idx} style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
                {point.title}
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6" }}>
                {point.description}
              </div>
            </div>
          ))}
        </div>

        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {complexities.map((c, i) => (
            <button
              key={i}
              className="chip"
              onClick={() => setActive(i)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: `1px solid ${i === active ? c.border : "rgba(255,255,255,0.07)"}`,
                background: i === active ? c.bg : "rgba(255,255,255,0.03)",
                color: i === active ? c.color : "#64748b",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >{c.notation}</button>
          ))}
        </div>

        {/* Card — animates on switch */}
        <div key={active} style={{ animation: "fadeUp 0.35s ease" }}>

          {/* Header */}
          <div style={{
            background: tc.bg,
            border: `1px solid ${tc.border}`,
            borderRadius: "18px",
            padding: "22px",
            marginBottom: "12px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(28px,8vw,44px)",
                  fontWeight: "700",
                  color: tc.color,
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}>{tc.notation}</span>
                <span style={{ marginLeft: "12px", fontSize: "15px", color: "#94a3b8", fontWeight: "500" }}>{tc.name}</span>
              </div>
              <span style={{
                background: tc.bg,
                border: `1px solid ${tc.border}`,
                color: tc.color,
                padding: "5px 13px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}>{tc.speed}</span>
            </div>
            <p style={{ marginTop: "14px", fontSize: "14px", color: "#cbd5e1", lineHeight: "1.75" }}>{tc.what}</p>
          </div>

          {/* Example */}
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderLeft: `3px solid ${tc.color}`,
            borderRadius: "0 12px 12px 0",
            padding: "16px 18px",
            marginBottom: "12px",
          }}>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", letterSpacing: "1px", marginBottom: "8px" }}>💡 EXAMPLE</div>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.75" }}>{tc.example}</p>
          </div>

          {/* Code Block */}
          <div style={{
            background: "#060b16",
            border: `1px solid ${tc.border}`,
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "12px",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
              ))}
              <span style={{ marginLeft: "8px", fontSize: "11px", color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                {tc.notation} · C++
              </span>
            </div>
            <pre style={{
              padding: "18px",
              fontSize: "13px",
              lineHeight: "1.85",
              color: "#7dd3fc",
              overflowX: "auto",
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>{tc.code}</pre>
          </div>

          {/* Golden Rules */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            {[
              { rule: "Drop constants", tip: "O(2n) → O(n)" },
              { rule: "Drop lower terms", tip: "O(n²+n) → O(n²)" },
              { rule: "Nested = multiply", tip: "O(n)×O(n) = O(n²)" },
              { rule: "Different inputs", tip: "Use O(a+b), not O(2n)" },
            ].map(({ rule, tip }) => (
              <div key={rule} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: `2px solid ${tc.color}`,
                borderRadius: "0 10px 10px 0",
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#e2e8f0", marginBottom: "4px" }}>{rule}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>{tip}</div>
              </div>
            ))}
          </div>

          {/* Move to Practice Button */}
          <button
            onClick={() => navigate("/tc-practice")}
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
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Done with Learning? 🚀 Move to Practice
          </button>

        </div>
      </div>
    </div>
  );
}
