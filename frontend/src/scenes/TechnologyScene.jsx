import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { techCloud } from "../data/skills";

const COLORS = ["#63b3ed", "#34D399", "#FBBF24", "#FB7185", "#A78BFA"];

function TechNode({ tech, index, total, onSelect, radius }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const color = COLORS[index % COLORS.length];

  // Distribute nodes roughly on a sphere (golden-angle spiral).
  const base = useMemo(() => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta) * 0.6,
      z: radius * Math.cos(phi),
    };
  }, [index, total, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.15 + index;
    ref.current.position.set(
      base.x + Math.sin(t) * 0.1,
      base.y + Math.cos(t * 0.8) * 0.1,
      base.z
    );
    const s = hovered ? 1.25 : 1;
    ref.current.scale.lerp({ x: s, y: s, z: s }, 0.15);
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={(e) => { e.stopPropagation(); onSelect(tech); }}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color={color} flatShading emissive={color} emissiveIntensity={hovered ? 0.4 : 0.1} />
      </mesh>
      <Html center distanceFactor={7} position={[0, -0.55, 0]} style={{ pointerEvents: "none" }}>
        <div className="text-[11px] font-semibold text-ink bg-surface/90 border border-border px-2 py-0.5 rounded-full whitespace-nowrap">
          {tech.name}
        </div>
      </Html>
    </group>
  );
}

export default function TechnologyScene({ onSelect }) {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={0.9} />
      {techCloud.map((tech, i) => (
        <TechNode key={tech.name} tech={tech} index={i} total={techCloud.length} radius={1.8} onSelect={onSelect} />
      ))}
    </group>
  );
}
