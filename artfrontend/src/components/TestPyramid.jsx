import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const TestPyramid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    const resizeRenderer = () => {
      if (mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      }
    };

    resizeRenderer();
    window.addEventListener("resize", resizeRenderer);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.enableZoom = false;

    camera.position.set(0, 1.5, 4);
    controls.target.set(0, 0.5, 0);
    controls.update();

    scene.add(new THREE.AmbientLight(0x404040));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    function createPyramid(height, baseSize, particleCount, colors) {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const particleColors = [];

      for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const u = Math.random();
        const apex = { x: 0, y: height, z: 0 };
        const base = [
          { x: -baseSize, y: 0, z: -baseSize },
          { x: baseSize, y: 0, z: -baseSize },
          { x: baseSize, y: 0, z: baseSize },
          { x: -baseSize, y: 0, z: baseSize },
        ];

        const face = Math.floor(Math.random() * 4);
        const base1 = base[face];
        const base2 = base[(face + 1) % 4];

        const x = (1 - t) * ((1 - u) * base1.x + u * base2.x) + t * apex.x;
        const y = (1 - t) * 0 + t * height;
        const z = (1 - t) * ((1 - u) * base1.z + u * base2.z) + t * apex.z;

        positions.push(
          x + (Math.random() - 0.5) * 0.03,
          y + (Math.random() - 0.5) * 0.03,
          z + (Math.random() - 0.5) * 0.03
        );

        const colorPos = y / height;
        const color1 = colors[Math.floor(colorPos * (colors.length - 1))];
        const color2 = colors[Math.ceil(colorPos * (colors.length - 1))];
        const mixRatio = (colorPos * (colors.length - 1)) % 1;

        const finalColor = new THREE.Color().lerpColors(
          color1,
          color2,
          mixRatio
        );
        particleColors.push(finalColor.r, finalColor.g, finalColor.b);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(particleColors, 3)
      );
      const material = new THREE.PointsMaterial({
        size: 0.012,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geometry, material);
    }

    const innerColors = [
      new THREE.Color(0xff1493),
      new THREE.Color(0xff4500),
      new THREE.Color(0xffd700),
    ];
    const innerPyramid = createPyramid(1.5, 1.0, 3000, innerColors);
    scene.add(innerPyramid);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      innerPyramid.scale.set(
        1 + Math.cos(time * 2) * 0.03,
        1 + Math.cos(time * 2) * 0.03,
        1 + Math.cos(time * 2) * 0.03
      );
      innerPyramid.rotation.y -= 0.003;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", resizeRenderer);
    };
  }, []);

  return <div ref={mountRef} className="h-[70vh] w-1/2 overflow-hidden" />;
};

export default TestPyramid;
