import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function NeuralCore() {
  const group = useRef()
  const core = useRef()
  const nodes = useMemo(() => Array.from({ length: 68 }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / 68)
    const theta = Math.sqrt(68 * Math.PI) * phi
    const radius = 1.2 + ((index * 17) % 9) * 0.035
    return new THREE.Vector3(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    )
  }), [])
  const connections = useMemo(() => nodes.flatMap((point, index) => {
    const nearby = nodes.map((other, otherIndex) => ({ other, otherIndex, distance: point.distanceTo(other) }))
      .filter(({ otherIndex, distance }) => otherIndex > index && distance < 0.72)
    return nearby.slice(0, 3).map(({ other }) => [point, other])
  }), [nodes])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x += (state.pointer.y * 0.14 - group.current.rotation.x) * 0.03
    group.current.rotation.y += (state.pointer.x * 0.13) * 0.015
    if (core.current) core.current.rotation.y -= delta * 0.2
  })

  return (
    <group ref={group}>
      {connections.map((points, index) => <Line key={index} points={points} color="#1877F2" transparent opacity={0.24} lineWidth={0.7} />)}
      {connections.slice(0, 20).map((points, index) => <DataPulse key={`pulse-${index}`} path={points} offset={index / 20} />)}
      {nodes.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[index % 8 === 0 ? 0.047 : 0.025, 12, 12]} />
          <meshBasicMaterial color={index % 7 === 0 ? '#60A5FA' : '#1877F2'} />
        </mesh>
      ))}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.54, 2]} />
        <meshPhysicalMaterial color="#1877F2" emissive="#0A3B85" emissiveIntensity={1.4} metalness={0.65} roughness={0.22} wireframe />
      </mesh>
      <mesh rotation={[0.7, 0.3, 0.1]}>
        <torusGeometry args={[1.58, 0.009, 8, 160]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.65} />
      </mesh>
      <mesh rotation={[-0.8, 0.5, 0.9]}>
        <torusGeometry args={[1.78, 0.006, 8, 160]} />
        <meshBasicMaterial color="#1877F2" transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

function DataPulse({ path, offset }) {
  const pulse = useRef()
  useFrame((state) => {
    if (!pulse.current) return
    const progress = (state.clock.elapsedTime * 0.22 + offset) % 1
    pulse.current.position.lerpVectors(path[0], path[1], progress)
  })
  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[0.022, 8, 8]} />
      <meshBasicMaterial color="#A6D3FF" />
    </mesh>
  )
}

export default function NeuralScene() {
  return (
    <div className="neural-canvas" aria-label="Interactive animated blue neural network visualization" role="img">
      <Canvas camera={{ position: [0, 0, 5.3], fov: 42 }} dpr={1} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 2, 3]} color="#1877F2" intensity={5} />
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.24}><NeuralCore /></Float>
        <Sparkles count={42} scale={5} size={2.2} speed={0.2} color="#60A5FA" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
