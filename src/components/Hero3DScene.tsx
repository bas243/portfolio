import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile for particle scaling
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 400 : 900;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for all core elements
    const mainCoreGroup = new THREE.Group();
    scene.add(mainCoreGroup);

    let currentBaseX = container.clientWidth >= 1024 ? (container.clientWidth >= 1440 ? 1.9 : 1.5) : 0;

    // 1. Central Luminous Core (Icosahedron with luminous crystalline / pearl-white finish)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.2,
      emissive: 0xdbeafe,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainCoreGroup.add(coreMesh);

    // 2. Wireframe Cage with Vibrant Royal Blue Lines
    const wireGeo = new THREE.IcosahedronGeometry(1.58, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainCoreGroup.add(wireMesh);

    // 3. Second Outer Dodecahedron Ring with Soft Sapphire accents
    const outerGeo = new THREE.DodecahedronGeometry(2.0, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainCoreGroup.add(outerMesh);

    // 4. Orbiting Precision Rings
    const ringGeo = new THREE.TorusGeometry(2.45, 0.016, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    mainCoreGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.75, 0.014, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 6;
    mainCoreGroup.add(ringMesh2);

    // 5. Floating Particle Cloud
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const colorBlue = new THREE.Color(0x2563eb);
    const colorSilver = new THREE.Color(0x94a3b8);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? colorBlue : Math.random() > 0.3 ? colorSilver : colorCyan;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(2, 6, 4);
    scene.add(directionalLight);

    const pointLightBlue = new THREE.PointLight(0x2563eb, 3.5, 20);
    pointLightBlue.position.set(3, 3, 3);
    scene.add(pointLightBlue);

    const pointLightFill = new THREE.PointLight(0x93c5fd, 2.0, 18);
    pointLightFill.position.set(-3, -2, 3);
    scene.add(pointLightFill);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Interactive Click impulse
    const handleClick = () => {
      mainCoreGroup.rotation.y += 0.8;
      mainCoreGroup.rotation.x += 0.4;
    };
    container.addEventListener('click', handleClick);

    // Resize Observer for responsive canvas sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        currentBaseX = width >= 1024 ? (width >= 1440 ? 1.9 : 1.5) : 0;
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate geometries
      coreMesh.rotation.y += 0.3 * delta;
      coreMesh.rotation.x += 0.2 * delta;

      wireMesh.rotation.y -= 0.25 * delta;
      wireMesh.rotation.z += 0.15 * delta;

      outerMesh.rotation.x += 0.15 * delta;
      outerMesh.rotation.y += 0.2 * delta;

      ringMesh1.rotation.z += 0.4 * delta;
      ringMesh2.rotation.z -= 0.3 * delta;

      // Particle system subtle breathing rotation
      particleSystem.rotation.y = elapsedTime * 0.05;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Interactive mouse follow on whole core group and camera
      mainCoreGroup.position.x = currentBaseX + mouseRef.current.x * 0.3;
      mainCoreGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15 - mouseRef.current.y * 0.2;
      mainCoreGroup.rotation.y = mouseRef.current.x * 0.6 + elapsedTime * 0.1;
      mainCoreGroup.rotation.x = -mouseRef.current.y * 0.4;

      camera.position.x = mouseRef.current.x * 0.5;
      camera.position.y = mouseRef.current.y * 0.35;
      camera.lookAt(currentBaseX * 0.4, 0, 0);

      // Light oscillation
      pointLightBlue.position.x = Math.sin(elapsedTime * 0.8) * 4;
      pointLightBlue.position.z = Math.cos(elapsedTime * 0.8) * 4;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
      data-cursor="DRAG"
      title="Drag or move cursor to interact with the 3D core"
    />
  );
};
