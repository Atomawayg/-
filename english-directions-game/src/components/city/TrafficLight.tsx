import { intersectionWorldPos } from '../../lib/grid'

interface TrafficLightProps {
  col: number
  row: number
}

export function TrafficLight({ col, row }: TrafficLightProps) {
  const { x, z } = intersectionWorldPos(col, row)
  const offset = 3.2

  return (
    <group position={[x + offset, 0, z + offset]}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.8, 8]} />
        <meshStandardMaterial color="#3a3f4b" />
      </mesh>
      <mesh position={[0, 2.9, 0]} castShadow>
        <boxGeometry args={[0.4, 0.9, 0.3]} />
        <meshStandardMaterial color="#2a2e38" />
      </mesh>
      <mesh position={[0, 3.2, 0.18]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff5a5a" emissive="#ff2020" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 2.9, 0.18]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ffd23a" emissive="#cc9a00" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 2.6, 0.18]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#4ad66d" emissive="#2a9d4a" emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}
