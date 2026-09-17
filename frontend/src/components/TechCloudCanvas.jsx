import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import TechnologyScene from "../scenes/TechnologyScene";

export default function TechCloudCanvas({ onSelect, isMobile, reducedMotion }) {
  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{ antialias: !isMobile, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
      <TechnologyScene onSelect={onSelect} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.8}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
