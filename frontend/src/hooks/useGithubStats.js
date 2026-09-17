import { useEffect, useState } from "react";
import { githubData } from "../data/devStats";

// Returns the static placeholder data today. To go live:
//   const res = await fetch(`https://api.github.com/users/${username}`);
// and map the response into the same shape as devStats.githubData.stats.
export function useGithubStats(username = githubData.username) {
  const [data, setData] = useState(githubData);
  const [loading] = useState(false);

  useEffect(() => {
    // Intentionally inert — see comment above for the real API call.
  }, [username]);

  return { data, loading };
}
