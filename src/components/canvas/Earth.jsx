import { useReducedMotion } from "framer-motion";
import SceneCanvas from "./SceneCanvas";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const CyberGlobe = () => {
  const reducedMotion = useReducedMotion();
  const globeRef = useRef();
  const atmosphereRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    delta = Math.min(delta, 0.05);
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Main Wireframe Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshStandardMaterial
          color="#06080d"
          wireframe
          emissive="#00ff66"
          emissiveIntensity={0.25}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Internal Core Mesh */}
      <mesh scale={2.42}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#001407" transparent opacity={0.85} />
      </mesh>

      {/* Atmospheric Glowing Hull */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.58, 24, 24]} />
        <meshBasicMaterial
          color="#00ff66"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Equatorial Telemetry Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.1, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.3} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff66" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#38bdf8" />
    </group>
  );
};

const EarthCanvas = () => {
  const reducedMotion = useReducedMotion();
  return (
    <div className="w-full h-[340px] sm:h-[440px] relative">
      <SceneCanvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            autoRotate={!reducedMotion}
            autoRotateSpeed={1.2}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 2 - 0.3}
          />
          <CyberGlobe />
        </Suspense>
      </SceneCanvas>
    </div>
  );
};

export default EarthCanvas;
