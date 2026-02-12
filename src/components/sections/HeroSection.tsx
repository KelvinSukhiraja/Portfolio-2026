import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- WEBGL BACKGROUND (Monopo Style) ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Fragment Shader for the "Lava/Liquid" effect
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float ratio = uResolution.x / uResolution.y;
        uv.x *= ratio;

        // Create organic moving noise
        vec2 p = uv * 3.0;
        float noise = 0.0;
        for(float i = 1.0; i < 4.0; i++) {
          p += vec2(0.7 / i * sin(i * p.y + uTime + 0.3 * i) + 0.8, 0.4 / i * sin(i * p.x + uTime + 0.3 * i) + 1.6);
          noise += 0.5 / i * length(vec2(1.0 / i * sin(i * p.x), 1.0 / i * sin(i * p.y)));
        }

        // Mouse interaction
        float mouseDist = length(uv - uMouse * vec2(ratio, 1.0));
        noise -= Math.exp(-mouseDist * 5.0) * 0.2;

        // Monopo Color Palette (Deep blacks, blues, and vibrant accents)
        vec3 color1 = vec3(0.05, 0.05, 0.1); // Dark Navy
        vec3 color2 = vec3(0.4, 0.1, 0.9);   // Electric Purple
        vec3 color3 = vec3(0.1, 0.8, 0.9);   // Cyan
        
        vec3 finalColor = mix(color1, color2, noise);
        finalColor = mix(finalColor, color3, pow(noise, 3.0));

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    const animate = (time) => {
      uniforms.uTime.value = time * 0.0005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Mouse Tracking
    const handleMouseMove = (e) => {
      gsap.to(uniforms.uMouse.value, {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
        duration: 0.8,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- TYPOGRAPHY ANIMATION ---
    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(
        ".name-stack",
        { y: 40, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .from(".nav-links", { opacity: 0, duration: 1 }, "-=0.5");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white select-none">
        <h1 className="hero-title text-6xl md:text-8xl font-bold tracking-tighter mb-20 italic">
          Precision Over Noise.
        </h1>

        <div className="name-stack flex flex-col items-center">
          <span className="text-xs md:text-sm uppercase tracking-[0.5em] text-cyan-400 font-medium mb-2">
            Creative Developer
          </span>
          <h2 className="text-4xl md:text-7xl font-light tracking-tight">
            KELVIN <span className="font-black">SUKHIRAJA</span>
          </h2>
        </div>

        <div className="nav-links mt-12 flex gap-8 justify-center text-sm uppercase tracking-widest opacity-60">
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
