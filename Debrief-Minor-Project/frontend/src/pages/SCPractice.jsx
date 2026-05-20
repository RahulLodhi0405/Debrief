import { useState} from "react";
const questions = [
    {
        id: 1, difficulty: "Easy", tag: "Arrays",
        question: "What is the space complexity of this code?",
        code: `int arr[n];\nfor (int i = 0; i < n; i++) {\n  arr[i] = i;\n}`,
        options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        answer: "O(n)",
        explanation: "An array of size n is allocated, using O(n) space.",
    },
    {
        id: 2, difficulty: "Easy", tag: "Arrays",
        question: "What is the space complexity?",
        code: `int a = 5;\nint b = 10;\nint sum = a + b;`,
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        answer: "O(1)",
        explanation: "Only constant variables are used, no dynamic allocation.",
    },
    {
        id: 3, difficulty: "Medium", tag: "Arrays",
        question: "Find the space complexity of this code:",
        code: `vector<int> v1(n);\nvector<int> v2(m);\nfor (int i = 0; i < n; i++) {\n  v1[i] = i;\n}\nfor (int j = 0; j < m; j++) {\n  v2[j] = j;\n}`,
        options: ["O(n)", "O(n + m)", "O(n²)", "O(nm)"],
        answer: "O(n + m)",
        explanation: "Two vectors of size n and m, total space is O(n + m).",
    },
    {
        id: 4, difficulty: "Medium", tag: "Arrays",
        question: "What is the space complexity?",
        code: `int arr[n][n];\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < n; j++) {\n    arr[i][j] = i + j;\n  }\n}`,
        options: ["O(n)", "O(n²)", "O(n log n)", "O(3n)"],
        answer: "O(n²)",
        explanation: "A 2D array of n x n elements, using O(n²) space.",
    },
    {
        id: 5, difficulty: "Hard", tag: "Arrays",
        question: "What is the space complexity?",
        code: `vector<vector<int>> matrix(n, vector<int>(m));\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < m; j++) {\n    matrix[i][j] = i * j;\n  }\n}`,
        options: ["O(n)", "O(m)", "O(nm)", "O(n + m)"],
        answer: "O(nm)",
        explanation: "2D vector of n rows and m columns, total O(nm) space.",
    },
    {
        id: 6, difficulty: "Easy", tag: "Stacks",
        question: "What is the space complexity?",
        code: `stack<int> st;\nfor (int i = 0; i < n; i++) {\n  st.push(i);\n}`,
        options: ["O(n²)", "O(1)", "O(n)", "O(log n)"],
        answer: "O(n)",
        explanation: "Stack holds up to n elements, O(n) space.",
    },
    {
        id: 7, difficulty: "Medium", tag: "Stacks",
        question: "What is the space complexity with two stacks?",
        code: `stack<int> st1, st2;\nfor (int i = 0; i < n; i++) {\n  st1.push(i);\n  st2.push(i * 2);\n}`,
        options: ["O(n)", "O(2n)", "O(n²)", "O(1)"],
        answer: "O(2n)",
        explanation: "Two stacks each holding n elements, total O(2n).",
    },
    {
        id: 8, difficulty: "Hard", tag: "Stacks",
        question: "What is the space complexity?",
        code: `stack<int> st1, st2, st3;\nfor (int i = 0; i < n; i++) {\n  st1.push(i);\n  st2.push(i + 1);\n  st3.push(i + 2);\n}`,
        options: ["O(n)", "O(3n)", "O(n²)", "O(n³)"],
        answer: "O(3n)",
        explanation: "Three stacks each holding n elements, total O(3n).",
    },
    {
        id: 9, difficulty: "Medium", tag: "Arrays",
        question: "What is the space complexity?",
        code: `int arr[n];\nfor (int i = n; i > 0; i--) {\n  arr[i-1] = i;\n}`,
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Array of size n, O(n) space.",
    },
    {
        id: 10, difficulty: "Easy", tag: "Arrays",
        question: "What is the space complexity?",
        code: `int arr[n];\nfor (int i = 0; i < 5; i++) {\n  arr[i] = i;\n}`,
        options: ["O(n)", "O(5)", "O(n²)", "O(1)"],
        answer: "O(n)",
        explanation: "Array of size n, regardless of how many elements we fill.",
    },
    {
        id: 11, difficulty: "Medium", tag: "HashMap",
        question: "What is the space complexity?",
        code: `map<int, int> mp;\nfor (int i = 0; i < n; i++) {\n  mp[i] = i * 2;\n}`,
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: "O(n)",
        explanation: "Map stores n key-value pairs, O(n) space.",
    },
    {
        id: 12, difficulty: "Hard", tag: "HashMap",
        question: "What is the space complexity?",
        code: `set<int> s1, s2;\nfor (int i = 0; i < n; i++) {\n  s1.insert(i);\n  s2.insert(i * i);\n}`,
        options: ["O(n)", "O(2n)", "O(n²)", "O(log n)"],
        answer: "O(2n)",
        explanation: "Two sets each storing n elements, total O(2n).",
    },
    {
        id: 13, difficulty: "Medium", tag: "Arrays",
        question: "What is the space complexity?",
        code: `vector<int> arr1(n), arr2(n), arr3(m);\nfor (int i = 0; i < n; i++) {\n  arr1[i] = i;\n  arr2[i] = i * 2;\n}\nfor (int j = 0; j < m; j++) {\n  arr3[j] = j;\n}`,
        options: ["O(n)", "O(2n + m)", "O(n²)", "O(n log n)"],
        answer: "O(2n + m)",
        explanation: "Two vectors of size n and one of size m, total O(2n + m).",
    },
    {
        id: 14, difficulty: "Hard", tag: "Arrays",
        question: "What is the space complexity?",
        code: `int arr[n][n];\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j <= i; j++) {\n    arr[i][j] = j;\n  }\n}`,
        options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
        answer: "O(n²)",
        explanation: "Triangular 2D array, total elements sum to O(n²).",
    },
    {
        id: 15, difficulty: "Easy", tag: "Stacks",
        question: "What is the space complexity?",
        code: `stack<int> st;\nfor (int i = 0; i < n; i++) {\n  st.push(i);\n  if (st.size() > 5) st.pop();\n}`,
        options: ["O(n)", "O(5)", "O(1)", "O(n²)"],
        answer: "O(n)",
        explanation: "Stack can grow up to n size, O(n) space despite occasional pops.",
    },
    {
        id: 16, difficulty: "Medium", tag: "HashMap",
        question: "What is the space complexity?",
        code: `map<int, vector<int>> mp;\nfor (int i = 0; i < n; i++) {\n  mp[i].push_back(i);\n}`,
        options: ["O(n)", "O(n²)", "O(log n)", "O(2n)"],
        answer: "O(n)",
        explanation: "Map with n keys, each storing one element, O(n) space.",
    },
    {
        id: 17, difficulty: "Hard", tag: "Arrays",
        question: "What is the space complexity?",
        code: `vector<vector<int>> v(n);\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < i; j++) {\n    v[i].push_back(j);\n  }\n}`,
        options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
        answer: "O(n²)",
        explanation: "2D vector with triangular structure, total O(n²) space.",
    },
    {
        id: 18, difficulty: "Medium", tag: "Stacks",
        question: "What is the space complexity with mixed operations?",
        code: `stack<int> st1, st2;\nfor (int i = 0; i < n; i++) {\n  st1.push(i);\n}\nfor (int i = 0; i < n; i++) {\n  st2.push(st1.top());\n  st1.pop();\n}`,
        options: ["O(n)", "O(2n)", "O(n²)", "O(1)"],
        answer: "O(n)",
        explanation: "At most n elements stored at any time, O(n) space.",
    },
    {
        id: 19, difficulty: "Hard", tag: "HashMap",
        question: "What is the space complexity?",
        code: `map<int, set<int>> mp;\nfor (int i = 0; i < n; i++) {\n  for (int j = 0; j < n; j++) {\n    mp[i].insert(j);\n  }\n}`,
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2n)"],
        answer: "O(n²)",
        explanation: "Map with n keys, each set containing n elements, O(n²) space.",
    },
    {
        id: 20, difficulty: "Medium", tag: "Arrays",
        question: "What is the space complexity?",
        code: `vector<int> v1(n), v2(n), v3(n);\nfor (int i = 0; i < n; i++) {\n  v1[i] = i;\n  v2[i] = i + 1;\n  v3[i] = i + 2;\n}`,
        options: ["O(n)", "O(3n)", "O(n²)", "O(n³)"],
        answer: "O(3n)",
        explanation: "Three vectors each of size n, total O(3n) space.",
    },
];


const diffColor = { Easy: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" }, Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" }, Hard: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" } };
const tagColor = { Arrays: "#3b82f6", Recursion: "#8b5cf6", Stacks: "#ec4899", HashMap: "#f97316" };

export default function SCPractice() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const q = questions[current];
    const total = questions.length;
    const answered = Object.keys(answers).length;
    const correct = Object.values(answers).filter(Boolean).length;

    const handleConfirm = () => {
        if (!selected) return;
        const isCorrect = selected === q.answer;
        setConfirmed(true);
        setAnswers(prev => ({ ...prev, [current]: isCorrect }));
        if (isCorrect) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current === total - 1) { setFinished(true); return; }
        setCurrent(c => c + 1);
        setSelected(null);
        setConfirmed(false);
    };

    const handleJump = (idx) => {
        setCurrent(idx);
        setSelected(answers[idx] !== undefined ? questions[idx].answer : null);
        setConfirmed(answers[idx] !== undefined);
        setShowSidebar(false);
    };

    const goToDashboard = () => {
        window.location.href = "/dashboard";
    };

    const restart = () => {
        setCurrent(0); setSelected(null); setConfirmed(false);
        setScore(0); setAnswers({}); setFinished(false);
    };

    if (finished) {
        const pct = Math.round((correct / total) * 100);
        const grade = pct >= 85 ? { label: "Excellent!", color: "#10b981", msg: "You've mastered Space Complexity!" } : pct >= 60 ? { label: "Good Job!", color: "#f59e0b", msg: "Review a few tricky ones and you'll nail it." } : { label: "Keep Practicing", color: "#ef4444", msg: "Go back to the learn page and revisit the concepts." };
        return (
            <div style={{ minHeight: "100vh", background: "#080d18", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Sora', sans-serif" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", maxWidth: "480px", width: "100%", textAlign: "center" }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>{pct >= 85 ? "🏆" : pct >= 60 ? "⭐" : "📖"}</div>
                    <div style={{ fontSize: "40px", fontWeight: "700", color: grade.color, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</div>
                    <div style={{ fontSize: "22px", fontWeight: "700", color: "#e2e8f0", marginTop: "8px" }}>{grade.label}</div>
                    <div style={{ fontSize: "14px", color: "#64748b", marginTop: "8px", lineHeight: "1.6" }}>{grade.msg}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "28px 0" }}>
                        {[{ label: "Correct", val: correct, color: "#10b981" }, { label: "Wrong", val: total - correct, color: "#ef4444" }].map(({ label, val, color }) => (
                            <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px" }}>
                                <div style={{ fontSize: "28px", fontWeight: "700", color, fontFamily: "'JetBrains Mono', monospace" }}>{val}</div>
                                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button onClick={restart} style={{ background: "#10b981", border: "none", color: "white", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>Try Again</button>
                        <button onClick={goToDashboard} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>← Dashboard</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#080d18", color: "#e2e8f0", fontFamily: "'Sora', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
                @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }
                .opt-btn { transition: all 0.18s; cursor: pointer; }
                .opt-btn:hover { transform: translateY(-1px); }
                .q-dot { transition: all 0.15s; cursor: pointer; }
                .q-dot:hover { transform: scale(1.2); }
                .sidebar-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:40; }
                @media(max-width:900px){ .desktop-sidebar{ display:none!important; } }
                @media(min-width:901px){ .mobile-toggle{ display:none!important; } }
            `}</style>

            {/* Top Nav */}
            <div style={{ background: "rgba(8,13,24,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(12px)" }}>
                <button onClick={goToDashboard} style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", padding: "6px 13px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "inherit", fontWeight: "600" }}>← Dashboard</button>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: "700" }}>SC Practice</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{answered}/{total} answered · {score} correct</div>
                </div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#10b981", fontFamily: "'JetBrains Mono', monospace" }}>{answered}/{total}</div>
                {/* Mobile toggle */}
                <button className="mobile-toggle" onClick={() => setShowSidebar(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", padding: "6px 13px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
                    Questions ☰
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showSidebar && (
                <>
                    <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />
                    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "280px", background: "#0c1220", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 50, padding: "20px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <span style={{ fontWeight: "700", fontSize: "15px" }}>All Questions</span>
                            <button onClick={() => setShowSidebar(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px" }}>✕</button>
                        </div>
                        <SidebarContent questions={questions} current={current} answers={answers} handleJump={handleJump} diffColor={diffColor} />
                    </div>
                </>
            )}

            {/* Main Layout */}
            <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", minHeight: "calc(100vh - 57px)" }}>

                {/* Desktop Sidebar */}
                <div className="desktop-sidebar" style={{ width: "260px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px", overflowY: "auto", maxHeight: "calc(100vh - 57px)", position: "sticky", top: "57px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                    <style>{`::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; } ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }`}</style>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", letterSpacing: "1px", marginBottom: "14px" }}>ALL QUESTIONS</div>
                    <SidebarContent questions={questions} current={current} answers={answers} handleJump={handleJump} diffColor={diffColor} />
                </div>

                {/* Question Area */}
                <div style={{ flex: 1, padding: "24px 20px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                    <style>{`::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; } ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }`}</style>
                    <div key={current} style={{ maxWidth: "680px", margin: "0 auto", animation: "fadeUp 0.35s ease" }}>

                        {/* Question Header */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>Q{current + 1} of {total}</span>
                            <span style={{ background: diffColor[q.difficulty].bg, border: `1px solid ${diffColor[q.difficulty].border}`, color: diffColor[q.difficulty].color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{q.difficulty}</span>
                            <span style={{ background: `${tagColor[q.tag]}18`, border: `1px solid ${tagColor[q.tag]}40`, color: tagColor[q.tag], padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{q.tag}</span>
                        </div>

                        {/* Question */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px", marginBottom: "14px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.6", marginBottom: "16px" }}>{q.question}</p>
                            {/* Code */}
                            <div style={{ background: "#060b16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
                                <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 14px", display: "flex", gap: "5px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />)}
                                </div>
                                <pre style={{ padding: "16px", fontSize: "13px", lineHeight: "1.85", color: "#7dd3fc", fontFamily: "'JetBrains Mono', monospace", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>{q.code}</pre>
                            </div>
                        </div>

                        {/* Options */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                            {q.options.map((opt, i) => {
                                const isSelected = selected === opt;
                                const isCorrect = opt === q.answer;
                                let bg = "rgba(255,255,255,0.03)";
                                let border = "rgba(255,255,255,0.08)";
                                let color = "#e2e8f0";
                                if (confirmed) {
                                    if (isCorrect) { bg = "rgba(16,185,129,0.12)"; border = "rgba(16,185,129,0.4)"; color = "#10b981"; }
                                    else if (isSelected && !isCorrect) { bg = "rgba(239,68,68,0.12)"; border = "rgba(239,68,68,0.4)"; color = "#ef4444"; }
                                    else { color = "#475569"; }
                                } else if (isSelected) {
                                    bg = "rgba(59,130,246,0.12)"; border = "rgba(59,130,246,0.4)"; color = "#3b82f6";
                                }
                                return (
                                    <button key={i} className="opt-btn" onClick={() => !confirmed && setSelected(opt)} style={{
                                        background: bg, border: `1px solid ${border}`, borderRadius: "12px", padding: "14px 16px",
                                        textAlign: "left", cursor: confirmed ? "default" : "pointer", display: "flex", alignItems: "center", gap: "10px",
                                        color, fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", fontWeight: "600",
                                        transform: isSelected && !confirmed ? "translateY(-1px)" : "none",
                                        boxShadow: isSelected && !confirmed ? "0 4px 16px rgba(59,130,246,0.2)" : "none",
                                    }}>
                                        <span style={{ width: "24px", height: "24px", borderRadius: "6px", background: confirmed && isCorrect ? "#10b981" : confirmed && isSelected && !isCorrect ? "#ef4444" : isSelected ? "#3b82f6" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "white", flexShrink: 0, fontFamily: "inherit" }}>
                                            {confirmed && isCorrect ? "✓" : confirmed && isSelected && !isCorrect ? "✗" : ["A","B","C","D"][i]}
                                        </span>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        {confirmed && (
                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `3px solid ${selected === q.answer ? "#10b981" : "#ef4444"}`, borderRadius: "0 12px 12px 0", padding: "16px 18px", marginBottom: "14px", animation: "fadeUp 0.3s ease" }}>
                                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", letterSpacing: "1px", marginBottom: "8px" }}>
                                    {selected === q.answer ? "✅ CORRECT!" : `❌ WRONG — Answer: ${q.answer}`}
                                </div>
                                <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.75" }}>{q.explanation}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                            {!confirmed ? (
                                <button onClick={handleConfirm} disabled={!selected} style={{
                                    background: selected ? "#10b981" : "rgba(255,255,255,0.04)",
                                    border: selected ? "none" : "1px solid rgba(255,255,255,0.08)",
                                    color: selected ? "white" : "#475569",
                                    padding: "12px 28px", borderRadius: "10px", cursor: selected ? "pointer" : "default",
                                    fontFamily: "inherit", fontSize: "14px", fontWeight: "600",
                                    transition: "all 0.2s",
                                }}>Confirm Answer</button>
                            ) : (
                                <button onClick={handleNext} style={{ background: "#10b981", border: "none", color: "white", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>
                                    {current === total - 1 ? "See Results →" : "Next Question →"}
                                </button>
                            )}
                            {current > 0 && (
                                <button onClick={() => { setCurrent(c=>c-1); setSelected(null); setConfirmed(false); }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
                                    ← Prev
                                </button>
                            )}
                            <span style={{ marginLeft: "auto", fontSize: "12px", color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                                Score: <span style={{ color: "#10b981", fontWeight: "600" }}>{score}</span>/{answered}
                            </span>
                        </div>

                        {/* Progress dots */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            {questions.map((_, i) => (
                                <div key={i} className="q-dot" onClick={() => handleJump(i)} title={`Q${i+1}`} style={{
                                    width: "10px", height: "10px", borderRadius: "50%",
                                    background: i === current ? "#3b82f6" : answers[i] === true ? "#10b981" : answers[i] === false ? "#ef4444" : "rgba(255,255,255,0.1)",
                                    border: i === current ? "2px solid #93c5fd" : "none",
                                    transition: "all 0.15s",
                                }} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarContent({ questions, current, answers, handleJump, diffColor }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {questions.map((q, i) => {
                const done = answers[i] !== undefined;
                const correct = answers[i] === true;
                return (
                    <button key={i} onClick={() => handleJump(i)} style={{
                        background: i === current ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${i === current ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.05)"}`,
                        borderRadius: "10px", padding: "10px 12px", cursor: "pointer", textAlign: "left",
                        display: "flex", alignItems: "center", gap: "8px", width: "100%", transition: "all 0.15s",
                    }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: done ? (correct ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)") : i === current ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "10px", color: done ? (correct ? "#10b981" : "#ef4444") : i === current ? "#3b82f6" : "#475569", fontWeight: "700", fontFamily: "'JetBrains Mono', monospace" }}>
                            {done ? (correct ? "✓" : "✗") : i + 1}
                        </div>
                        <div style={{ flex: 1, overflow: "hidden" }}>
                            <div style={{ fontSize: "12px", color: i === current ? "#e2e8f0" : "#94a3b8", fontWeight: i === current ? "600" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Q{i+1} · {q.tag}</div>
                            <div style={{ fontSize: "10px", color: diffColor[q.difficulty].color, marginTop: "1px" }}>{q.difficulty}</div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}