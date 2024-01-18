import React from "react";
import Navbar from "./navbar";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Lightformer,
  Text,
  Html,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { Link, useLocation } from "wouter";
import { suspend } from "suspend-react";
import { easing } from "maath";
import { MeshStandardMaterial } from "three";

const inter = import("@pmndrs/assets/fonts/inter_regular.woff");

function Work() {
  return (
    <>
      <Canvas
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        shadows
        camera={{ position: [0, 0, 20], fov: 75 }}
      >
        <color attach="background" args={["#ffffff"]} />
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <Status position={[0, 0, -10]} />
        <Float floatIntensity={2}></Float>
        <ContactShadows
          scale={100}
          position={[0, -7.5, 0]}
          blur={10}
          far={100}
          opacity={0.85}
        />
        <Environment preset="city">
          <Lightformer
            intensity={8}
            position={[10, 5, 0]}
            scale={[10, 50, 1]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <EffectComposer>
          <DepthOfField
            target={[10, 10, 10]} // Focus on the center
            focalLength={10} // Adjust the focalLength for the level of blur
            bokehScale={20} // Adjust the bokehScale for the intensity of the blur
          />
          {/* ...other effects... */}
        </EffectComposer>
        <Rig />
      </Canvas>

      <Navbar />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          fontSize: "25px",
          fontFamily: "'Inconsolata', 'Source Code Pro', monospace",
          fontWeight: 400,
        }}
      >
        william siong._
      </div>
    </>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Status(props) {
  const [loc] = useLocation();
  const text = loc === "/" ? "/about" : loc;
  const shadowMaterial = new MeshStandardMaterial();
  return (
    <Text
      fontSize={14}
      letterSpacing={-0.025}
      font={suspend(inter).default}
      color="#f3f6f4"
      material={shadowMaterial}
      castShadow
      receiveShadow
      {...props}
    >
      {text}
      <Html style={{ filter: "blur(50px)" }} transform>
        {text}
      </Html>
    </Text>
  );
}

export default Work;
