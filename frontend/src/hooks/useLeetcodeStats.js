import { useState } from "react";
import { leetcodeData } from "../data/devStats";

// LeetCode has no official public API. This hook is the single seam to plug
// in a third-party proxy or scraping service later without touching the UI.
export function useLeetcodeStats() {
  const [data] = useState(leetcodeData);
  const [loading] = useState(false);
  return { data, loading };
}
