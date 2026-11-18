import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const latitude = 31.5204 * (Math.PI / 180)
const longitude = 74.3587 * (Math.PI / 180)
const lahorePosition = new THREE.Vector3(
  1.04 * Math.cos(latitude) * Math.cos(longitude),
  1.04 * Math.sin(latitude),
  1.04 * Math.cos(latitude) * Math.sin(longitude),
)

function Globe() {
  const globe = useRef()
  const latitudeLines = useMemo(() => [-60, -30, 0, 30, 60].map((degrees) => {
    const lat = degrees * (Math.PI / 180)
    return Array.from({ length: 65 }, (_, index) => {
      const angle = (index / 64) * Math.PI * 2
      return new THREE.Vector3(
        1.005 * Math.cos(lat) * Math.cos(angle),
        1.005 * Math.sin(lat),
        1.005 * Math.cos(lat) * Math.sin(angle),
      )
    })
  }), [])

  useFrame((state, delta) => {
    if (!globe.current) return
    globe.current.rotation.y += delta * 0.09
    globe.current.rotation.x += (state.pointer.y * 0.08 - globe.current.rotation.x) * 0.02
  })

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[0.98, 48, 48]} />
        <meshPhysicalMaterial color="#0A2A52" emissive="#06204A" emissiveIntensity={0.75} metalness={0.45} roughness={0.55} transparent opacity={0.9} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#1877F2" wireframe transparent opacity={0.19} />
      </mesh>
      {latitudeLines.map((points, index) => <Line key={index} points={points} color="#60A5FA" transparent opacity={0.27} lineWidth={0.7} />)}
      <mesh position={lahorePosition}>
        <sphereGeometry args={[0.075, 14, 14]} />
        <meshBasicMaterial color="#A6D3FF" />
      </mesh>
      <mesh position={lahorePosition}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#1877F2" transparent opacity={0.24} />
      </mesh>
      <mesh rotation={[0.45, 0.4, 0.75]}>
        <torusGeometry args={[1.36, 0.012, 8, 140]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.52} />
      </mesh>
    </group>
  )
}

export default function ContactScene() {
  return (
    <div className="page-scene contact-hero-scene" role="img" aria-label="Animated 3D globe with Lahore highlighted">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={1} gl={{ alpha: true, antialias: false }}>
        <ambientLight intensity={0.65} />
        <pointLight position={[2, 2, 3]} color="#1877F2" intensity={5} />
        <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.2}><Globe /></Float>
        <Sparkles count={22} scale={4} size={1.8} speed={0.18} color="#60A5FA" />
      </Canvas>
    </div>
  )
}
