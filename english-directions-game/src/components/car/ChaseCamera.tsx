import { useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, type Group } from 'three'

const FOLLOW_DISTANCE = 13
const FOLLOW_HEIGHT = 9
const LOOK_AHEAD = 8
const POSITION_LERP = 4
const LOOK_LERP = 6

interface ChaseCameraProps {
  carRef: RefObject<Group | null>
}

export function ChaseCamera({ carRef }: ChaseCameraProps) {
  const { camera } = useThree()
  const desiredPosRef = useRef(new Vector3())
  const rawLookAtRef = useRef(new Vector3())
  const currentLookAtRef = useRef(new Vector3())
  const initializedRef = useRef(false)

  useFrame((_, delta) => {
    const car = carRef.current
    if (!car) return

    const heading = car.rotation.y
    const forwardX = Math.sin(heading)
    const forwardZ = Math.cos(heading)

    desiredPosRef.current.set(
      car.position.x - forwardX * FOLLOW_DISTANCE,
      FOLLOW_HEIGHT,
      car.position.z - forwardZ * FOLLOW_DISTANCE,
    )
    rawLookAtRef.current.set(
      car.position.x + forwardX * LOOK_AHEAD,
      car.position.y + 1,
      car.position.z + forwardZ * LOOK_AHEAD,
    )

    if (!initializedRef.current) {
      camera.position.copy(desiredPosRef.current)
      currentLookAtRef.current.copy(rawLookAtRef.current)
      initializedRef.current = true
    } else {
      const posAlpha = Math.min(1, POSITION_LERP * delta)
      const lookAlpha = Math.min(1, LOOK_LERP * delta)
      camera.position.lerp(desiredPosRef.current, posAlpha)
      currentLookAtRef.current.lerp(rawLookAtRef.current, lookAlpha)
    }

    camera.lookAt(currentLookAtRef.current)
  })

  return null
}
