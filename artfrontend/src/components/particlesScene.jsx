import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticlesScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, material;
    let mouseX = 0,
      mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let rotationSpeedX = 0;
    let rotationSpeedY = 0;
    const rotationSpeedDecay = 0.98;
    let lastTouchX = 0;
    let lastTouchY = 0;
    const baseRotationX = 0.001;
    const baseRotationY = 0.001;

    function init() {
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        50,
        3000
      );
      camera.position.z = 800;

      // Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0000ff, 0.0008);

      // Particles setup
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const size = 3000;

      for (let i = 0; i < 2000; i++) {
        const x = (Math.random() * size + Math.random() * size) / 2 - size / 2;
        const y = (Math.random() * size + Math.random() * size) / 2 - size / 2;
        const z = (Math.random() * size + Math.random() * size) / 2 - size / 2;

        vertices.push(x, y, z);
      }

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

      material = new THREE.PointsMaterial({
        size: 3,
        color: 0xffffff,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Event listeners
      window.addEventListener("resize", onWindowResize);
      document.body.addEventListener("wheel", onScroll);
      document.body.addEventListener("touchstart", onTouchStart);
      document.body.addEventListener("touchmove", onTouchMove);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onScroll(event) {
      rotationSpeedX += event.deltaY * 0.000005;
    }

    function onTouchStart(event) {
      if (event.touches.length === 1) {
        lastTouchX = event.touches[0].pageX;
        lastTouchY = event.touches[0].pageY;
      }
    }

    function onTouchMove(event) {
      if (event.touches.length === 1) {
        const touchX = event.touches[0].pageX;
        const touchY = event.touches[0].pageY;

        const deltaX = lastTouchX - touchX;
        const deltaY = lastTouchY - touchY;

        rotationSpeedY += deltaX * 0.000005;
        rotationSpeedX += deltaY * 0.000005;

        lastTouchX = touchX;
        lastTouchY = touchY;
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      scene.rotation.y += baseRotationY + rotationSpeedY;
      scene.rotation.x += baseRotationX + rotationSpeedX;

      rotationSpeedX *= rotationSpeedDecay;
      rotationSpeedY *= rotationSpeedDecay;

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", onWindowResize);
      document.body.removeEventListener("wheel", onScroll);
      document.body.removeEventListener("touchstart", onTouchStart);
      document.body.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <div className="w-full fixed top-0 -z-20" ref={mountRef} />;
};

export default ParticlesScene;
