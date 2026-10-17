import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Unified3DCanvasProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
}

export const Unified3DCanvas: React.FC<Unified3DCanvasProps> = ({ scrollProgress, activeSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.035);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x4e95ff, 4, 25);
    pointLightCyan.position.set(4, 5, 4);
    scene.add(pointLightCyan);

    const pointLightAmber = new THREE.PointLight(0xe5a93c, 3, 25);
    pointLightAmber.position.set(-4, -3, 3);
    scene.add(pointLightAmber);

    const mouseLight = new THREE.PointLight(0x88ccff, 2, 12);
    mouseLight.position.set(0, 0, 3);
    scene.add(mouseLight);

    // 5. Global Background Starfield / Data Particles
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      particleScales[i] = Math.random() * 1.5 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Section 3D Objects Group
    // Hero Monolith Core (Icosahedron + Wireframe)
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1117,
      roughness: 0.15,
      metalness: 0.9,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const heroMesh = new THREE.Mesh(icoGeo, icoMat);
    heroGroup.add(heroMesh);

    const wireGeo = new THREE.WireframeGeometry(icoGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x4e95ff,
      transparent: true,
      opacity: 0.35,
    });
    const heroWire = new THREE.LineSegments(wireGeo, wireMat);
    heroGroup.add(heroWire);

    // Outer orbital ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xe5a93c,
      emissive: 0xe5a93c,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.6,
    });
    const heroRing = new THREE.Mesh(ringGeo, ringMat);
    heroRing.rotation.x = Math.PI / 3;
    heroGroup.add(heroRing);

    scene.add(heroGroup);

    // Section 4 & 5 Objects: Neural Grid / IntervuIQ + IoT Hardware Blueprint
    const techGroup = new THREE.Group();
    techGroup.position.set(0, -10, 0);

    // Floating data nodes
    const nodeCount = 18;
    const nodeGeo = new THREE.OctahedronGeometry(0.2, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.8 + Math.sin(i * 2) * 0.6;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * radius
      );
      techGroup.add(node);
      nodes.push(node);
    }

    // Interconnecting lines
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodeCount * 3 * 2);
    for (let i = 0; i < nodeCount; i++) {
      const nextIdx = (i + 1) % nodeCount;
      linePositions[i * 6] = nodes[i].position.x;
      linePositions[i * 6 + 1] = nodes[i].position.y;
      linePositions[i * 6 + 2] = nodes[i].position.z;
      linePositions[i * 6 + 3] = nodes[nextIdx].position.x;
      linePositions[i * 6 + 4] = nodes[nextIdx].position.y;
      linePositions[i * 6 + 5] = nodes[nextIdx].position.z;
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    techGroup.add(networkLines);

    scene.add(techGroup);

    // Section 6 & 7: Creative Optical Prism & Dynamic Rings
    const creativeGroup = new THREE.Group();
    creativeGroup.position.set(0, -20, 0);

    const prismGeo = new THREE.CylinderGeometry(0, 1.8, 2.6, 4, 1);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.6,
      clearcoat: 1.0,
      attenuationColor: new THREE.Color(0xa855f7),
      attenuationDistance: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    prismGroup_add: creativeGroup.add(prismMesh);

    const creativeRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.0, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 })
    );
    creativeRing1.rotation.x = Math.PI / 4;
    creativeGroup.add(creativeRing1);

    const creativeRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
    );
    creativeRing2.rotation.y = Math.PI / 3;
    creativeGroup.add(creativeRing2);

    scene.add(creativeGroup);

    // 7. Mouse & Gyro tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = normX;
      targetMouseY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (gentle damping)
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Update dynamic mouse light
      mouseLight.position.x = currentMouseX * 4.5;
      mouseLight.position.y = currentMouseY * 3.5;

      // Smooth camera spline path based on scroll progress
      const p = scrollRef.current; // 0 to 1
      const totalDepth = -26; // Maps to bottom section
      const targetCamY = p * totalDepth;
      const targetCamZ = 7.5 - Math.sin(p * Math.PI) * 1.5;
      const targetCamX = Math.sin(p * Math.PI * 2) * 1.2 + currentMouseX * 0.45;

      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;

      const lookTargetY = camera.position.y - 0.2;
      camera.lookAt(currentMouseX * 0.25, lookTargetY, 0);

      if (!isReducedMotion) {
        // Calm Hero Monolith floating & rotation
        heroGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.08;
        heroMesh.rotation.x = elapsedTime * 0.1 + currentMouseY * 0.18;
        heroMesh.rotation.y = elapsedTime * 0.14 + currentMouseX * 0.18;
        heroWire.rotation.copy(heroMesh.rotation);
        heroRing.rotation.z = elapsedTime * 0.22;

        // Rotate Tech Nodes
        techGroup.rotation.y = elapsedTime * 0.1;
        nodes.forEach((node, i) => {
          node.position.y += Math.sin(elapsedTime * 1.2 + i * 0.8) * 0.0025;
          node.rotation.x = elapsedTime * 0.4;
          node.rotation.y = elapsedTime * 0.4;
        });

        // Rotate Creative Prism
        prismMesh.rotation.y = elapsedTime * 0.2;
        prismMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15;
        creativeRing1.rotation.z = elapsedTime * 0.16;
        creativeRing2.rotation.x = -elapsedTime * 0.12;

        // Organic multi-speed particle floating (6-14s subtle waves)
        particles.rotation.y = elapsedTime * 0.015 + Math.sin(elapsedTime * 0.08) * 0.01;
        particles.rotation.x = Math.sin(elapsedTime * 0.06) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      prismGeo.dispose();
      prismMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="unified-3d-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
