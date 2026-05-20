/* eslint-disable react-hooks/immutability */
import { useNavigate } from "react-router-dom";

const subjects = [
  {
    name: "OOP",
    icon: "🧱",
    link: "https://youtu.be/mlIUKyZIUUU?si=e4tYL-s1Lw40FsJJ",
    title: "Apna College OOP",
  },
  {
    name: "CN",
    icon: "🌐",
    link: "https://youtu.be/RY32wSQDekE?si=wQ7ibz2L3DVh6raj",
    title: "Sheryians Computer Networks",
  },
  {
    name: "SQL",
    icon: "🗄️",
    link: "https://youtu.be/hlGoQC332VM?si=jtx6H7Pipu0Zx-O3",
    title: "Apna College SQL",
  },
  {
    name: "OS",
    icon: "⚙️",
    link: "https://youtu.be/8XBtAjKwCm4?si=RsofB7k3qHR8u7VK",
    title: "Operating System",
  },
  {
    name: "DBMS",
    icon: "📊",
    link: "https://youtu.be/dl00fOOYLOM?si=D5Bh6ZN-fe9ucmPu",
    title: "Love Babbar DBMS",
  },
];

export default function CSSubjects() {
  const navigate = useNavigate();

  // 🔥 HANDLE CLICK (CORE FIX)
  const handleClick = (link) => {
    if (link.startsWith("/")) {
      navigate(link); // internal route
    } else {
      window.location.href = link; // external → same tab
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#020617] to-black text-white px-5 py-6">

      {/* Back */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-xs px-3 py-1.5 rounded-md bg-[#111827] cursor-pointer border border-gray-700 hover:border-green-400 hover:text-green-400 transition"
        >
          ← Dashboard
        </button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400 leading-tight">
          Core CS Subjects
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          One click → start learning (no distractions)
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {subjects.map((sub, i) => (
          <div
            key={i}
            onClick={() => handleClick(sub.link)}
            className="relative group overflow-hidden rounded-xl border border-gray-800 p-4 bg-[#0b0f19] cursor-pointer hover:scale-[1.02] transition"
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-green-500/10 via-transparent to-green-500/10 blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-500/10 text-green-400 text-lg group-hover:scale-110 transition">
                    {sub.icon}
                  </div>

                  <h2 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
                    {sub.name}
                  </h2>
                </div>

                <span className="text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>

              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition">
                {sub.title}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[10px] text-gray-500">
                  YouTube Resource
                </span>

                <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                  Watch
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-xs text-gray-500">
          DSA + Core Subjects = Selection Probability ↑
        </p>
      </div>
    </div>
  );
}