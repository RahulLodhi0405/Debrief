import { useState, useRef, forwardRef } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 8);
const EMPTY_EXP = () => ({ id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", bullets: [""] });
const EMPTY_EDU = () => ({ id: uid(), college: "", degree: "", cgpa: "", startYear: "", endYear: "" });
const EMPTY_PROJECT = () => ({ id: uid(), title: "", techStack: "", liveLink: "", githubLink: "", date: "", bullets: [""] });
const initState = () => ({
  name: "", phone: "", email: "", linkedin: "", leetcode: "", github: "",
  skills: { languages: "", frontend: "", backend: "", databases: "", tools: "", concepts: "" },
  experiences: [EMPTY_EXP()],
  education: [EMPTY_EDU()],
  projects: [EMPTY_PROJECT()],
  achievements: [""],
});

// ─── Skills suggestions map ──────────────────────────────────────────────────
const SKILL_SUGGESTIONS = {
  languages: [
    "JavaScript (ES6+)", "TypeScript", "Python", "C++", "C", "Java", "Go", "Rust",
    "SQL", "PHP", "Ruby", "Kotlin", "Swift", "Dart", "Scala", "R", "MATLAB",
  ],
  frontend: [
    "React.js", "Next.js", "Vue.js", "Angular", "Svelte", "Tailwind CSS",
    "Bootstrap", "Material UI", "Chakra UI", "HTML", "CSS", "SASS/SCSS",
    "Redux", "Zustand", "React Query", "Framer Motion", "Three.js", "Vite", "Webpack",
  ],
  backend: [
    "Node.js", "Express.js", "REST APIs", "GraphQL", "JWT", "Socket.IO",
    "Django", "FastAPI", "Flask", "Spring Boot", "NestJS", "Prisma",
    "Passport.js", "OAuth 2.0", "WebSockets", "gRPC", "Kafka", "RabbitMQ",
  ],
  databases: [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "Firebase",
    "Supabase", "DynamoDB", "Cassandra", "Elasticsearch", "Neo4j", "PlanetScale",
  ],
  tools: [
    "Git", "GitHub", "GitLab", "Postman", "Vercel", "Render", "Railway",
    "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Nginx", "Linux",
    "VS Code", "Figma", "Jira", "Confluence", "CI/CD", "GitHub Actions",
  ],
  concepts: [
    "Data Structures & Algorithms", "System Design", "DBMS", "OOP",
    "Operating Systems", "Computer Networks", "Microservices", "REST",
    "Agile / Scrum", "Design Patterns", "Low Level Design", "High Level Design",
    "Concurrency", "Cache Design", "Load Balancing", "CAP Theorem",
  ],
};

// ─── PDF Download via html2pdf.js ────────────────────────────────────────────
// We use window.print() as fallback but primarily html2pdf for good link support
function downloadResume(el, filename) {
  return new Promise((resolve) => {
    const run = () => {
      window.html2pdf().set({
        margin: [8, 10, 8, 10],
        filename: (filename || "resume") + ".pdf",
        image: { type: "jpeg", quality: 0.99 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        // enableLinks is true by default in html2pdf
      }).from(el).save().then(resolve).catch(resolve);
    };
    if (window.html2pdf) { run(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    s.onload = run;
    s.onerror = () => { alert("Could not load PDF library. Please check your internet connection."); resolve(); };
    document.head.appendChild(s);
  });
}

// ─── ATS Resume Preview ───────────────────────────────────────────────────────
const ResumePreview = forwardRef(function ResumePreview({ data }, ref) {
  const { name, phone, email, linkedin, leetcode, github, skills, experiences, education, projects, achievements } = data;

  // Build contact line with real anchor tags so html2pdf captures links
  const contactItems = [
    phone ? { text: phone, href: null } : null,
    email ? { text: email, href: `mailto:${email}` } : null,
    linkedin ? { text: linkedin, href: linkedin.startsWith("http") ? linkedin : `https://${linkedin}` } : null,
    leetcode ? { text: leetcode, href: leetcode.startsWith("http") ? leetcode : `https://${leetcode}` } : null,
    github ? { text: github, href: github.startsWith("http") ? github : `https://${github}` } : null,
  ].filter(Boolean);

  return (
    <div ref={ref} style={{ fontFamily: "'Calibri', 'Arial', sans-serif", fontSize: "10pt", color: "#111", lineHeight: 1.5, padding: "22px 28px", background: "#fff", width: "100%" }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: "20pt", fontWeight: 700, letterSpacing: 0.3 }}>{name || "Your Full Name"}</div>
        <div style={{ fontSize: "9pt", color: "#333", marginTop: 4 }}>
          {contactItems.length === 0 && <span>phone | email | linkedin | leetcode</span>}
          {contactItems.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ color: "#666" }}> | </span>}
              {item.href
                ? <a href={item.href} target="_blank" rel="noreferrer" style={{ color: "#1a56db", textDecoration: "none" }}>{item.text}</a>
                : <span>{item.text}</span>
              }
            </span>
          ))}
        </div>
      </div>

      {/* ── Projects ── */}
      {projects.some(p => p.title) && (
        <ATSSection title="Projects">
          {projects.filter(p => p.title).map((p) => (
            <div key={p.id} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span>
                  <strong>{p.title}</strong>
                  {p.techStack && <span style={{ fontWeight: 400 }}> — {p.techStack}</span>}
                  {p.githubLink && (
                    <a href={p.githubLink.startsWith("http") ? p.githubLink : `https://${p.githubLink}`}
                      target="_blank" rel="noreferrer"
                      style={{ color: "#1a56db", fontSize: "8.5pt", textDecoration: "none", marginLeft: 4 }}>
                      [GitHub]
                    </a>
                  )}
                  {p.liveLink && (
                    <a href={p.liveLink.startsWith("http") ? p.liveLink : `https://${p.liveLink}`}
                      target="_blank" rel="noreferrer"
                      style={{ color: "#1a56db", fontSize: "8.5pt", textDecoration: "none", marginLeft: 4 }}>
                      [Live]
                    </a>
                  )}
                </span>
                <span style={{ fontSize: "8.5pt", color: "#444", whiteSpace: "nowrap", marginLeft: 10 }}>{p.date}</span>
              </div>
              <ATSBullets items={p.bullets} />
            </div>
          ))}
        </ATSSection>
      )}

      {/* ── Experience ── */}
      {experiences.some(e => e.role || e.company) && (
        <ATSSection title="Experience">
          {experiences.filter(e => e.role || e.company).map((e) => (
            <div key={e.id} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong>{e.role}</strong>
                <span style={{ fontSize: "8.5pt", color: "#444" }}>{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</span>
              </div>
              <div style={{ fontSize: "9pt", color: "#333" }}>{[e.company, e.location].filter(Boolean).join(", ")}</div>
              <ATSBullets items={e.bullets} />
            </div>
          ))}
        </ATSSection>
      )}

      {/* ── Technical Skills ── */}
      {Object.values(skills).some(Boolean) && (
        <ATSSection title="Technical Skills">
          {[
            ["Languages", skills.languages],
            ["Frontend", skills.frontend],
            ["Backend", skills.backend],
            ["Databases", skills.databases],
            ["Tools & Platforms", skills.tools],
            ["Core Concepts", skills.concepts],
          ].filter(([, v]) => v).map(([label, value]) => (
            <div key={label} style={{ display: "flex", gap: 4, marginBottom: 3, fontSize: "9.5pt" }}>
              <span style={{ fontWeight: 700, minWidth: 120 }}>{label}:</span>
              <span>{value}</span>
            </div>
          ))}
        </ATSSection>
      )}

      {/* ── Education ── */}
      {education.some(e => e.college) && (
        <ATSSection title="Education">
          {education.filter(e => e.college).map((e) => (
            <div key={e.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{e.college}</strong>
                <span style={{ fontSize: "8.5pt", color: "#444" }}>{[e.startYear, e.endYear].filter(Boolean).join(" – ")}</span>
              </div>
              <div style={{ fontSize: "9pt", color: "#444" }}>{e.degree}{e.cgpa ? ` — CGPA: ${e.cgpa}` : ""}</div>
            </div>
          ))}
        </ATSSection>
      )}

      {/* ── Achievements ── */}
      {achievements.some(Boolean) && (
        <ATSSection title="Achievements">
          <ATSBullets items={achievements} />
        </ATSSection>
      )}
    </div>
  );
});

function ATSSection({ title, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: "10pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", borderBottom: "1.5px solid #111", paddingBottom: 2, marginBottom: 6 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// FIX #1 & #2: Auto-prefix "– " on every bullet
function ATSBullets({ items }) {
  const valid = (items || []).filter(Boolean);
  if (!valid.length) return null;
  return (
    <ul style={{ margin: "3px 0 0 0", paddingLeft: 0, listStyle: "none" }}>
      {valid.map((b, i) => (
        <li key={i} style={{ marginBottom: 2, fontSize: "9.5pt", paddingLeft: 14, textIndent: "-14px" }}>
          {"– "}{b.replace(/^[-–—]\s*/, "")}
        </li>
      ))}
    </ul>
  );
}

// ─── Shared form styles ────────────────────────────────────────────────────────
const IS = {
  width: "100%", background: "#0d0f1a", border: "1px solid #1e2136",
  borderRadius: 8, padding: "8px 12px", color: "#e2e8f0",
  fontSize: 13, outline: "none", fontFamily: "inherit",
};
const LS = {
  fontSize: 10, fontWeight: 700, color: "#475080",
  textTransform: "uppercase", letterSpacing: "0.8px",
  display: "block", marginBottom: 5,
};

// FIX #4 — Skills field with autocomplete suggestions
function SkillField({ label, fieldKey, value, onChange }) {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState(""); // last token being typed
  const suggestions = SKILL_SUGGESTIONS[fieldKey] || [];

  // Find what the user is currently typing (last comma-separated token)
  const getLastToken = (v) => {
    const parts = v.split(",");
    return parts[parts.length - 1].trim().toLowerCase();
  };

  const lastToken = getLastToken(value);
  const filtered = lastToken.length > 0
    ? suggestions.filter(s =>
        s.toLowerCase().includes(lastToken) &&
        !value.toLowerCase().split(",").map(x => x.trim()).includes(s.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSuggestionClick = (suggestion) => {
    const parts = value.split(",");
    parts[parts.length - 1] = " " + suggestion;
    const newVal = parts.join(",").replace(/^,\s*/, "") + ", ";
    onChange(newVal);
  };

  return (
    <div style={{ position: "relative" }}>
      <label style={LS}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={`e.g. ${(suggestions[0] || "") + ", " + (suggestions[1] || "")}`}
        style={{ ...IS, borderColor: focused ? "#3b82f6" : "#1e2136" }}
      />
      {/* Suggestion dropdown */}
      {focused && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 999,
          background: "#0d1021", border: "1px solid #2a2f4a", borderRadius: 8,
          marginTop: 3, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {filtered.map((s) => (
            <div key={s}
              onMouseDown={() => handleSuggestionClick(s)}
              style={{
                padding: "7px 12px", fontSize: 12, cursor: "pointer", color: "#c8d0f0",
                borderBottom: "1px solid #1a1f38", transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1a1f38"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: "#3b82f6", fontWeight: 700 }}>
                {s.slice(0, s.toLowerCase().indexOf(lastToken))}
              </span>
              <span style={{ background: "#1e3a8a", borderRadius: 3, padding: "0 2px" }}>
                {s.slice(s.toLowerCase().indexOf(lastToken), s.toLowerCase().indexOf(lastToken) + lastToken.length)}
              </span>
              {s.slice(s.toLowerCase().indexOf(lastToken) + lastToken.length)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function F({ label, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={LS}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...IS, borderColor: focused ? "#3b82f6" : "#1e2136" }} />
    </div>
  );
}

// FIX #2: BulletsEditor — strip and re-add "– " prefix automatically
function BulletsEditor({ bullets, onChange }) {
  const update = (i, v) => {
    // Remove any leading dash/hyphen the user might type — we auto-add it in preview
    const cleaned = v.replace(/^[-–—]\s*/, "");
    onChange(bullets.map((b, j) => j === i ? cleaned : b));
  };
  const add = () => onChange([...bullets, ""]);
  const remove = (i) => { if (bullets.length > 1) onChange(bullets.filter((_, j) => j !== i)); };

  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ ...LS, marginBottom: 6 }}>
        Bullet Points <span style={{ color: "#353a55", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(– added automatically)</span>
      </label>
      {bullets.map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
          <span style={{ color: "#3b82f6", fontSize: 15, userSelect: "none", paddingTop: 1 }}>–</span>
          <input value={b} onChange={e => update(i, e.target.value)}
            placeholder="Describe impact with numbers (e.g. Improved API latency by 40%)"
            style={{ ...IS, flex: 1 }} />
          {bullets.length > 1 && (
            <button onClick={() => remove(i)}
              style={{ background: "none", border: "none", color: "#475080", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
          )}
        </div>
      ))}
      <button onClick={add}
        style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer", padding: 0, marginTop: 2 }}>
        + add bullet
      </button>
    </div>
  );
}

function Card({ idx, label, canRemove, onRemove, children }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", border: "1px solid #1a1d30", background: "#090b15", borderRadius: 12, padding: 16, marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: "#353a55", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>{label} {idx + 1}</div>
      {canRemove && (
        <button onClick={onRemove}
          style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: hover ? "#ef4444" : "#2a2d42", fontSize: 20, cursor: "pointer", lineHeight: 1, transition: "color 0.15s" }}>×</button>
      )}
      {children}
    </div>
  );
}

function SectionHeader({ title, onAdd, addLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "#60a5fa", margin: 0 }}>{title}</h2>
      {onAdd && (
        <button onClick={onAdd}
          style={{ fontSize: 11, fontWeight: 600, background: "#12152a", border: "1px solid #1e2136", borderRadius: 8, padding: "6px 13px", color: "#8892b0", cursor: "pointer" }}>
          + {addLabel}
        </button>
      )}
    </div>
  );
}

function Grid2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{children}</div>;
}

// ─── FIX #3: Placeholder data uses fake "Om Yadav" ──────────────────────
const PLACEHOLDERS = {
  name: "Om Yadav",
  phone: "+1-555-0192",
  email: "om.yadav@email.com",
  linkedin: "linkedin.com/in/omyadav",
  leetcode: "leetcode.com/u/omyadav",
  github: "github.com/omyadav",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CreateResume() {
  const [data, setData] = useState(initState());
  const [tab, setTab] = useState("personal");
  const [busy, setBusy] = useState(false);
  const pdfRef = useRef(null);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const setSkill = (k, v) => setData(d => ({ ...d, skills: { ...d.skills, [k]: v } }));
  const updArr = (key, id, field, val) =>
    setData(d => ({ ...d, [key]: d[key].map(e => e.id === id ? { ...e, [field]: val } : e) }));
  const removeArr = (key, id) =>
    setData(d => ({ ...d, [key]: d[key].filter(e => e.id !== id) }));
  const updAch = (i, v) =>
    setData(d => ({ ...d, achievements: d.achievements.map((a, j) => j === i ? v.replace(/^[-–—]\s*/, "") : a) }));

  const handleDownload = async () => {
    if (!pdfRef.current || busy) return;
    setBusy(true);
    await downloadResume(pdfRef.current, data.name || "my-resume");
    setBusy(false);
  };

  const TABS = [
    { id: "personal", emoji: "👤", label: "Personal" },
    { id: "projects", emoji: "🚀", label: "Projects" },
    { id: "experience", emoji: "💼", label: "Experience" },
    { id: "skills", emoji: "⚡", label: "Skills" },
    { id: "education", emoji: "🎓", label: "Education" },
    { id: "achievements", emoji: "🏆", label: "Achievements" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        input, textarea { transition: border-color 0.15s; }
        input:focus, textarea:focus { outline: none; border-color: #3b82f6 !important; }
        input::placeholder, textarea::placeholder { color: #2d3150; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #1a1d30; border-radius: 99px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#07080f", color: "#e2e8f0", fontFamily: "'Inter', -apple-system, sans-serif" }}>

        {/* ── Header ── */}
        <header style={{ background: "#0b0d1b", borderBottom: "1px solid #141628", padding: "11px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>📄 Resume Builder</div>
            <div style={{ fontSize: 11, color: "#353a55", marginTop: 2 }}>ATS-Friendly · Live Preview · Clickable Links in PDF</div>
          </div>
          <button onClick={handleDownload} disabled={busy}
            style={{ display: "flex", alignItems: "center", gap: 8, background: busy ? "#1d4ed8" : "#2563eb", color: "#fff", border: "none", borderRadius: 9, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: busy ? "default" : "pointer", boxShadow: "0 4px 18px rgba(37,99,235,0.28)", transition: "background 0.15s" }}>
            {busy ? "⏳ Generating…" : "⬇ Download PDF"}
          </button>
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* ════ LEFT: Form ════ */}
          <div style={{ width: "50%", display: "flex", flexDirection: "column", borderRight: "1px solid #141628" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 2, padding: "8px 12px", borderBottom: "1px solid #141628", background: "#0b0d1b", overflowX: "auto", flexShrink: 0 }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 7, border: "none", background: tab === t.id ? "#1d4ed8" : "transparent", color: tab === t.id ? "#fff" : "#3d4260", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable form */}
            <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>

              {/* Personal */}
              {tab === "personal" && (
                <>
                  <SectionHeader title="Personal Information" />
                  <Grid2>
                    <F label="Full Name" value={data.name} onChange={v => set("name", v)} placeholder={PLACEHOLDERS.name} />
                    <F label="Phone" value={data.phone} onChange={v => set("phone", v)} placeholder={PLACEHOLDERS.phone} />
                    <F label="Email" value={data.email} onChange={v => set("email", v)} placeholder={PLACEHOLDERS.email} />
                    <F label="LinkedIn URL" value={data.linkedin} onChange={v => set("linkedin", v)} placeholder={PLACEHOLDERS.linkedin} />
                    <F label="LeetCode URL" value={data.leetcode} onChange={v => set("leetcode", v)} placeholder={PLACEHOLDERS.leetcode} />
                    <F label="GitHub URL" value={data.github} onChange={v => set("github", v)} placeholder={PLACEHOLDERS.github} />
                  </Grid2>
                </>
              )}

              {/* Projects */}
              {tab === "projects" && (
                <>
                  <SectionHeader title="Projects"
                    onAdd={() => setData(d => ({ ...d, projects: [...d.projects, EMPTY_PROJECT()] }))}
                    addLabel="Add Project" />
                  {data.projects.map((p, i) => (
                    <Card key={p.id} idx={i} label="Project" canRemove={data.projects.length > 1}
                      onRemove={() => removeArr("projects", p.id)}>
                      <Grid2>
                        <F label="Project Title" value={p.title} onChange={v => updArr("projects", p.id, "title", v)} placeholder="TaskFlow" />
                        <F label="Tech Stack" value={p.techStack} onChange={v => updArr("projects", p.id, "techStack", v)} placeholder="React, Node.js, MongoDB" />
                        <F label="GitHub Link" value={p.githubLink} onChange={v => updArr("projects", p.id, "githubLink", v)} placeholder="github.com/charlie/taskflow" />
                        <F label="Live Link" value={p.liveLink} onChange={v => updArr("projects", p.id, "liveLink", v)} placeholder="taskflow.vercel.app" />
                        <div style={{ gridColumn: "1/-1" }}>
                          <F label="Date" value={p.date} onChange={v => updArr("projects", p.id, "date", v)} placeholder="Jan 2025" />
                        </div>
                      </Grid2>
                      <BulletsEditor bullets={p.bullets} onChange={v => updArr("projects", p.id, "bullets", v)} />
                    </Card>
                  ))}
                </>
              )}

              {/* Experience */}
              {tab === "experience" && (
                <>
                  <SectionHeader title="Experience"
                    onAdd={() => setData(d => ({ ...d, experiences: [...d.experiences, EMPTY_EXP()] }))}
                    addLabel="Add Experience" />
                  {data.experiences.map((e, i) => (
                    <Card key={e.id} idx={i} label="Experience" canRemove={data.experiences.length > 1}
                      onRemove={() => removeArr("experiences", e.id)}>
                      <Grid2>
                        <F label="Role / Position" value={e.role} onChange={v => updArr("experiences", e.id, "role", v)} placeholder="Software Engineer Intern" />
                        <F label="Company" value={e.company} onChange={v => updArr("experiences", e.id, "company", v)} placeholder="Acme Corp" />
                        <F label="Location" value={e.location} onChange={v => updArr("experiences", e.id, "location", v)} placeholder="Remote / City, Country" />
                        <div />
                        <F label="Start Date" value={e.startDate} onChange={v => updArr("experiences", e.id, "startDate", v)} placeholder="June 2024" />
                        <F label="End Date" value={e.endDate} onChange={v => updArr("experiences", e.id, "endDate", v)} placeholder="Present" />
                      </Grid2>
                      <BulletsEditor bullets={e.bullets} onChange={v => updArr("experiences", e.id, "bullets", v)} />
                    </Card>
                  ))}
                </>
              )}

              {/* Skills — FIX #4: smart autocomplete */}
              {tab === "skills" && (
                <>
                  <SectionHeader title="Technical Skills" />
                  <div style={{ marginBottom: 8, padding: "8px 12px", background: "#0d1021", border: "1px solid #1e2136", borderRadius: 8, fontSize: 12, color: "#475080" }}>
                    💡 Start typing to see suggestions. Separate skills with commas.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <SkillField label="Languages" fieldKey="languages" value={data.skills.languages} onChange={v => setSkill("languages", v)} />
                    <SkillField label="Frontend" fieldKey="frontend" value={data.skills.frontend} onChange={v => setSkill("frontend", v)} />
                    <SkillField label="Backend" fieldKey="backend" value={data.skills.backend} onChange={v => setSkill("backend", v)} />
                    <SkillField label="Databases" fieldKey="databases" value={data.skills.databases} onChange={v => setSkill("databases", v)} />
                    <SkillField label="Tools & Platforms" fieldKey="tools" value={data.skills.tools} onChange={v => setSkill("tools", v)} />
                    <SkillField label="Core Concepts" fieldKey="concepts" value={data.skills.concepts} onChange={v => setSkill("concepts", v)} />
                  </div>
                </>
              )}

              {/* Education */}
              {tab === "education" && (
                <>
                  <SectionHeader title="Education"
                    onAdd={() => setData(d => ({ ...d, education: [...d.education, EMPTY_EDU()] }))}
                    addLabel="Add Education" />
                  {data.education.map((e, i) => (
                    <Card key={e.id} idx={i} label="Education" canRemove={data.education.length > 1}
                      onRemove={() => removeArr("education", e.id)}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <F label="College / University" value={e.college} onChange={v => updArr("education", e.id, "college", v)} placeholder="State University of Technology" />
                        <Grid2>
                          <F label="Degree" value={e.degree} onChange={v => updArr("education", e.id, "degree", v)} placeholder="B.Tech in Computer Science" />
                          <F label="CGPA / GPA" value={e.cgpa} onChange={v => updArr("education", e.id, "cgpa", v)} placeholder="8.5" />
                          <F label="Start Year" value={e.startYear} onChange={v => updArr("education", e.id, "startYear", v)} placeholder="Aug 2021" />
                          <F label="End Year" value={e.endYear} onChange={v => updArr("education", e.id, "endYear", v)} placeholder="May 2025" />
                        </Grid2>
                      </div>
                    </Card>
                  ))}
                </>
              )}

              {/* Achievements */}
              {tab === "achievements" && (
                <>
                  <SectionHeader title="Achievements"
                    onAdd={() => setData(d => ({ ...d, achievements: [...d.achievements, ""] }))}
                    addLabel="Add Achievement" />
                  <div style={{ marginBottom: 10, fontSize: 12, color: "#475080" }}>
                    – prefix is added automatically in the resume.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {data.achievements.map((a, i) => (
                      <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ color: "#3b82f6", fontSize: 15, userSelect: "none" }}>–</span>
                        <input value={a} onChange={e => updAch(i, e.target.value)}
                          placeholder="e.g. Solved 800+ DSA problems on LeetCode; rating 1700+"
                          style={{ ...IS, flex: 1 }} />
                        {data.achievements.length > 1 && (
                          <button onClick={() => setData(d => ({ ...d, achievements: d.achievements.filter((_, j) => j !== i) }))}
                            style={{ background: "none", border: "none", color: "#475080", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>
          </div>

          {/* ════ RIGHT: Live Preview ════ */}
          <div style={{ width: "50%", display: "flex", flexDirection: "column", background: "#bfc1c7" }}>
            <div style={{ background: "#a8aab0", padding: "7px 14px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #9295a0", flexShrink: 0 }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#484a55", marginLeft: 8, fontWeight: 500 }}>Live Preview — updates as you type</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
              <div style={{ background: "#fff", boxShadow: "0 6px 32px rgba(0,0,0,0.22)" }}>
                <ResumePreview data={data} ref={pdfRef} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}