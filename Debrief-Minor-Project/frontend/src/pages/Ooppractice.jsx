import { useState } from "react";

const questions = [
    {
        id: 1, difficulty: "Easy", tag: "Classes",
        question: "Which keyword is used to define a class in C++?",
        code: `___ MyClass {
public:
    int x;
};`,
        options: ["struct", "class", "object", "type"],
        answer: "class",
        explanation: "The 'class' keyword is used to define a class in C++.",
    },
    {
        id: 2, difficulty: "Easy", tag: "Access",
        question: "What is the default access modifier in a C++ class?",
        code: `class Demo {
    int x;  // what is x's access?
};`,
        options: ["public", "protected", "private", "static"],
        answer: "private",
        explanation: "In C++, class members are private by default unless specified otherwise.",
    },
    {
        id: 3, difficulty: "Easy", tag: "Constructor",
        question: "Which of the following is true about constructors?",
        code: `class Box {
public:
    Box() {
        cout << "Box created!";
    }
};`,
        options: ["Has return type void", "Has same name as class", "Called manually only", "Must have parameters"],
        answer: "Has same name as class",
        explanation: "A constructor always has the same name as the class and has no return type.",
    },
    {
        id: 4, difficulty: "Easy", tag: "OOP Pillars",
        question: "Which OOP pillar is demonstrated here?",
        code: `class Animal {
private:
    int age;
public:
    void setAge(int a) { age = a; }
    int getAge() { return age; }
};`,
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        answer: "Encapsulation",
        explanation: "Hiding data (private) and providing public getters/setters is Encapsulation.",
    },
    {
        id: 5, difficulty: "Easy", tag: "Inheritance",
        question: "What is the correct syntax to inherit class B from class A?",
        code: `class A {
public:
    void hello() { cout << "A"; }
};

class B __ A { ... };`,
        options: ["class B extends A", "class B : public A", "class B -> A", "class B inherits A"],
        answer: "class B : public A",
        explanation: "In C++, inheritance syntax is: class Derived : access_specifier Base",
    },
    {
        id: 6, difficulty: "Medium", tag: "Constructor",
        question: "What will this code output?",
        code: `class MyClass {
public:
    MyClass() { cout << "C "; }
    ~MyClass() { cout << "D "; }
};
int main() {
    MyClass obj;
}`,
        options: ["C", "D", "C D", "D C"],
        answer: "C D",
        explanation: "Constructor runs when object is created, Destructor when it goes out of scope.",
    },
    {
        id: 7, difficulty: "Medium", tag: "Polymorphism",
        question: "What type of polymorphism does function overloading represent?",
        code: `int add(int a, int b) { return a+b; }
double add(double a, double b) { return a+b; }`,
        options: ["Runtime polymorphism", "Compile-time polymorphism", "Dynamic polymorphism", "Virtual polymorphism"],
        answer: "Compile-time polymorphism",
        explanation: "Function overloading is resolved at compile time — it's compile-time (static) polymorphism.",
    },
    {
        id: 8, difficulty: "Medium", tag: "Inheritance",
        question: "What will be the output?",
        code: `class A {
public:
    void show() { cout << "A "; }
};
class B : public A {
public:
    void show() { cout << "B "; }
};
int main() {
    B obj;
    obj.show();
    obj.A::show();
}`,
        options: ["A B", "B A", "A A", "B B"],
        answer: "B A",
        explanation: "obj.show() calls B's version. obj.A::show() explicitly calls A's version.",
    },
    {
        id: 9, difficulty: "Medium", tag: "Virtual",
        question: "What keyword enables runtime polymorphism in C++?",
        code: `class Shape {
public:
    ___ void draw() = 0;
};`,
        options: ["static", "override", "virtual", "abstract"],
        answer: "virtual",
        explanation: "The 'virtual' keyword enables runtime polymorphism and dynamic dispatch.",
    },
    {
        id: 10, difficulty: "Medium", tag: "this Pointer",
        question: "What does the 'this' pointer refer to?",
        code: `class Demo {
public:
    int x;
    void setX(int x) {
        this->x = x;
    }
};`,
        options: ["The class itself", "The current object", "The base class", "A static member"],
        answer: "The current object",
        explanation: "'this' is an implicit pointer that points to the calling object.",
    },
    {
        id: 11, difficulty: "Medium", tag: "Static",
        question: "What is the output?",
        code: `class Counter {
public:
    static int count;
    Counter() { count++; }
};
int Counter::count = 0;
int main() {
    Counter a, b, c;
    cout << Counter::count;
}`,
        options: ["0", "1", "2", "3"],
        answer: "3",
        explanation: "Static member is shared. Each constructor call increments it. 3 objects → count = 3.",
    },
    {
        id: 12, difficulty: "Medium", tag: "Access",
        question: "Which access specifier allows access to class members from derived class but NOT from outside?",
        code: `class Base {
    ___:
        int x;
};`,
        options: ["public", "private", "protected", "friend"],
        answer: "protected",
        explanation: "'protected' allows access in the class and derived classes, but not outside.",
    },
    {
        id: 13, difficulty: "Hard", tag: "Virtual",
        question: "What will this code output?",
        code: `class A {
public:
    virtual void show() { cout << "A "; }
};
class B : public A {
public:
    void show() override { cout << "B "; }
};
int main() {
    A* ptr = new B();
    ptr->show();
}`,
        options: ["A", "B", "A B", "Error"],
        answer: "B",
        explanation: "Virtual function + base pointer to derived object → derived class method called (runtime polymorphism).",
    },
    {
        id: 14, difficulty: "Hard", tag: "Abstraction",
        question: "What is a pure virtual function?",
        code: `class Shape {
public:
    virtual void area() = 0;  // what is this?
};`,
        options: ["A virtual function with body", "A function that cannot be inherited", "A function with = 0, no body in base class", "A static virtual function"],
        answer: "A function with = 0, no body in base class",
        explanation: "Pure virtual function (= 0) makes the class abstract. Derived classes must implement it.",
    },
    {
        id: 15, difficulty: "Hard", tag: "Operator Overloading",
        question: "What will be output of this operator overloading?",
        code: `class Point {
public:
    int x;
    Point(int x): x(x) {}
    Point operator+(Point p) {
        return Point(x + p.x);
    }
};
int main() {
    Point a(3), b(4);
    Point c = a + b;
    cout << c.x;
}`,
        options: ["3", "4", "7", "12"],
        answer: "7",
        explanation: "Overloaded + adds x values: 3 + 4 = 7.",
    },
    {
        id: 16, difficulty: "Hard", tag: "Inheritance",
        question: "In multiple inheritance, if two base classes have same function name, accessing it without scope resolution causes:",
        code: `class A { public: void show(){} };
class B { public: void show(){} };
class C : public A, public B {};
int main() {
    C obj;
    obj.show(); // ?
}`,
        options: ["Calls A's show()", "Calls B's show()", "Ambiguity error", "Calls both"],
        answer: "Ambiguity error",
        explanation: "Diamond problem / ambiguity. Use obj.A::show() or obj.B::show() to resolve.",
    },
    {
        id: 17, difficulty: "Hard", tag: "Friend",
        question: "Which statement is TRUE about friend functions?",
        code: `class Secret {
    int key = 42;
    friend void reveal(Secret s);
};
void reveal(Secret s) {
    cout << s.key;
}`,
        options: ["Friend function is a member of the class", "Friend function can access private members", "Friend function inherits the class", "Friend function is static"],
        answer: "Friend function can access private members",
        explanation: "Friend functions are not members but are granted access to private/protected members.",
    },
    {
        id: 18, difficulty: "Hard", tag: "Virtual",
        question: "What happens if a class has at least one pure virtual function?",
        code: `class Abstract {
public:
    virtual void work() = 0;
};`,
        options: ["It becomes a template class", "It becomes an abstract class and can't be instantiated", "It is deleted at compile time", "It becomes a static class"],
        answer: "It becomes an abstract class and can't be instantiated",
        explanation: "A class with at least one pure virtual function is abstract — you cannot create objects of it.",
    },
    {
        id: 19, difficulty: "Hard", tag: "Constructor",
        question: "What is a copy constructor?",
        code: `class Demo {
public:
    int x;
    Demo(int x): x(x) {}
    Demo(const Demo& d) {
        x = d.x;
    }
};`,
        options: ["Creates a class copy", "Initializes an object from another object of same class", "Copies the class definition", "Runs when object is deleted"],
        answer: "Initializes an object from another object of same class",
        explanation: "Copy constructor takes a reference to same class and initializes a new object as a copy.",
    },
    {
        id: 20, difficulty: "Hard", tag: "Polymorphism",
        question: "What will be the output?",
        code: `class Base {
public:
    void show() { cout << "Base "; }
    virtual void display() { cout << "B-display "; }
};
class Der : public Base {
public:
    void show() { cout << "Der "; }
    void display() override { cout << "D-display "; }
};
int main() {
    Base* p = new Der();
    p->show();
    p->display();
}`,
        options: ["Der D-display", "Base D-display", "Base B-display", "Der B-display"],
        answer: "Base D-display",
        explanation: "Non-virtual show() uses base pointer type → Base. Virtual display() uses actual object → D-display.",
    },
];

const diffColor = {
    Easy: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
    Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
    Hard: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" },
};

const tagColor = {
    Classes: "#8b5cf6", Access: "#3b82f6", Constructor: "#ec4899",
    "OOP Pillars": "#10b981", Inheritance: "#f97316", Polymorphism: "#06b6d4",
    Virtual: "#a855f7", Static: "#f59e0b", Abstraction: "#84cc16",
    "this Pointer": "#22d3ee", Friend: "#fb7185", "Operator Overloading": "#818cf8",
};

export default function Ooppractice() {
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

    const goToDashboard = () => { window.location.href = "/dashboard"; };

    const restart = () => {
        setCurrent(0); setSelected(null); setConfirmed(false);
        setScore(0); setAnswers({}); setFinished(false);
    };

    if (finished) {
        const pct = Math.round((correct / total) * 100);
        const grade = pct >= 85
            ? { label: "OOP Master!", color: "#10b981", msg: "Excellent! You've truly mastered OOP in C++.", icon: "🏆" }
            : pct >= 60
            ? { label: "Good Work!", color: "#f59e0b", msg: "Review inheritance & polymorphism sections to level up.", icon: "⭐" }
            : { label: "Keep Practicing", color: "#ef4444", msg: "Go back to the Learn page and revisit the concepts.", icon: "📖" };
        return (
            <div style={{ minHeight: "100vh", background: "#080d18", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Sora', sans-serif" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", maxWidth: "480px", width: "100%", textAlign: "center" }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>{grade.icon}</div>
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
                        <button onClick={restart} style={{ background: "#8b5cf6", border: "none", color: "white", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>Try Again</button>
                        <button onClick={() => { window.location.href = "/oop"; }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>← Learn OOP</button>
                        <button onClick={goToDashboard} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>Dashboard</button>
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
                .opt-btn { transition: all 0.18s; cursor: pointer; }
                .opt-btn:hover { transform: translateY(-1px); }
                .q-dot { transition: all 0.15s; cursor: pointer; }
                .q-dot:hover { transform: scale(1.2); }
                .sidebar-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:40; }
                @media(max-width:900px){ .desktop-sidebar{ display:none!important; } }
                @media(min-width:901px){ .mobile-toggle{ display:none!important; } }
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
            `}</style>

            {/* Top Nav */}
            <div style={{ background: "rgba(8,13,24,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(12px)" }}>
                <button onClick={goToDashboard} style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", color: "#a78bfa", padding: "6px 13px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "inherit", fontWeight: "600" }}>← Dashboard</button>
                <button onClick={() => { window.location.href = "/oop"; }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", padding: "6px 13px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontFamily: "inherit", fontWeight: "600" }}>Learn OOP</button>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: "700" }}>OOP Practice</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{answered}/{total} answered · {score} correct</div>
                </div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#8b5cf6", fontFamily: "'JetBrains Mono', monospace" }}>{answered}/{total}</div>
                <button className="mobile-toggle" onClick={() => setShowSidebar(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", padding: "6px 13px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
                    Questions ☰
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showSidebar && (
                <>
                    <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />
                    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "280px", background: "#0c1220", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 50, padding: "20px", overflowY: "auto", scrollbarWidth: "thin" }}>
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
                <div className="desktop-sidebar" style={{ width: "260px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px", overflowY: "auto", maxHeight: "calc(100vh - 57px)", position: "sticky", top: "57px", scrollbarWidth: "thin" }}>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", letterSpacing: "1px", marginBottom: "14px" }}>ALL QUESTIONS</div>
                    <SidebarContent questions={questions} current={current} answers={answers} handleJump={handleJump} diffColor={diffColor} />
                </div>

                {/* Question Area */}
                <div style={{ flex: 1, padding: "24px 20px", overflowY: "auto", scrollbarWidth: "thin" }}>
                    <div key={current} style={{ maxWidth: "680px", margin: "0 auto", animation: "fadeUp 0.35s ease" }}>

                        {/* Question Header */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>Q{current + 1} of {total}</span>
                            <span style={{ background: diffColor[q.difficulty].bg, border: `1px solid ${diffColor[q.difficulty].border}`, color: diffColor[q.difficulty].color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{q.difficulty}</span>
                            <span style={{ background: `${(tagColor[q.tag] || "#8b5cf6")}18`, border: `1px solid ${(tagColor[q.tag] || "#8b5cf6")}40`, color: tagColor[q.tag] || "#8b5cf6", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{q.tag}</span>
                        </div>

                        {/* Question Card */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px", marginBottom: "14px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.6", marginBottom: "16px" }}>{q.question}</p>
                            <div style={{ background: "#060b16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
                                <div style={{ background: "rgba(255,255,255,0.03)", padding: "8px 14px", display: "flex", gap: "5px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />)}
                                    <span style={{ fontSize: "10px", color: "#475569", fontFamily: "'JetBrains Mono', monospace", marginLeft: "6px" }}>snippet.cpp</span>
                                </div>
                                <pre style={{ padding: "16px", fontSize: "13px", lineHeight: "1.85", color: "#7dd3fc", fontFamily: "'JetBrains Mono', monospace", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.code}</pre>
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
                                    bg = "rgba(139,92,246,0.12)"; border = "rgba(139,92,246,0.4)"; color = "#a78bfa";
                                }
                                return (
                                    <button key={i} className="opt-btn" onClick={() => !confirmed && setSelected(opt)} style={{
                                        background: bg, border: `1px solid ${border}`, borderRadius: "12px", padding: "14px 16px",
                                        textAlign: "left", cursor: confirmed ? "default" : "pointer",
                                        display: "flex", alignItems: "center", gap: "10px",
                                        color, fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: "600",
                                        transform: isSelected && !confirmed ? "translateY(-1px)" : "none",
                                        boxShadow: isSelected && !confirmed ? "0 4px 16px rgba(139,92,246,0.2)" : "none",
                                    }}>
                                        <span style={{ width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "white", fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", background: confirmed && isCorrect ? "#10b981" : confirmed && isSelected && !isCorrect ? "#ef4444" : isSelected ? "#8b5cf6" : "rgba(255,255,255,0.06)" }}>
                                            {confirmed && isCorrect ? "✓" : confirmed && isSelected && !isCorrect ? "✗" : ["A", "B", "C", "D"][i]}
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
                                    background: selected ? "#8b5cf6" : "rgba(255,255,255,0.04)",
                                    border: selected ? "none" : "1px solid rgba(255,255,255,0.08)",
                                    color: selected ? "white" : "#475569",
                                    padding: "12px 28px", borderRadius: "10px", cursor: selected ? "pointer" : "default",
                                    fontFamily: "inherit", fontSize: "14px", fontWeight: "600", transition: "all 0.2s",
                                }}>Confirm Answer</button>
                            ) : (
                                <button onClick={handleNext} style={{ background: "#8b5cf6", border: "none", color: "white", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "600" }}>
                                    {current === total - 1 ? "See Results →" : "Next Question →"}
                                </button>
                            )}
                            {current > 0 && (
                                <button onClick={() => { setCurrent(c => c - 1); setSelected(null); setConfirmed(false); }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
                                    ← Prev
                                </button>
                            )}
                            <span style={{ marginLeft: "auto", fontSize: "12px", color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                                Score: <span style={{ color: "#8b5cf6", fontWeight: "600" }}>{score}</span>/{answered}
                            </span>
                        </div>

                        {/* Progress dots */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            {questions.map((_, i) => (
                                <div key={i} className="q-dot" onClick={() => handleJump(i)} title={`Q${i + 1}`} style={{
                                    width: "10px", height: "10px", borderRadius: "50%",
                                    background: i === current ? "#8b5cf6" : answers[i] === true ? "#10b981" : answers[i] === false ? "#ef4444" : "rgba(255,255,255,0.1)",
                                    border: i === current ? "2px solid #c4b5fd" : "none",
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
                        background: i === current ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${i === current ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.05)"}`,
                        borderRadius: "10px", padding: "10px 12px", cursor: "pointer", textAlign: "left",
                        display: "flex", alignItems: "center", gap: "8px", width: "100%", transition: "all 0.15s",
                    }}>
                        <div style={{ width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", fontFamily: "'JetBrains Mono', monospace", background: done ? (correct ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)") : i === current ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)", color: done ? (correct ? "#10b981" : "#ef4444") : i === current ? "#a78bfa" : "#475569" }}>
                            {done ? (correct ? "✓" : "✗") : i + 1}
                        </div>
                        <div style={{ flex: 1, overflow: "hidden" }}>
                            <div style={{ fontSize: "12px", color: i === current ? "#e2e8f0" : "#94a3b8", fontWeight: i === current ? "600" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Q{i + 1} · {q.tag}</div>
                            <div style={{ fontSize: "10px", color: diffColor[q.difficulty].color, marginTop: "1px" }}>{q.difficulty}</div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}