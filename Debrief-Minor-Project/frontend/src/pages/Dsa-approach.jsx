import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    id: 1,
    title: "Understand the question",
    tag: "// parse",
    desc: "Break the question into atomic parts: what is the input, what is the output, and what exact transformation is being asked?",
    tip: "Input → array nums | Output → new array | Task → prefix sums",
    detail: (
      <>
        <p>Read the problem twice. Identify:</p>
        <ul style={{ paddingLeft: "1.2rem", marginTop: "8px", lineHeight: 2 }}>
          <li>Input type and shape</li>
          <li>Output type</li>
          <li>Edge cases mentioned</li>
          <li>Keywords like "subarray", "unique", "sorted"</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          For running sum: <code>runningSum[i] = sum(nums[0..i])</code>. That is literally all you need.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "Dry run examples",
    tag: "// trace",
    desc: "Manually trace the given examples step-by-step. Do not skip this. Most optimizations reveal themselves here.",
    tip: "nums=[1,2,3,4] → [1, 1+2, 1+2+3, 1+2+3+4] → [1, 3, 6, 10]",
    detail: (
      <>
        <p>Simulate on paper (or mentally):</p>
        <ul style={{ paddingLeft: "1.2rem", marginTop: "8px", lineHeight: 2 }}>
          <li>Index 0 → sum = 1</li>
          <li>Index 1 → sum = 1 + 2 = 3</li>
          <li>Index 2 → sum = 3 + 3 = 6</li>
          <li>Index 3 → sum = 6 + 4 = 10</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          Pattern spotted: <code>result[i] = result[i-1] + nums[i]</code>. This is the entire solution.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Check constraints",
    tag: "// analyze",
    desc: "Constraints dictate the maximum acceptable time complexity. Always read them before picking your approach.",
    tip: "n ≤ 1000 → O(n) or O(n²) both work; O(n) always preferred",
    detail: (
      <>
        <p>Constraint → Complexity guide:</p>
        <ul style={{ paddingLeft: "1.2rem", marginTop: "8px", lineHeight: 2 }}>
          <li><code>n ≤ 10</code> → brute force fine (even O(n!))</li>
          <li><code>n ≤ 1,000</code> → O(n²) acceptable</li>
          <li><code>n ≤ 100,000</code> → need O(n log n)</li>
          <li><code>n ≤ 10^7</code> → must be O(n)</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          Here: <code>n ≤ 1000</code>, so a single loop is more than fast enough.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: "Write brute force",
    tag: "// baseline",
    desc: "Start with the simplest correct solution. It clarifies your logic and gives you a verified baseline to optimize from.",
    tip: "Nested loops first → compute each prefix sum from scratch → O(n²)",
    detail: (
      <>
        <p>Brute force for running sum:</p>
        <pre style={{
          marginTop: "10px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
          lineHeight: 1.8, background: "rgba(0,0,0,0.05)", padding: "10px", borderRadius: "8px"
        }}>
{`for i from 0 to n-1:
  total = 0
  for j from 0 to i:
    total += nums[j]
  result[i] = total`}
        </pre>
        <p style={{ marginTop: "10px" }}>This is O(n²). Correct, but notice the redundancy — can we do better?</p>
      </>
    ),
  },
  {
    id: 5,
    title: "Optimize and code",
    tag: "// ship",
    desc: "Look for redundancy in brute force. Reuse previous work. Common patterns: prefix sum, sliding window, two pointers, memoization.",
    tip: "result[i] = result[i-1] + nums[i] → single pass, O(n) time, O(1) space",
    detail: (
      <>
        <p>We recompute the same sums repeatedly. Instead, carry a running total:</p>
        <pre style={{
          marginTop: "10px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
          lineHeight: 1.8, background: "rgba(0,0,0,0.05)", padding: "10px", borderRadius: "8px"
        }}>
{`for i from 1 to n-1:
  nums[i] += nums[i-1]
return nums`}
        </pre>
        <p style={{ marginTop: "10px" }}>O(n) time, O(1) space. Each step reuses the previous result — zero redundancy.</p>
      </>
    ),
  },
];

const TRACE_STEPS = [
  {
    label: "Step 1 / 5 — Understand the question",
    progress: "1 / 5",
    insight: 'Problem: given nums = [1, 2, 3, 4], return runningSum[] where runningSum[i] = sum(nums[0..i]).',
    arrState: [-1, -1, -1, -1],
    prefixState: [null, null, null, null],
    calc: "",
  },
  {
    label: "Step 2 / 5 — Dry run: index 0",
    progress: "2 / 5",
    insight: "At i=0, runningSum[0] = nums[0] = 1. No previous element, so it's just the first value.",
    arrState: [0, -1, -1, -1],
    prefixState: [1, null, null, null],
    calc: "i=0 → runningSum[0] = 1",
  },
  {
    label: "Step 2 / 5 — Dry run: index 1",
    progress: "2 / 5",
    insight: "At i=1, runningSum[1] = runningSum[0] + nums[1] = 1 + 2 = 3. Pattern is forming!",
    arrState: [3, 1, -1, -1],
    prefixState: [1, 3, null, null],
    calc: "i=1 → 1 + 2 = 3",
  },
  {
    label: "Step 2 / 5 — Dry run: index 2",
    progress: "2 / 5",
    insight: "At i=2, runningSum[2] = runningSum[1] + nums[2] = 3 + 3 = 6. Each step adds exactly one new element.",
    arrState: [3, 3, 2, -1],
    prefixState: [1, 3, 6, null],
    calc: "i=2 → 3 + 3 = 6",
  },
  {
    label: "Steps 3–5 — Constraints → Optimize → Code",
    progress: "5 / 5",
    insight: "n ≤ 1000 so O(n) is perfect. Optimize: nums[i] += nums[i-1]. Final output: [1, 3, 6, 10] ✓",
    arrState: [3, 3, 3, 3],
    prefixState: [1, 3, 6, 10],
    calc: "i=3 → 6 + 4 = 10  →  Output: [1, 3, 6, 10] ✓",
  },
];

const INPUT_ARR = [1, 2, 3, 4];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');

  .dsa-wrap {
    min-height: 100vh;
    background: #0f172a;
    color: #e2e8f0;
    font-family: 'Fraunces', Georgia, serif;
    padding: 2.5rem 1.25rem 4rem;
  }
  .dsa-inner { max-width: 780px; margin: auto; }

  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    margin-bottom: 2rem;
    background: transparent;
    border: 0.5px solid #334155;
    padding: 6px 14px;
    border-radius: 8px;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; cursor: pointer;
    transition: all 0.2s;
  }
  .back-btn:hover { background: #1e293b; color: #e2e8f0; }

  .hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
  .eyebrow { font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.12em; color: #64748b; text-transform: uppercase; margin-bottom: 0.5rem; }
  .hero-title { font-size: clamp(22px, 5vw, 32px); font-weight: 600; color: #f1f5f9; line-height: 1.2; }
  .hero-title em { font-style: italic; font-weight: 300; color: #94a3b8; }
  .hero-sub { margin-top: 0.5rem; font-size: 14px; font-weight: 300; color: #64748b; line-height: 1.65; }
  .hero-badge { font-family: 'JetBrains Mono', monospace; font-size: 11px; background: #052e16; color: #4ade80; border: 0.5px solid #166534; border-radius: 8px; padding: 5px 12px; white-space: nowrap; align-self: flex-start; }

  .steps { display: flex; flex-direction: column; }
  .step { display: grid; grid-template-columns: 56px 1fr; cursor: pointer; }
  .step-rail { display: flex; flex-direction: column; align-items: center; }
  .step-num { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; background: #1e293b; border: 0.5px solid #334155; color: #94a3b8; transition: all 0.25s; flex-shrink: 0; z-index: 1; }
  .step.active .step-num { background: #0c2d5a; border-color: #2563eb; color: #60a5fa; }
  .step-line { width: 0.5px; flex: 1; min-height: 24px; background: #1e293b; }
  .step:last-child .step-line { display: none; }
  .step-body { padding: 6px 0 1.5rem 0; }
  .step-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
  .step-title { font-size: 16px; font-weight: 600; color: #f1f5f9; line-height: 1.3; }
  .chevron { display: inline-block; transition: transform 0.3s; color: #475569; font-size: 14px; }
  .step.open .chevron { transform: rotate(180deg); }
  .step-desc { font-size: 14px; font-weight: 300; color: #64748b; line-height: 1.65; margin-bottom: 8px; }
  .step-tip { display: inline-block; font-size: 12px; font-family: 'JetBrains Mono', monospace; background: #0f2a1a; border: 0.5px solid #14532d; border-left: 2px solid #22c55e; border-radius: 0 8px 8px 0; padding: 6px 10px; color: #4ade80; line-height: 1.5; }
  .step-detail { overflow: hidden; max-height: 0; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
  .step.open .step-detail { max-height: 500px; }
  .step-detail-inner { margin-top: 10px; background: #1e293b; border: 0.5px solid #334155; border-radius: 12px; padding: 1rem 1.25rem; font-size: 13px; color: #94a3b8; line-height: 1.7; }
  .step-detail-inner code { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: #0f172a; padding: 1px 5px; border-radius: 4px; color: #86efac; }
  .step-detail-inner ul { list-style: disc; }
  .step-detail-inner p { color: #94a3b8; }

  .divider { margin: 2.5rem 0 2rem; border: none; height: 0.5px; background: #1e293b; }

  .demo-label { font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.1em; color: #64748b; text-transform: uppercase; margin-bottom: 1rem; }
  .demo-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .demo-title { font-size: 20px; font-weight: 600; color: #f1f5f9; }
  .demo-prob { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #64748b; }

  .demo-card { background: #1e293b; border: 0.5px solid #334155; border-radius: 14px; overflow: hidden; }
  .demo-tabs { display: flex; border-bottom: 0.5px solid #334155; background: #0f172a; }
  .demo-tab { flex: 1; padding: 10px; border: none; background: transparent; font-family: 'Fraunces', serif; font-size: 13px; font-weight: 300; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
  .demo-tab.active { color: #f1f5f9; font-weight: 600; background: #1e293b; border-bottom-color: #2563eb; }

  .demo-panel { padding: 1.25rem; }
  .step-indicator { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #475569; margin-bottom: 1rem; }

  .arr-section-label { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #475569; margin-bottom: 6px; }
  .array-vis { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .arr-cell { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .arr-box { width: 46px; height: 46px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 600; border: 0.5px solid #334155; background: #0f172a; color: #94a3b8; transition: all 0.3s; }
  .arr-box.current { background: #0c2d5a; border-color: #2563eb; color: #60a5fa; }
  .arr-box.done { background: #052e16; border-color: #16a34a; color: #4ade80; }
  .arr-idx { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #475569; }

  .prefix-vis { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .prefix-cell { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .prefix-box { width: 46px; height: 46px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; border: 0.5px solid #334155; background: #0f172a; color: #475569; transition: all 0.3s; }
  .prefix-box.filled { background: #052e16; border-color: #16a34a; color: #4ade80; }
  .prefix-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #475569; }

  .calc-line { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #475569; margin-bottom: 6px; padding: 9px 12px; background: #0f172a; border-radius: 8px; border-left: 2px solid #334155; transition: all 0.3s; min-height: 40px; display: flex; align-items: center; }
  .calc-line.active { border-left-color: #2563eb; color: #93c5fd; background: #0c2d5a; }

  .insight-box { margin: 1rem 0 0; padding: 10px 14px; border-radius: 8px; border: 0.5px solid #713f12; background: #1c0a00; font-size: 13px; color: #fbbf24; line-height: 1.6; font-weight: 300; min-height: 48px; }

  .controls { display: flex; gap: 8px; flex-wrap: wrap; padding: 1rem 1.25rem; border-top: 0.5px solid #334155; background: #0f172a; justify-content: space-between; align-items: center; }
  .ctrl-left { display: flex; gap: 8px; flex-wrap: wrap; }
  .ctrl-btn { padding: 7px 16px; border-radius: 8px; border: 0.5px solid #334155; background: #1e293b; color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 12px; cursor: pointer; transition: all 0.2s; }
  .ctrl-btn:hover { background: #273549; color: #e2e8f0; }
  .ctrl-btn:active { transform: scale(0.97); }
  .ctrl-btn.primary { background: #0c2d5a; border-color: #2563eb; color: #60a5fa; }
  .ctrl-btn.primary:hover { background: #1d4ed8; color: #fff; }
  .ctrl-progress { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #475569; }

  .code-block { background: #0f172a; border-radius: 10px; padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.9; color: #94a3b8; overflow-x: auto; white-space: pre; border: 0.5px solid #1e293b; }
  .kw { color: #818cf8; }
  .cm { color: #475569; font-style: italic; }
  .fn { color: #4ade80; }
  .nm { color: #fb923c; }

  .golden-rule { margin-top: 2.5rem; padding: 1.25rem 1.5rem; background: #1e293b; border: 0.5px solid #334155; border-radius: 14px; border-left: 3px solid #2563eb; display: flex; gap: 14px; align-items: flex-start; }
  .golden-icon { width: 34px; height: 34px; flex-shrink: 0; border-radius: 50%; background: #1c0a00; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .golden-text { font-size: 14px; color: #94a3b8; line-height: 1.7; font-weight: 300; }
  .golden-text strong { font-weight: 600; color: #f1f5f9; }

  @media (max-width: 500px) {
    .hero { flex-direction: column; }
    .arr-box, .prefix-box { width: 38px; height: 38px; font-size: 13px; }
    .demo-title { font-size: 17px; }
  }
`;

export default function DsaApproach() {
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState(null);
  const [tab, setTab] = useState(0);
  const [traceIdx, setTraceIdx] = useState(0);

  const trace = TRACE_STEPS[traceIdx];

  const toggleStep = (i) => setOpenStep(openStep === i ? null : i);

  return (
    <>
      <style>{styles}</style>
      <div className="dsa-wrap">
        <div className="dsa-inner">

          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Dashboard
          </button>

          <div className="hero">
            <div>
              <div className="eyebrow">// problem-solving framework</div>
              <div className="hero-title">
                How to approach <em>any</em><br />DSA question
              </div>
              <div className="hero-sub">
                A repeatable 5-step method. Follow this every time,<br />
                and consistency will outperform talent.
              </div>
            </div>
            <div className="hero-badge">5 steps · O(n) mindset</div>
          </div>

          <div className="steps">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`step ${openStep === i ? "open active" : ""}`}
                onClick={() => toggleStep(i)}
              >
                <div className="step-rail">
                  <div className="step-num">{s.id}</div>
                  <div className="step-line" />
                </div>
                <div className="step-body">
                  <div className="step-header">
                    <div className="step-title">{s.title}</div>
                    <span className="chevron">⌄</span>
                  </div>
                  <div className="step-desc">{s.desc}</div>
                  <div className="step-tip">{s.tip}</div>
                  <div className="step-detail">
                    <div className="step-detail-inner">{s.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          <div>
            <div className="demo-label">// live walkthrough</div>
            <div className="demo-head">
              <div className="demo-title">Running sum of 1D array</div>
              <div className="demo-prob">LeetCode #1480 · Easy</div>
            </div>

            <div className="demo-card">
              <div className="demo-tabs">
                <button
                  className={`demo-tab ${tab === 0 ? "active" : ""}`}
                  onClick={() => setTab(0)}
                >
                  Step-by-step trace
                </button>
                <button
                  className={`demo-tab ${tab === 1 ? "active" : ""}`}
                  onClick={() => setTab(1)}
                >
                  Solution code
                </button>
              </div>

              {tab === 0 && (
                <div className="demo-panel">
                  <div className="step-indicator">{trace.label}</div>

                  <div className="arr-section-label">input array</div>
                  <div className="array-vis">
                    {INPUT_ARR.map((v, i) => {
                      let cls = "arr-box";
                      if (trace.arrState[i] === i) cls += " current";
                      else if (trace.arrState[i] >= 0) cls += " done";
                      return (
                        <div className="arr-cell" key={i}>
                          <div className={cls}>{v}</div>
                          <div className="arr-idx">[{i}]</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="arr-section-label">running sum array</div>
                  <div className="prefix-vis">
                    {trace.prefixState.map((v, i) => (
                      <div className="prefix-cell" key={i}>
                        <div className={`prefix-box ${v !== null ? "filled" : ""}`}>
                          {v !== null ? v : "?"}
                        </div>
                        <div className="prefix-label">p[{i}]</div>
                      </div>
                    ))}
                  </div>

                  <div className={`calc-line ${trace.calc ? "active" : ""}`}>
                    {trace.calc ? `> ${trace.calc}` : "> waiting to trace..."}
                  </div>

                  <div className="insight-box">{trace.insight}</div>
                </div>
              )}

              {tab === 1 && (
                <div className="demo-panel">
                  <div className="code-block">
                    {`// Running Sum of 1D Array — O(n) time, O(1) extra space\n`}
                    <span className="kw">var</span>
                    {` `}
                    <span className="fn">runningSum</span>
                    {` = `}
                    <span className="kw">function</span>
                    {`(nums) {\n`}
                    {`  `}
                    <span className="cm">{"// Step 4→5: brute O(n²) → optimized O(n) in-place"}</span>
                    {`\n  `}
                    <span className="kw">for</span>
                    {` (`}
                    <span className="kw">let</span>
                    {` i = `}
                    <span className="nm">1</span>
                    {`; i < nums.length; i++) {\n    nums[i] += nums[i - `}
                    <span className="nm">1</span>
                    {`];  `}
                    <span className="cm">{"// add previous running sum"}</span>
                    {`\n  }\n  `}
                    <span className="kw">return</span>
                    {` nums;\n};\n\n`}
                    <span className="cm">{"// Dry run (Step 2):"}</span>
                    {`\n`}
                    <span className="cm">{"// nums = [1, 2, 3, 4]"}</span>
                    {`\n`}
                    <span className="cm">{"// i=1 → nums[1] = 2+1 = 3  → [1, 3, 3, 4]"}</span>
                    {`\n`}
                    <span className="cm">{"// i=2 → nums[2] = 3+3 = 6  → [1, 3, 6, 4]"}</span>
                    {`\n`}
                    <span className="cm">{"// i=3 → nums[3] = 4+6 = 10 → [1, 3, 6, 10]"}</span>
                    {`\n`}
                    <span className="cm">{"// Output: [1, 3, 6, 10] ✓"}</span>
                    {`\n\n`}
                    <span className="cm">{"// Constraints (Step 3): n ≤ 1000 → O(n) is perfect"}</span>
                  </div>
                </div>
              )}

              <div className="controls">
                <div className="ctrl-left">
                  <button
                    className="ctrl-btn"
                    onClick={() => setTraceIdx((p) => Math.max(0, p - 1))}
                  >
                    ← prev
                  </button>
                  <button
                    className="ctrl-btn primary"
                    onClick={() =>
                      setTraceIdx((p) => Math.min(TRACE_STEPS.length - 1, p + 1))
                    }
                  >
                    next →
                  </button>
                  <button className="ctrl-btn" onClick={() => setTraceIdx(0)}>
                    reset
                  </button>
                </div>
                <div className="ctrl-progress">
                  {traceIdx + 1} / {TRACE_STEPS.length}
                </div>
              </div>
            </div>
          </div>

          <div className="golden-rule">
            <div className="golden-icon">▲</div>
            <div className="golden-text">
              <strong>The golden rule:</strong> Never jump to code directly.
              <br />
              Think → Plan → Dry run → Then code. Every single time.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}