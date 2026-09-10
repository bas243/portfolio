import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { siteConfig } from '../data/siteConfig';
import { Terminal, MapPin, Globe, Cpu, Sparkles, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = prismRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Floating Workstation / Minimal Geometric Crystal
    const geo = new THREE.OctahedronGeometry(1.4, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.2,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe edge accent
    const wireGeo = new THREE.OctahedronGeometry(1.42, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Floating Ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    scene.add(ringMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2563eb, 2.5, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    const pointLightSlate = new THREE.PointLight(0x3b82f6, 1.5, 10);
    pointLightSlate.position.set(-2, -2, 2);
    scene.add(pointLightSlate);

    let animId: number;
    const animate = () => {
      mesh.rotation.y += 0.008;
      mesh.rotation.x += 0.005;
      wireMesh.rotation.y += 0.008;
      wireMesh.rotation.x += 0.005;
      ringMesh.rotation.z -= 0.01;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const interests = ['WEB', 'DESIGN', 'E-COMMERCE', '3D', 'TECH', 'EXPERIMENTS'];

  return (
    <section id="about" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
          <span className="text-[#2563eb] font-semibold">07</span>
          <span>// ABOUT THE CREATOR</span>
        </div>

        {/* Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Developer Terminal Profile */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#f8fafc] border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden space-y-6">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 font-mono-code text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-[#2563eb]" />
                  <span className="font-semibold text-slate-700">DEV_PROFILE // BASIT_NABI</span>
                </div>
                <span className="text-emerald-700 font-semibold">STATUS: VERIFIED</span>
              </div>

              {/* Developer Metadata */}
              <div className="space-y-3">
                <div className="font-mono-code text-xs text-[#2563eb] uppercase tracking-widest font-semibold">
                  CREATIVE DEVELOPER & ARCHITECT
                </div>
                <h3 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#09090b] uppercase tracking-tight">
                  {siteConfig.developerName}
                </h3>
              </div>

              {/* Geo location details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-code text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#2563eb]" />
                  <span>LOCATION: {siteConfig.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-[#64748b]" />
                  <span>WORKING WORLDWIDE</span>
                </div>
              </div>

              {/* Bio description */}
              <p className="font-body text-base sm:text-lg text-slate-700 leading-relaxed pt-2">
                {siteConfig.bio}
              </p>

              {/* Core Interests Badges */}
              <div className="space-y-3 pt-4 border-t border-slate-200/60">
                <div className="font-mono-code text-xs text-slate-400 uppercase font-semibold">
                  CORE TECHNICAL & CREATIVE PASSIONS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 font-mono-code text-xs text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors shadow-xs font-medium"
                    >
                      #{interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 3D Workstation / Polyhedron Prism */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-center justify-center">
            <div ref={prismRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 font-mono-code text-[11px] text-slate-600 bg-white/95 px-3 py-1 rounded-full border border-slate-200/80 pointer-events-none shadow-xs font-medium">
              GEOMETRIC CORE // ACTIVE
            </div>
            <div className="absolute bottom-4 right-4 font-mono-code text-[11px] text-[#2563eb] font-semibold bg-white/95 px-3 py-1 rounded-full border border-slate-200/80 pointer-events-none shadow-xs">
              34.0837° N, 74.7973° E
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
