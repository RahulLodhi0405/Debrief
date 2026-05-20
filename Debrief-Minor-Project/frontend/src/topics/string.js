const stringTopic = {
  title: "Strings [Basics → Easy → Medium]",
  total: 80,

  sections: [
    {
      name: "Basics",
      questions: [
        // 🔹 ULTRA BASIC
        { id: "string-5", title: "To Lower Case", difficulty: "Basics", link: "https://leetcode.com/problems/to-lower-case/" },

        // 🔹 BASIC STRING OPS
        { id: "string-1", title: "Reverse String", difficulty: "Basics", link: "https://leetcode.com/problems/reverse-string/" },
        { id: "string-3", title: "Length of Last Word", difficulty: "Basics", link: "https://leetcode.com/problems/length-of-last-word/" },
        { id: "string-16", title: "Truncate Sentence", difficulty: "Basics", link: "https://leetcode.com/problems/truncate-sentence/" },

        // 🔹 BASIC CHECKS
        { id: "string-2", title: "Valid Palindrome", difficulty: "Basics", link: "https://www.geeksforgeeks.org/problems/palindrome-string0817/1" },
        { id: "string-10", title: "Check If Pangram", difficulty: "Basics", link: "https://leetcode.com/problems/check-if-the-sentence-is-pangram/" },

        // 🔹 CHARACTER BASED
        { id: "string-6", title: "Detect Capital", difficulty: "Basics", link: "https://leetcode.com/problems/detect-capital/" },
        { id: "string-8", title: "First Unique Character", difficulty: "Basics", link: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
        { id: "string-13", title: "Jewels and Stones", difficulty: "Basics", link: "https://leetcode.com/problems/jewels-and-stones/" },

        // 🔹 SIMPLE STRING LOGIC
        { id: "string-4", title: "Find First Occurrence (strStr)", difficulty: "Basics", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
        { id: "string-11", title: "Goal Parser Interpretation", difficulty: "Basics", link: "https://leetcode.com/problems/goal-parser-interpretation/" },
        { id: "string-12", title: "Shuffle String", difficulty: "Basics", link: "https://leetcode.com/problems/shuffle-string/" },

        // 🔹 SLIGHTLY ABOVE BASIC
        { id: "string-17", title: "Remove Vowels", difficulty: "Basics", link: "https://leetcode.com/problems/remove-vowels-from-a-string/" },
        { id: "string-19", title: "Check Equivalent String Arrays", difficulty: "Basics", link: "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/" },
        { id: "string-20", title: "Count Consistent Strings", difficulty: "Basics", link: "https://leetcode.com/problems/count-the-number-of-consistent-strings/" },

        // 🔹 BORDERLINE EASY (END OF BASICS)
        { id: "string-9", title: "Reverse Words in a String III", difficulty: "Basics", link: "https://leetcode.com/problems/reverse-words-in-a-string-iii/" },
        { id: "string-7", title: "Valid Anagram", difficulty: "Basics", link: "https://leetcode.com/problems/valid-anagram/" },
        { id: "string-18", title: "Maximum Repeating Substring", difficulty: "Basics", link: "https://leetcode.com/problems/maximum-repeating-substring/" },
      ],
    },

    {
      name: "Easy",
      questions: [
        // 🔹 CORE EASY START
        { id: "string-21", title: "Longest Common Prefix", difficulty: "Easy", link: "https://leetcode.com/problems/longest-common-prefix/" },
        { id: "string-22", title: "Is Subsequence", difficulty: "Easy", link: "https://leetcode.com/problems/is-subsequence/" },

        // 🔹 STACK INTRO
        { id: "string-23", title: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" },

        // 🔹 STRING BUILDING
        { id: "string-25", title: "Merge Strings Alternately", difficulty: "Easy", link: "https://leetcode.com/problems/merge-strings-alternately/" },
        { id: "string-24", title: "Add Binary", difficulty: "Easy", link: "https://leetcode.com/problems/add-binary/" },

        // 🔹 CONDITION BASED
        { id: "string-27", title: "Check Equal Strings After Swap", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/" },
        { id: "string-26", title: "Repeated Substring Pattern", difficulty: "Easy", link: "https://leetcode.com/problems/repeated-substring-pattern/" },

        // 🔹 COUNTING / HASHING
        { id: "string-28", title: "Count Prefixes", difficulty: "Easy", link: "https://leetcode.com/problems/count-prefixes-of-a-given-string/" },
        { id: "string-40", title: "Rearrange Characters", difficulty: "Easy", link: "https://leetcode.com/problems/rearrange-characters-to-make-target-string/" },

        // 🔹 STRING CLEANING
        { id: "string-29", title: "Make The String Great", difficulty: "Easy", link: "https://leetcode.com/problems/make-the-string-great/" },
        { id: "string-31", title: "Reverse Prefix of Word", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-prefix-of-word/" },

        // 🔹 PATTERN BASED EASY
        { id: "string-30", title: "Split Balanced String", difficulty: "Easy", link: "https://leetcode.com/problems/split-a-string-in-balanced-strings/" },

        // 🔹 VALUE BASED
        { id: "string-32", title: "Largest Odd Number", difficulty: "Easy", link: "https://leetcode.com/problems/largest-odd-number-in-string/" },
        { id: "string-33", title: "Strong Password Checker II", difficulty: "Easy", link: "https://leetcode.com/problems/strong-password-checker-ii/" },

        // 🔹 TRANSFORMATIONS
        { id: "string-34", title: "Decode Message", difficulty: "Easy", link: "https://leetcode.com/problems/decode-the-message/" },
        { id: "string-35", title: "Capitalize Title", difficulty: "Easy", link: "https://leetcode.com/problems/capitalize-the-title/" },

        // 🔹 GFG EASY
        { id: "string-36", title: "Check Anagram (GFG)", difficulty: "Easy", link: "https://www.geeksforgeeks.org/problems/anagram-1587115620/1" },
        { id: "string-37", title: "Remove Duplicates String (GFG)", difficulty: "Easy", link: "https://www.geeksforgeeks.org/problems/remove-duplicates3034/1" },

        // 🔹 END EASY
        { id: "string-38", title: "Remove Palindromic Subsequences", difficulty: "Easy", link: "https://leetcode.com/problems/remove-palindromic-subsequences/" },
        { id: "string-39", title: "Check Distances Between Letters", difficulty: "Easy", link: "https://leetcode.com/problems/check-distances-between-same-letters/" },
      ],
    },

    {
      name: "Medium",
      questions: [
        // 🔹 SLIDING WINDOW CORE
        { id: "string-41", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { id: "string-48", title: "Longest Repeating Character Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },

        // 🔹 WINDOW ADVANCED
        { id: "string-56", title: "Minimum Window Substring", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-window-substring/" },

        // 🔹 PERMUTATION / HASH
        { id: "string-42", title: "Permutation in String", difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string/" },
        { id: "string-44", title: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },

        // 🔹 PALINDROME
        { id: "string-43", title: "Longest Palindromic Substring", difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/" },

        // 🔹 STACK
        { id: "string-45", title: "Decode String", difficulty: "Medium", link: "https://leetcode.com/problems/decode-string/" },
        { id: "string-53", title: "Minimum Remove to Make Valid Parentheses", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/" },

        // 🔹 GREEDY
        { id: "string-47", title: "Partition Labels", difficulty: "Medium", link: "https://leetcode.com/problems/partition-labels/" },
        { id: "string-46", title: "Remove K Digits", difficulty: "Medium", link: "https://leetcode.com/problems/remove-k-digits/" },

        // 🔹 ADVANCED STRING LOGIC
        { id: "string-49", title: "Reorganize String", difficulty: "Medium", link: "https://leetcode.com/problems/reorganize-string/" },
        { id: "string-50", title: "Custom Sort String", difficulty: "Medium", link: "https://leetcode.com/problems/custom-sort-string/" },

        // 🔹 INTERVIEW CORE
        { id: "string-51", title: "String to Integer (atoi)", difficulty: "Medium", link: "https://leetcode.com/problems/string-to-integer-atoi/" },
        { id: "string-52", title: "Multiply Strings", difficulty: "Medium", link: "https://leetcode.com/problems/multiply-strings/" },

        // 🔹 HARD LOGIC
        { id: "string-54", title: "Remove Duplicate Letters", difficulty: "Medium", link: "https://leetcode.com/problems/remove-duplicate-letters/" },
        { id: "string-55", title: "Find and Replace Pattern", difficulty: "Medium", link: "https://leetcode.com/problems/find-and-replace-pattern/" },
      ],
    },
  ],
};

export default stringTopic;