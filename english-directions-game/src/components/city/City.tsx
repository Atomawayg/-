import { BUILDINGS, CITY_LAYOUT } from '../../lib/cityLayout'
import { BLOCK_SIZE, BUILDING_FOOTPRINT_RATIO, GRID_SIZE, blockCenterWorldPos } from '../../lib/grid'
import { Building } from './Building'
import { Road } from './Road'
import { TrafficLight } from './TrafficLight'

const LOT_SIZE = BLOCK_SIZE * BUILDING_FOOTPRINT_RATIO

export function City() {
  return (
    <group>
      <Road />

      {CITY_LAYOUT.flat().map((cell) => {
        const { x, z } = blockCenterWorldPos(cell.col, cell.row)
        const color = cell.type === 'empty' ? '#bfe6c4' : '#dcdcd6'
        return (
          <mesh
            key={`lot-${cell.col}-${cell.row}`}
            position={[x, 0.02, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[LOT_SIZE, LOT_SIZE]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      })}

      {BUILDINGS.map((building) => (
        <Building key={building.id} def={building} />
      ))}

      {Array.from({ length: GRID_SIZE }).flatMap((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => (
          <TrafficLight key={`light-${col}-${row}`} col={col} row={row} />
        )),
      )}
    </group>
  )
}
