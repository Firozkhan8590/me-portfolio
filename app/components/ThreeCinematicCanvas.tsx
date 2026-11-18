"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCinematicCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = mediaQuery.matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle Cloud: Champagne Gold, Warm Amber, Starlight White
    const particleCount = window.innerWidth > 768 ? 900 : 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xd4af37);
    const warmWhite = new THREE.Color(0xf5f2eb);
    const amberColor = new THREE.Color(0xf3e5ab);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread across 3D tunnel
      positions[i3] = (Math.random() - 0.5) * 1600;
      positions[i3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      // Select gold / warm palette
      const rand = Math.random();
      const chosenColor = rand > 0.6 ? goldColor : rand > 0.3 ? warmWhite : amberColor;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom Shimmer Point Material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(geometry, pointsMaterial);
    scene.add(starField);

    // Subtle 3D Geometric Polyhedra floating in space
    const octaGeom = new THREE.OctahedronGeometry(28, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const floatingNodes: THREE.Mesh[] = [];
    const nodeCoords = [
      { x: -350, y: 150, z: 200 },
      { x: 380, y: -200, z: -100 },
      { x: -280, y: -300, z: -400 },
      { x: 300, y: 320, z: -600 },
    ];

    nodeCoords.forEach((coord) => {
      const mesh = new THREE.Mesh(octaGeom, octaMat);
      mesh.position.set(coord.x, coord.y, coord.z);
      scene.add(mesh);
      floatingNodes.push(mesh);
    });

    // Mouse Parallax & Scroll Dolly
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let maxScroll = 1;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let isDocumentVisible = true;
    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDocumentVisible || isReducedMotion) return;

      clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera smoothly dollys along Z-axis according to scroll progress!
      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const targetZ = 800 - scrollRatio * 900; // Dolly-in 900 units through 3D space!

      camera.position.z += (targetZ - camera.position.z) * 0.05;

      // Mouse parallax smoothing
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(0, 0, targetZ - 600);

      // Starfield subtle axial drift
      starField.rotation.y = elapsed * 0.015;
      starField.rotation.x = elapsed * 0.008;

      // Rotate geometric nodes
      floatingNodes.forEach((node, idx) => {
        node.rotation.x += 0.008 * (idx % 2 === 0 ? 1 : -1);
        node.rotation.y += 0.012 * (idx % 2 === 0 ? 1 : -1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      pointsMaterial.dispose();
      octaGeom.dispose();
      octaMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65"
      aria-hidden="true"
    />
  );
}

