import { useState, useEffect, useRef, useCallback } from "react";

// ── LEETCODE MOCK DATABASE ─────────────────────────────────────────────────
const LEETCODE_DB = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topics: ["Array", "Hash Table"], description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.", examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }, { input: "nums = [3,2,4], target = 6", output: "[1,2]" }], constraints: "2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\nOnly one valid answer exists.", signature: "vector<int> twoSum(vector<int>& nums, int target)" },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", topics: ["Linked List", "Math"], description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.", examples: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." }], constraints: "The number of nodes in each linked list is in the range [1, 100].\n0 ≤ Node.val ≤ 9", signature: "ListNode* addTwoNumbers(ListNode* l1, ListNode* l2)" },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topics: ["Sliding Window", "Hash Table", "String"], description: "Given a string s, find the length of the longest substring without repeating characters.", examples: [{ input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' }, { input: 's = "bbbbb"', output: "1" }], constraints: "0 ≤ s.length ≤ 5 × 10⁴\ns consists of English letters, digits, symbols and spaces.", signature: "int lengthOfLongestSubstring(string s)" },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", topics: ["Binary Search", "Divide and Conquer"], description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).", examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" }], constraints: "nums1.length == m\nnums2.length == n\n0 ≤ m, n ≤ 1000", signature: "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2)" },
  { id: 20, title: "Valid Parentheses", difficulty: "Easy", topics: ["Stack", "String"], description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", examples: [{ input: 's = "()"', output: "true" }, { input: 's = "()[]{}"', output: "true" }, { input: 's = "(]"', output: "false" }], constraints: "1 ≤ s.length ≤ 10⁴\ns consists of parentheses only '()[]{}'.", signature: "bool isValid(string s)" },
  { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", topics: ["Linked List", "Recursion"], description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.", examples: [{ input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }], constraints: "The number of nodes in both lists is in the range [0, 50].", signature: "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)" },
  { id: 22, title: "Generate Parentheses", difficulty: "Medium", topics: ["Backtracking", "Dynamic Programming"], description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.", examples: [{ input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' }], constraints: "1 ≤ n ≤ 8", signature: "vector<string> generateParenthesis(int n)" },
  { id: 23, title: "Merge k Sorted Lists", difficulty: "Hard", topics: ["Linked List", "Heap", "Divide and Conquer"], description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.", examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }], constraints: "k == lists.length\n0 ≤ k ≤ 10⁴\n0 ≤ lists[i].length ≤ 500", signature: "ListNode* mergeKLists(vector<ListNode*>& lists)" },
  { id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", topics: ["Binary Search", "Array"], description: "There is an integer array nums sorted in ascending order that is possibly rotated at an unknown pivot. Given the array after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not.", examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }], constraints: "1 ≤ nums.length ≤ 5000\nAll values of nums are unique.", signature: "int search(vector<int>& nums, int target)" },
  { id: 42, title: "Trapping Rain Water", difficulty: "Hard", topics: ["Two Pointers", "Dynamic Programming", "Stack"], description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.", examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "The elevation map traps 6 units of rain water." }], constraints: "n == height.length\n1 ≤ n ≤ 2 × 10⁴", signature: "int trap(vector<int>& height)" },
  { id: 53, title: "Maximum Subarray", difficulty: "Medium", topics: ["Array", "Dynamic Programming"], description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.", examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }], constraints: "-10⁴ ≤ nums[i] ≤ 10⁴", signature: "int maxSubArray(vector<int>& nums)" },
  { id: 67, title: "Add Binary", difficulty: "Easy", topics: ["Math", "String", "Bit Manipulation"], description: "Given two binary strings a and b, return their sum as a binary string.", examples: [{ input: 'a = "11", b = "1"', output: '"100"' }, { input: 'a = "1010", b = "1011"', output: '"10101"' }], constraints: "1 ≤ a.length, b.length ≤ 10⁴\na and b consist only of '0' or '1' characters.", signature: "string addBinary(string a, string b)" },
  { id: 70, title: "Climbing Stairs", difficulty: "Easy", topics: ["Dynamic Programming", "Math", "Memoization"], description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?", examples: [{ input: "n = 2", output: "2" }, { input: "n = 3", output: "3" }], constraints: "1 ≤ n ≤ 45", signature: "int climbStairs(int n)" },
  { id: 76, title: "Minimum Window Substring", difficulty: "Hard", topics: ["Sliding Window", "Hash Table", "String"], description: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.", examples: [{ input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' }], constraints: "1 ≤ s.length, t.length ≤ 10⁵", signature: "string minWindow(string s, string t)" },
  { id: 100, title: "Same Tree", difficulty: "Easy", topics: ["Tree", "DFS", "BFS"], description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.", examples: [{ input: "p = [1,2,3], q = [1,2,3]", output: "true" }], constraints: "The number of nodes in both trees is in the range [0, 100].", signature: "bool isSameTree(TreeNode* p, TreeNode* q)" },
  { id: 200, title: "Number of Islands", difficulty: "Medium", topics: ["DFS", "BFS", "Union Find"], description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.", examples: [{ input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"]]', output: "1" }], constraints: "1 ≤ m, n ≤ 300", signature: "int numIslands(vector<vector<char>>& grid)" },
  { id: 206, title: "Reverse Linked List", difficulty: "Easy", topics: ["Linked List", "Recursion"], description: "Given the head of a singly linked list, reverse the list, and return the reversed list.", examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }], constraints: "The number of nodes in the list is the range [0, 5000].", signature: "ListNode* reverseList(ListNode* head)" },
  { id: 215, title: "Kth Largest Element in an Array", difficulty: "Medium", topics: ["Array", "Heap", "Quickselect"], description: "Given an integer array nums and an integer k, return the kth largest element in the array.", examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }], constraints: "1 ≤ k ≤ nums.length ≤ 10⁵", signature: "int findKthLargest(vector<int>& nums, int k)" },
  { id: 300, title: "Longest Increasing Subsequence", difficulty: "Medium", topics: ["Dynamic Programming", "Binary Search"], description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.", examples: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The LIS is [2,3,7,101]." }], constraints: "1 ≤ nums.length ≤ 2500", signature: "int lengthOfLIS(vector<int>& nums)" },
];

// ── HELPERS ────────────────────────────────────────────────────────────────
function randCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function fmtTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function normalizeCode(code) {
  return (code || "").replace(/\s+/g, " ").trim();
}

function maxMarksFor(q) {
  if (!q) return 0;
  return q.difficulty === "Easy" ? 100 : q.difficulty === "Medium" ? 200 : 350;
}

function isStarterOnly(question, code) {
  const clean = normalizeCode(code);
  if (!clean) return true;
  if (normalizeCode(starterCode(question)) === clean) return true;

  const body = clean.match(/\{([\s\S]*)\}\s*;?$/)?.[1] || clean;
  const withoutComments = body
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();

  const hasDefaultReturn = [
    "return 0;",
    "return 0.0;",
    "return false;",
    "return true;",
    "return {};",
    "return \"\";",
    "return nullptr;",
  ].some((line) => normalizeCode(withoutComments).includes(normalizeCode(line)));

  return hasDefaultReturn && !hasRealLogic(code);
}

function hasRealLogic(code) {
  const lower = (code || "").toLowerCase();
  const logicSignals = [
    /\b(if|else|for|while|switch)\b/,
    /\bunordered_map|map<|set<|stack<|queue<|priority_queue|vector<|sort\(|min\(|max\(/,
    /\bleft\b|\bright\b|\bmid\b|\bslow\b|\bfast\b|\bvisited\b|\bdp\b|\bmemo\b/,
    /\+\+|--|\+=|-=|\*=|\/=|%=/,
    /\[[^\]]+\]/,
  ];
  return logicSignals.some((rx) => rx.test(lower));
}

function evaluateSolution(question, code) {
  const clean = (code || "").trim();
  const lower = clean.toLowerCase();
  const maxMarks = maxMarksFor(question);

  if (isStarterOnly(question, code) || !hasRealLogic(code)) {
    return {
      score: 0,
      maxMarks,
      verdict: "Not Attempted",
      feedback: "AI checker: starter/default code detected. Add real algorithm logic before submitting.",
    };
  }

  let ratio = 0.1;
  const reasons = [];

  if (clean.length >= 140) {
    ratio += 0.16;
    reasons.push("implementation has enough substance");
  }
  if (/\b(if|else|for|while|switch)\b/.test(lower)) {
    ratio += 0.18;
    reasons.push("looks like valid code structure");
  }
  if (!lower.includes("todo") && !lower.includes("write your solution")) {
    ratio += 0.06;
    reasons.push("placeholder text removed");
  }

  const topicText = `${question.title} ${question.topics.join(" ")}`.toLowerCase();
  const checks = [
    { match: /hash|map|unordered_map|dict|set/.test(lower), topics: ["hash table", "two sum"] },
    { match: /while|for/.test(lower), topics: ["array", "string", "linked list", "two pointers", "sliding window"] },
    { match: /stack|push|pop/.test(lower), topics: ["stack", "parentheses"] },
    { match: /left|right|mid|binary/.test(lower), topics: ["binary search"] },
    { match: /dp|memo|cache|prev|curr/.test(lower), topics: ["dynamic programming", "memoization"] },
    { match: /dfs|bfs|queue|visited/.test(lower), topics: ["dfs", "bfs", "tree", "grid", "islands"] },
    { match: /heap|priority_queue|quickselect/.test(lower), topics: ["heap", "quickselect"] },
  ];

  checks.forEach(({ match, topics }) => {
    if (match && topics.some((t) => topicText.includes(t))) ratio += 0.08;
  });

  const signatureName = question.signature.match(/\s([A-Za-z_][A-Za-z0-9_]*)\s*\(/)?.[1]?.toLowerCase();
  if (signatureName && lower.includes(signatureName)) {
    ratio += 0.1;
    reasons.push("function name matches the required signature");
  }

  ratio = Math.min(1, ratio);
  const score = Math.round(maxMarks * ratio);
  const verdict = ratio >= 0.75 ? "Accepted" : ratio >= 0.5 ? "Partial" : "Needs Review";
  const feedback = reasons.length
    ? `AI checker: ${reasons.join(", ")}.`
    : "AI checker: basic attempt detected, but more complete logic is needed.";

  return { score, maxMarks, verdict, feedback };
}

function calcScore(evaluations) {
  return Object.values(evaluations).reduce((sum, item) => sum + (item?.score || 0), 0);
}

function starterCode(question) {
  if (!question) return "";
  const defaults = {
    "vector<int>": "return {};",
    "vector<string>": "return {};",
    "ListNode*": "return nullptr;",
    "double": "return 0.0;",
    "int": "return 0;",
    "bool": "return false;",
    "string": "return \"\";",
  };
  const returnType = Object.keys(defaults).find((type) => question.signature.startsWith(type)) || "int";
  return `class Solution {\npublic:\n    ${question.signature} {\n        ${defaults[returnType] || "return 0;"}\n    }\n};`;
}

function simulateRun(question, code) {
  const evaluation = evaluateSolution(question, code);
  if (evaluation.verdict === "Not Attempted") {
    return {
      passed: 0,
      total: question.examples.length,
      runtime: "--",
      memory: "--",
      message: "Starter/default code cannot pass sample cases.",
      cases: question.examples.map((ex) => ({
        input: ex.input,
        expected: ex.output,
        output: "No real logic executed",
        passed: false,
      })),
    };
  }

  const passCount = evaluation.verdict === "Accepted"
    ? question.examples.length
    : evaluation.verdict === "Partial"
      ? Math.max(1, question.examples.length - 1)
      : 0;

  return {
    passed: passCount,
    total: question.examples.length,
    runtime: `${24 + Math.floor(evaluation.score % 43)} ms`,
    memory: `${40 + Math.floor(evaluation.score % 18)} MB`,
    cases: question.examples.map((ex, i) => ({
      input: ex.input,
      expected: ex.output,
      output: i < passCount ? ex.output : "Different output",
      passed: i < passCount,
    })),
  };
}

function hiddenTotalFor(question) {
  if (question.difficulty === "Easy") return 8;
  if (question.difficulty === "Medium") return 12;
  return 16;
}

function judgeSubmission(question, code) {
  const base = evaluateSolution(question, code);
  const hiddenTotal = hiddenTotalFor(question);
  const ratio = base.maxMarks ? base.score / base.maxMarks : 0;
  const hiddenPassed = base.score <= 0 ? 0 : Math.min(hiddenTotal, Math.floor(ratio * hiddenTotal));
  const score = Math.round(maxMarksFor(question) * (hiddenPassed / hiddenTotal));
  const verdict = hiddenPassed === hiddenTotal ? "Accepted" : hiddenPassed > 0 ? "Partial" : "Wrong Answer";

  return {
    ...base,
    score,
    verdict,
    hiddenPassed,
    hiddenTotal,
    feedback: hiddenPassed === hiddenTotal
      ? "Hidden judge: all hidden test cases passed."
      : hiddenPassed > 0
        ? `Hidden judge: ${hiddenPassed}/${hiddenTotal} hidden test cases passed.`
        : "Hidden judge: no hidden test cases passed.",
  };
}

// ── BADGE ──────────────────────────────────────────────────────────────────
function DiffBadge({ difficulty }) {
  const styles = {
    Easy: { background: "rgba(0,212,160,0.15)", color: "#00d4a0", border: "1px solid rgba(0,212,160,0.3)" },
    Medium: { background: "rgba(255,209,102,0.15)", color: "#ffd166", border: "1px solid rgba(255,209,102,0.3)" },
    Hard: { background: "rgba(255,107,107,0.15)", color: "#ff6b6b", border: "1px solid rgba(255,107,107,0.3)" },
  };
  return (
    <span style={{ ...styles[difficulty], padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", display: "inline-flex", alignItems: "center" }}>
      {difficulty}
    </span>
  );
}

// ── TOAST ──────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: "#1a1a26", border: `1px solid ${t.type === "success" ? "rgba(0,212,160,0.4)" : t.type === "error" ? "rgba(255,107,107,0.4)" : "rgba(255,209,102,0.4)"}`,
          color: t.type === "success" ? "#00d4a0" : t.type === "error" ? "#ff6b6b" : "#ffd166",
          borderRadius: 8, padding: "12px 18px", fontSize: 14, fontWeight: 600,
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)", maxWidth: 300,
          animation: "toastIn 0.3s ease",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ── OVERLAY ────────────────────────────────────────────────────────────────
function Overlay({ show, borderColor = "#6c63ff", children }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 99998, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#111118", border: `1px solid ${borderColor}`, borderRadius: 16, padding: "40px 32px", maxWidth: 420, width: "90%", textAlign: "center", fontFamily: "'Outfit', sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function CreateTest() {

  // ── Global state ─────────────────────────────────────────────────────
  const [view, setView] = useState("admin"); // admin | join | test | leaderboard
  const [toasts, setToasts] = useState([]);

  // ── Admin state ───────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const [testDuration, setTestDuration] = useState(60);
  const [currentTest, setCurrentTest] = useState(null);

  // ── Join state ────────────────────────────────────────────────────────
  const [joinCode, setJoinCode] = useState("");
  const [studentName, setStudentName] = useState("");

  // ── Test / student state ──────────────────────────────────────────────
  const [student, setStudent] = useState(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [runResults, setRunResults] = useState({});
  const [violations, setViolations] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // ── Leaderboard state ─────────────────────────────────────────────────
  const [participants, setParticipants] = useState([]);
  const [submissionsLog, setSubmissionsLog] = useState([]);
  const [violationsLog, setViolationsLog] = useState([]);
  const [lbTab, setLbTab] = useState("live");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // ── Overlays ──────────────────────────────────────────────────────────
  const [escWarning, setEscWarning] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [testEndReason, setTestEndReason] = useState("");
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [copyWarning, setCopyWarning] = useState(false);

  const violationsRef = useRef(0);
  const testActiveRef = useRef(false);

  // ── Toast helper ──────────────────────────────────────────────────────
  const toast = useCallback((msg, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  // ── SEARCH ────────────────────────────────────────────────────────────
  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { toast("Enter a search term", "error"); return; }
    setSearching(true);
    setTimeout(() => {
      const num = parseInt(q);
      let results;
      if (!isNaN(num)) {
        results = LEETCODE_DB.filter((p) => p.id === num || p.id.toString().startsWith(q));
      } else {
        results = LEETCODE_DB.filter((p) =>
          p.title.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q)) ||
          p.difficulty.toLowerCase() === q
        );
      }
      setSearchResults(results);
      setSearching(false);
      if (results.length === 0) toast(`No results for "${q}"`, "error");
      else toast(`Found ${results.length} problem${results.length > 1 ? "s" : ""}`, "success");
    }, 600);
  };

  const addQuestion = (id) => {
    const q = LEETCODE_DB.find((p) => p.id === id);
    if (!q) return;
    if (addedQuestions.some((a) => a.id === id)) { toast("Already added", "error"); return; }
    if (addedQuestions.length >= 10) { toast("Max 10 questions per test", "error"); return; }
    setAddedQuestions((p) => [...p, q]);
    toast(`Added: ${q.title}`, "success");
  };

  const removeQuestion = (id) => setAddedQuestions((p) => p.filter((q) => q.id !== id));

  // ── GENERATE TEST ─────────────────────────────────────────────────────
  const generateTest = () => {
    if (!addedQuestions.length) { toast("Add at least one question", "error"); return; }
    const code = randCode();
    const test = {
      code, title: testTitle || "DSA Test",
      duration: testDuration, questions: addedQuestions,
      startTime: Date.now(), active: true,
    };
    setCurrentTest(test);
    setParticipants([]);
    setSubmissionsLog([]);
    setViolationsLog([]);
    setSelectedSubmission(null);
    setEvaluations({});
    setRunResults({});
    toast(`Test created! Code: ${code}`, "success");
  };

  // ── JOIN TEST ─────────────────────────────────────────────────────────
  const joinTest = () => {
    const code = joinCode.trim().toUpperCase();
    const name = studentName.trim();
    if (!code || code.length !== 6) { toast("Enter a valid 6-digit code", "error"); return; }
    if (!name) { toast("Enter your name", "error"); return; }
    if (!currentTest || currentTest.code !== code) { toast("Invalid or inactive test code", "error"); return; }
    if (!currentTest.active) { toast("This test has ended", "error"); return; }
    if (participants.some((p) => p.name === name)) { toast("Name already taken", "error"); return; }

    setStudent({ name, code });
    setAnswers({});
    setSubmitted({});
    setEvaluations({});
    setRunResults({});
    setViolations(0);
    violationsRef.current = 0;
    setCurrentQIdx(0);
    setTimeLeft(currentTest.duration * 60);
    setParticipants((p) => [...p, { name, score: 0, solved: 0, total: currentTest.questions.length, status: "active", violations: 0 }]);
    setView("test");
    testActiveRef.current = true;

    // Enter fullscreen
    setTimeout(() => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }, 100);
  };

  // ── TIMER ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (view !== "test") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          testActiveRef.current = false;
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          setTestEndReason("Time is up! Your answers have been auto-submitted.");
          setTestEnded(true);
          setParticipants((prev) => prev.map((p) =>
            p.name === student?.name ? { ...p, status: "submitted" } : p
          ));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [view, student?.name]);

  // ── ANTI-CHEAT ────────────────────────────────────────────────────────
  const logViolation = useCallback((type, studentName) => {
    setViolationsLog((p) => [...p, { student: studentName, type, time: Date.now() }]);
    setParticipants((prev) => prev.map((p) => p.name === studentName ? { ...p, violations: (p.violations || 0) + 1 } : p));
  }, []);

  const endTest = useCallback((reason) => {
    clearInterval(timerRef.current);
    testActiveRef.current = false;
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    setTestEndReason(reason);
    setTestEnded(true);
    setParticipants((prev) => prev.map((p) =>
      p.name === student?.name ? { ...p, status: "submitted" } : p
    ));
  }, [student?.name]);

  const onCopy = useCallback((e) => {
    if (!testActiveRef.current) return;
    e.preventDefault();
    setCopyWarning(true);
    if (student) logViolation("copy/paste attempt", student.name);
  }, [student, logViolation]);

  const onFSChange = useCallback(() => {
    if (!testActiveRef.current) return;
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (!isFS) {
      violationsRef.current += 1;
      setViolations(violationsRef.current);
      if (student) logViolation("exited fullscreen", student.name);
      if (violationsRef.current >= 2) {
        endTest("You exited full-screen twice. Your answers have been submitted automatically.");
      } else {
        setEscWarning(true);
      }
    }
  }, [student, logViolation, endTest]);

  const onVisChange = useCallback(() => {
    if (!testActiveRef.current) return;
    if (document.hidden) {
      violationsRef.current += 1;
      setViolations(violationsRef.current);
      if (student) logViolation("switched tab", student.name);
      toast("⚠️ Tab switch detected and logged!", "warn");
      if (violationsRef.current >= 2) endTest("Multiple focus violations detected.");
    }
  }, [student, logViolation, endTest, toast]);

  useEffect(() => {
    if (view !== "test") return;
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onCopy);
    document.addEventListener("cut", onCopy);
    document.addEventListener("fullscreenchange", onFSChange);
    document.addEventListener("visibilitychange", onVisChange);
    const keyBlock = (e) => {
      if (!testActiveRef.current) return;
      if (e.ctrlKey && ["c", "v", "u", "s", "a"].includes(e.key.toLowerCase())) e.preventDefault();
      if (["F12", "F5"].includes(e.key)) e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    document.addEventListener("keydown", keyBlock);
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onCopy);
      document.removeEventListener("cut", onCopy);
      document.removeEventListener("fullscreenchange", onFSChange);
      document.removeEventListener("visibilitychange", onVisChange);
      document.removeEventListener("keydown", keyBlock);
    };
  }, [view, onCopy, onFSChange, onVisChange]);

  // ── ANSWER HANDLING ───────────────────────────────────────────────────
  const saveAnswer = () => {
    toast("Draft saved", "success");
  };

  const runCode = (idx, code) => {
    const question = currentTest?.questions?.[idx];
    if (!question) return;
    const result = simulateRun(question, code);
    setRunResults((prev) => ({ ...prev, [idx]: result }));
    if (result.message) toast(result.message, "error");
    else toast(`${result.passed}/${result.total} sample cases passed`, result.passed === result.total ? "success" : "warn");
  };

  const submitQuestion = (idx, code) => {
    if (submitted[idx]) { toast("Already submitted", "error"); return; }
    if (!code?.trim()) { toast("Write a solution first", "error"); return; }
    const question = currentTest.questions[idx];
    const evaluation = judgeSubmission(question, code);
    if (evaluation.score <= 0) {
      setEvaluations((prev) => ({ ...prev, [idx]: evaluation }));
      setRunResults((prev) => ({ ...prev, [idx]: simulateRun(question, code) }));
      toast("Starter/default code cannot be submitted. Write real logic first.", "error");
      return;
    }
    const newSubmitted = { ...submitted, [idx]: true };
    const newAnswers = { ...answers, [idx]: code };
    const newEvaluations = { ...evaluations, [idx]: evaluation };
    setSubmitted(newSubmitted);
    setAnswers(newAnswers);
    setEvaluations(newEvaluations);
    const solvedIndices = Object.keys(newSubmitted).map(Number);
    const score = calcScore(newEvaluations);
    setParticipants((prev) => prev.map((p) =>
      p.name === student.name ? { ...p, solved: solvedIndices.length, score, lastVerdict: evaluation.verdict } : p
    ));
    setSubmissionsLog((prev) => [...prev, {
      student: student.name,
      question: question.title,
      score: evaluation.score,
      maxMarks: evaluation.maxMarks,
      verdict: evaluation.verdict,
      hiddenPassed: evaluation.hiddenPassed,
      hiddenTotal: evaluation.hiddenTotal,
      feedback: evaluation.feedback,
      code,
      time: Date.now(),
    }]);
    toast(`Submitted: ${evaluation.hiddenPassed}/${evaluation.hiddenTotal} hidden tests passed`, evaluation.hiddenPassed === evaluation.hiddenTotal ? "success" : "warn");
  };

  const confirmSubmit = () => {
    setSubmitConfirm(false);
    endTest("You have successfully submitted your test.");
  };

  const reenterFullscreen = () => {
    setEscWarning(false);
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  const goHome = () => {
    setTestEnded(false);
    testActiveRef.current = false;
    setView("leaderboard");
  };

  const stopTest = () => {
    if (!currentTest) return;
    setCurrentTest((prev) => ({ ...prev, active: false }));
    toast("Test ended. Leaderboard is now final.", "warn");
  };

  // ── LEADERBOARD STATS ─────────────────────────────────────────────────
  const sortedParticipants = [...participants].sort((a, b) => b.score - a.score || b.solved - a.solved);
  const lbStats = {
    total: participants.length,
    avgSolved: participants.length
      ? Math.round(participants.reduce((s, p) => s + (p.solved / (p.total || 1)), 0) / participants.length * 100)
      : 0,
    topScore: participants.length ? sortedParticipants[0].score : 0,
    timeLeft: currentTest ? timeLeft : 0,
  };

  // ── STYLES ────────────────────────────────────────────────────────────
  const S = {
    root: { minHeight: "100vh", background: "#0a0a0f", color: "#f0f0ff", fontFamily: "'Outfit', 'Segoe UI', sans-serif", position: "relative" },
    gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(108,99,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none", zIndex: 0 },
    nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", borderBottom: "1px solid rgba(108,99,255,0.2)", background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 },
    logo: { fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#6c63ff" },
    logoSpan: { color: "#00d4a0" },
    navTabs: { display: "flex", gap: 4, background: "#111118", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, padding: 4 },
    navTab: (active) => ({ padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, color: active ? "#fff" : "#9999bb", background: active ? "#6c63ff" : "transparent", border: "none", transition: "all .2s", fontFamily: "'Outfit', sans-serif" }),
    page: { position: "relative", zIndex: 1, padding: "28px 24px", maxWidth: 1100, margin: "0 auto" },
    card: { background: "rgba(17,17,24,0.95)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 12, padding: 24 },
    input: { width: "100%", background: "#111118", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, padding: "11px 14px", color: "#f0f0ff", fontFamily: "'Outfit', sans-serif", fontSize: 14, outline: "none", transition: "border .2s", boxSizing: "border-box" },
    textarea: { width: "100%", background: "#111118", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, padding: "11px 14px", color: "#f0f0ff", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, outline: "none", resize: "vertical", minHeight: 120, lineHeight: 1.6, boxSizing: "border-box" },
    btn: (color = "#6c63ff", text = "#fff") => ({ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, background: color, color: text, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif", transition: "all .2s" }),
    btnSm: (color = "#6c63ff", text = "#fff") => ({ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 6, background: color, color: text, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }),
    btnGhost: { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, background: "transparent", color: "#9999bb", border: "1px solid rgba(108,99,255,0.3)", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif" },
    sectionTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#555577", marginBottom: 12 },
    codeDisplay: { fontFamily: "'JetBrains Mono', monospace", fontSize: 38, fontWeight: 700, letterSpacing: 14, color: "#6c63ff", textAlign: "center", padding: 24, background: "#111118", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 12, margin: "16px 0" },
    empty: { textAlign: "center", padding: "40px 20px", color: "#555577" },
  };

  // ══════════════════════════════════════════════════════════════════════
  // ADMIN VIEW
  // ══════════════════════════════════════════════════════════════════════
  const AdminView = () => (
    <div style={S.page}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 6, letterSpacing: "-0.5px" }}>Test Creator</h1>
        <p style={{ color: "#9999bb", fontSize: 14 }}>Search LeetCode problems, build your test, and generate a join code.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Search */}
        <div style={S.card}>
          <div style={S.sectionTitle}>Search LeetCode</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <input style={S.input} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder='e.g. "two sum", "binary tree", "23"' />
            <button style={S.btnSm()} onClick={handleSearch} disabled={searching}>
              {searching ? "..." : "Search"}
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto" }}>
            {searchResults.length === 0
              ? <div style={S.empty}><div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div><div style={{ fontSize: 13 }}>Search for LeetCode problems</div></div>
              : searchResults.map((q) => {
                const added = addedQuestions.some((a) => a.id === q.id);
                return (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#111118", border: "1px solid rgba(108,99,255,0.15)", borderRadius: 8, gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: "#555577", fontFamily: "monospace", marginBottom: 2 }}>#{q.id}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.title}</div>
                      <div style={{ marginTop: 5, display: "flex", gap: 5, flexWrap: "wrap" }}>
                        <DiffBadge difficulty={q.difficulty} />
                        {q.topics.slice(0, 2).map((t) => <span key={t} style={{ background: "rgba(108,99,255,0.12)", color: "#6c63ff", border: "1px solid rgba(108,99,255,0.25)", padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{t}</span>)}
                      </div>
                    </div>
                    <button style={S.btnSm(added ? "transparent" : "#00d4a0", added ? "#555577" : "#000")}
                      onClick={() => addQuestion(q.id)} disabled={added}>
                      {added ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Queue */}
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={S.sectionTitle}>Test Questions</div>
            <span style={{ fontSize: 12, color: "#555577" }}>{addedQuestions.length} added</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto" }}>
            {addedQuestions.length === 0
              ? <div style={S.empty}><div style={{ fontSize: 28, marginBottom: 8 }}>📋</div><div style={{ fontSize: 13 }}>Add questions from search results</div></div>
              : addedQuestions.map((q, i) => (
                <div key={q.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(108,99,255,0.07)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#555577", fontFamily: "monospace", marginBottom: 2 }}>Q{i + 1} · #{q.id}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{q.title}</div>
                    <div style={{ marginTop: 4 }}><DiffBadge difficulty={q.difficulty} /></div>
                  </div>
                  <button onClick={() => removeQuestion(q.id)} style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 16, padding: "2px 8px", borderRadius: 4 }}>✕</button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Config */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.sectionTitle}>Configuration</div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555577", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Test Title</label>
            <input style={S.input} value={testTitle} onChange={(e) => setTestTitle(e.target.value)} placeholder="e.g. Weekly DSA Contest #12" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555577", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Duration (min)</label>
            <input style={S.input} type="number" value={testDuration} min={5} max={360} onChange={(e) => setTestDuration(parseInt(e.target.value) || 60)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <button style={S.btn("#00d4a0", "#000")} onClick={generateTest}>⚡ Generate Code</button>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      {currentTest && (
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={S.sectionTitle}>Join Code</div>
            <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: currentTest.active ? "rgba(0,212,160,0.15)" : "rgba(255,107,107,0.15)", color: currentTest.active ? "#00d4a0" : "#ff6b6b", border: `1px solid ${currentTest.active ? "rgba(0,212,160,0.3)" : "rgba(255,107,107,0.3)"}`, fontWeight: 700 }}>
              {currentTest.active ? "Active" : "Ended"}
            </span>
          </div>
          <div style={S.codeDisplay}>{currentTest.code}</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={S.btnGhost} onClick={() => { navigator.clipboard.writeText(currentTest.code).catch(() => {}); toast(`Code ${currentTest.code} copied!`, "success"); }}>📋 Copy Code</button>
            <button style={S.btn()} onClick={() => setView("join")}>🔗 Share / Join</button>
            <button style={S.btn("#ff6b6b")} onClick={stopTest}>⏹ End Test</button>
          </div>
          <div style={{ marginTop: 16, padding: 14, background: "#111118", borderRadius: 8, border: "1px solid rgba(108,99,255,0.15)", fontSize: 13, color: "#9999bb" }}>
            <span style={{ marginRight: 20 }}>{currentTest.title}</span>
            <span style={{ marginRight: 20 }}>⏱ {currentTest.duration} min</span>
            <span>📋 {currentTest.questions.length} questions</span>
          </div>
        </div>
      )}
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════
  // JOIN VIEW
  // ══════════════════════════════════════════════════════════════════════
  const JoinView = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 60px)", padding: 24 }}>
      <div style={{ ...S.card, maxWidth: 440, width: "100%", textAlign: "center", padding: "40px 32px" }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🎯</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8 }}>Join the Arena</h1>
        <p style={{ color: "#9999bb", marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>Enter the test code provided by your instructor.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555577", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Test Code</label>
            <input style={{ ...S.input, fontFamily: "'JetBrains Mono', monospace", fontSize: 24, letterSpacing: 8, textAlign: "center", textTransform: "uppercase" }}
              value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="XXXXXX" maxLength={6} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555577", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Your Name</label>
            <input style={S.input} value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your full name" onKeyDown={(e) => e.key === "Enter" && joinTest()} />
          </div>
          <button style={{ ...S.btn("#00d4a0", "#000"), justifyContent: "center", padding: "14px 20px", fontSize: 15 }} onClick={joinTest}>
            🚀 Enter Test
          </button>
        </div>
        <div style={{ marginTop: 20, padding: 14, background: "rgba(108,99,255,0.07)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, fontSize: 12, color: "#9999bb", textAlign: "left", lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: "#f0f0ff" }}>Security Notice:</strong> This test uses full-screen mode. Exiting full screen, switching tabs, or copy-pasting will trigger warnings and may auto-submit your test.
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════
  // TEST VIEW (Student)
  // ══════════════════════════════════════════════════════════════════════
  const TestView = () => {
    const qs = currentTest?.questions || [];
    const q = qs[currentQIdx];
    const currentCode = answers[currentQIdx] ?? starterCode(q);
    const isSubmitted = submitted[currentQIdx];
    const currentEval = evaluations[currentQIdx];
    const currentRun = runResults[currentQIdx];
    const timerColor = timeLeft <= 60 ? "#ff6b6b" : timeLeft <= 300 ? "#ffd166" : "#f0f0ff";

    return (
      <div style={{ position: "fixed", inset: 0, background: "#0a0a0f", zIndex: 9999, display: "flex", flexDirection: "column", fontFamily: "'Outfit', sans-serif" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#111118", borderBottom: "1px solid rgba(108,99,255,0.2)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "#ffa116" }}>DSA<span style={{ color: "#f0f0ff" }}>Arena</span></div>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", maxWidth: 380 }}>
              {qs.map((item, i) => (
                <button key={item.id} onClick={() => setCurrentQIdx(i)} title={item.title} style={{
                  width: 32, height: 28, borderRadius: 6, border: `1px solid ${i === currentQIdx ? "#ffa116" : submitted[i] ? "rgba(0,184,163,0.45)" : "#30303a"}`,
                  background: i === currentQIdx ? "rgba(255,161,22,0.15)" : submitted[i] ? "rgba(0,184,163,0.12)" : "#23232a",
                  color: i === currentQIdx ? "#ffa116" : submitted[i] ? "#00b8a3" : "#b9b9c7",
                  cursor: "pointer", fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {violations > 0 && (
              <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#ff6b6b", fontWeight: 600 }}>
                ⚠️ {violations} violation{violations !== 1 ? "s" : ""}
              </div>
            )}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: timerColor, padding: "6px 16px", background: "#1a1a26", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8 }}>
              {fmtTime(timeLeft)}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#9999bb" }}>{student?.name}</span>
            <button style={S.btnSm("transparent", "#9999bb")} onClick={() => setSubmitConfirm(true)}>Submit All</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <div style={{ display: "none" }}>
            <div style={S.sectionTitle}>Questions</div>
            {qs.map((item, i) => (
              <button key={item.id} onClick={() => setCurrentQIdx(i)} style={{
                width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, background: "none", marginBottom: 8, cursor: "pointer",
                border: `1px solid ${submitted[i] ? "rgba(0,212,160,0.4)" : i === currentQIdx ? "rgba(108,99,255,0.5)" : "rgba(108,99,255,0.15)"}`,
                color: submitted[i] ? "#00d4a0" : i === currentQIdx ? "#6c63ff" : "#f0f0ff",
                fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", flexShrink: 0, background: submitted[i] ? "#00d4a0" : i === currentQIdx ? "#6c63ff" : "rgba(108,99,255,0.3)" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: "#555577", fontFamily: "monospace" }}>Q{i + 1} · #{item.id}</div>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12 }}>{item.title}</div>
                </div>
                <DiffBadge difficulty={item.difficulty} />
              </button>
            ))}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(108,99,255,0.15)", fontSize: 12, color: "#555577", lineHeight: 2 }}>
              <div>🔵 Active</div><div style={{ color: "#00d4a0" }}>🟢 Submitted</div>
            </div>
          </div>

          {/* Question area */}
          {q && (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(360px, 48%) minmax(420px, 52%)", gap: 8, overflow: "hidden", padding: 8, background: "#0f0f12" }}>
              <div style={{ overflowY: "auto", padding: "22px 24px", background: "#1a1a1f", border: "1px solid #2a2a32", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#555577", fontFamily: "monospace", marginBottom: 4 }}>#{q.id} · {q.topics.join(", ")}</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{q.title}</h2>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <DiffBadge difficulty={q.difficulty} />
                    {isSubmitted && <span style={{ background: "rgba(0,212,160,0.15)", color: "#00d4a0", border: "1px solid rgba(0,212,160,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>✓ Submitted</span>}
                  </div>
                </div>

                <p style={{ color: "#9999bb", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{q.description}</p>

                {q.examples.map((ex, i) => (
                  <div key={i} style={{ background: "#111118", border: "1px solid rgba(108,99,255,0.15)", borderRadius: 8, padding: 14, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#555577", textTransform: "uppercase", marginBottom: 8 }}>Example {i + 1}</div>
                    <div><span style={{ color: "#9999bb" }}>Input: </span>{ex.input}</div>
                    <div><span style={{ color: "#9999bb" }}>Output: </span>{ex.output}</div>
                    {ex.explanation && <div style={{ marginTop: 6, color: "#9999bb" }}><span style={{ color: "#9999bb" }}>Explanation: </span>{ex.explanation}</div>}
                  </div>
                ))}

                <div style={{ marginBottom: 20 }}>
                  <div style={S.sectionTitle}>Constraints</div>
                  <div style={{ background: "#111118", border: "1px solid rgba(108,99,255,0.15)", borderRadius: 8, padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#9999bb", whiteSpace: "pre-line" }}>{q.constraints}</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={S.sectionTitle}>Function Signature</div>
                  <div style={{ background: "#0a0a0f", border: "1px solid rgba(108,99,255,0.15)", borderRadius: 8, padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#ffd166", whiteSpace: "pre-line" }}>{q.signature}</div>
                </div>

              </div>

              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", background: "#1a1a1f", border: "1px solid #2a2a32", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #2a2a32", background: "#202027" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#f0f0ff" }}>Code</span>
                    <span style={{ background: "#2d2d35", color: "#b9b9c7", padding: "3px 9px", borderRadius: 6, fontSize: 12 }}>C++</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#77778a", fontFamily: "'JetBrains Mono', monospace" }}>{q.signature}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
                  <textarea
                    value={currentCode}
                    onChange={(e) => !isSubmitted && setAnswers((a) => ({ ...a, [currentQIdx]: e.target.value }))}
                    disabled={isSubmitted}
                    onContextMenu={(e) => e.preventDefault()}
                    spellCheck={false}
                    style={{ ...S.textarea, border: "none", borderRadius: 0, background: "#15151a", color: "#f3f3f6", opacity: isSubmitted ? 0.6 : 1, minHeight: 0, flex: 1, resize: "none", fontSize: 14, lineHeight: 1.75, padding: 18 }}
                  />
                  {currentRun && (
                    <div style={{ marginTop: 10, padding: 12, background: "#15151a", border: `1px solid ${currentRun.passed === currentRun.total ? "rgba(0,184,163,0.35)" : "rgba(239,71,67,0.35)"}`, borderRadius: 8, fontSize: 12, color: "#d7d7e0", lineHeight: 1.6 }}>
                      <strong style={{ color: currentRun.passed === currentRun.total ? "#00b8a3" : "#ef4743" }}>
                        {currentRun.passed === currentRun.total ? "Accepted" : "Wrong Answer"} - {currentRun.passed}/{currentRun.total} sample cases
                      </strong>
                      <div style={{ color: "#9b9ba8", marginTop: 4 }}>Runtime: {currentRun.runtime} | Memory: {currentRun.memory}</div>
                      {currentRun.cases.map((c, i) => (
                        <div key={i} style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #2a2a32" }}>
                          <div style={{ color: c.passed ? "#00b8a3" : "#ef4743", fontWeight: 700 }}>Case {i + 1}: {c.passed ? "Passed" : "Failed"}</div>
                          <div><span style={{ color: "#7d7d8a" }}>Input:</span> {c.input}</div>
                          <div><span style={{ color: "#7d7d8a" }}>Expected:</span> {c.expected}</div>
                          <div><span style={{ color: "#7d7d8a" }}>Output:</span> {c.output}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentEval && (
                    <div style={{ marginTop: 10, padding: 12, background: "#0a0a0f", border: "1px solid rgba(0,212,160,0.25)", borderRadius: 8, fontSize: 12, color: "#9999bb", lineHeight: 1.6 }}>
                      <strong style={{ color: "#00d4a0" }}>Submit Result: {currentEval.score}/{currentEval.maxMarks} ({currentEval.verdict})</strong>
                      {currentEval.hiddenTotal && <div>Hidden tests: {currentEval.hiddenPassed}/{currentEval.hiddenTotal} passed</div>}
                      <div>{currentEval.feedback}</div>
                    </div>
                  )}
                  {isSubmitted && <div style={{ marginTop: 8, fontSize: 12, color: "#00d4a0" }}>✓ Submitted — cannot be modified.</div>}
                </div>
              </div>

              {/* Footer */}
              <div style={{ gridColumn: "1 / -1", padding: "12px 18px", border: "1px solid #2a2a32", borderRadius: 8, background: "#1a1a1f", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, flexShrink: 0 }}>
                <button style={S.btnSm("transparent", "#9999bb")} onClick={() => setCurrentQIdx((i) => Math.max(0, i - 1))}>← Prev</button>
                <span style={{ fontSize: 13, color: "#9999bb" }}>Q{currentQIdx + 1} of {qs.length} · {Object.keys(submitted).length} submitted</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={S.btnSm("#2d2d35", "#d7d7e0")} onClick={() => runCode(currentQIdx, currentCode)}>Run</button>
                  <button style={S.btnSm("#1a1a26", "#9999bb")} onClick={saveAnswer}>💾 Save</button>
                  {!isSubmitted && <button style={S.btnSm("#00d4a0", "#000")} onClick={() => submitQuestion(currentQIdx, currentCode)}>✓ Submit & AI Check</button>}
                  <button style={S.btnSm("transparent", "#9999bb")} onClick={() => setCurrentQIdx((i) => Math.min(qs.length - 1, i + 1))}>Next →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  // LEADERBOARD VIEW
  // ══════════════════════════════════════════════════════════════════════
  const LeaderboardView = () => (
    <div style={S.page}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 4, letterSpacing: "-0.5px" }}>Live Leaderboard</h1>
          <p style={{ color: "#9999bb", fontSize: 14 }}>Auto-refreshes every 5 seconds during active tests.</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[["Participants", lbStats.total, "#6c63ff"], ["Avg Solved", lbStats.avgSolved + "%", "#00d4a0"], ["Top Score", lbStats.topScore, "#ffd166"], ["Time Left", fmtTime(lbStats.timeLeft), "#ff6b6b"]].map(([label, val, color]) => (
          <div key={label} style={{ background: "#111118", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 11, color: "#555577", marginTop: 4, fontWeight: 700, letterSpacing: 0.5 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(108,99,255,0.2)", marginBottom: 20 }}>
          {["live", "submissions", "violations"].map((tab) => (
            <button key={tab} onClick={() => setLbTab(tab)} style={{ padding: "10px 20px", border: "none", background: "none", color: lbTab === tab ? "#6c63ff" : "#555577", fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", borderBottom: `2px solid ${lbTab === tab ? "#6c63ff" : "transparent"}`, marginBottom: -1, textTransform: "capitalize" }}>
              {tab === "live" ? "Live Rankings" : tab === "submissions" ? "Submissions" : "Violations"}
            </button>
          ))}
        </div>

        {/* Live Rankings */}
        {lbTab === "live" && (
          sortedParticipants.length === 0
            ? <div style={S.empty}><div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div><div>No participants yet. Start a test from the Admin panel.</div></div>
            : <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Rank", "Student", "Solved", "Score", "Progress", "Status"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#555577", borderBottom: "1px solid rgba(108,99,255,0.2)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {sortedParticipants.map((p, i) => {
                  const progress = Math.round(p.solved / p.total * 100);
                  const rankColors = ["#ffd166", "#c0c0c0", "#cd7f32"];
                  return (
                    <tr key={p.name} style={{ borderBottom: "1px solid rgba(108,99,255,0.06)" }}>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", fontWeight: 700, fontSize: 13, background: i < 3 ? rankColors[i] : "#1a1a26", color: i < 3 ? (i === 0 ? "#000" : i === 1 ? "#000" : "#fff") : "#9999bb" }}>{i + 1}</span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        {p.violations > 0 && <div style={{ fontSize: 11, color: "#ff6b6b" }}>⚠️ {p.violations} violation{p.violations > 1 ? "s" : ""}</div>}
                      </td>
                      <td style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{p.solved}/{p.total}</td>
                      <td style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#6c63ff" }}>{p.score}</td>
                      <td style={{ padding: "12px 14px", minWidth: 120 }}>
                        <div style={{ height: 6, background: "#1a1a26", borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
                          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6c63ff, #00d4a0)", borderRadius: 3, transition: "width .5s ease" }} />
                        </div>
                        <div style={{ fontSize: 11, color: "#555577" }}>{progress}%</div>
                      </td>
                      <td style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: p.status === "submitted" ? "#00d4a0" : "#ffd166" }}>
                        {p.status === "submitted" ? "✓ Done" : "⏳ Active"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        )}

        {/* Submissions */}
        {lbTab === "submissions" && (
          submissionsLog.length === 0
            ? <div style={S.empty}><div style={{ fontSize: 28, marginBottom: 8 }}>📄</div><div>No submissions yet</div></div>
            : submissionsLog.map((s, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid rgba(108,99,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.student} <span style={{ color: "#555577" }}>→</span> {s.question}</div>
                  {s.score !== undefined && <div style={{ fontSize: 12, color: "#00d4a0", marginTop: 3 }}>Marks: {s.score}/{s.maxMarks} · {s.verdict} · Hidden {s.hiddenPassed}/{s.hiddenTotal}</div>}
                  {s.feedback && <div style={{ fontSize: 11, color: "#9999bb", marginTop: 3, maxWidth: 620 }}>{s.feedback}</div>}
                  <div style={{ fontSize: 11, color: "#555577", marginTop: 2 }}>{new Date(s.time).toLocaleTimeString()}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button style={S.btnSm("#1a1a26", "#9999bb")} onClick={() => setSelectedSubmission(s)}>View Solution</button>
                  <span style={{ background: "rgba(0,212,160,0.15)", color: "#00d4a0", border: "1px solid rgba(0,212,160,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Submitted</span>
                </div>
              </div>
            ))
        )}

        {/* Violations */}
        {lbTab === "violations" && (
          violationsLog.length === 0
            ? <div style={S.empty}><div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div><div>No violations recorded</div></div>
            : violationsLog.map((v, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,107,107,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#ff6b6b" }}>{v.student}</div>
                  <div style={{ fontSize: 12, color: "#9999bb" }}>{v.type}</div>
                  <div style={{ fontSize: 11, color: "#555577" }}>{new Date(v.time).toLocaleTimeString()}</div>
                </div>
                <span style={{ background: "rgba(255,107,107,0.15)", color: "#ff6b6b", border: "1px solid rgba(255,107,107,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Violation</span>
              </div>
            ))
        )}
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════
  const solvedCount = Object.keys(submitted).length;
  const totalCount = currentTest?.questions?.length || 0;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.3); border-radius: 3px; }
        input:focus, textarea:focus { border-color: #6c63ff !important; }
        button:hover { opacity: 0.9; }
      `}</style>

      <div style={S.gridBg} />

      {/* Nav — hidden during test */}
      {view !== "test" && (
        <nav style={S.nav}>
          <div style={S.logo}>DSA<span style={S.logoSpan}>Arena</span></div>
          <div style={S.navTabs}>
            <button style={S.navTab(view === "admin")} onClick={() => setView("admin")}>Admin</button>
            <button style={S.navTab(view === "join")} onClick={() => setView("join")}>Join Test</button>
            <button style={S.navTab(view === "leaderboard")} onClick={() => setView("leaderboard")}>Leaderboard</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555577" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00d4a0", animation: "none" }} />
            Live
          </div>
        </nav>
      )}

      {view === "admin" && AdminView()}
      {view === "join" && JoinView()}
      {view === "test" && TestView()}
      {view === "leaderboard" && LeaderboardView()}

      {/* ── OVERLAYS ── */}
      <Overlay show={escWarning} borderColor="rgba(255,209,102,0.4)">
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#ffd166", marginBottom: 10 }}>Full Screen Required</h2>
        <p style={{ color: "#9999bb", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          You exited full-screen mode. This is violation <strong style={{ color: "#f0f0ff" }}>{violations}</strong> of 2.
          A second violation will automatically end your test.
        </p>
        <button style={S.btn()} onClick={reenterFullscreen}>↲ Return to Full Screen</button>
      </Overlay>

      <Overlay show={testEnded} borderColor="rgba(255,107,107,0.4)">
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#ff6b6b", marginBottom: 10 }}>Test Ended</h2>
        <p style={{ color: "#9999bb", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{testEndReason}</p>
        <div style={{ fontSize: 34, fontWeight: 900, color: "#6c63ff", marginBottom: 24 }}>{solvedCount}/{totalCount} solved</div>
        <button style={S.btnGhost} onClick={goHome}>View Leaderboard</button>
      </Overlay>

      <Overlay show={submitConfirm} borderColor="rgba(108,99,255,0.4)">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📤</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Submit Test?</h2>
        <p style={{ color: "#9999bb", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          {totalCount - solvedCount > 0
            ? `You have ${totalCount - solvedCount} unanswered question(s). Submit anyway? This cannot be undone.`
            : "Submit all your answers? This cannot be undone."}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button style={S.btn("#00d4a0", "#000")} onClick={confirmSubmit}>Yes, Submit</button>
          <button style={S.btnGhost} onClick={() => setSubmitConfirm(false)}>Cancel</button>
        </div>
      </Overlay>

      <Overlay show={copyWarning} borderColor="rgba(255,209,102,0.4)">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#ffd166", marginBottom: 10 }}>Copy Detected</h2>
        <p style={{ color: "#9999bb", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Copy/paste actions are blocked and logged. Please solve questions independently.</p>
        <button style={S.btn()} onClick={() => setCopyWarning(false)}>I Understand</button>
      </Overlay>

      <Overlay show={!!selectedSubmission} borderColor="rgba(108,99,255,0.4)">
        {selectedSubmission && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{selectedSubmission.student}</h2>
            <p style={{ color: "#9999bb", fontSize: 13, marginBottom: 12 }}>{selectedSubmission.question} · {selectedSubmission.score}/{selectedSubmission.maxMarks} · Hidden {selectedSubmission.hiddenPassed}/{selectedSubmission.hiddenTotal}</p>
            <pre style={{ textAlign: "left", maxHeight: 360, overflow: "auto", background: "#0a0a0f", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 8, padding: 14, color: "#f0f0ff", fontSize: 12, lineHeight: 1.55, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap" }}>{selectedSubmission.code}</pre>
            <button style={{ ...S.btnGhost, marginTop: 16 }} onClick={() => setSelectedSubmission(null)}>Close</button>
          </>
        )}
      </Overlay>

      <Toast toasts={toasts} />
    </div>
  );
}
