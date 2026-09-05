import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls.js";
import { Preload } from "@react-three/drei/core/Preload.js";
import { useGLTF } from "@react-three/drei/core/Gltf.js";
import styled from "styled-components";

const CanvasContainer = styled.div`
  width: 100%;
  height: 360px;
  max-width: 500px;
  margin: 30px auto 0;
  position: relative;
`;

const Earth = () => {
  const modelPath = `${import.meta.env.BASE_URL}planet/scene.gltf`;
  const { scene } = useGLTF(modelPath);

  if (!scene) return null; // safe fallback

  return <primitive object={scene} scale={2.8} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  return (
    <CanvasContainer>
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "low-power", antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default EarthCanvas;
