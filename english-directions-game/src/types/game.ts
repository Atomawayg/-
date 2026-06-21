export type Heading = 'N' | 'E' | 'S' | 'W'

export type CellType = 'empty' | 'building' | 'park'

export interface GridCell {
  col: number
  row: number
  type: CellType
  buildingId?: string
}

export interface BuildingDef {
  id: string
  name: string
  block: { col: number; row: number }
  color: string
  roofColor: string
  heightUnits: number
  isPark?: boolean
  isTargetable: boolean
  nearbyLandmarkId?: string
}

export type TurnDirection = 'left' | 'right' | 'around'

export interface DirectionStep {
  kind: 'straight' | 'turn'
  blocks?: number
  turn?: TurnDirection
  atLandmark?: string
}

export interface GeneratedDirections {
  steps: DirectionStep[]
  text: string
}

export interface GridNode {
  col: number
  row: number
}

export interface CarPose {
  x: number
  z: number
  heading: Heading
  angleDeg: number
  cell: GridNode
}

export type GamePhase = 'briefing' | 'driving' | 'arrived' | 'wrong'

export interface GameState {
  score: number
  roundCount: number
  targetBuildingId: string
  instructionText: string
  steps: DirectionStep[]
  carPose: CarPose
  phase: GamePhase
  lastResult: 'correct' | 'wrong' | null
  lastDelta: number
}

export type GameAction =
  | { type: 'UPDATE_CAR_POSE'; pose: CarPose }
  | { type: 'ARRIVED_CORRECT' }
  | { type: 'ARRIVED_WRONG'; buildingId: string }
  | { type: 'START_NEW_ROUND' }

export interface ControlState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}
