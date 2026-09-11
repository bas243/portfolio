import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skills } from '../data/skills';
import { SkillNode } from '../types';
import { Network, Zap, Shield, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const DigitalDNA3D: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(skills[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'frontend' | 'creative' | 'backend' | 'ecommerce'>('all');

  const activeSkill = hoveredSkill || selectedSkill;

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL not supported or disabled in DigitalDNA3D:', err);
      return;
    }

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Create 3D Nodes for all skills
    const nodeMeshes: { mesh: THREE.Mesh; data: SkillNode }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);

    const categoryColors = {
      creative: 0x2563eb, // Royal Blue
      frontend: 0x09090b, // Onyx Slate
      ecommerce: 0x059669, // Emerald
      backend: 0x7c3aed, // Violet
    };

    skills.forEach((skill) => {
      const col = categoryColors[skill.category] || 0x2563eb;
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.25,
        metalness: 0.6,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(skill.position[0], skill.position[1], skill.position[2]);
      constellationGroup.add(mesh);
      nodeMeshes.push({ mesh, data: skill });

      // Add a subtle outer ring around each node
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.16, 0.18, 16),
        new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
      );
      ring.position.copy(mesh.position);
      constellationGroup.add(ring);
    });

    // Create connecting neural fiber lines between adjacent nodes
    const lineCoords: number[] = [];
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const p1 = new THREE.Vector3(...skills[i].position);
        const p2 = new THREE.Vector3(...skills[j].position);
        const dist = p1.distanceTo(p2);
        if (dist < 2.4) {
          lineCoords.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    constellationGroup.add(linesMesh);

    // Ambient light & point lights for clear lighting on light canvas
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0x3b82f6, 2.5, 20);
    pointLight.position.set(2, 4, 3);
    scene.add(pointLight);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      constellationGroup.rotation.y += deltaX * 0.006;
      constellationGroup.rotation.x += deltaY * 0.006;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Raycaster for 3D node hover / click
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const meshesOnly = nodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshesOnly);

      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          sound.playClick();
          setSelectedSkill(hit.data);
        }
      }
    };

    container.addEventListener('click', handleCanvasClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      if (!isDragging) {
        constellationGroup.rotation.y += 0.15 * delta;
        constellationGroup.rotation.x += 0.08 * delta;
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);

      renderer.dispose();
      sphereGeo.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const filteredSkills = filterCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === filterCategory);

  return (
    <section id="skills" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-[#f8fafc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-slate-500 tracking-widest uppercase">
              <span className="text-[#2563eb] font-semibold">04</span>
              <span>// TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#09090b] uppercase tracking-tight">
              EXPERTISE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09090b] via-[#1e293b] to-[#2563eb]">
                MATRIX.
              </span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Drag the 3D constellation to inspect architectural nodes. Hover or tap to expand detailed technical proficiencies and implementation scopes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'creative', 'frontend', 'ecommerce', 'backend'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setFilterCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="FILTER"
              className={`px-4 py-1.5 rounded-full font-mono-code text-xs uppercase tracking-wider transition-all shadow-xs ${
                filterCategory === cat
                  ? 'bg-[#09090b] text-white font-bold'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Canvas + Interactive HUD Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Neural Sphere Canvas */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-center justify-center">
            <div
              ref={canvasContainerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              data-cursor="ROTATE"
              title="Drag in 3D to rotate constellation"
            />
            {/* Canvas HUD overlays */}
            <div className="absolute top-4 left-4 font-mono-code text-[11px] text-slate-600 bg-white/95 px-3 py-1 rounded-full border border-slate-200/80 backdrop-blur-sm pointer-events-none shadow-xs font-medium">
              DRAG TO ROTATE 3D MATRIX
            </div>
            <div className="absolute bottom-4 right-4 font-mono-code text-[11px] text-[#2563eb] font-semibold bg-white/95 px-3 py-1 rounded-full border border-slate-200/80 backdrop-blur-sm pointer-events-none shadow-xs">
              14 ACTIVE CAPABILITIES
            </div>
          </div>

          {/* Active Node Detail Inspector HUD */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 font-mono-code text-xs text-[#2563eb] uppercase">
                  <Network className="w-4 h-4" />
                  <span className="font-semibold">CAPABILITY INSPECTOR</span>
                </div>
                <span className="font-mono-code text-xs uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                  {activeSkill.category}
                </span>
              </div>

              <div>
                <div className="font-mono-code text-xs text-slate-400 uppercase mb-1">TECHNOLOGY:</div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#09090b] uppercase tracking-tight">
                  {activeSkill.name}
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono-code text-xs">
                  <span className="text-slate-500 font-medium">PROFICIENCY</span>
                  <span className="text-[#2563eb] font-bold">{activeSkill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#09090b] via-[#334155] to-[#2563eb] transition-all duration-500 rounded-full"
                    style={{ width: `${activeSkill.level}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-mono-code text-xs text-slate-400 uppercase">ARCHITECTURE SCOPE:</div>
                <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono-code text-xs text-slate-500">
                <span>EXPERIENCE:</span>
                <span className="text-[#09090b] font-bold">{activeSkill.experience}</span>
              </div>
            </div>

            {/* Quick-Pick Skill Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSkill(s);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredSkill(s);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  data-cursor="INSPECT"
                  className={`px-3 py-1.5 rounded-lg font-mono-code text-xs transition-all shadow-xs ${
                    activeSkill.id === s.id
                      ? 'bg-[#09090b] text-white font-bold'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/90'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
