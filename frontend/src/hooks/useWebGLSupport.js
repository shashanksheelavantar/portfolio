import { useEffect, useState } from "react";

let cached = null;

function detectWebGL() {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    cached = false;
  }
  return cached;
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => { setSupported(detectWebGL()); }, []);
  return supported;
}
