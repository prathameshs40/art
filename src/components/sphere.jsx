import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useContext } from "react";
import SiteContext from "../context/siteContext";
import { gsap } from "gsap";

const Sphere = () => {
  const mountRef = useRef(null);
  let scene, camera, renderer, controls;
  let geometry, material, sphere;
  let vertices = [];
  let highlightVertices = [];

  const config = {
    totalPoints: 3330,
    distributionConstant: 2.07,
    pointSize: 1.5,
    rotationSpeed: 0.002,
    pointColor: 0x40c1f7,
    highlightPercentage: 1,
    offset: 0,
    highlightEnabled: false,
  };

  const {
    aboutPageCounter,
    setAboutPageCounter,
    ringPosition,
    setRingPosition,
  } = useContext(SiteContext);

  const tlv = gsap.timeline();

  useEffect(() => {
    if (aboutPageCounter !== 0) {
      tlv.to(".sphere canvas", 1, {
        opacity: 1,
        ease: "power4.out",
        stagger: { amount: 2 },
      });
      config.pointColor = 0xf4f4f4;
    } else {
      tlv.to(".sphere canvas", 1, {
        opacity: 0,
        ease: "power4.out",
        stagger: { amount: 2 },
      });
    }
  }, [aboutPageCounter]);

  useEffect(() => {
    init();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const init = () => {
    if (!mountRef.current) return;
    const { clientWidth, clientHeight } = mountRef.current;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.rotateSpeed = 0.5;
    // controls.enableZoom = false;

    geometry = new THREE.BufferGeometry();
    material = new THREE.PointsMaterial({
      color: config.pointColor,
      size: config.pointSize,
    });
    sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    createSphere(config.totalPoints, config.distributionConstant);
    highlightPoints();
    animate();
  };

  const createSphere = (totalPoints, phi) => {
    vertices = [];
    highlightVertices = [];
    for (let i = 0; i < totalPoints; i++) {
      let theta = 2 * Math.PI * i * phi;
      let y = 1 - (i / (totalPoints - 1)) * 2;
      let radius = Math.sqrt(1 - y * y);
      let x = Math.cos(theta) * radius;
      let z = Math.sin(theta) * radius;
      vertices.push(x * 200, y * 200, z * 200);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.attributes.position.needsUpdate = true;
    highlightPoints();
  };

  const highlightPoints = () => {
    highlightVertices = [];
    for (let i = 0; i < config.totalPoints; i++) {
      if ((i + config.offset) % config.highlightPercentage === 0) {
        highlightVertices.push(
          vertices[i * 3],
          vertices[i * 3 + 1],
          vertices[i * 3 + 2]
        );
      }
    }
    updateHighlight();
  };

  const updateHighlight = () => {
    const existingHighlightPoints = scene.getObjectByName("highlightPoints");
    if (existingHighlightPoints) {
      scene.remove(existingHighlightPoints);
    }

    if (config.highlightEnabled && highlightVertices.length > 0) {
      const highlightGeometry = new THREE.BufferGeometry();
      highlightGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(highlightVertices, 3)
      );
      const highlightMaterial = new THREE.PointsMaterial({
        color: 0xffd700,
        size: config.pointSize * 1.1,
      });
      const highlightPoints = new THREE.Points(
        highlightGeometry,
        highlightMaterial
      );
      highlightPoints.name = "highlightPoints";
      scene.add(highlightPoints);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    scene.rotation.y += config.rotationSpeed;
    scene.rotation.x += config.rotationSpeed;
    scene.rotation.z += config.rotationSpeed;
    // controls.update();
    renderer.render(scene, camera);
  };

  const handleResize = () => {
    if (!mountRef.current) return;
    const { clientWidth, clientHeight } = mountRef.current;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  return (
    <div
      className="hidden sm:block w-full sm:w-1/2 h-full fixed sphere "
      ref={mountRef}
    />
  );
};

export default Sphere;
