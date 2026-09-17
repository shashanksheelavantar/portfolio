// No statistics are invented. These are null/empty until wired to the real
// GitHub API (see hooks/useGithubStats.js) and a LeetCode data source.

export const githubData = {
  username: "shashanksheelavantar",
  profileUrl: "https://github.com/shashanksheelavantar",
  stats: {
    repositories: null,
    followers: null,
    following: null,
    stars: null,
    forksReceived: null,
  },
  topLanguages: [], // populate from the GitHub API once connected
  recentRepos: [], // populate from the GitHub API once connected
  note: "Live stats aren't connected yet — see hooks/useGithubStats.js for where to wire the GitHub API.",
};

export const leetcodeData = {
  profileUrl: null, // add your LeetCode profile URL
  stats: {
    totalSolved: null,
    easy: null,
    medium: null,
    hard: null,
  },
  topics: [], // populate once a data source is connected
  recentProblems: [], // populate once a data source is connected
  note: "LeetCode has no official public API — see hooks/useLeetcodeStats.js for where to plug in a data source later.",
};
