import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const radius = 120;
    const separation = 10;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 350);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create group to hold objects
    const group = new THREE.Group();
    scene.add(group);

    // Generate tetrahedrons
    for (let s = 0; s <= 180; s += separation) {
      let radianS = (s * Math.PI) / 180;
      let pZ = radius * Math.cos(radianS);
      for (let t = 0; t < 360; t += separation) {
        let radianT = (t * Math.PI) / 180;
        let pX = radius * Math.sin(radianS) * Math.cos(radianT);
        let pY = radius * Math.sin(radianS) * Math.sin(radianT);
        let geometry = new THREE.TetrahedronGeometry(1.4, 0);
        let material = new THREE.MeshBasicMaterial({ color: 0xf40009 });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(pX, pY, pZ);
        group.add(mesh);
      }
    }

    // Animation loop
    const animate = () => {
      group.rotation.x += 0.002;
      group.rotation.y += 0.005;
      group.rotation.z += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup function
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;
