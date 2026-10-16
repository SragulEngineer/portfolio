import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  theme?: 'light' | 'dark';
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ theme = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<{
    ico?: THREE.MeshBasicMaterial;
    octa?: THREE.MeshBasicMaterial;
    points?: THREE.PointsMaterial;
  }>({});

  // Dynamic theme update for 3D materials
  useEffect(() => {
    const isDark = theme === 'dark';
    if (materialsRef.current.ico) {
      materialsRef.current.ico.color.setHex(isDark ? 0x38bdf8 : 0x0284c7);
      materialsRef.current.ico.opacity = isDark ? 0.22 : 0.32;
    }
    if (materialsRef.current.octa) {
      materialsRef.current.octa.color.setHex(isDark ? 0x0284c7 : 0x0369a1);
      materialsRef.current.octa.opacity = isDark ? 0.35 : 0.45;
    }
    if (materialsRef.current.points) {
      materialsRef.current.points.color.setHex(isDark ? 0x7dd3fc : 0x0284c7);
      materialsRef.current.points.opacity = isDark ? 0.75 : 0.75;
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle constellation group
    const group = new THREE.Group();
    scene.add(group);

    const isDark = theme === 'dark';

    // Geometry 1: Outer glowing wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(18, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.32,
    });
    materialsRef.current.ico = icoMaterial;
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(icosahedron);

    // Geometry 2: Inner rotating octahedron
    const innerGeometry = new THREE.OctahedronGeometry(9, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284c7 : 0x0369a1,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
    });
    materialsRef.current.octa = innerMaterial;
    const innerOcta = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerOcta);

    // Particle nodes around the shape
    const particlesCount = 90;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 22 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x7dd3fc : 0x0284c7,
      size: 1.5,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    materialsRef.current.points = particleMaterial;
    const pointsMesh = new THREE.Points(particleGeometry, particleMaterial);
    group.add(pointsMesh);

    // Soft lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 0.8;
      targetY = ((e.clientY / innerHeight) - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards mouse
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      group.rotation.y += 0.002;
      group.rotation.x += 0.001;

      group.position.x = currentX * 12;
      group.position.y = -currentY * 12;

      innerOcta.rotation.y -= 0.004;
      innerOcta.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 ${
        theme === 'dark' ? 'opacity-80' : 'opacity-60'
      }`}
      aria-hidden="true"
    />
  );
};
