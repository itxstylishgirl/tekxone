import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'

const capabilityColors = ['#1877F2', '#60A5FA', '#2D8CFF', '#A6D3FF', '#1760C2', '#4E9FFF']

function ServiceOrbit() {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.18
    group.current.rotation.x += (state.pointer.y * 0.12 - group.current.rotation.x) * 0.025
  })

  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[0.58, 1]} />
        <meshPhysicalMaterial color="#1877F2" emissive="#0D3974" emissiveIntensity={1.6} metalness={0.7} roughness={0.2} wireframe />
      </mesh>
      <mesh rotation={[0.8, 0.25, 0.45]}>
        <torusGeometry args={[1.26, 0.012, 8, 120]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.55} />
      </mesh>
      {capabilityColors.map((color, index) => {
        const angle = (index / capabilityColors.length) * Math.PI * 2
        return (
          <mesh key={color} position={[Math.cos(angle) * 1.24, Math.sin(angle * 2) * 0.24, Math.sin(angle) * 1.24]}>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} metalness={0.45} roughness={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function ServicesScene() {
  return (
    <div className="page-scene services-hero-scene" role="img" aria-label="Animated 3D service capability orbit">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }} dpr={1} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.65} />
        <pointLight position={[2, 2, 3]} color="#1877F2" intensity={5} />
        <Float speed={1.25} rotationIntensity={0.14} floatIntensity={0.25}><ServiceOrbit /></Float>
        <Sparkles count={26} scale={4.4} size={2} speed={0.22} color="#60A5FA" />
      </Canvas>
    </div>
  )
}
