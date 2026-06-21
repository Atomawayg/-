import { useRef, type RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Group } from 'three'
import type { ControlState } from '../../types/game'
import { City } from '../city/City'
import { Car } from '../car/Car'
import { ChaseCamera } from '../car/ChaseCamera'

interface GameSceneProps {
  controlsRef: RefObject<ControlState>
}

export function GameScene({ controlsRef }: GameSceneProps) {
  const carRef = useRef<Group>(null)

  return (
    <Canvas shadows camera={{ fov: 60, near: 0.1, far: 400 }}>
      <color attach="background" args={['#bcdcff']} />
      <fog attach="fog" args={['#bcdcff', 50, 160]} />
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={150}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <mesh position={[40, -0.05, 40]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#a9dba0" />
      </mesh>
      <City />
      <Car controlsRef={controlsRef} carRef={carRef} />
      <ChaseCamera carRef={carRef} />
    </Canvas>
  )
}
