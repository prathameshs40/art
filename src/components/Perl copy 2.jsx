import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const ThreeScene = ({ onMouseEnter, onMouseLeave }) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      clientWidth / clientHeight,
      0.001,
      100
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xeadcc8, 1);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(4, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        u_factor: { value: 0.9 },
        u_opacity: { value: 0 },
      },
      vertexShader: `varying vec3 v_position; varying vec2 vUv; uniform float time; uniform float u_factor; void main () { vUv = uv; vec3 new_position = position; float wave = 0.0; wave += 0.10 * sin(time + position.x) + 0.05 * sin(1.0 * time + position.x) + 0.05 * sin(0.25 * time + position.x); wave += 0.15 * sin(time + position.y) + 0.05 * sin(2.0 * time + position.y) + 0.05 * sin(0.25 * time + position.y); wave += 0.20 * sin(time + position.z) + 0.05 * sin(0.5 * time + position.z) + 0.05 * sin(0.25 * time + position.z); new_position *= mix(u_factor, 1.0, wave); gl_Position = projectionMatrix * modelViewMatrix * vec4( new_position, 1.0 ); gl_PointSize = 1.5; v_position = new_position; }`,
      fragmentShader: `uniform float time; varying vec3 v_position; varying vec2 vUv; void main () { vec3 color = vec3(0.459,0.141,0.141); gl_FragColor = vec4(color, 0.5); }`,
    });

    materialRef.current = material;

    const cube = new THREE.Points(geometry, material);
    cube.scale.set(1, 1, 1);
    scene.add(cube);

    const clock = new THREE.Clock();

    const render = () => {
      material.uniforms.time.value = clock.getElapsedTime();
      cube.rotation.y += 0.005;
      cube.rotation.x += 0.003;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();

    window.addEventListener("resize", () => {
      if (mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }
    });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // Expose animation functions
  useEffect(() => {
    if (onMouseEnter && onMouseLeave && materialRef.current) {
      onMouseEnter(() => {
        gsap.to(materialRef.current.uniforms.u_factor, { value: 1.0 });
      });

      onMouseLeave(() => {
        gsap.to(materialRef.current.uniforms.u_factor, { value: 0.9 });
      });
    }
  }, [onMouseEnter, onMouseLeave]);

  return <div ref={mountRef} className="absolute top-0 right-0 w-1/2 h-full" />;
  //   return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

const Perl = () => {
  const ulRef = useRef(null);

  useEffect(() => {
    const ulElement = ulRef.current;

    const handleMouseEnter = () => {
      gsap.to("canvas", { opacity: 1 });
    };

    const handleMouseLeave = () => {
      gsap.to("canvas", { opacity: 0.5 });
    };

    if (ulElement) {
      ulElement.addEventListener("mouseenter", handleMouseEnter);
      ulElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener("mouseenter", handleMouseEnter);
        ulElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#fffbf3] text-[#414141] font-[IvyMode Reg] text-4xl">
      <div className="absolute left-0 top-0 p-10">
        <h1 className="text-4xl font-bold">Projects</h1>
        <ul ref={ulRef} className="mt-5 space-y-3">
          {["Döse", "Architecture", "Out of space", "Relieve"].map(
            (item, index) => (
              <li
                key={index}
                className="opacity-0 translate-y-8 transition-all duration-700"
              >
                <div>
                  <span>{item}</span>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <ThreeScene
        onMouseEnter={(callback) =>
          ulRef.current?.addEventListener("mouseenter", callback)
        }
        onMouseLeave={(callback) =>
          ulRef.current?.addEventListener("mouseleave", callback)
        }
      />
    </div>
  );
};

export default Perl;
