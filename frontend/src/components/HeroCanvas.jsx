import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import DeveloperDesk from "../scenes/DeveloperDesk";

export default function HeroCanvas({ onSelect, onHoverChange, isMobile, reducedMotion }) {
  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{ antialias: !isMobile, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <PerspectiveCamera makeDefault position={[3.2, 2.4, 4]} fov={40} />
      <DeveloperDesk onSelect={onSelect} onHoverChange={onHoverChange} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-0.9}
        maxAzimuthAngle={0.9}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
