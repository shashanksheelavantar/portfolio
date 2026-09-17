import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox, ContactShadows } from "@react-three/drei";

const ACCENT = "#63b3ed";

// One interactive object: highlights on hover, shows a tooltip, calls
// onSelect(section) on click. Kept intentionally low-poly.
function Interactive({ position, label, section, onSelect, onHoverChange, children }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.06 : 1;
    groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.15);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHoverChange?.(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); onHoverChange?.(false); }}
      onClick={(e) => { e.stopPropagation(); onSelect?.(section); }}
    >
      {children}
      {hovered && (
        <Html center distanceFactor={8} position={[0, 1.1, 0]} style={{ pointerEvents: "none" }}>
          <div className="px-3 py-1.5 rounded-full bg-ink text-bg text-xs font-semibold whitespace-nowrap shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function DeveloperDesk({ onSelect, onHoverChange }) {
  const lampGlowRef = useRef(null);
  const bookColors = useMemo(() => ["#e07a5f", "#3d5a80", "#81b29a"], []);

  useFrame(({ clock }) => {
    if (lampGlowRef.current) {
      lampGlowRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight ref={lampGlowRef} position={[-2.2, 1.6, -1]} intensity={1.4} color="#ffd9a0" distance={4} />

      {/* Desk surface */}
      <RoundedBox args={[6, 0.15, 3]} radius={0.05} position={[0, -0.1, 0]} receiveShadow>
        <meshStandardMaterial color="#8a6d51" roughness={0.7} />
      </RoundedBox>

      {/* Monitor → Projects */}
      <Interactive position={[0.9, 0.9, -0.6]} label="Projects" section="projects" onSelect={onSelect} onHoverChange={onHoverChange}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[1.3, 0.8, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 0.72, 0.035]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.5} />
        </mesh>
      </Interactive>

      {/* Laptop → Experience */}
      <Interactive position={[-1.6, -0.02, 0.4]} label="Experience" section="experience" onSelect={onSelect} onHoverChange={onHoverChange}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.06, 0.65]} />
          <meshStandardMaterial color="#c9ccd1" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.28, -0.32]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[0.9, 0.55, 0.04]} />
          <meshStandardMaterial color="#c9ccd1" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.29, -0.31]} rotation={[-0.35, 0, 0]}>
          <planeGeometry args={[0.8, 0.45]} />
          <meshStandardMaterial color="#111" emissive={ACCENT} emissiveIntensity={0.25} />
        </mesh>
      </Interactive>

      {/* Keyboard → Skills */}
      <Interactive position={[0.9, -0.01, 0.55]} label="Skills" section="skills" onSelect={onSelect} onHoverChange={onHoverChange}>
        <RoundedBox args={[1.1, 0.05, 0.35]} radius={0.02} castShadow>
          <meshStandardMaterial color="#2b2b2f" />
        </RoundedBox>
      </Interactive>

      {/* Mouse (decorative, non-interactive) */}
      <RoundedBox args={[0.14, 0.06, 0.2]} radius={0.03} position={[1.7, 0.02, 0.55]} castShadow>
        <meshStandardMaterial color="#2b2b2f" />
      </RoundedBox>

      {/* Coffee cup → About */}
      <Interactive position={[-0.55, 0.02, 0.85]} label="About" section="about" onSelect={onSelect} onHoverChange={onHoverChange}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.1, 0.18, 24]} />
          <meshStandardMaterial color="#f4f4f2" />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.115, 0.115, 0.01, 24]} />
          <meshStandardMaterial color="#4b2e1e" />
        </mesh>
        <mesh position={[0.16, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#f4f4f2" />
        </mesh>
      </Interactive>

      {/* Smartphone → Contact */}
      <Interactive position={[1.95, 0.02, -0.2]} label="Contact" section="contact" onSelect={onSelect} onHoverChange={onHoverChange}>
        <RoundedBox args={[0.16, 0.04, 0.34]} radius={0.02} castShadow>
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </RoundedBox>
      </Interactive>

      {/* Books → Certifications */}
      <Interactive position={[2.1, 0.05, 0.7]} label="Certifications" section="certifications" onSelect={onSelect} onHoverChange={onHoverChange}>
        {bookColors.map((c, i) => (
          <mesh key={c} position={[0, i * 0.07 + 0.02, 0]} rotation={[0, 0.08 * i, 0]} castShadow>
            <boxGeometry args={[0.55, 0.06, 0.38]} />
            <meshStandardMaterial color={c} />
          </mesh>
        ))}
      </Interactive>

      {/* Terminal window → DSA Playground */}
      <Interactive position={[-1.9, 0.55, -0.9]} label="DSA Playground" section="dsa" onSelect={onSelect} onHoverChange={onHoverChange}>
        <mesh castShadow>
          <boxGeometry args={[0.85, 0.55, 0.04]} />
          <meshStandardMaterial color="#0d0d0f" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.75, 0.45]} />
          <meshStandardMaterial color="#0d0d0f" emissive="#34D399" emissiveIntensity={0.35} />
        </mesh>
      </Interactive>

      {/* GitHub object → GitHub (abstract representation, not the GitHub logo) */}
      <Interactive position={[-0.1, 0.25, 1.0]} label="GitHub" section="github" onSelect={onSelect} onHoverChange={onHoverChange}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#1a1a1a" flatShading />
        </mesh>
      </Interactive>

      {/* Desk lamp (decorative) */}
      <group position={[-2.2, -0.02, -1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#2b2b2f" />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#2b2b2f" />
        </mesh>
        <mesh position={[0.15, 1.05, 0]} rotation={[0, 0, -0.5]} castShadow>
          <coneGeometry args={[0.16, 0.22, 16, 1, true]} />
          <meshStandardMaterial color="#e0733d" side={2} />
        </mesh>
      </group>

      <ContactShadows position={[0, -0.18, 0]} opacity={0.4} scale={7} blur={2} far={2} />
    </group>
  );
}
