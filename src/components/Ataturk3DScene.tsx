import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Compass, Shield, Maximize2, RotateCcw } from "lucide-react";
import { playStampSound } from "@/lib/audio";

export function Ataturk3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Three.js Particle & Light Canvas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Ambient & Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xffb703, 3, 50);
    goldLight.position.set(5, 5, 10);
    scene.add(goldLight);

    const crimsonLight = new THREE.PointLight(0xe63946, 2.5, 50);
    crimsonLight.position.set(-6, -4, 8);
    scene.add(crimsonLight);

    // 2. 3D Floating Gold Particles / Embers System
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xfb8500);
    const crimsonColor = new THREE.Color(0xe63946);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spherical distribution around center
      const radius = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = radius * Math.cos(phi);

      const mixedColor =
        Math.random() > 0.4
          ? goldColor
          : Math.random() > 0.5
          ? crimsonColor
          : whiteColor;

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      scales[i] = Math.random() * 2.5 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material with additive glow
    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Ring Orbit
    const ringGeo = new THREE.TorusGeometry(8.5, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe63946,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow majestic rotation
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.12;

      ring.rotation.z = elapsedTime * 0.05;
      ring.rotation.y = Math.cos(elapsedTime * 0.04) * 0.2;

      // Pulse lights gently
      goldLight.intensity = 2.5 + Math.sin(elapsedTime * 2) * 0.6;
      crimsonLight.intensity = 2.0 + Math.cos(elapsedTime * 1.8) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 450;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle interactive 3D Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsAutoRotating(false);
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    setIsAutoRotating(true);
  };

  const handlePlaqueClick = () => {
    playStampSound();
  };

  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper py-16">
      {/* Background ambient radial aura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.556 0.216 27.5) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Text / Manifesto Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Shield className="size-4" />
              Ebedi Değerimiz · Saygı ve Minnetle
            </div>

            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.92]">
              Atatürk
              <br />
              <span className="text-seal">Tartışılamaz.</span>
            </h2>

            <div className="mt-5 border-l-2 border-seal pl-4 font-mono text-xs uppercase tracking-wider text-paper/70">
              "Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır."
            </div>

            <p className="mt-5 text-sm sm:text-base text-paper/80 leading-relaxed max-w-[50ch]">
              Paradox Interactive moderatörlerinin Türkiye Cumhuriyeti'nin kurucusunu "tartışmalı bir figür" olarak nitelendirmesi,
              yalnızca Türk oyunculara değil, bağımsızlık mücadelesine ve bir ulusun ortak onuruna yapılmış kabul edilemez bir saygısızlıktır.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="border border-paper/20 bg-paper/5 px-3 py-2 font-mono text-xs">
                <span className="text-seal font-bold">1881 — 1938</span>
                <span className="ml-2 text-paper/60">Gazi Mustafa Kemal Atatürk</span>
              </div>
              <div className="border border-paper/20 bg-paper/5 px-3 py-2 font-mono text-xs text-paper/70">
                <span>Başkomutan & Devlet Adamı</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-paper/50">
              <Sparkles className="size-3.5 text-seal animate-pulse" />
              <span>İnteraktif 3D Anıt: Farenizi görselin üzerine getirerek 3D perspektifi değiştirin.</span>
            </div>
          </div>

          {/* Right 3D Interactive Monument Card */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              className="relative w-full max-w-[440px] aspect-[3/4] [perspective:1200px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Three.js Background Particle Canvas */}
              <div
                ref={containerRef}
                className="pointer-events-none absolute -inset-10 z-0 opacity-80"
              />

              {/* 3D Holographic Monument Card */}
              <div
                ref={cardRef}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                  transition: isAutoRotating
                    ? "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    : "transform 0.1s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className="relative z-10 size-full overflow-hidden border-2 border-seal/50 bg-gradient-to-b from-ink to-black shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(230,57,70,0.25)] select-none"
              >
                {/* Dynamic Specular Glare Layer */}
                <div
                  className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 215, 0, 0.35) 0%, rgba(230, 57, 70, 0.15) 35%, transparent 70%)`,
                    opacity: glarePos.opacity,
                  }}
                />

                {/* 3D Bust Visual */}
                <div className="relative size-full overflow-hidden">
                  <img
                    src="/ataturk-3d-bust.jpg"
                    alt="3D Mustafa Kemal Atatürk - Tam Boy Dijital Heykel"
                    className="size-full object-cover object-top scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </div>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="border border-seal bg-ink/80 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-seal backdrop-blur-md">
                    3D DİJİTAL ANIT
                  </div>
                  <div className="border border-paper/20 bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper/70 backdrop-blur-md">
                    1881 - 1938
                  </div>
                </div>

                {/* Bottom Plaque Overlay */}
                <div
                  onClick={handlePlaqueClick}
                  className="absolute bottom-4 left-4 right-4 z-20 border border-seal/60 bg-ink/90 p-3.5 backdrop-blur-md cursor-pointer transition-colors hover:border-seal hover:bg-ink"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg uppercase tracking-tight text-paper">
                        Gazi Mustafa Kemal Atatürk
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-seal">
                        Türkiye Cumhuriyeti Kurucusu & Ebedi Lider
                      </div>
                    </div>
                    <div className="size-7 flex items-center justify-center border border-seal/50 text-seal">
                      ★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
