import { useGameState } from '../../context/useGameState'
import { BUILDINGS } from '../../lib/cityLayout'
import { BLOCK_SIZE } from '../../lib/grid'

const VIEW_BOX = '-1 -1 6 6'

export function MiniMap() {
  const { state } = useGameState()
  const carX = state.carPose.x / BLOCK_SIZE
  const carZ = state.carPose.z / BLOCK_SIZE
  const bearing = (180 - state.carPose.angleDeg + 360) % 360

  return (
    <div className="pointer-events-none h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-lg">
      <svg viewBox={VIEW_BOX} className="h-full w-full">
        <rect x={-1} y={-1} width={6} height={6} fill="#dfe7ee" />
        {BUILDINGS.map((building) => {
          const isTarget = building.id === state.targetBuildingId
          return (
            <rect
              key={building.id}
              x={building.block.col + 0.08}
              y={building.block.row + 0.08}
              width={0.84}
              height={0.84}
              rx={0.1}
              fill={isTarget ? '#ffc94a' : building.isPark ? '#9fdcb5' : '#b9c2cf'}
              stroke={isTarget ? '#d98c00' : 'none'}
              strokeWidth={isTarget ? 0.06 : 0}
            />
          )
        })}
        <g transform={`translate(${carX} ${carZ}) rotate(${bearing})`}>
          <polygon points="0,-0.45 0.3,0.3 -0.3,0.3" fill="#ff3b3b" stroke="#7a0000" strokeWidth={0.05} />
        </g>
      </svg>
    </div>
  )
}
