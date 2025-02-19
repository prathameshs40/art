import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const ThreeScene = ({ onMouseEnter, onMouseLeave }) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to("#perlCanvas", { opacity: 1 });
    gsap.to(materialRef.current.uniforms.u_factor, { value: 1.0 });
  };

  const handleMouseLeave = () => {
    gsap.to("#perlCanvas", { opacity: 0.5 });
    gsap.to(materialRef.current.uniforms.u_factor, { value: 0.7 });
  };
  const canvasRef = useRef(null);
  useEffect(() => {
    const ulElement = mountRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (ulElement) {
      ulElement.addEventListener("mouseenter", handleMouseEnter);
      ulElement.addEventListener("mouseleave", handleMouseLeave);
    }
    const { clientWidth, clientHeight } = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      clientWidth / clientHeight,
      0.001,
      100
    );
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(4, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        u_factor: { value: 0.7 },
        u_opacity: { value: 0 },
      },
      vertexShader: `varying vec3 v_position; varying vec2 vUv; uniform float time; uniform float u_factor; void main () { vUv = uv; vec3 new_position = position; float wave = 0.0; wave += 0.10 * sin(time + position.x) + 0.05 * sin(1.0 * time + position.x) + 0.05 * sin(0.25 * time + position.x); wave += 0.15 * sin(time + position.y) + 0.05 * sin(2.0 * time + position.y) + 0.05 * sin(0.25 * time + position.y); wave += 0.20 * sin(time + position.z) + 0.05 * sin(0.5 * time + position.z) + 0.05 * sin(0.25 * time + position.z); new_position *= mix(u_factor, 1.0, wave); gl_Position = projectionMatrix * modelViewMatrix * vec4( new_position, 1.0 ); gl_PointSize = 1.5; v_position = new_position; }`,
      fragmentShader: `uniform float time; varying vec3 v_position; varying vec2 vUv; void main () {
    vec3 color = vec3(0.0, 0.169, 0.239);
    gl_FragColor = vec4(color, 0.5);
}`,
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

      if (ulElement) {
        ulElement.removeEventListener("mouseenter", handleMouseEnter);
        ulElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);
  useEffect(() => {
    if (onMouseEnter && onMouseLeave && materialRef.current) {
      onMouseEnter(() => {
        gsap.to(materialRef.current.uniforms.u_factor, { value: 1.0 });
      });

      onMouseLeave(() => {
        gsap.to(materialRef.current.uniforms.u_factor, { value: 0.7 });
      });
    }
  }, [onMouseEnter, onMouseLeave]);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => handleMouseEnter}
      onMouseLeave={() => handleMouseLeave}
      className="w-full h-full relative"
    >
      <canvas
        id="perlCanvas"
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
    // <div
    //   ref={mountRef}
    //   onMouseEnter={() => handleMouseEnter}
    //   onMouseLeave={() => handleMouseLeave}
    //   className="w-full h-full"
    // />
  );
};

export default ThreeScene;
