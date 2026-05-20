import { useState, useEffect } from "react";
import TopicSection from "../components/TopicSection";
import arrayTopic from "../topics/array";
import { useNavigate } from "react-router-dom";
import stringTopic from "../topics/string";
import STL from "../topics/stl";
import TCSC from "../topics/tcsc";
import Math from "../topics/math";
import TWO_D_ARRAY from "../topics/2darray";
import RECURSION from "../topics/recursion";
import STACK_QUEUE from "../topics/stack&queue";
import LINKED_LIST from "../topics/linkedlist";
import TREE from "../topics/tree";
import GRAPH from "../topics/graph";
import API from "../utils/api";
import STAR_PATTERNS from "../topics/starpattern";
import FUNCTION from "../topics/function";
import IFELSE from "../topics/ifelse";
import FOR_LOOP from "../topics/forloop";
import WHILE_LOOP from "../topics/whileloop";
import LOGICAL_QUESTIONS from "../topics/logicalquestions";
import OOP from "../topics/oop";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalUsers, setTotalUsers] = useState(500);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/user/total-users");
        setTotalUsers(res.data.totalUsers || 500);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const topics = [
    IFELSE,
    FOR_LOOP,
    WHILE_LOOP,
    LOGICAL_QUESTIONS,
    STAR_PATTERNS,
    FUNCTION,
    STL,
    TCSC,
    arrayTopic,
    stringTopic,
    TWO_D_ARRAY,
    Math,
    RECURSION,
    STACK_QUEUE,
    OOP,
    LINKED_LIST,
    TREE,
    GRAPH,
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col lg:flex-row">
      {/* SIDEBAR */}
      <div className="w-full lg:w-72 lg:h-screen lg:fixed lg:left-0 lg:top-0 bg-[#0b0f19] border-r border-gray-800 p-4 sm:p-6 flex flex-col justify-between">
        
        {/* TOP */}
        <div>
          
          {/* PROFILE */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 mb-5 cursor-pointer p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/6 hover:border-white/10 transition-all duration-200 group"
          >
            <div className="relative shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                  className="w-11 h-11 rounded-full object-cover border-[1.5px] border-white/15"
                />
              ) : null}

              <div
                className={`w-11 h-11 rounded-full bg-purple-500/15 border border-purple-500/30 items-center justify-center text-xl ${
                  user?.photoURL ? "hidden" : "flex"
                }`}
              >
                😎
              </div>

              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-purple-400 rounded-full border-2 border-[#0b0f19]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold truncate">
                {user?.displayName || "Coder"}
              </p>

              <p className="text-gray-500 text-[11px] truncate mt-0.5">
                {user?.email}
              </p>

              <p className="text-purple-400 text-[11px] mt-1 flex items-center gap-1">
                <span>View Profile</span>
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                  →
                </span>
              </p>
            </div>
          </div>

          {/* BRAND */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Debrief
            </h1>

            <p className="text-gray-400 text-xs mt-1">
              AI Powered DSA Learning Platform
            </p>
          </div>

          {/* SECTION TITLE */}
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">
              Quick Access
            </p>

            <div className="w-8 h-0.5 bg-purple-400 mt-1 rounded-full"></div>
          </div>

          {/* DSA APPROACH */}
          <button
            onClick={() => navigate("/dsa-approach")}
            className="w-full flex items-center justify-between bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-transparent border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-purple-300 hover:text-white hover:border-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2">
              <span>🧠</span>
              <span className="font-medium text-left text-[11px] leading-tight">
                DSA Problem Solving Guide
              </span>
            </div>

            <span className="text-[10px]">→</span>
          </button>

          {/* RESUME BUILDER */}
          <button
            onClick={() => navigate("/createresume")}
            className="w-full mt-2 flex items-center justify-between bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-transparent border border-orange-500/30 rounded-lg px-3 py-2 text-xs text-orange-300 hover:text-white hover:border-orange-400 hover:shadow-[0_0_12px_rgba(234,179,8,0.35)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2">
              <span>📝</span>
              <span className="font-medium">
                Resume Builder Pro
              </span>
            </div>

            <span className="text-[10px]">→</span>
          </button>

          {/* COMPILER */}
          <button
            onClick={() => navigate("/compiler")}
            className="w-full mt-2 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-transparent border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.35)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2">
              <span>💻</span>
              <span className="font-medium">
                Debrief Code Lab
              </span>
            </div>

            <span className="text-[10px]">→</span>
          </button>

          {/* CS SUBJECTS */}
          <button
            onClick={() => navigate("/cs-subjects")}
            className="w-full mt-2 flex items-center justify-between bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-blue-300 hover:text-white hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span className="font-medium">
                CS Subjects
              </span>
            </div>

            <span className="text-[10px]">→</span>
          </button>

          <div className="h-px bg-gray-800 mb-4 mt-4"></div>

          {/* STATS */}
          <div className="bg-gradient-to-r from-[#111827] to-[#1e293b] border border-purple-500/20 rounded-xl px-4 py-3 mb-3">
            <p className="text-xs text-gray-400">
              Total Learners
            </p>

            <h2 className="text-2xl font-bold text-purple-400">
              {totalUsers}+
            </h2>
          </div>

          {/* STREAK */}
          <div className="bg-gradient-to-r from-[#111827] to-[#1e293b] border border-orange-500/20 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400">
              Current Coding Streak
            </p>

            <h2 className="text-2xl font-bold text-orange-400">
              🔥 7 Days
            </h2>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="space-y-3 mt-6">
          
          {/* AI BUTTON */}
          <button
            className="w-full bg-purple-500 hover:bg-purple-400 text-white text-[11.5px] font-semibold py-2 rounded-lg transition-all duration-200 tracking-wide"
          >
            🤖 AI Hint Assistant
          </button>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-[#111827] border border-gray-800 rounded-lg py-2 hover:border-purple-500/40 hover:shadow-[0_0_8px_rgba(168,85,247,0.3)]">
            <span>🚀</span>

            Developed by
            <span className="font-medium text-white">
              Rahul Lodhi
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 overflow-y-auto lg:h-screen">

        {/* HEADING */}
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-white mb-2">
            Master DSA Step by Step
          </h2>

          <p className="text-[14px] text-gray-400 leading-relaxed">
            Structured roadmap, coding practice, resume building,
            and interview preparation — all in one platform.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search DSA Topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* TOPICS */}
        {filteredTopics.map((topic, index) => (
          <TopicSection key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;