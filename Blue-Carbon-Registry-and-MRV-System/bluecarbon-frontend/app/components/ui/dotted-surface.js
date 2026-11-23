'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function DottedSurface({ className, ...props }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const SEPARATION = 100;
    const AMOUNTX = 50;
    const AMOUNTY = 30;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.set(0, 200, 800);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Clear any existing canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    containerRef.current.appendChild(renderer.domElement);

    const positions = [];
    const colors = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);

        // Green/Teal theme colors (hue 120-170)
        // ix/AMOUNTX goes from 0 to 1
        // We want hues around 140 (green-teal)
        const hue = 120 + (ix / AMOUNTX) * 50; // Range: 120 (green) to 170 (teal)
        const color = new THREE.Color();
        color.setHSL(hue / 360, 0.6, 0.5); // Saturation 0.6, Lightness 0.5 for eco-feel
        colors.push(color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array;
      let i = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;

          // Gentle wave animation
          positions[index + 1] =
            (Math.sin((ix + count) * 0.3) * 50) +
            (Math.sin((iy + count) * 0.5) * 50);

          i++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.05;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        // Double check it's still a child before removing
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent'
      }}
      {...props}
    />
  );
}

