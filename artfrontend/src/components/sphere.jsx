import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useContext } from "react";
import SiteContext from "../context/siteContext";
import { gsap } from "gsap";
const Sphere = () => {
  const mountRef = useRef(null);
  let scene, camera, renderer;
  let geometry, material, sphere;
  let vertices = [];
  let highlightVertices = [];
  const controls = {
    totalPoints: 1000,
    distributionConstant: 0.67,
    pointSize: 1.8,
    rotationSpeed: 0.002,
    pointColor: 0xf40009,
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
    if (aboutPageCounter != 0) {
      tlv.to(".sphere canvas", 1, {
        opacity: 1,
        ease: "power4.out",
        stagger: {
          amount: 2,
        },
      });
      controls.pointColor = 0xf4f4f4;
      console.log(controls.pointColor);
      console.log(material);
      // material.color.set(controls.pointColor);
      // highlightPoints();
    } else {
      tlv.to(".sphere canvas", 1, {
        opacity: 0,
        ease: "power4.out",
        stagger: {
          amount: 2,
        },
      });
    }
  }, [aboutPageCounter]);
  useEffect(() => {
    init();
    console.log(material);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 2 / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 500;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    // scene.background = new THREE.Color(0x000000);

    geometry = new THREE.BufferGeometry();
    material = new THREE.PointsMaterial({
      color: controls.pointColor,
      size: controls.pointSize,
    });
    sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    createSphere(controls.totalPoints, controls.distributionConstant);
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
    for (let i = 0; i < controls.totalPoints; i++) {
      if ((i + controls.offset) % controls.highlightPercentage === 0) {
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

    if (controls.highlightEnabled && highlightVertices.length > 0) {
      const highlightGeometry = new THREE.BufferGeometry();
      highlightGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(highlightVertices, 3)
      );
      const highlightMaterial = new THREE.PointsMaterial({
        color: 0xffd700,
        size: controls.pointSize * 1.1,
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
    scene.rotation.y += controls.rotationSpeed;
    renderer.render(scene, camera);
  };

  const handleResize = () => {
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    camera.aspect = window.innerWidth / 2 / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  return <div className={`w-1/2 h-full fixed sphere z-10 `} ref={mountRef} />;
};

export default Sphere;
