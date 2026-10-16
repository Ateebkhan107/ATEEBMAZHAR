import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

const Computers = ({ isMobile }) => {
  const scale = isMobile ? 0.6 : 1;

  return (
    <group scale={scale} dispose={null}>
      {/* Desk surface */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -0.4, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0, -0.7, -0.3]} castShadow>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 0.3, -0.3]} castShadow>
        <boxGeometry args={[2.2, 1.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Monitor screen */}
      <mesh position={[0, 0.3, -0.24]}>
        <boxGeometry args={[2, 1.2, 0.02]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#00ff41"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Screen glow lines */}
      {[-0.3, 0, 0.3].map((y, i) => (
        <mesh key={i} position={[-0.5 + i * 0.5, 0.3 + y, -0.22]}>
          <boxGeometry args={[1.2, 0.02, 0.01]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Keyboard */}
      <mesh position={[0, -0.95, 0.4]} castShadow>
        <boxGeometry args={[1.6, 0.06, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Mouse */}
      <mesh position={[1.1, -0.92, 0.4]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* PC tower */}
      <mesh position={[-1.5, -0.5, -0.2]} castShadow>
        <boxGeometry args={[0.5, 1.2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.5, 0.1, -0.12]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#00ff41" />
      </mesh>

      <hemisphereLight intensity={0.6} groundColor="#003b00" color="#00ff41" />
      <pointLight intensity={1} position={[5, 5, 5]} color="#00ff41" />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
        castShadow
        color="#4dff4d"
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 500px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
