import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

const ThreeJSComponent = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container size
    const { clientWidth, clientHeight } = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      clientWidth / -2,
      clientWidth / 2,
      clientHeight / 2,
      clientHeight / -2,
      1,
      1000
    );
    camera.position.set(500, 500, 500);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(0x202020, 0);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Lights
    const shadowLight = new THREE.DirectionalLight(0xffffff, 1.8);
    shadowLight.position.set(0, 50, 0);
    shadowLight.castShadow = true;
    scene.add(shadowLight);

    const light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.position.set(60, 100, 20);
    scene.add(light);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-40, 100, 20);
    scene.add(backLight);

    // Shape
    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshLambertMaterial({
      color: 0xf9f8ed,
      flatShading: true,
    });
    const shape = new THREE.Mesh(geometry, material);
    shape.castShadow = true;
    group.add(shape);

    // Animation using GSAP
    gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(shape.scale, { duration: 0.5, x: 2, ease: "expo.out" })
      .to(shape.scale, { duration: 0.5, z: 2, ease: "expo.out" })
      .to(shape.scale, { duration: 1, y: 2, ease: "elastic.out" })
      .to(shape.scale, { duration: 0.7, x: 1, y: 1, z: 1, ease: "expo.out" })
      .to(
        shape.rotation,
        { duration: 0.7, y: -Math.PI, ease: "expo.out" },
        "=-0.7"
      );

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current;
        renderer.setSize(clientWidth, clientHeight);
        camera.left = clientWidth / -2;
        camera.right = clientWidth / 2;
        camera.top = clientHeight / 2;
        camera.bottom = clientHeight / -2;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      // Ensure mountRef.current exists before removing the renderer
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-[70vh] w-1/2 overflow-hidden opacityNGo "
    />
  );
};

export default ThreeJSComponent;
