import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

const createFallbackTexture = (name) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = "#00ff41";
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 224, 224);

  ctx.fillStyle = "#00ff41";
  ctx.font = "bold 72px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name.slice(0, 2).toUpperCase(), 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const Ball = ({ icon, name }) => {
  const [decal, setDecal] = useState(() => createFallbackTexture(name));

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      setDecal(texture);
    };
    img.src = icon;
  }, [icon, name]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          flatShading
          polygonOffset
          polygonOffsetFactor={-5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, name }) => {
  return (
    <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={null}>
        <Ball icon={icon} name={name} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
