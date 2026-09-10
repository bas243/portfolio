import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { labExperiments } from '../data/lab';
import { FlaskConical, Play, RotateCcw, Volume2, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

export const LabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('geom-morph');

  // 1. Interactive 3D Geometry Morpher Ref
  const geomContainerRef = useRef<HTMLDivElement>(null);
  const [currentShape, setCurrentShape] = useState<'torus' | 'icosahedron' | 'ring'>('torus');
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);

  useEffect(() => {
    if (activeTab !== 'geom-morph') return;
    const container = geomContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    let mesh: THREE.Mesh;
    const createGeo = (type: 'torus' | 'icosahedron' | 'ring') => {
      if (type === 'torus') return new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      if (type === 'icosahedron') return new THREE.IcosahedronGeometry(1.3, 1);
      return new THREE.TorusGeometry(1.4, 0.25, 16, 100);
    };

    const mat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      wireframe: wireframeMode,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0xd4a373,
      emissiveIntensity: 0.2,
    });

    mesh = new THREE.Mesh(createGeo(currentShape), mat);
    scene.add(mesh);

    const light = new THREE.PointLight(0xfff7ed, 2.2, 12);
    light.position.set(2, 3, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    let animId: number;
    const animate = () => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
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
      mat.dispose();
      mesh.geometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeTab, currentShape, wireframeMode]);

  // 2. Interactive 2D Gravitational Particle Canvas
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (activeTab !== 'particle-gravity') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ['#d4a373', '#cbd5e1', '#94a3b8', '#f5f3ee'];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const render = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (220 - dist) / 220;
            p.vx += (dx / dist) * force * 0.45;
            p.vy += (dy / dist) * force * 0.45;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTab]);

  // 3. Procedural Audio Synthesizer Controls
  const [synthFreq, setSynthFreq] = useState<number>(440);
  const [synthType, setSynthType] = useState<OscillatorType>('sine');

  const handlePlaySynth = () => {
    sound.playTone(synthFreq, synthType, 0.4);
  };

  // 4. Matrix Glitch Cypher Decryptor
  const [rawText, setRawText] = useState('ENTER THE BUILD // CLASSIFIED_PROTOCOL');
  const [decryptedText, setDecryptedText] = useState('ENTER THE BUILD // CLASSIFIED_PROTOCOL');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const triggerDecrypt = (targetStr: string) => {
    setIsDecrypting(true);
    sound.playGlitch();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/';
    let iteration = 0;

    const interval = setInterval(() => {
      setDecryptedText(
        targetStr
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetStr[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetStr.length) {
        clearInterval(interval);
        setIsDecrypting(false);
      }
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <section id="lab" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-14 bg-[#0b0c0e] border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 font-mono-code text-xs text-white/50 tracking-widest uppercase">
              <span className="text-[#d4a373]">06</span>
              <span>// R&D EXPERIMENTAL SANDBOX</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#d4a373]">
                LAB.
              </span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-white/60 max-w-md">
            Interactive mathematical shaders, physical particle vortices, and sound synthesizers built to explore browser rendering limits.
          </p>
        </div>

        {/* Experiment Tab Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {labExperiments.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(exp.id);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="RUN"
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeTab === exp.id
                  ? 'bg-white/[0.08] border-white/30 text-white shadow-sm'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-white/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-code text-xs text-[#d4a373] font-bold">{exp.number}</span>
                <span className="font-mono-code text-[10px] uppercase px-2 py-0.5 rounded bg-white/5 text-white/40">
                  {exp.tag}
                </span>
              </div>
              <div className="font-display font-bold text-sm sm:text-base text-white uppercase line-clamp-1">
                {exp.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Sandbox Interactive Workspace */}
        <div className="rounded-3xl bg-[#12141a] border border-white/10 p-6 sm:p-10 shadow-xl overflow-hidden min-h-[440px] flex flex-col justify-between">
          {/* Top Experiment Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <FlaskConical className="w-5 h-5 text-[#d4a373]" />
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase">
                  {labExperiments.find((e) => e.id === activeTab)?.title}
                </h3>
                <p className="font-body text-xs text-white/50">
                  {labExperiments.find((e) => e.id === activeTab)?.subtitle}
                </p>
              </div>
            </div>
            <div className="font-mono-code text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 rounded-full">
              LIVE INTERACTIVE PROTOTYPE
            </div>
          </div>

          {/* Sandbox Body Content */}
          <div className="my-auto py-4">
            {/* 1. Geometry Morpher Sandbox */}
            {activeTab === 'geom-morph' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 relative h-[320px] rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
                  <div ref={geomContainerRef} className="w-full h-full" />
                </div>
                <div className="md:col-span-4 space-y-4 font-mono-code text-xs">
                  <div className="text-white/40 uppercase">SELECT GEOMETRIC MESH:</div>
                  <div className="flex flex-col gap-2">
                    {(['torus', 'icosahedron', 'ring'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => {
                          sound.playClick();
                          setCurrentShape(shape);
                        }}
                        className={`p-3 rounded-xl border text-left uppercase transition-all ${
                          currentShape === shape
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {shape === 'torus' ? 'TORUS KNOT 3D' : shape === 'icosahedron' ? 'ICOSAHEDRON CORE' : 'CYBER TORUS RING'}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setWireframeMode(!wireframeMode);
                    }}
                    className="w-full py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white uppercase mt-2"
                  >
                    TOGGLE WIREFRAME: {wireframeMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}

            {/* 2. Particle Gravitational Attractor Sandbox */}
            {activeTab === 'particle-gravity' && (
              <div className="relative h-[320px] rounded-2xl bg-black/50 border border-white/5 overflow-hidden flex flex-col items-center justify-center">
                <canvas ref={particleCanvasRef} className="w-full h-full cursor-crosshair" />
                <div className="absolute top-4 left-4 font-mono-code text-xs text-white/50 bg-black/60 px-3 py-1 rounded-full border border-white/10 pointer-events-none">
                  MOVE CURSOR OVER CANVAS TO ENGAGE GRAVITY FIELD
                </div>
              </div>
            )}

            {/* 3. Audio Synthesizer Sandbox */}
            {activeTab === 'cyber-synth' && (
              <div className="space-y-6 max-w-xl mx-auto text-center font-mono-code">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>FREQUENCY OSCILLATOR:</span>
                    <span className="text-[#d4a373] font-bold">{synthFreq} HZ</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="1200"
                    step="10"
                    value={synthFreq}
                    onChange={(e) => setSynthFreq(Number(e.target.value))}
                    className="w-full accent-[#d4a373] cursor-pointer"
                  />

                  <div className="flex justify-center space-x-2 pt-2">
                    {(['sine', 'square', 'sawtooth', 'triangle'] as OscillatorType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          sound.playClick();
                          setSynthType(type);
                        }}
                        className={`px-3 py-1.5 rounded text-xs uppercase ${
                          synthType === type
                            ? 'bg-white text-black font-bold shadow-sm'
                            : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePlaySynth}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="TONE"
                    className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-[#d4a373] transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>EMIT OSCILLATOR PULSE</span>
                  </button>
                </div>
              </div>
            )}

            {/* 4. Glitch Cypher Decryptor Sandbox */}
            {activeTab === 'text-decrypt' && (
              <div className="space-y-6 max-w-2xl mx-auto text-center font-mono-code">
                <div className="p-8 rounded-2xl bg-black/60 border border-white/10 space-y-6">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-widest break-all">
                    {decryptedText}
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      'ENTER THE BUILD // CLASSIFIED_PROTOCOL',
                      'OPTIMIZED 60FPS THREE.JS ENGINE',
                      'ZERO TEMPLATES // PURE BESPOKE CODE',
                    ].map((str) => (
                      <button
                        key={str}
                        onClick={() => {
                          setRawText(str);
                          triggerDecrypt(str);
                        }}
                        disabled={isDecrypting}
                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-white/30 text-xs text-white/70 hover:text-white transition-colors"
                      >
                        [ RUN: {str.slice(0, 16)}... ]
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => triggerDecrypt(rawText)}
                    disabled={isDecrypting}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="DECRYPT"
                    className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-[#d4a373] transition-all"
                  >
                    {isDecrypting ? 'DECRYPTING STREAM...' : 'DESCRAMBLE CYPHER'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sandbox Footer Info */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono-code text-[11px] text-white/40 gap-2">
            <span>MEM: VIRTUAL SANDBOX ACTIVE</span>
            <span>SHIPPED AS R&D DEMONSTRATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
