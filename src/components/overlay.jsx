import React from "react";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            padding: 0,
            fontSize: "15em",
            fontWeight: 500,
            letterSpacing: "-0.005em",
          }}
        >
          Hello.
        </h1>
        <h1
          style={{
            margin: 0,
            padding: 0,
            textAlign: "center",
            fontSize: "2em",
            fontWeight: 500,
            letterSpacing: "-0.005em",
          }}
        >
          SOFTWARE ENGINEER, FRONT END DEVELOPER.
        </h1>
      </div>
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

      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#755e92"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default Overlay;
