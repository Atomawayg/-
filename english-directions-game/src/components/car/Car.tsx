import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { ControlState, Heading } from '../../types/game'
import { useGameState } from '../../context/useGameState'
import { BUILDINGS } from '../../lib/cityLayout'
import { resolveCollision, checkBuildingTrigger } from '../../lib/collision'
import { BLOCK_SIZE } from '../../lib/grid'

const MAX_SPEED = 14
const MAX_REVERSE_SPEED = 8
const ACCEL = 18
const FRICTION = 14
const TURN_RATE = 2.4
const CAR_RADIUS = 1.8
const DISPATCH_INTERVAL = 0.09

function angleDegToHeading(angleDeg: number): Heading {
  const normalized = ((angleDeg % 360) + 360) % 360
  if (normalized >= 45 && normalized < 135) return 'E'
  if (normalized >= 135 && normalized < 225) return 'N'
  if (normalized >= 225 && normalized < 315) return 'W'
  return 'S'
}

interface CarProps {
  controlsRef: RefObject<ControlState>
  carRef: RefObject<Group | null>
}

export function Car({ controlsRef, carRef }: CarProps) {
  const { state, dispatch } = useGameState()
  const groupRef = carRef

  const xRef = useRef(state.carPose.x)
  const zRef = useRef(state.carPose.z)
  const headingRadRef = useRef((state.carPose.angleDeg * Math.PI) / 180)
  const speedRef = useRef(0)
  const dispatchTimerRef = useRef(0)
  const insideBuildingRef = useRef<string | null>(null)

  useFrame((_, delta) => {
    const controls = controlsRef.current
    const driving = state.phase === 'driving'

    if (driving && controls.forward) {
      speedRef.current += ACCEL * delta
    } else if (driving && controls.backward) {
      speedRef.current -= ACCEL * delta
    } else if (speedRef.current > 0) {
      speedRef.current = Math.max(0, speedRef.current - FRICTION * delta)
    } else if (speedRef.current < 0) {
      speedRef.current = Math.min(0, speedRef.current + FRICTION * delta)
    }
    speedRef.current = Math.min(Math.max(speedRef.current, -MAX_REVERSE_SPEED), MAX_SPEED)

    if (driving && controls.left) headingRadRef.current += TURN_RATE * delta
    if (driving && controls.right) headingRadRef.current -= TURN_RATE * delta

    const forwardX = Math.sin(headingRadRef.current)
    const forwardZ = Math.cos(headingRadRef.current)
    const candidateX = xRef.current + forwardX * speedRef.current * delta
    const candidateZ = zRef.current + forwardZ * speedRef.current * delta

    const resolved = resolveCollision(candidateX, candidateZ, xRef.current, zRef.current, BUILDINGS, CAR_RADIUS)
    xRef.current = resolved.x
    zRef.current = resolved.z

    if (groupRef.current) {
      groupRef.current.position.set(xRef.current, 0, zRef.current)
      groupRef.current.rotation.y = headingRadRef.current
    }

    const building = checkBuildingTrigger(xRef.current, zRef.current, BUILDINGS)
    const buildingId = building?.id ?? null
    if (buildingId !== insideBuildingRef.current) {
      insideBuildingRef.current = buildingId
      if (buildingId && driving) {
        if (buildingId === state.targetBuildingId) {
          dispatch({ type: 'ARRIVED_CORRECT' })
        } else {
          dispatch({ type: 'ARRIVED_WRONG', buildingId })
        }
      }
    }

    dispatchTimerRef.current += delta
    if (dispatchTimerRef.current >= DISPATCH_INTERVAL) {
      dispatchTimerRef.current = 0
      const angleDeg = ((headingRadRef.current * 180) / Math.PI) % 360
      dispatch({
        type: 'UPDATE_CAR_POSE',
        pose: {
          x: xRef.current,
          z: zRef.current,
          heading: angleDegToHeading(angleDeg),
          angleDeg,
          cell: {
            col: Math.round(xRef.current / BLOCK_SIZE),
            row: Math.round(zRef.current / BLOCK_SIZE),
          },
        },
      })
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.8, 0.9, 3.2]} />
        <meshStandardMaterial color="#ff7a7a" />
      </mesh>
      <mesh position={[0, 1.2, 0.4]} castShadow>
        <boxGeometry args={[1.5, 0.7, 1.6]} />
        <meshStandardMaterial color="#ffe1c6" />
      </mesh>
      {[
        [-0.95, 0.35, 1.1],
        [0.95, 0.35, 1.1],
        [-0.95, 0.35, -1.1],
        [0.95, 0.35, -1.1],
      ].map(([wx, wy, wz], i) => (
        <mesh key={i} position={[wx, wy, wz]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 12]} />
          <meshStandardMaterial color="#2a2e38" />
        </mesh>
      ))}
    </group>
  )
}
