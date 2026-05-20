import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
    {
        name: "What is OOP?",
        desc: "Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects — which are instances of classes. OOP has 4 main pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction. It helps write reusable, modular, and maintainable code.",
        code: `// Everything in OOP revolves around Classes & Objects
class Car {
  string brand;     // attribute (data)
  void drive() {}  // method (behavior)
};

Car myCar; // object created from class`,
    },
    {
        name: "Classes & Objects",
        desc: "A class is a blueprint/template. An object is an instance of that class. Think of a class as a cookie cutter and objects as the cookies.",
        code: `class Student {
public:
    string name;
    int age;

    void introduce() {
        cout << "Hi, I am " << name << endl;
    }
};

int main() {
    Student s1;         // object
    s1.name = "Rahul";
    s1.age = 20;
    s1.introduce();     // Hi, I am Rahul
    return 0;
}`,
    },
    {
        name: "Access Modifiers",
        desc: "Access modifiers control visibility of class members. 'public' — accessible everywhere. 'private' — only inside the class. 'protected' — inside class + derived classes.",
        code: `class BankAccount {
private:
    double balance;      // can't be accessed directly

public:
    void deposit(double amt) {
        balance += amt;  // accessed inside class
    }

    double getBalance() {
        return balance;  // getter method
    }
};

int main() {
    BankAccount acc;
    acc.deposit(1000);
    cout << acc.getBalance(); // 1000
    // acc.balance = 9999; ❌ ERROR — private
}`,
    },
    {
        name: "Constructors",
        desc: "A constructor is a special method called automatically when an object is created. It has the same name as the class and no return type. Used to initialize data members.",
        code: `class Rectangle {
public:
    int length, width;

    // Default constructor
    Rectangle() {
        length = 0;
        width = 0;
    }

    // Parameterized constructor
    Rectangle(int l, int w) {
        length = l;
        width = w;
    }

    int area() { return length * width; }
};

int main() {
    Rectangle r1;           // Default constructor
    Rectangle r2(5, 3);    // Parameterized
    cout << r2.area();      // 15
}`,
    },
    {
        name: "Destructor",
        desc: "A destructor is called automatically when an object goes out of scope or is deleted. It cleans up resources. Named with a tilde (~) before class name.",
        code: `class MyClass {
public:
    MyClass() {
        cout << "Constructor called!" << endl;
    }

    ~MyClass() {
        cout << "Destructor called!" << endl;
    }
};

int main() {
    MyClass obj;  // Constructor called!
    // object goes out of scope here
}     // Destructor called!`,
    },
    {
        name: "Encapsulation",
        desc: "Encapsulation means bundling data (variables) and methods (functions) together inside a class, and hiding internal details using private access. You expose only what's necessary via public methods.",
        code: `class Employee {
private:
    double salary;   // hidden from outside

public:
    void setSalary(double s) {
        if (s > 0) salary = s;   // validation
    }

    double getSalary() {
        return salary;
    }
};

int main() {
    Employee e;
    e.setSalary(50000);
    cout << e.getSalary(); // 50000
    // e.salary = -999; ❌ private — blocked
}`,
    },
    {
        name: "Inheritance",
        desc: "Inheritance allows a class (child/derived) to inherit properties and methods from another class (parent/base). Promotes code reuse. Types: Single, Multiple, Multilevel, Hierarchical, Hybrid.",
        code: `class Animal {
public:
    string name;
    void eat() {
        cout << name << " is eating." << endl;
    }
};

// Dog inherits from Animal
class Dog : public Animal {
public:
    void bark() {
        cout << name << " says Woof!" << endl;
    }
};

int main() {
    Dog d;
    d.name = "Bruno";
    d.eat();   // inherited from Animal
    d.bark();  // Dog's own method
}`,
    },
    {
        name: "Polymorphism",
        desc: "Polymorphism means 'many forms'. Same function name behaves differently. Two types: Compile-time (Function Overloading, Operator Overloading) and Runtime (Virtual Functions / Method Overriding).",
        code: `// Function Overloading (Compile-time)
class Math {
public:
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
};

// Runtime Polymorphism
class Shape {
public:
    virtual void draw() {
        cout << "Drawing Shape" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing Circle" << endl;
    }
};

int main() {
    Shape* s = new Circle();
    s->draw(); // Drawing Circle (runtime decision)
}`,
    },
    {
        name: "Abstraction",
        desc: "Abstraction hides complex implementation details and shows only the essential features. Achieved using abstract classes (with pure virtual functions) or interfaces.",
        code: `class Vehicle {
public:
    // Pure virtual function — makes class abstract
    virtual void start() = 0;

    void stop() {
        cout << "Vehicle stopped." << endl;
    }
};

class Car : public Vehicle {
public:
    void start() override {
        cout << "Car started with key." << endl;
    }
};

class Bike : public Vehicle {
public:
    void start() override {
        cout << "Bike started with kick." << endl;
    }
};

int main() {
    // Vehicle v; ❌ Cannot instantiate abstract class
    Car c;
    c.start(); // Car started with key.
    c.stop();  // Vehicle stopped.
}`,
    },
    {
        name: "Virtual Functions",
        desc: "A virtual function enables runtime polymorphism. When a base class pointer points to a derived class object, the correct overridden function is called based on the actual object type.",
        code: `class Base {
public:
    virtual void show() {
        cout << "Base class" << endl;
    }
};

class Derived : public Base {
public:
    void show() override {
        cout << "Derived class" << endl;
    }
};

int main() {
    Base* ptr;
    Derived obj;
    ptr = &obj;

    ptr->show(); // "Derived class" — runtime dispatch
}`,
    },
    {
        name: "Friend Function",
        desc: "A friend function is NOT a member of a class but has access to its private and protected members. Declared using the 'friend' keyword inside the class.",
        code: `class Box {
private:
    int length = 10;

    friend void printLength(Box b); // friend declaration
};

void printLength(Box b) {
    // Can access private member
    cout << "Length: " << b.length << endl;
}

int main() {
    Box b;
    printLength(b); // Length: 10
}`,
    },
    {
        name: "Static Members",
        desc: "Static data members are shared by all objects of a class (only one copy exists). Static member functions can only access static data. Useful for counting objects or shared config.",
        code: `class Counter {
public:
    static int count; // shared across all objects

    Counter() { count++; }
    ~Counter() { count--; }

    static int getCount() { return count; }
};

int Counter::count = 0; // define outside class

int main() {
    Counter a, b, c;
    cout << Counter::getCount(); // 3
}`,
    },
    {
        name: "Operator Overloading",
        desc: "Operator overloading lets you define custom behavior for operators (+, -, ==, etc.) for your class objects. Makes code more intuitive.",
        code: `class Vector {
public:
    int x, y;
    Vector(int x, int y) : x(x), y(y) {}

    // Overload + operator
    Vector operator+(const Vector& v) {
        return Vector(x + v.x, y + v.y);
    }

    void print() {
        cout << "(" << x << ", " << y << ")" << endl;
    }
};

int main() {
    Vector v1(1, 2), v2(3, 4);
    Vector v3 = v1 + v2; // uses overloaded +
    v3.print();           // (4, 6)
}`,
    },
    {
        name: "this Pointer",
        desc: "The 'this' pointer is an implicit pointer available inside every non-static member function. It points to the object that called the function. Useful to resolve name conflicts and enable method chaining.",
        code: `class Person {
public:
    string name;
    int age;

    Person(string name, int age) {
        this->name = name; // 'this' resolves conflict
        this->age = age;
    }

    // Method chaining using this pointer
    Person& setName(string name) {
        this->name = name;
        return *this;
    }

    void show() {
        cout << name << ", " << age << endl;
    }
};

int main() {
    Person p("Rahul", 20);
    p.setName("Arjun").show(); // chaining
}`,
    },
];

const tagColor = "#8b5cf6";

export default function Oop() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const t = topics[active];

    return (
        <div style={container}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
                .tab-btn:hover { border-color: rgba(139,92,246,0.5) !important; color: #c4b5fd !important; background: rgba(139,92,246,0.08) !important; }
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
            `}</style>

            <div style={wrapper}>
                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "10px" }}>
                    <button onClick={() => navigate("/dashboard")} style={navBtn}>← Dashboard</button>
                    <button onClick={() => navigate("/oop/practice")} style={{ ...navBtn, background: tagColor, border: "none", color: "#fff" }}>Practice OOP →</button>
                </div>

                {/* Header */}
                <div style={{ marginBottom: "28px", animation: "fadeUp 0.4s ease" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px", flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)", color: "#a78bfa", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>OOP</span>
                        <span style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>C++</span>
                        <span style={{ fontSize: "12px", color: "#475569" }}>{topics.length} topics</span>
                    </div>
                    <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#e2e8f0", lineHeight: 1.3 }}>Object-Oriented Programming</h1>
                    <p style={{ color: "#64748b", marginTop: "8px", fontSize: "14px", lineHeight: "1.7" }}>
                        Master all 4 pillars of OOP in C++ — Classes, Inheritance, Polymorphism, Abstraction, and more.
                    </p>
                </div>

                {/* Progress */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px 18px", marginBottom: "22px", display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", whiteSpace: "nowrap" }}>Topic {active + 1} of {topics.length}</span>
                    <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                        <div style={{ height: "100%", width: `${((active + 1) / topics.length) * 100}%`, background: tagColor, borderRadius: "2px", transition: "width 0.3s ease" }} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "600", whiteSpace: "nowrap" }}>{Math.round(((active + 1) / topics.length) * 100)}%</span>
                </div>

                {/* Topic tabs */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
                    {topics.map((item, i) => (
                        <button key={i} className="tab-btn" onClick={() => setActive(i)} style={{
                            padding: "7px 14px", borderRadius: "8px", cursor: "pointer",
                            fontFamily: "'Sora', sans-serif", fontSize: "12px", fontWeight: "600",
                            transition: "all 0.18s",
                            background: i === active ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.02)",
                            border: i === active ? "1px solid rgba(139,92,246,0.45)" : "1px solid rgba(255,255,255,0.06)",
                            color: i === active ? "#a78bfa" : "#64748b",
                        }}>
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div key={active} style={{ animation: "fadeUp 0.3s ease" }}>
                    {/* Description card */}
                    <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: "16px", padding: "20px 22px", marginBottom: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: tagColor }} />
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#e2e8f0" }}>{t.name}</span>
                        </div>
                        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.8" }}>{t.desc}</p>
                    </div>

                    {/* Code block */}
                    <div style={{ background: "#060b16", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden", marginBottom: "20px" }}>
                        <div style={{ background: "rgba(255,255,255,0.03)", padding: "9px 14px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />)}
                            <span style={{ fontSize: "11px", color: "#475569", fontFamily: "'JetBrains Mono', monospace", marginLeft: "4px" }}>example.cpp</span>
                        </div>
                        <pre style={{ padding: "18px", fontSize: "13px", lineHeight: "1.9", color: "#7dd3fc", fontFamily: "'JetBrains Mono', monospace", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", scrollbarWidth: "thin" }}>{t.code}</pre>
                    </div>

                    {/* Prev / Next navigation */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {active > 0 && (
                            <button onClick={() => setActive(a => a - 1)} style={navBtn}>← Prev</button>
                        )}
                        {active < topics.length - 1 ? (
                            <button onClick={() => setActive(a => a + 1)} style={{ ...navBtn, background: tagColor, border: "none", color: "#fff", marginLeft: active > 0 ? "0" : "auto" }}>
                                Next Topic →
                            </button>
                        ) : (
                            <button onClick={() => navigate("/oop/practice")} style={{ ...navBtn, background: "#10b981", border: "none", color: "#fff" }}>
                                Start Practice →
                            </button>
                        )}
                    </div>
                </div>

                {/* Topic quick-nav dots */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {topics.map((_, i) => (
                        <div key={i} onClick={() => setActive(i)} title={topics[i].name} style={{
                            width: "10px", height: "10px", borderRadius: "50%", cursor: "pointer", transition: "all 0.15s",
                            background: i === active ? tagColor : i < active ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.1)",
                            border: i === active ? "2px solid #c4b5fd" : "none",
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ---- Styles ---- */
const container = {
    minHeight: "100vh",
    background: "#080d18",
    color: "#e2e8f0",
    fontFamily: "'Sora', sans-serif",
    padding: "24px 20px",
};

const wrapper = {
    maxWidth: "780px",
    margin: "0 auto",
};

const navBtn = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "9px 18px",
    borderRadius: "9px",
    cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.18s",
};