import type { GameAction, GameState } from '../types/game'
import { TARGETABLE_BUILDINGS } from '../lib/cityLayout'
import { generateDirections } from '../lib/directionGenerator'
import { BLOCK_SIZE } from '../lib/grid'

export function pickInitialTarget(): string {
  return pickRandom(TARGETABLE_BUILDINGS).id
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function createInitialState(): GameState {
  const targetId = pickInitialTarget()
  const target = TARGETABLE_BUILDINGS.find((b) => b.id === targetId)!
  const startCell = { col: 2, row: 3 }
  const generated = generateDirections(startCell, 'N', target)

  return {
    score: 0,
    roundCount: 1,
    targetBuildingId: target.id,
    instructionText: generated.text,
    steps: generated.steps,
    carPose: {
      x: startCell.col * BLOCK_SIZE,
      z: startCell.row * BLOCK_SIZE,
      heading: 'N',
      angleDeg: 180,
      cell: startCell,
    },
    phase: 'driving',
    lastResult: null,
    lastDelta: 0,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'UPDATE_CAR_POSE':
      return { ...state, carPose: action.pose }

    case 'ARRIVED_CORRECT':
      return { ...state, score: state.score + 100, phase: 'arrived', lastResult: 'correct', lastDelta: 100 }

    case 'ARRIVED_WRONG':
      return { ...state, score: state.score - 50, phase: 'wrong', lastResult: 'wrong', lastDelta: -50 }

    case 'START_NEW_ROUND': {
      const candidates = TARGETABLE_BUILDINGS.filter((b) => b.id !== state.targetBuildingId)
      const target = pickRandom(candidates.length > 0 ? candidates : TARGETABLE_BUILDINGS)
      const generated = generateDirections(state.carPose.cell, state.carPose.heading, target)
      return {
        ...state,
        roundCount: state.roundCount + 1,
        targetBuildingId: target.id,
        instructionText: generated.text,
        steps: generated.steps,
        phase: 'driving',
        lastResult: null,
      }
    }

    default:
      return state
  }
}
