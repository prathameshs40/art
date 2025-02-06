import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const BloomingHeart = () => {
  useEffect(() => {
    let camera, scene, renderer, controls, heartMesh;

    function heartFunction(u, v, target) {
      u = u * Math.PI * 2;
      v *= Math.PI;
      const x = (4 * Math.sin(u) - Math.sin(3 * u)) * Math.sin(v);
      const y = 2 * Math.cos(v);
      const z =
        1.2 *
        (4 * Math.cos(u) - Math.cos(2 * u) - Math.cos(3 * u) / 2) *
        Math.sin(v);
      target.set(x, y, z);
    }

    function init() {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      );
      camera.position.set(0, 0, 6);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      const light = new THREE.DirectionalLight(0xffffff, 2);
      camera.add(light);
      scene.add(camera);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.maxDistance = camera.far / 2;
      controls.update();

      window.addEventListener("resize", onWindowResize);
    }

    function createHeart() {
      const geometry = new ParametricGeometry(heartFunction, 30, 30);
      geometry.rotateX(-Math.PI / 2);
      geometry.scale(0.2, 0.2, 0.22);
      geometry.center();

      const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      heartMesh = new THREE.Mesh(geometry, material);
      scene.add(heartMesh);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }

    init();
    createHeart();
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main className="relative text-center w-full min-h-screen bg-black text-white">
      <section className="grid place-items-center w-full min-h-screen">
        <div>
          <p>Loading...</p>
        </div>
      </section>
    </main>
  );
};

export default BloomingHeart;
