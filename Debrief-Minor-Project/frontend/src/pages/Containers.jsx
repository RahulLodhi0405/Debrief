// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── DATA ───────────────────────────────────────────────────────────────────

const containerData = {
  vector: {
    title: "vector<T>",
    category: "Sequence Container",
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "V",
    tags: ["Dynamic Array", "Contiguous Memory", "Random Access"],
    complexity: [
      { label: "Access", value: "O(1)", color: "#1D9E75" },
      { label: "push_back", value: "O(1)*", color: "#1D9E75" },
      { label: "Insert mid", value: "O(n)", color: "#A32D2D" },
    ],
    theory: `A vector is a dynamic array that resizes automatically. Elements are stored in contiguous memory — just like a normal array — which makes indexed access blazing fast.

When the vector runs out of space, it doubles its capacity (amortized growth), so push_back is O(1) on average. Inserting or deleting in the middle requires shifting elements, which costs O(n).

Key properties:
• Contiguous memory → excellent cache performance
• Random access in O(1) using index operator []
• push_back is O(1) amortized (rare O(n) on resize)
• Insert/delete in middle is O(n) due to shifting`,
    syntax: `#include <vector>
using namespace std;

// Declaration
vector<int> v;               // empty vector
vector<int> v(5, 0);         // size 5, all zeros
vector<int> v = {1, 2, 3};  // initialized

// Common operations
v.push_back(10);      // add to end
v.pop_back();         // remove from end
v.size();             // number of elements
v.empty();            // true if size == 0
v.clear();            // remove all elements
v[2];                 // access index 2 (no bounds check)
v.at(2);              // safe access (throws if out of range)
v.front();            // first element
v.back();             // last element
v.resize(10);         // change size to 10
v.reserve(100);       // pre-allocate capacity
sort(v.begin(), v.end());   // sort ascending
reverse(v.begin(), v.end()); // reverse in-place`,
    examples: [
      {
        title: "Basics & Iteration",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9};

    v.push_back(2);   // v = {3,1,4,1,5,9,2}
    v.pop_back();     // v = {3,1,4,1,5,9}

    // Range-based for loop
    for (int x : v)
        cout << x << " ";

    sort(v.begin(), v.end());
    cout << "\\nMin: " << v.front();
    cout << " Max: " << v.back();
    // Output: Min: 1  Max: 9
}`,
      },
    ],
    tip: "Use reserve(n) before a push_back loop to avoid repeated reallocations — can be 2–3x faster in tight loops.",
    // problems: [
    //   {
    //     title: "Find Maximum & Minimum",
    //     desc: "Find max and min in a vector without sorting. Use a single loop for O(n) solution.",
    //     diff: "Easy",
    //   },
    //   {
    //     title: "Remove Duplicates (Sorted)",
    //     desc: "Remove all duplicate elements from a sorted vector in-place. {1,1,2,3,3} → {1,2,3}.",
    //     diff: "Easy",
    //   },
    //   {
    //     title: "Rotate Array",
    //     desc: "Rotate a vector of n elements to the right by k steps. {1,2,3,4,5}, k=2 → {4,5,1,2,3}.",
    //     diff: "Medium",
    //   },
    //   {
    //     title: "Subarray with Max Sum",
    //     desc: "Find the contiguous subarray with the largest sum using Kadane's algorithm. O(n) expected.",
    //     diff: "Medium",
    //   },
    //   {
    //     title: "Matrix Spiral Order",
    //     desc: "Given a 2D vector (m×n), print all elements in clockwise spiral order from top-left.",
    //     diff: "Hard",
    //   },
    // ],
  },

  set: {
    title: "set<T>",
    category: "Associative Container",
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "S",
    tags: ["Unique Elements", "Always Sorted", "Red-Black Tree"],
    complexity: [
      { label: "Insert", value: "O(log n)", color: "#BA7517" },
      { label: "Find", value: "O(log n)", color: "#BA7517" },
      { label: "Erase", value: "O(log n)", color: "#BA7517" },
    ],
    theory: `A set automatically keeps elements sorted and unique. Internally it is a Red-Black Tree (a self-balancing BST), so all core operations take O(log n). When you insert a duplicate — nothing happens silently.

Key properties:
• No duplicates — inserting the same value twice has no effect
• Elements always in ascending order (or custom comparator)
• Insert, erase, find all cost O(log n)
• Supports lower_bound and upper_bound for range queries
• Use set<int, greater<int>> for descending order`,
    syntax: `#include <set>
using namespace std;

set<int> s;
set<int, greater<int>> desc;  // descending order

s.insert(10);
s.insert(5);
s.insert(10);     // ignored, already exists

s.erase(5);       // remove element 5
s.count(10);      // 1 if exists, 0 if not
s.find(10);       // iterator to element (or s.end())
s.size();         // number of elements
s.empty();        // true if empty
s.clear();        // remove all

// Iteration (always sorted)
for (int x : s) cout << x << " ";

// Range queries
auto it = s.lower_bound(7);  // first element >= 7
auto it2 = s.upper_bound(7); // first element > 7`,
    examples: [
      {
        title: "Remove duplicates from array",
        code: `vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
set<int> s(v.begin(), v.end());
// s = {1, 2, 3, 4, 5, 6, 9}  (sorted, unique)

for (int x : s)
    cout << x << " ";
// Output: 1 2 3 4 5 6 9`,
      },
    ],
    tip: "Use s.count(x) instead of s.find(x) != s.end() — it is shorter and equally fast.",
  },

  unordered_set: {
    title: "unordered_set<T>",
    category: "Associative Container",
    color: "#854F0B",
    bg: "#FAEEDA",
    icon: "US",
    tags: ["Hash Table", "Unique Elements", "Unordered"],
    complexity: [
      { label: "Insert avg", value: "O(1)", color: "#1D9E75" },
      { label: "Find avg", value: "O(1)", color: "#1D9E75" },
      { label: "Worst case", value: "O(n)", color: "#A32D2D" },
    ],
    theory: `An unordered_set is like a set but uses a hash table internally instead of a tree. This makes lookup and insert O(1) on average — much faster than set's O(log n). The trade-off: elements are in no particular order.

Key properties:
• Average O(1) for insert, find, erase — great for frequent lookups
• Worst case O(n) if many hash collisions occur
• Does NOT support lower_bound / upper_bound
• Use set when you need sorted order; use unordered_set for raw speed
• Cannot store custom types without a custom hash function`,
    syntax: `#include <unordered_set>
using namespace std;

unordered_set<int> us;

us.insert(10);
us.insert(20);
us.insert(10);   // ignored, already exists

us.count(10);    // 1 (exists)
us.erase(20);    // remove 20
us.size();       // 1

// Initialize from vector (removes duplicates)
vector<int> v = {1, 2, 2, 3, 3};
unordered_set<int> us2(v.begin(), v.end());
// us2 = {1, 2, 3} in some order

// Check existence
if (us.count(10))
    cout << "Found!";`,
    examples: [
      {
        title: "Remove duplicates from array",
        code: `vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5};
set<int> s(v.begin(), v.end());
// s = {1, 2, 3, 4, 5, 6, 9}  (sorted, unique)

for (int x : s)
    cout << x << " ";
// Output: 1 2 3 4 5 6 9`,
      },
    ],
    tip: "Prefer unordered_set when you only need existence checks and don't need sorted order. It is usually 3–5x faster than set.",
    problems: [
      {
        title: "Contains Duplicate",
        desc: "Return true if any value appears at least twice in an integer array. O(n) solution required.",
        diff: "Easy",
      },
      {
        title: "Happy Number",
        desc: "Detect if a number is 'happy' by repeatedly replacing it with the sum of squares of its digits. Detect the cycle using unordered_set.",
        diff: "Easy",
      },
      {
        title: "Longest Consecutive Sequence",
        desc: "Find the longest sequence of consecutive integers in an unsorted array. Classic O(n) solution with unordered_set.",
        diff: "Medium",
      },
      {
        title: "Word Pattern",
        desc: "Given pattern 'abba' and string 'dog cat cat dog', check if they follow the same mapping. Use two unordered_sets.",
        diff: "Medium",
      },
    ],
  },

  map: {
    title: "map<K, V>",
    category: "Associative Container",
    color: "#993556",
    bg: "#FBEAF0",
    icon: "M",
    tags: ["Key-Value", "Sorted Keys", "Unique Keys"],
    complexity: [
      { label: "Insert", value: "O(log n)", color: "#BA7517" },
      { label: "Lookup", value: "O(log n)", color: "#BA7517" },
      { label: "Delete", value: "O(log n)", color: "#BA7517" },
    ],
    theory: `A map stores pairs of (key → value) where keys are always unique and sorted. Think of it as a dictionary that keeps entries in alphabetical/ascending order. Accessing a key that doesn't exist with mp[key] automatically creates it with a default value (0 for int).

Key properties:
• Keys are unique — setting mp[key] twice just overwrites the value
• Keys are always in sorted (ascending) order during iteration
• mp[key] creates the key if it doesn't exist — use count() to check first
• Useful for frequency counting, grouping, and prefix problems
• Internally a Red-Black Tree — same O(log n) as set`,
    syntax: `#include <map>
using namespace std;

map<string, int> mp;

mp["apple"] = 3;    // insert or update
mp["banana"] = 1;
mp["apple"]++;      // mp["apple"] = 4

mp.count("mango");  // 0 (doesn't exist)
mp.erase("banana"); // remove key
mp.size();          // number of key-value pairs

// Safe access — check before using []
if (mp.count("key"))
    cout << mp["key"];

// Iterate (sorted by key)
for (auto& [key, val] : mp)
    cout << key << ": " << val << "\\n";

// Lower/upper bound on keys
auto it = mp.lower_bound("b"); // first key >= "b"`,
    examples: [
      {
        title: "Character Frequency Counter",
        code: `string s = "hello world";
map<char, int> freq;
for (char c : s) freq[c]++;
// Prints characters in alphabetical order
for (auto& [c, cnt] : freq)
    cout << c << ": " << cnt << "\\n";
//   : 1
// d: 1  e: 1  h: 1  l: 3  o: 2  r: 1  w: 1`,
      },
    ],
    tip: "Never use mp[key] to check existence — it inserts a default value! Use mp.count(key) or mp.find(key) instead.",
  },

  unordered_map: {
    title: "unordered_map<K, V>",
    category: "Associative Container",
    color: "#993C1D",
    bg: "#FAECE7",
    icon: "UM",
    tags: ["Hash Table", "Key-Value", "O(1) Average"],
    complexity: [
      { label: "Insert avg", value: "O(1)", color: "#1D9E75" },
      { label: "Lookup avg", value: "O(1)", color: "#1D9E75" },
      { label: "Worst case", value: "O(n)", color: "#A32D2D" },
    ],
    theory: `unordered_map is like a map but uses a hash table instead of a tree. This gives average O(1) for lookups, insertions, and deletions. The keys are in no particular order — don't iterate expecting sorted output.

Key properties:
• Best choice when you need fast frequency counting or key lookups
• Average O(1) — worst case O(n) due to hash collisions
• No ordering — cannot use lower_bound / upper_bound
• Custom hash needed for pair or custom struct keys
• In competitive programming, unordered_map is used more often than map`,
    syntax: `#include <unordered_map>
using namespace std;

unordered_map<string, int> ump;

ump["a"] = 1;
ump["b"] = 2;
ump["a"]++;   // ump["a"] = 2

ump.count("c");   // 0 (doesn't exist)
ump.erase("b");   // remove key "b"
ump.size();       // 1

// Iterate (order not guaranteed)
for (auto& [key, val] : ump)
    cout << key << " -> " << val << "\\n";

// Safe check before access
if (ump.find("a") != ump.end())
    cout << ump["a"];`,
    examples: [
      {
        title: "Character Frequency Counter",
        code: `string s = "hello world";
unordered_map<char, int> freq;
for (char c : s) freq[c]++;
// Prints characters in alphabetical order
for (auto& [c, cnt] : freq)
    cout << c << ": " << cnt << "\\n";
//   : 1
// d: 1  e: 1  h: 1  l: 3  o: 2  r: 1  w: 1`,
      },
    ],
    tip: "This is the go-to container for competitive programming. When in doubt between map and unordered_map — pick unordered_map for speed unless you need sorted keys.",
  },

  pair: {
    title: "pair<T1, T2>",
    category: "Utility",
    color: "#534AB7",
    bg: "#EEEDFE",
    icon: "P",
    tags: ["Two Values", "Comparable", "Utility Type"],
    complexity: [
      { label: "Access", value: "O(1)", color: "#1D9E75" },
      { label: "Compare", value: "O(1)", color: "#1D9E75" },
      { label: "Sort (n pairs)", value: "O(n log n)", color: "#BA7517" },
    ],
    theory: `A pair is a simple container that holds exactly two values of any (possibly different) types. Access them as .first and .second. Pairs are comparable — they compare lexicographically (first by first, then by second).

Key properties:
• Used everywhere: map stores pair<Key,Value> internally
• Comparable by default — can be sorted in a vector
• make_pair(a, b) or {a, b} both work (modern C++)
• Nest pairs for 3+ values: pair<int, pair<int,int>>
• Foundation of graph algorithms — edges, Dijkstra nodes, etc.`,
    syntax: `#include <utility>  // or bits/stdc++.h
using namespace std;

pair<int, int> p = {3, 7};
p.first;   // 3
p.second;  // 7

// Equivalent ways to create
auto p1 = make_pair(1, 2);
pair<string, int> p2 = {"alice", 90};

// Sorting a vector of pairs
vector<pair<int,int>> edges = {{3,1},{1,2},{2,5}};
sort(edges.begin(), edges.end());
// Sorted by first, then second: {{1,2},{2,5},{3,1}}

// Sort by second element (descending)
sort(edges.begin(), edges.end(),
    [](auto& a, auto& b) {
        return a.second > b.second;
    });`,
    examples: [
      {
        title: "Basic pair creation",
        code: `pair<int, string> p = {1, "apple"};
  cout << p.first << " " << p.second << "\n";`,
      },
    ],
    tip: "Use structured bindings (auto& [first, second]) in C++17 for cleaner pair iteration — much more readable than .first / .second everywhere.",
  },
};

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Sora:wght@400;500;600;700&display=swap');

  .cpp-app * { box-sizing: border-box; margin: 0; padding: 0; }

  .cpp-app {
    font-family: 'Sora', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
  }

  /* ── Sidebar ── */
  .cpp-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #1e293b;
    border-right: 1px solid #334155;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .cpp-sidebar-logo {
    padding: 1.25rem;
    border-bottom: 1px solid #334155;
  }

  .cpp-sidebar-logo h2 {
    font-size: 13px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: -0.2px;
  }

  .cpp-sidebar-logo p {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
  }

  .cpp-back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0.75rem 1rem;
    padding: 7px 12px;
    background: transparent;
    border: 1px solid #334155;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    transition: all 0.15s;
    text-align: left;
    width: calc(100% - 2rem);
  }
  .cpp-back-btn:hover { background: #334155; color: #f1f5f9; }

  .cpp-nav-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #475569;
    padding: 0.75rem 1rem 0.25rem;
  }

  .cpp-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 1rem;
    cursor: pointer;
    font-size: 13px;
    color: #94a3b8;
    border-left: 2px solid transparent;
    transition: all 0.15s;
    font-family: 'Sora', sans-serif;
    background: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    width: 100%;
    text-align: left;
  }
  .cpp-nav-item:hover { background: #334155; color: #f1f5f9; }
  .cpp-nav-item.active {
    background: #0f172a;
    color: #f1f5f9;
    font-weight: 600;
    border-left-color: #378ADD;
  }

  .cpp-nav-icon {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ── Main ── */
  .cpp-main {
    flex: 1;
    min-width: 0;
    padding: 2rem;
    overflow-y: auto;
  }

  /* ── Page Header ── */
  .cpp-page-header { margin-bottom: 2rem; }

  .cpp-breadcrumb {
    font-size: 11px;
    color: #475569;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cpp-page-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #f1f5f9;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.5rem;
  }

  .cpp-page-subtitle {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
    max-width: 600px;
  }

  .cpp-tags { display: flex; gap: 6px; margin-top: 0.75rem; flex-wrap: wrap; }
  .cpp-tag {
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #334155;
    color: #64748b;
    background: #1e293b;
  }

  /* ── Cards ── */
  .cpp-grid { display: grid; gap: 1.25rem; }

  .cpp-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    overflow: hidden;
  }

  .cpp-card-header {
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid #334155;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cpp-card-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .cpp-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .cpp-card-body { padding: 1.25rem; }

  /* ── Theory ── */
  .cpp-theory {
    font-size: 14px;
    line-height: 1.8;
    color: #94a3b8;
    white-space: pre-line;
  }

  .cpp-divider { height: 1px; background: #334155; margin: 1.25rem 0; }

  /* ── Complexity ── */
  .cpp-complexity-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 1rem;
  }

  .cpp-complexity-card {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.75rem;
    text-align: center;
  }

  .cpp-complexity-label { font-size: 11px; color: #475569; margin-bottom: 4px; }
  .cpp-complexity-value {
    font-size: 15px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── Code ── */
  pre.cpp-code {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    font-size: 13px;
    line-height: 1.75;
    overflow-x: auto;
    color: #e2e8f0;
    font-family: 'JetBrains Mono', monospace;
    white-space: pre;
  }

  .cpp-example-title {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cpp-example-title::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 14px;
    background: #378ADD;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── Tip Box ── */
  .cpp-tip {
    background: #1a2744;
    border: 1px solid #1e3a5f;
    border-radius: 8px;
    padding: 0.875rem 1rem;
    font-size: 13px;
    color: #93c5fd;
    line-height: 1.6;
    margin-top: 1.25rem;
  }

  /* ── Methods Grid ── */
  .cpp-methods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 1rem; }

  .cpp-method-item {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.75rem;
  }

  .cpp-method-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #38bdf8;
    margin-bottom: 3px;
  }

  .cpp-method-desc { font-size: 12px; color: #64748b; }

  /* ── Problems ── */
  .cpp-problems-list { display: grid; gap: 10px; }

  .cpp-problem-item {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .cpp-problem-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1e293b;
    border: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
  }

  .cpp-problem-content { flex: 1; }

  .cpp-problem-title {
    font-size: 13px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 3px;
  }

  .cpp-problem-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  .cpp-diff {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 20px;
    flex-shrink: 0;
    margin-top: 1px;
    letter-spacing: 0.3px;
  }

  .cpp-diff-Easy    { background: #14532d; color: #86efac; }
  .cpp-diff-Medium  { background: #78350f; color: #fcd34d; }
  .cpp-diff-Hard    { background: #7f1d1d; color: #fca5a5; }

  /* ── Home ── */
  .cpp-home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 2rem;
  }

  .cpp-container-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .cpp-container-card:hover {
    border-color: #475569;
    background: #263348;
    transform: translateY(-2px);
  }

  .cpp-cc-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .cpp-cc-name { font-size: 14px; font-weight: 700; color: #f1f5f9; font-family: 'JetBrains Mono', monospace; }
  .cpp-cc-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  .cpp-cc-pill {
    display: inline-block;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    padding: 2px 8px;
    border-radius: 20px;
    background: #0f172a;
    color: #64748b;
    border: 1px solid #334155;
    margin-top: 4px;
    align-self: flex-start;
  }

  /* ── Compare Table ── */
  .cpp-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .cpp-table th {
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 10px 12px;
    color: #475569;
    text-align: left;
    border-bottom: 1px solid #334155;
  }
  .cpp-table td {
    padding: 11px 12px;
    border-bottom: 1px solid #1e293b;
    color: #64748b;
    vertical-align: middle;
  }
  .cpp-table tr:last-child td { border-bottom: none; }
  .cpp-table td:first-child {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #e2e8f0;
    font-weight: 600;
  }
  .cpp-table tr:hover td { background: #1e293b; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .cpp-app { flex-direction: column; }
    .cpp-sidebar { width: 100%; height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 0.5rem; }
    .cpp-sidebar-logo { display: none; }
    .cpp-nav-label { display: none; }
    .cpp-nav-item { padding: 6px 10px; font-size: 12px; border-left: none; border-bottom: 2px solid transparent; }
    .cpp-nav-item.active { border-left: none; border-bottom-color: #378ADD; }
    .cpp-back-btn { width: auto; margin: 0.25rem; }
    .cpp-main { padding: 1rem; }
    .cpp-methods-grid { grid-template-columns: 1fr; }
    .cpp-complexity-row { grid-template-columns: 1fr 1fr; }
    .cpp-page-title { font-size: 20px; }
  }
`;

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const NavItem = ({ id, icon, label, bg, color, active, onClick }) => (
  <button
    className={`cpp-nav-item${active ? " active" : ""}`}
    onClick={() => onClick(id)}
  >
    <span className="cpp-nav-icon" style={{ background: bg, color }}>
      {icon}
    </span>
    {label}
  </button>
);

const ComplexityRow = ({ items }) => (
  <div className="cpp-complexity-row">
    {items.map((item) => (
      <div key={item.label} className="cpp-complexity-card">
        <div className="cpp-complexity-label">{item.label}</div>
        <div className="cpp-complexity-value" style={{ color: item.color }}>
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

const DiffBadge = ({ diff }) => (
  <span className={`cpp-diff cpp-diff-${diff}`}>{diff}</span>
);

// ─── HOME PAGE ───────────────────────────────────────────────────────────────

const HomePage = ({ onSelect }) => {
  const items = [
    {
      id: "vector",
      icon: "V",
      bg: "#1a3152",
      color: "#60a5fa",
      label: "vector",
      desc: "Dynamic array. Resize automatically. Best for indexed access.",
      pill: "Access O(1)",
    },
    {
      id: "set",
      icon: "S",
      bg: "#14361a",
      color: "#86efac",
      label: "set",
      desc: "Unique elements, always sorted. Red-black tree internally.",
      pill: "Insert O(log n)",
    },
    {
      id: "unordered_set",
      icon: "US",
      bg: "#3b2800",
      color: "#fcd34d",
      label: "unordered_set",
      desc: "Unique elements, hash-based. Faster but unsorted.",
      pill: "Insert O(1) avg",
    },
    {
      id: "map",
      icon: "M",
      bg: "#3b1a2e",
      color: "#f9a8d4",
      label: "map",
      desc: "Key-value pairs, sorted by key. No duplicate keys.",
      pill: "Lookup O(log n)",
    },
    {
      id: "unordered_map",
      icon: "UM",
      bg: "#3b1a10",
      color: "#fdba74",
      label: "unordered_map",
      desc: "Key-value pairs, hash-based. Fastest key lookup.",
      pill: "Lookup O(1) avg",
    },
    {
      id: "pair",
      icon: "P",
      bg: "#2a1f50",
      color: "#c4b5fd",
      label: "pair",
      desc: "Two values bundled together. Core to map & graph problems.",
      pill: "Utility Type",
    },
  ];

  return (
    <div>
      <div className="cpp-page-header">
        <div className="cpp-breadcrumb">C++ STL</div>
        <div className="cpp-page-title">Standard Template Library</div>
        <div className="cpp-page-subtitle">
          Choose a container to explore theory, syntax, examples, and practice
          problems.
        </div>
      </div>

      <div className="cpp-home-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="cpp-container-card"
            onClick={() => onSelect(item.id)}
          >
            <div
              className="cpp-cc-icon"
              style={{ background: item.bg, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="cpp-cc-name">{item.label}</div>
            <div className="cpp-cc-desc">{item.desc}</div>
            <span className="cpp-cc-pill">{item.pill}</span>
          </div>
        ))}
      </div>

      <div className="cpp-card">
        <div className="cpp-card-header">
          <div className="cpp-card-icon" style={{ background: "#1a3152" }}>
            📊
          </div>
          <div className="cpp-card-title">Quick Comparison</div>
        </div>
        <div className="cpp-card-body" style={{ padding: 0 }}>
          <table className="cpp-table">
            <thead>
              <tr>
                <th>Container</th>
                <th>Ordered?</th>
                <th>Unique?</th>
                <th>Key-Value?</th>
                <th>Avg Lookup</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["vector", "by index", "no", "no", "O(n)", "#94a3b8"],
                ["set", "yes (sorted)", "yes", "no", "O(log n)", "#fcd34d"],
                ["unordered_set", "no", "yes", "no", "O(1)", "#86efac"],
                [
                  "map",
                  "yes (sorted)",
                  "yes (keys)",
                  "yes",
                  "O(log n)",
                  "#fcd34d",
                ],
                ["unordered_map", "no", "yes (keys)", "yes", "O(1)", "#86efac"],
                ["pair", "n/a", "n/a", "n/a", "O(1)", "#86efac"],
              ].map(([name, ord, uniq, kv, lookup, lc]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{ord}</td>
                  <td>{uniq}</td>
                  <td>{kv}</td>
                  <td
                    style={{
                      color: lc,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                    }}
                  >
                    {lookup}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────

const DetailPage = ({ data }) => (
  <div>
    <div className="cpp-page-header">
      <div className="cpp-breadcrumb">STL / {data.category}</div>
      <div className="cpp-page-title">{data.title}</div>
      <div className="cpp-tags">
        {data.tags.map((t) => (
          <span key={t} className="cpp-tag">
            {t}
          </span>
        ))}
      </div>
    </div>

    <div className="cpp-grid">
      {/* Theory */}
      <div className="cpp-card">
        <div className="cpp-card-header">
          <div
            className="cpp-card-icon"
            style={{ background: data.bg, fontSize: 14 }}
          >
            📘
          </div>
          <div className="cpp-card-title">Theory</div>
        </div>
        <div className="cpp-card-body">
          <div className="cpp-theory">{data.theory}</div>
          <ComplexityRow items={data.complexity} />
        </div>
      </div>

      {/* Syntax */}
      <div className="cpp-card">
        <div className="cpp-card-header">
          <div
            className="cpp-card-icon"
            style={{ background: data.bg, fontSize: 14 }}
          >
            ⚙️
          </div>
          <div className="cpp-card-title">Syntax & Common Methods</div>
        </div>
        <div className="cpp-card-body">
          <pre className="cpp-code">{data.syntax}</pre>
        </div>
      </div>

      {/* Examples */}
      <div className="cpp-card">
        <div className="cpp-card-header">
          <div
            className="cpp-card-icon"
            style={{ background: data.bg, fontSize: 14 }}
          >
            💻
          </div>
          <div className="cpp-card-title">Examples</div>
        </div>
        <div className="cpp-card-body">
          {data.examples.map((ex, i) => (
            <div
              key={i}
              style={{
                marginBottom: i < data.examples.length - 1 ? "1.25rem" : 0,
              }}
            >
              <div className="cpp-example-title">{ex.title}</div>
              <pre className="cpp-code">{ex.code}</pre>
              {i < data.examples.length - 1 && <div className="cpp-divider" />}
            </div>
          ))}
          <div className="cpp-tip">
            💡 <strong>Tip:</strong> {data.tip}
          </div>
        </div>
      </div>

      {/* Practice Problems */}
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Containers = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const activePage = type || "home";
  const setActivePage = (id) => navigate(`/containers/${id}`);
  const navGroups = [
    {
      label: "Sequence",
      items: [
        {
          id: "vector",
          icon: "V",
          label: "vector",
          bg: "#1a3152",
          color: "#60a5fa",
        },
      ],
    },
    {
      label: "Associative",
      items: [
        { id: "set", icon: "S", label: "set", bg: "#14361a", color: "#86efac" },
        {
          id: "unordered_set",
          icon: "US",
          label: "unordered_set",
          bg: "#3b2800",
          color: "#fcd34d",
        },
        { id: "map", icon: "M", label: "map", bg: "#3b1a2e", color: "#f9a8d4" },
        {
          id: "unordered_map",
          icon: "UM",
          label: "unordered_map",
          bg: "#3b1a10",
          color: "#fdba74",
        },
      ],
    },
    {
      label: "Utility",
      items: [
        {
          id: "pair",
          icon: "P",
          label: "pair",
          bg: "#2a1f50",
          color: "#c4b5fd",
        },
      ],
    },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="cpp-app">
        {/* Sidebar */}
        <aside className="cpp-sidebar">
          <div className="cpp-sidebar-logo">
            <h2>C++ STL Containers</h2>
            <p>Interactive Learning Guide</p>
          </div>

          {/* Back to Dashboard */}
          <button className="cpp-back-btn" onClick={() => navigate("/")}>
            ← Dashboard
          </button>

          {/* Home link */}
          <button
            className={`cpp-nav-item${activePage === "home" ? " active" : ""}`}
            onClick={() => navigate("/containers")}
          >
            <span
              className="cpp-nav-icon"
              style={{
                background: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
              }}
            >
              🏠
            </span>
            Home
          </button>

          {/* Navigation Groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="cpp-nav-label">{group.label}</div>
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  {...item}
                  active={activePage === item.id}
                  onClick={setActivePage}
                />
              ))}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="cpp-main">
          {/* Back button at top of every page */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              className="cpp-back-btn"
              onClick={() => navigate("/")}
              style={{ width: "auto", display: "inline-flex" }}
            >
              ← Back to Dashboard
            </button>
          </div>

          {!type ? (
            <HomePage onSelect={setActivePage} />
          ) : containerData[type] ? (
            <DetailPage data={containerData[type]} />
          ) : (
            <HomePage onSelect={setActivePage} />
          )}
        </main>
      </div>
    </>
  );
};

export default Containers;
