import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import QuestionRow from "./QuestionRow";
import { useProgress } from "../context/ProgressContext";

const DIFFICULTY_COLOR = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

const TopicSection = ({ topic }) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { progress, setProgress, loading } = useProgress();

  
  if (loading) {
  return (
    <div className="mb-3 rounded-xl border border-white/6 bg-[#0a0e1a] px-4 py-3.5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
        <div className="h-3 w-36 rounded-full bg-white/15" />
        <div className="flex-1 h-1 rounded-full bg-white/10 mx-2" />
        <div className="h-3 w-10 rounded-full bg-white/15" />
      </div>
    </div>
  );
}

  const allQuestions = topic.sections.flatMap((sec) => sec.questions);
  const solvedCount = allQuestions.filter((q) => progress[q.id]).length;
  const totalCount = allQuestions.length;
  const percent = totalCount === 0 ? 0 : ~~((solvedCount / totalCount) * 100);
  const isComplete = solvedCount === totalCount && totalCount > 0;

  const handleToggle = (id, value) => {
    setProgress((prev) => ({ ...prev, [id]: value }));
  };

  const getSectionProgress = (sec) => {
    const solved = sec.questions.filter((q) => progress[q.id]).length;
    const total = sec.questions.length;
    return { solved, total, percent: total === 0 ? 0 : ~~((solved / total) * 100) };
  };

  return (
    <div
      className={`mb-3 rounded-xl border transition-all duration-300 overflow-hidden
        ${open
          ? "border-green-500/25 bg-[#080c15]"
          : "border-white/6 bg-[#0a0e1a] hover:border-white/10 hover:bg-[#0b0f1c]"
        }`}
    >
      {/* ── TOPIC HEADER ── */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-3.5 cursor-pointer group select-none"
      >
        {/* Expand icon */}
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0"
          style={{ fontSize: "10px" }}
        >
          ▶
        </motion.span>

        {/* Title */}
        <h3
          className={`text-[13px] font-medium transition-colors shrink-0 min-w-30
            ${open ? "text-white" : "text-gray-300 group-hover:text-white"}`}
        >
          {topic.title}
        </h3>

        {/* Progress bar */}
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden mx-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isComplete
                ? "bg-green-400"
                : percent > 50
                ? "bg-linear-to-r from-green-600 to-green-400"
                : "bg-linear-to-r from-green-800 to-green-500"
            }`}
          />
        </div>

        {/* Right side stats */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Completion badge */}
          {isComplete ? (
            <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5">
              ✓ Done
            </span>
          ) : percent > 0 ? (
            <span className="text-[10px] text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-2 py-0.5 font-medium">
              {percent}%
            </span>
          ) : null}

          {/* Count */}
          <span className="text-[11px] text-gray-500 font-medium tabular-nums">
            {solvedCount}
            <span className="text-gray-700">/</span>
            {totalCount}
          </span>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/4">
              {topic.sections.map((sec, index) => {
                const { solved, total, percent: secPercent } = getSectionProgress(sec);
                const secDone = solved === total && total > 0;

                return (
                  <div
                    key={index}
                    className={`rounded-lg border transition-all duration-200
                      ${activeSection === index
                        ? "border-white/8 bg-white/2"
                        : "border-transparent hover:border-white/5"
                      }`}
                  >
                    {/* Section header */}
                    <div
                      onClick={() =>
                        setActiveSection(activeSection === index ? null : index)
                      }
                      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer group/sec"
                    >
                      <motion.span
                        animate={{ rotate: activeSection === index ? 90 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-gray-700 group-hover/sec:text-gray-500 text-[9px] shrink-0 transition-colors"
                      >
                        ▶
                      </motion.span>

                      <span className="text-[12px] text-gray-400 group-hover/sec:text-gray-200 transition-colors font-medium min-w-18">
                        {sec.name}
                      </span>

                      {/* Section progress bar */}
                      <div className="flex-1 h-0.75 bg-white/4 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${secPercent}%` }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            secDone ? "bg-green-400" : "bg-green-600"
                          }`}
                        />
                      </div>

                      <span
                        className={`text-[10px] tabular-nums shrink-0 font-medium ${
                          secDone ? "text-green-400" : "text-gray-600"
                        }`}
                      >
                        {solved}/{total}
                      </span>
                    </div>

                    {/* Questions */}
                    <AnimatePresence initial={false}>
                      {activeSection === index && (
                        <motion.div
                          key="questions"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-3 pb-3 space-y-1.5">
                            {/* Header row */}
                            <div className="grid grid-cols-[32px_2fr_1fr_1fr_1fr_1fr] px-3 py-2 text-[10px] text-gray-600 uppercase tracking-[0.08em] border border-white/4 rounded-lg bg-black/20">
                              <span />
                              <span>Topic</span>
                              <span>Link</span>
                              <span>Notes</span>
                              <span>Revision</span>
                              <span>Difficulty</span>
                            </div>

                            {/* Question rows */}
                            {sec.questions.map((q, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.18 }}
                                className={`border rounded-lg transition-all duration-150 ${
                                  progress[q.id]
                                    ? "border-green-500/15 bg-green-500/4"
                                    : "border-white/4 bg-black/10 hover:border-white/8 hover:bg-white/2"
                                }`}
                              >
                                <QuestionRow
                                  q={q}
                                  isChecked={progress[q.id] || false}
                                  onToggle={handleToggle}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopicSection;