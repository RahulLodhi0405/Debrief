// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── DATA ───────────────────────────────────────────────────────────────────

const functionData = {
  maxmin: {
    title: "max() / min()",
    category: "Comparison Functions",
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "M",
    tags: ["Comparison", "O(1)", "Template"],
    complexity: [
      { label: "max(a,b)", value: "O(1)", color: "#1D9E75" },
      { label: "min(a,b)", value: "O(1)", color: "#1D9E75" },
      { label: "max_element", value: "O(n)", color: "#BA7517" },
    ],
    theory: `max() and min() return the larger or smaller of two values. They work on any comparable type (int, float, char, string) and use operator< internally — so they work with custom types too.

max_element() and min_element() find the maximum/minimum in a range using iterators. These are O(n).

Key properties:
• max(a, b) returns the greater value; ties return the second argument
• min(a, b) returns the smaller value; ties return the first argument
• max({a, b, c}) — initializer list version accepts 3+ values
• max_element(v.begin(), v.end()) returns an iterator, dereference with *
• Can pass a custom comparator as a third argument`,
    syntax: `#include <algorithm>
using namespace std;

int a = 5, b = 10;
max(a, b);         // 10
min(a, b);         // 5

// Three or more values
max({a, b, 7});    // 10
min({a, b, 7});    // 5

// On a range
vector<int> v = {3, 1, 4, 1, 5, 9};
*max_element(v.begin(), v.end());  // 9
*min_element(v.begin(), v.end());  // 1`,
    tip: "Use max({a, b, c}) with an initializer list instead of nesting max(a, max(b, c)) — it's cleaner and avoids off-by-one style bugs.",
  },

  sort: {
    title: "sort()",
    category: "Sorting Algorithm",
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "S",
    tags: ["Sorting", "O(n log n)", "Introsort"],
    complexity: [
      { label: "Average", value: "O(n log n)", color: "#1D9E75" },
      { label: "Worst case", value: "O(n log n)", color: "#1D9E75" },
      { label: "Space", value: "O(log n)", color: "#1D9E75" },
    ],
    theory: `sort() sorts elements in [begin, end) in ascending order by default. Internally it uses Introsort — a hybrid of quicksort, heapsort, and insertion sort — which guarantees O(n log n) worst case.

A custom comparator can be passed to sort in any order. Lambdas make this concise.

Key properties:
• Default sort is ascending using operator<
• Pass a comparator as the third argument to customize order
• stable_sort() preserves relative order of equal elements (costs more memory)
• partial_sort() only sorts the first k elements — useful for top-K problems
• Not stable — equal elements may reorder; use stable_sort if that matters`,
    syntax: `#include <algorithm>
using namespace std;

vector<int> v = {5, 2, 8, 1, 9};

// Ascending (default)
sort(v.begin(), v.end());
// v = {1, 2, 5, 8, 9}

// Descending — using greater<>
sort(v.begin(), v.end(), greater<int>());
// v = {9, 8, 5, 2, 1}`,
    tip: "For descending sort, prefer sort(v.begin(), v.end(), greater<int>()) over reversing — it's a single line and avoids an extra O(n) pass.",
  },

  reverse: {
    title: "reverse()",
    category: "Sequence Algorithm",
    color: "#854F0B",
    bg: "#FAEEDA",
    icon: "R",
    tags: ["Reverse", "O(n)", "In-place"],
    complexity: [
      { label: "Time", value: "O(n)", color: "#BA7517" },
      { label: "Space", value: "O(1)", color: "#1D9E75" },
      { label: "Stable", value: "Yes", color: "#1D9E75" },
    ],
    theory: `reverse() reverses the order of elements in the range [begin, end) in-place. It swaps elements from both ends towards the center — O(n/2) swaps, O(1) extra space.

Key properties:
• In-place — no extra memory needed
• Works on any bidirectional iterator (vector, deque, string, array)
• Does NOT work on forward-only iterators (like singly linked list)
• To reverse a substring, use v.begin()+l, v.begin()+r+1 as the range
• reverse_copy() writes the reversed range to another container without modifying the original`,
    syntax: `#include <algorithm>
using namespace std;

vector<int> v = {1, 2, 3, 4, 5};

// Reverse entire vector
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}

// Reverse a substring of a string
string s = "hello";
reverse(s.begin(), s.end());
// s = "olleh"`,
    tip: "The 3-reverse trick (reverse all → reverse [0,k) → reverse [k,n)) is a classic O(n) O(1)-space rotate that appears in interviews and competitive programming alike.",
  },
   limits: {
    title: "INT_MAX / INT_MIN",
    category: "Limits",
    color: "#1E293B",
    bg: "#EAF3DE",
    icon: "L",
    tags: ["Limits", "O(1)", "Constants"],
    complexity: [
      { label: "Access", value: "O(1)", color: "#1D9E75" },
    ],
    theory: `INT_MAX and INT_MIN are constants defined in <climits> that represent the maximum and minimum values of a 32-bit signed integer. They are often used as sentinels or initial values when finding extrema.
Key properties:
• INT_MAX = 2,147,483,647 (2^31 - 1)
• INT_MIN = -2,147,483,648 (-2^31)
• Useful for initializing min/max comparisons (e.g., int minVal = INT_MAX;)
• Also defined for other types: LONG_MAX, LLONG_MAX, etc. in <climits>`,
    syntax: `#include <climits>
using namespace std;
int maxInt = INT_MAX;  // 2147483647
int minInt = INT_MIN;  // -2147483648`,

  }
};

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Sora:wght@400;500;600;700&display=swap');

  .cpp-app * { box-sizing: border-box; margin: 0; padding: 0; }

  .cpp-app {
    font-family: 'Sora', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
  }

  /* ── Sidebar ── */
  .cpp-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #1e293b;
    border-right: 1px solid #334155;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .cpp-sidebar-logo {
    padding: 1.25rem;
    border-bottom: 1px solid #334155;
  }

  .cpp-sidebar-logo h2 {
    font-size: 13px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.2px;
  }

  .cpp-sidebar-logo p {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }

  .cpp-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0.75rem 1rem;
    padding: 7px 12px;
    background: transparent;
    border: 1px solid #334155;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    transition: all 0.15s;
    text-align: left;
    width: calc(100% - 2rem);
  }
  .cpp-back-btn:hover { background: #334155; color: #f1f5f9; }

  .cpp-nav-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #475569;
    padding: 0.75rem 1rem 0.25rem;
  }

  .cpp-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 1rem;
    cursor: pointer;
    font-size: 13px;
    color: #94a3b8;
    border-left: 2px solid transparent;
    transition: all 0.15s;
    font-family: 'Sora', sans-serif;
    background: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    width: 100%;
    text-align: left;
  }
  .cpp-nav-item:hover { background: #334155; color: #f1f5f9; }
  .cpp-nav-item.active {
    background: #0f172a;
    color: #f1f5f9;
    font-weight: 600;
    border-left-color: #378ADD;
  }

  .cpp-nav-icon {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ── Main ── */
  .cpp-main {
    flex: 1;
    min-width: 0;
    padding: 2rem;
    overflow-y: auto;
  }

  /* ── Page Header ── */
  .cpp-page-header { margin-bottom: 2rem; }

  .cpp-breadcrumb {
    font-size: 11px;
    color: #475569;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cpp-page-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #f1f5f9;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.5rem;
  }

  .cpp-page-subtitle {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
    max-width: 600px;
  }

  .cpp-tags { display: flex; gap: 6px; margin-top: 0.75rem; flex-wrap: wrap; }
  .cpp-tag {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #334155;
    color: #64748b;
    background: #1e293b;
  }

  /* ── Cards ── */
  .cpp-grid { display: grid; gap: 1.25rem; }

  .cpp-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    overflow: hidden;
  }

  .cpp-card-header {
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid #334155;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cpp-card-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .cpp-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .cpp-card-body { padding: 1.25rem; }

  /* ── Theory ── */
  .cpp-theory {
    font-size: 14px;
    line-height: 1.8;
    color: #94a3b8;
    white-space: pre-line;
  }

  .cpp-divider { height: 1px; background: #334155; margin: 1.25rem 0; }

  /* ── Complexity ── */
  .cpp-complexity-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 1rem;
  }

  .cpp-complexity-card {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.75rem;
    text-align: center;
  }

  .cpp-complexity-label { font-size: 11px; color: #475569; margin-bottom: 4px; }
  .cpp-complexity-value {
    font-size: 15px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── Code ── */
  pre.cpp-code {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    font-size: 13px;
    line-height: 1.75;
    overflow-x: auto;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    white-space: pre;
  }

  .cpp-example-title {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cpp-example-title::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #378ADD;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── Tip Box ── */
  .cpp-tip {
    background: #1a2744;
    border: 1px solid #1e3a5f;
    border-radius: 8px;
    padding: 0.875rem 1rem;
    font-size: 13px;
    color: #93c5fd;
    line-height: 1.6;
    margin-top: 1.25rem;
  }

  /* ── Problems ── */
  .cpp-problems-list { display: grid; gap: 10px; }

  .cpp-problem-item {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .cpp-problem-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1e293b;
    border: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
  }

  .cpp-problem-content { flex: 1; }

  .cpp-problem-title {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 3px;
  }

  .cpp-problem-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  .cpp-diff {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 20px;
    flex-shrink: 0;
    margin-top: 1px;
    letter-spacing: 0.3px;
  }

  .cpp-diff-Easy    { background: #14532d; color: #86efac; }
  .cpp-diff-Medium  { background: #78350f; color: #fcd34d; }
  .cpp-diff-Hard    { background: #7f1d1d; color: #fca5a5; }

  /* ── Home ── */
  .cpp-home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 2rem;
  }

  .cpp-container-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cpp-container-card:hover {
    border-color: #475569;
    background: #263348;
    transform: translateY(-2px);
  }

  .cpp-cc-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .cpp-cc-name { font-size: 14px; font-weight: 700; color: #f1f5f9; font-family: 'JetBrains Mono', monospace; }
  .cpp-cc-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  .cpp-cc-pill {
    display: inline-block;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    padding: 2px 8px;
    border-radius: 20px;
    background: #0f172a;
    color: #64748b;
    border: 1px solid #334155;
    margin-top: 4px;
    align-self: flex-start;
  }

  /* ── Compare Table ── */
  .cpp-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .cpp-table th {
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 10px 12px;
    color: #475569;
    text-align: left;
    border-bottom: 1px solid #334155;
  }
  .cpp-table td {
    padding: 11px 12px;
    border-bottom: 1px solid #1e293b;
    color: #64748b;
    vertical-align: middle;
  }
  .cpp-table tr:last-child td { border-bottom: none; }
  .cpp-table td:first-child {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #e2e8f0;
    font-weight: 600;
  }
  .cpp-table tr:hover td { background: #1e293b; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .cpp-app { flex-direction: column; }
    .cpp-sidebar { width: 100%; height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 0.5rem; }
    .cpp-sidebar-logo { display: none; }
    .cpp-nav-label { display: none; }
    .cpp-nav-item { padding: 6px 10px; font-size: 12px; border-left: none; border-bottom: 2px solid transparent; }
    .cpp-nav-item.active { border-left: none; border-bottom-color: #378ADD; }
    .cpp-back-btn { width: auto; margin: 0.25rem; }
    .cpp-main { padding: 1rem; }
    .cpp-complexity-row { grid-template-columns: 1fr 1fr; }
    .cpp-page-title { font-size: 20px; }
  }
`;

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const NavItem = ({ id, icon, label, bg, color, active, onClick }) => (
  <button
    className={`cpp-nav-item${active ? " active" : ""}`}
    onClick={() => onClick(id)}
  >
    <span className="cpp-nav-icon" style={{ background: bg, color }}>
      {icon}
    </span>
    {label}
  </button>
);

const ComplexityRow = ({ items }) => (
  <div className="cpp-complexity-row">
    {items.map((item) => (
      <div key={item.label} className="cpp-complexity-card">
        <div className="cpp-complexity-label">{item.label}</div>
        <div className="cpp-complexity-value" style={{ color: item.color }}>
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

const DiffBadge = ({ diff }) => (
  <span className={`cpp-diff cpp-diff-${diff}`}>{diff}</span>
);

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

const HomePage = ({ onSelect }) => {
  const items = [
    {
      id: "maxmin",
      icon: "M",
      bg: "#1a3152",
      color: "#60a5fa",
      label: "max() / min()",
      desc: "Return the larger or smaller of two (or more) values in O(1).",
      pill: "O(1)",
    },
    {
      id: "sort",
      icon: "S",
      bg: "#14361a",
      color: "#86efac",
      label: "sort()",
      desc: "Sort a range in-place using introsort. O(n log n) guaranteed.",
      pill: "O(n log n)",
    },
    {
      id: "reverse",
      icon: "R",
      bg: "#3b2800",
      color: "#fcd34d",
      label: "reverse()",
      desc: "Reverse elements in a range in-place. O(n) time, O(1) space.",
      pill: "O(n)",
    },
    {
      id: "limits",
      icon: "L",
      bg: "#1e293b",
      color: "#86efac",
      label: "INT_MAX / INT_MIN",
      desc: "Get the maximum and minimum representable int values. O(1).",
      pill: "O(1)",
    }
  ];

  return (
    <div>
      <div className="cpp-page-header">
        <div className="cpp-breadcrumb">C++ STL</div>
        <div className="cpp-page-title">Inbuilt Functions</div>
        <div className="cpp-page-subtitle">
          Choose a function to explore theory, syntax, examples, and practice problems.
        </div>
      </div>

      <div className="cpp-home-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="cpp-container-card"
            onClick={() => onSelect(item.id)}
          >
            <div
              className="cpp-cc-icon"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="cpp-cc-name">{item.label}</div>
            <div className="cpp-cc-desc">{item.desc}</div>
            <span className="cpp-cc-pill">{item.pill}</span>
          </div>
        ))}
      </div>

      <div className="cpp-card">
        <div className="cpp-card-header">
          <div className="cpp-card-icon" style={{ background: "#1a3152" }}>
            📊
          </div>
          <div className="cpp-card-title">Quick Comparison</div>
        </div>
        <div className="cpp-card-body" style={{ padding: 0 }}>
          <table className="cpp-table">
            <thead>
              <tr>
                <th>Function</th>
                <th>Header</th>
                <th>In-place?</th>
                <th>Needs Sorted?</th>
                <th>Complexity</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["max() / min()", "<algorithm>", "n/a", "no", "O(1)", "#86efac"],
                ["sort()", "<algorithm>", "yes", "no", "O(n log n)", "#fcd34d"],
                ["reverse()", "<algorithm>", "yes", "no", "O(n)", "#fcd34d"],
                ["INT_MAX / INT_MIN", "<climits>", "n/a", "no", "O(1)", "#86efac"],
              ].map(([name, header, inplace, sorted, complexity, lc]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{header}</td>
                  <td>{inplace}</td>
                  <td style={{ color: sorted === "YES" ? "#fca5a5" : "#64748b" }}>{sorted}</td>
                  <td
                    style={{
                      color: lc,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                    }}
                  >
                    {complexity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────

const DetailPage = ({ data }) => (
  <div>
    <div className="cpp-page-header">
      <div className="cpp-breadcrumb">STL Functions / {data.category}</div>
      <div className="cpp-page-title">{data.title}</div>
      <div className="cpp-tags">
        {data.tags.map((t) => (
          <span key={t} className="cpp-tag">
            {t}
          </span>
        ))}
      </div>
    </div>

    <div className="cpp-grid">
      {/* Theory */}
      <div className="cpp-card">
        <div className="cpp-card-header">
          <div className="cpp-card-icon" style={{ background: data.bg, fontSize: 14 }}>
            📘
          </div>
          <div className="cpp-card-title">Theory</div>
        </div>
        <div className="cpp-card-body">
          <div className="cpp-theory">{data.theory}</div>
          <ComplexityRow items={data.complexity} />
        </div>
      </div>

      {/* Syntax */}
      <div className="cpp-card">
        <div className="cpp-card-header">
          <div className="cpp-card-icon" style={{ background: data.bg, fontSize: 14 }}>
            ⚙️
          </div>
          <div className="cpp-card-title">Syntax & Common Usage</div>
        </div>
        <div className="cpp-card-body">
          <pre className="cpp-code">{data.syntax}</pre>
        </div>
      </div>

      {/* Examples */}
     

      {/* Practice Problems */}
      
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const InbuiltFunctions = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const activePage = type || "home";
  const setActivePage = (id) => navigate(`/inbuilt/${id}`);

  const navGroups = [
    {
      label: "Comparison",
      items: [
        { id: "maxmin", icon: "M", label: "max / min", bg: "#1a3152", color: "#60a5fa" },
      ],
    },
    {
      label: "Sequence",
      items: [
        { id: "sort", icon: "S", label: "sort", bg: "#14361a", color: "#86efac" },
        { id: "reverse", icon: "R", label: "reverse", bg: "#3b2800", color: "#fcd34d" },
      ],
    },
    {
      label: "Limits",
      items: [
        { id: "limits", icon: "L", label: "INT_MAX / INT_MIN", bg: "#1e293b", color: "#86efac" },
      ],
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="cpp-app">
        {/* Sidebar */}
        <aside className="cpp-sidebar">
          <div className="cpp-sidebar-logo">
            <h2>C++ Inbuilt Functions</h2>
            <p>Interactive Learning Guide</p>
          </div>

          <button className="cpp-back-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>

          <button
            className={`cpp-nav-item${activePage === "home" ? " active" : ""}`}
            onClick={() => navigate("/inbuilt")}
          >
            <span
              className="cpp-nav-icon"
              style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }}
            >
              🏠
            </span>
            Home
          </button>

          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="cpp-nav-label">{group.label}</div>
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  {...item}
                  active={activePage === item.id}
                  onClick={setActivePage}
                />
              ))}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="cpp-main">
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              className="cpp-back-btn"
              onClick={() => navigate("/")}
              style={{ width: "auto", display: "inline-flex" }}
            >
              ← Back to Dashboard
            </button>
          </div>

          {!type ? (
            <HomePage onSelect={setActivePage} />
          ) : functionData[type] ? (
            <DetailPage data={functionData[type]} />
          ) : (
            <HomePage onSelect={setActivePage} />
          )}
        </main>
      </div>
    </>
  );
};

export default InbuiltFunctions;