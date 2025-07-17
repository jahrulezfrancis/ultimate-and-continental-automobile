"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, Html, useProgress } from "@react-three/drei"
import type * as THREE from "three"

// Fallback model when the GLB file isn't available
function FallbackModel({ color = "#000000" }) {
  const groupRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState(0)

  useFrame((state) => {
    setRotation(state.clock.getElapsedTime() * 0.1)
  })

  return (
    <group ref={groupRef} rotation-y={rotation}>
      {/* Car body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-0.8, -0.3, 1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[0.8, -0.3, 1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[-0.8, -0.3, -1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[0.8, -0.3, -1.2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.6, 0, 2]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFCC00" emissive="#FFCC00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.6, 0, 2]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FFCC00" emissive="#FFCC00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Try to load the GLB model, with error handling
function Model() {
  const [modelError, setModelError] = useState(false)
  const modelRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState(0)

  // Attempt to dynamically import the GLTFLoader and load the model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // This is just to check if the file exists - we're not actually using the loaded model
        // since we're using the fallback model instead
        const response = await fetch("/assets/3d/duck.glb")
        if (!response.ok) {
          throw new Error(`Failed to load model: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        console.error("Error loading 3D model:", error)
        setModelError(true)
      }
    }

    loadModel()
  }, [])

  // If there was an error loading the model, use the fallback
  if (modelError) {
    return <FallbackModel color="#d97706" />
  }

  // Rotate the model
  useFrame((state) => {
    setRotation(state.clock.getElapsedTime() * 0.1)
  })

  // We're using the fallback model for now, but in a real implementation
  // you would use the actual GLB model here
  return <FallbackModel color="#d97706" />
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-1 bg-zinc-800 overflow-hidden rounded-full">
          <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-white mt-2">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

function Controls() {
  const controlsRef = useRef<any>(null)

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={3}
      maxDistance={10}
      autoRotate={false}
      autoRotateSpeed={0.5}
    />
  )
}

export default function CarViewer3D() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} intensity={0.5} />
        <directionalLight position={[0, 5, 0]} intensity={0.5} castShadow />

        <Suspense fallback={<Loader />}>
          <Model />
          <Environment preset="night" />
        </Suspense>

        <Controls />

        <Html position={[0, -1.5, 0]}>
          <div className="bg-black/80 text-white p-2 rounded text-center text-sm w-64">
            <p>This is a simplified 3D car model. In a real implementation, this would be the actual car model.</p>
            <button
              className="mt-2 px-3 py-1 bg-amber-500 text-black text-xs rounded"
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? "Stop Rotation" : "Start Rotation"}
            </button>
          </div>
        </Html>
      </Canvas>
    </div>
  )
}
