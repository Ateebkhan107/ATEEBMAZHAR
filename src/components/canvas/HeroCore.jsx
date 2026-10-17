import { useReducedMotion } from "framer-motion";
import SceneCanvas from "./SceneCanvas";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
  const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
  const radius = 2.4 + (Math.sin(i * 3.7) * 0.5 + 0.5) * 1.6;
  PARTICLE_POSITIONS[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
  PARTICLE_POSITIONS[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
  PARTICLE_POSITIONS[i * 3 + 2] = radius * Math.cos(phi);
}

const TechSculpture = () => {
  const reducedMotion = useReducedMotion();
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    delta = Math.min(delta, 0.05);
    const time = state.clock.getElapsedTime();
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.45;

    // Smooth subtle responsiveness to cursor
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.35;
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.position.x = THREE.MathUtils.lerp(coreRef.current.position.x, targetX * 0.5, 0.05);
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, targetY * 0.5, 0.05);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.sin(time * 0.4) * 0.6 + targetY * 0.3;
      outerRingRef.current.rotation.y = time * 0.5 + targetX * 0.3;
      outerRingRef.current.rotation.z = Math.cos(time * 0.3) * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = time * -0.6 - targetY * 0.2;
      innerRingRef.current.rotation.y = Math.cos(time * 0.5) * 0.6;
      innerRingRef.current.rotation.z = time * 0.3 + targetX * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.12;
      particlesRef.current.rotation.x = targetY * 0.2;
    }
  });

  return (
    <group>
      {/* Dynamic Particle Orbit Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00ff66"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Core */}
      <Float autoInvalidate={!reducedMotion} speed={reducedMotion ? 0 : 2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Core Wireframe Icosahedron */}
        <mesh ref={coreRef} scale={1.3}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#08090c"
            wireframe
            emissive="#00ff66"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Solid Pulsing Core */}
        <mesh scale={0.65}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00ff66"
            emissive="#00ff66"
            emissiveIntensity={1.2}
            wireframe={false}
          />
        </mesh>

        {/* Outer Gimbal Ring */}
        <mesh ref={outerRingRef} scale={2.2}>
          <torusGeometry args={[1, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#00ff66"
            emissive="#00ff66"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Gimbal Ring */}
        <mesh ref={innerRingRef} scale={1.8}>
          <torusGeometry args={[1, 0.018, 16, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Futuristic Scene Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff66" />
      <pointLight position={[-5, -5, -3]} intensity={1.2} color="#38bdf8" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#00ff66"
      />
    </group>
  );
};

const HeroCoreCanvas = () => {
  return (
    <div className="w-full h-[360px] sm:h-[460px] lg:h-[540px] relative">
      {/* Decorative cyber grid backdrop */}
      <div className="absolute inset-0 bg-radial from-[#00ff66]/10 via-transparent to-transparent pointer-events-none" />

      {/* Telemetry coordinate badges */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-[#00ff66]/70 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-2 border border-[#00ff66]/20 rounded-sm">
        <span className="flex items-center gap-1.5 text-[#00ff66]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
          CORE_ONLINE // ADAPTIVE
        </span>
        <span className="text-slate-400">ROTATION: AUTO_SYNC</span>
        <span className="text-slate-400">PHYSICS: LERP_DAMPED</span>
      </div>

      <SceneCanvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <TechSculpture />
        </Suspense>
      </SceneCanvas>
    </div>
  );
};

export default HeroCoreCanvas;
