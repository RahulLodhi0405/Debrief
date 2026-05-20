import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import topics from "../topics";
import { useProgress } from "../context/ProgressContext";

const getColor = (topic) => {
  if (topic.includes("Array")) return "bg-orange-500";
  if (topic.includes("String")) return "bg-purple-500";
  if (topic.includes("STL")) return "bg-green-500";
  if (topic.includes("TC")) return "bg-yellow-500";
  if (topic.includes("Math")) return "bg-pink-500";
  if (topic.includes("Graph")) return "bg-cyan-500";
  if (topic.includes("Tree")) return "bg-emerald-500";
  return "bg-purple-500";
};

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { progress } = useProgress();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let topicData = topics.map((topic) => {
      let solved = 0;
      let total = 0;

      topic.sections.forEach((sec) => {
        sec.questions.forEach((q) => {
          total++;
          if (progress[q.id]) solved++;
        });
      });

      return {
        name: topic.title,
        solved,
        total,
      };
    });

    topicData.sort((a, b) => {
      const pa = a.total === 0 ? 0 : a.solved / a.total;
      const pb = b.total === 0 ? 0 : b.solved / b.total;
      return pb - pa;
    });

    setData(topicData);
    setLoading(false);
  }, [progress]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalSolved = data.reduce((a, b) => a + b.solved, 0);

  const totalQuestions = data.reduce((a, b) => a + b.total, 0);

  const percent =
    totalQuestions === 0
      ? 0
      : Math.round((totalSolved / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white px-6 py-8">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm cursor-pointer text-gray-400 hover:text-purple-400 transition"
        >
          ← Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 cursor-pointer text-sm bg-[#111827] border border-gray-700 rounded-lg hover:text-red-400 hover:border-red-500/40 transition"
        >
          Logout
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1e293b] border border-purple-500/20 rounded-2xl p-6 mb-10 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5">

          {/* PROFILE IMAGE */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-black text-3xl font-bold">
            
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              "😎"
            )}
          </div>

          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left">

            <h2 className="text-2xl font-bold mb-1">
              {user?.displayName || "Rahul Lodhi"}
            </h2>

            <p className="text-gray-400 text-sm mb-3">
              {user?.email}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">

              <span className="px-3 py-1 rounded-full text-xs bg-purple-500/15 border border-purple-500/30 text-purple-300">
                🚀 DSA Learner
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                💻 MERN Developer
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-orange-500/15 border border-orange-500/30 text-orange-300">
                🔥 Coding Streak
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Keep practicing consistently and improve your coding skills daily with Debrief.
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        {/* SOLVED */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-purple-500/40 transition">
          <p className="text-xs text-gray-400 mb-1">
            Problems Solved
          </p>

          <h3 className="text-3xl font-bold text-purple-400">
            {totalSolved}
          </h3>
        </div>

        {/* TOTAL */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-cyan-500/40 transition">
          <p className="text-xs text-gray-400 mb-1">
            Total Questions
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {totalQuestions}
          </h3>
        </div>

        {/* COMPLETION */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-green-500/40 transition">
          <p className="text-xs text-gray-400 mb-1">
            Completion Rate
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            {percent}%
          </h3>
        </div>

        {/* STREAK */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 hover:border-orange-500/40 transition">
          <p className="text-xs text-gray-400 mb-1">
            Coding Streak
          </p>

          <h3 className="text-3xl font-bold text-orange-400">
            🔥 7
          </h3>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="text-xl font-bold">
              Topic Progress
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Track your DSA preparation journey topic-wise.
            </p>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
            Debrief Analytics
          </div>
        </div>

        <div className="space-y-4">

          {data.map((topic, i) => {
            const percent =
              topic.total === 0
                ? 0
                : Math.round((topic.solved / topic.total) * 100);

            return (
              <div
                key={i}
                className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800 hover:border-purple-500/20 transition"
              >
                <div className="flex justify-between items-center mb-2">

                  <div>
                    <span className="font-medium">
                      {topic.name}
                    </span>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Practice consistency improves interview performance.
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {topic.solved}/{topic.total}
                  </span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={`h-full ${getColor(topic.name)} transition-all duration-500`}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{percent}% Completed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        Developed with ❤️ using MERN Stack • Debrief Platform
      </div>
    </div>
  );
};

export default Profile;