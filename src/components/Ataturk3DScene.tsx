import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Shield } from "lucide-react";

export function Ataturk3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js Ambient Particle & Light Atmosphere
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Ambient & Gentle Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xffb703, 2.5, 45);
    goldLight.position.set(4, 5, 8);
    scene.add(goldLight);

    const crimsonLight = new THREE.PointLight(0xe63946, 2, 45);
    crimsonLight.position.set(-5, -3, 6);
    scene.add(crimsonLight);

    // 2. Majestic Floating Gold & Crimson Embers
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xfb8500);
    const crimsonColor = new THREE.Color(0xe63946);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 6 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = radius * Math.cos(phi);

      const mixedColor =
        Math.random() > 0.45
          ? goldColor
          : Math.random() > 0.5
          ? crimsonColor
          : whiteColor;

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle Halo Orbit Ring
    const ringGeo = new THREE.TorusGeometry(8, 0.035, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe63946,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Slow, majestic ambient drift
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.08;

      ring.rotation.z = elapsedTime * 0.03;
      ring.rotation.y = Math.cos(elapsedTime * 0.02) * 0.15;

      goldLight.intensity = 2.2 + Math.sin(elapsedTime * 1.5) * 0.4;
      crimsonLight.intensity = 1.8 + Math.cos(elapsedTime * 1.2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 480;
      const newH = container.clientHeight || 560;
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

  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper py-16 sm:py-20">
      {/* Background ambient radial aura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
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
                <span className="text-seal font-bold">1881 — ∞</span>
                <span className="ml-2 text-paper/70">Gazi Mustafa Kemal Atatürk</span>
              </div>
              <div className="border border-paper/20 bg-paper/5 px-3 py-2 font-mono text-xs text-paper/70">
                <span>Kurucu & Ebedi Başkomutan</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-paper/10 pt-4 font-mono text-xs text-paper/50">
              <span className="text-seal">🇹🇷</span>
              <span>Cumhuriyetimizin ve bağımsızlığımızın mimarına sonsuz saygı ve bağlılıkla.</span>
            </div>
          </div>

          {/* Right Monument Display (Freed from the card frame, stable, majestic) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] flex flex-col items-center">
              {/* Three.js Background Particle Canvas */}
              <div
                ref={containerRef}
                className="pointer-events-none absolute -inset-8 z-0 opacity-75"
              />

              {/* Ambient Spotlight Glow behind statue */}
              <div className="pointer-events-none absolute top-1/4 size-[320px] rounded-full bg-seal/15 blur-3xl" />

              {/* Leader Visual - Standing Proud & Transparent Cutout */}
              <div className="relative z-10 w-full flex justify-center">
                <img
                  src="/ataturk-transparent.png"
                  alt="Gazi Mustafa Kemal Atatürk"
                  className="w-full max-h-[580px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
                  loading="eager"
                />
              </div>

              {/* Dignified Memorial Monument Pedestal (Kaide) */}
              <div className="relative z-20 -mt-3 w-full max-w-[400px] border-t-2 border-seal/60 bg-ink/95 px-6 py-4 text-center shadow-2xl backdrop-blur-md">
                <div className="font-display text-xl uppercase tracking-widest text-paper sm:text-2xl">
                  Gazi Mustafa Kemal Atatürk
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-seal">
                  <span>1881</span>
                  <span>—</span>
                  <span className="text-sm font-bold leading-none">∞</span>
                  <span className="text-paper/30">|</span>
                  <span>Türkiye Cumhuriyeti Kurucusu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
