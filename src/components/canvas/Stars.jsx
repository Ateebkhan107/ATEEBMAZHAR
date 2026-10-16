import { useReducedMotion } from "framer-motion";
import SceneCanvas from "./SceneCanvas";
import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const StarField = () => {
  const reducedMotion = useReducedMotion();
  const ref = useRef();

  // Create clean, deterministic star positions (divisible by 3)
  const [positions, colors] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#00ff66");
    const colorB = new THREE.Color("#e2e8f0");

    for (let i = 0; i < count; i++) {
      // Keep stars distributed in a spherical shell behind camera (z < 0.6)
      const u = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const v = (Math.cos(i * 78.233) * 43758.5453) % 1;
      const theta = Math.abs(u) * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * Math.abs(v) - 1.0);
      const r = 1.2 + Math.abs((Math.sin(i * 4.5) * 43758.5453) % 1) * 1.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      // Keep z strictly behind the camera at [0, 0, 1]
      pos[i * 3 + 2] = -0.5 - Math.abs(r * Math.cos(phi));

      const mixed = i % 4 === 0 ? colorA : colorB;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    delta = Math.min(delta, 0.05);
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.012}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-full fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <SceneCanvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </SceneCanvas>
    </div>
  );
};

export default StarsCanvas;
