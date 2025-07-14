"use client"

import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"

function CarModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    // Gentle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.5

    // Subtle floating effect
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#000000" metalness={0.9} roughness={0.1} envMapIntensity={1} />
    </mesh>
  )
}

function Particles() {
  const count = 500
  const particlesRef = useRef<THREE.Points>(null)

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    colors[i3] = 0.8 + Math.random() * 0.2
    colors[i3 + 1] = 0.6 + Math.random() * 0.2
    colors[i3 + 2] = 0.2 + Math.random() * 0.2
  }

  useFrame((state) => {
    if (!particlesRef.current) return

    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.025) * 0.1
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} array={positions} />
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} array={colors} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function LightRays() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, ((Math.PI * 2) / 8) * i, 0]}>
          <planeGeometry args={[0.05, 5]} />
          <meshBasicMaterial color="#d97706" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} intensity={0.5} />

        <CarModel />
        <Particles />
        <LightRays />

        {/* <Environment files={moonlit} /> */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
