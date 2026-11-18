import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function OrbitingNetwork() {
  const group = useRef()
  const points = useMemo(() => Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2
    const height = Math.sin(angle * 2) * 0.32
    return new THREE.Vector3(Math.cos(angle) * 1.28, height, Math.sin(angle) * 1.28)
  }), [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.14
    group.current.rotation.x += (state.pointer.y * 0.16 - group.current.rotation.x) * 0.025
  })

  return (
    <group ref={group}>
      {points.map((point, index) => (
        <Line key={index} points={[point, points[(index + 1) % points.length]]} color="#1877F2" transparent opacity={0.55} lineWidth={1} />
      ))}
      {points.map((point, index) => (
        <mesh key={`node-${index}`} position={point}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={index % 3 === 0 ? '#A6D3FF' : '#1877F2'} />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial color="#1877F2" emissive="#0B3774" emissiveIntensity={1.4} metalness={0.7} roughness={0.24} wireframe />
      </mesh>
      <mesh rotation={[0.7, 0.3, 0.1]}>
        <torusGeometry args={[1.58, 0.012, 8, 120]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default function AboutScene() {
  return (
    <div className="page-scene about-scene" role="img" aria-label="Animated 3D technology network">
      <Canvas camera={{ position: [0, 0, 4.7], fov: 42 }} dpr={1} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 2, 3]} color="#1877F2" intensity={5} />
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.22}><OrbitingNetwork /></Float>
        <Sparkles count={30} scale={4.5} size={2} speed={0.2} color="#60A5FA" />
      </Canvas>
    </div>
  )
}
