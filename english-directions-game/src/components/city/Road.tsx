import { BLOCK_COUNT, BLOCK_SIZE } from '../../lib/grid'

export function Road() {
  const span = BLOCK_COUNT * BLOCK_SIZE
  const center = span / 2

  return (
    <mesh position={[center, 0, center]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[span + BLOCK_SIZE, span + BLOCK_SIZE]} />
      <meshStandardMaterial color="#52545c" />
    </mesh>
  )
}
