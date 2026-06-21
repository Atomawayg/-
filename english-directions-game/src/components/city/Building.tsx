import type { BuildingDef } from '../../types/game'
import { blockCenterWorldPos, BLOCK_SIZE, BUILDING_FOOTPRINT_RATIO } from '../../lib/grid'
import { BuildingLabel } from './BuildingLabel'

interface BuildingProps {
  def: BuildingDef
}

const FOOTPRINT = BLOCK_SIZE * BUILDING_FOOTPRINT_RATIO

export function Building({ def }: BuildingProps) {
  const { x, z } = blockCenterWorldPos(def.block.col, def.block.row)

  if (def.isPark) {
    return (
      <group position={[x, 0, z]}>
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[FOOTPRINT, FOOTPRINT]} />
          <meshStandardMaterial color={def.color} />
        </mesh>
        {[[-3.5, -3], [3.5, -3], [0, 3.5]].map(([px, pz], i) => (
          <group key={i} position={[px, 0, pz]}>
            <mesh position={[0, 0.9, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.3, 1.8, 6]} />
              <meshStandardMaterial color="#a9744f" />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow>
              <coneGeometry args={[1.3, 2, 8]} />
              <meshStandardMaterial color={def.roofColor} />
            </mesh>
          </group>
        ))}
        <BuildingLabel text={def.name} height={1} />
      </group>
    )
  }

  const height = def.heightUnits * 2.5

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[FOOTPRINT, height, FOOTPRINT]} />
        <meshStandardMaterial color={def.color} />
      </mesh>
      <mesh position={[0, height + 0.5, 0]} castShadow>
        <boxGeometry args={[FOOTPRINT * 0.85, 1, FOOTPRINT * 0.85]} />
        <meshStandardMaterial color={def.roofColor} />
      </mesh>
      <BuildingLabel text={def.name} height={height} />
    </group>
  )
}
