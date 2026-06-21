import type { BuildingDef, DirectionStep, GeneratedDirections, GridNode, Heading, TurnDirection } from '../types/game'
import { findPath } from './pathfinding'
import { buildingAdjacentToIntersection, BUILDINGS_BY_ID } from './cityLayout'
import {
  joinClauses,
  LOCATING_TEMPLATES,
  pickRandom,
  STRAIGHT_TEMPLATES,
  TURN_TEMPLATES,
} from './sentenceTemplates'

const HEADING_CYCLE: Heading[] = ['N', 'E', 'S', 'W']

function headingBetween(from: GridNode, to: GridNode): Heading {
  if (to.col > from.col) return 'E'
  if (to.col < from.col) return 'W'
  if (to.row > from.row) return 'S'
  return 'N'
}

function turnBetween(from: Heading, to: Heading): TurnDirection | null {
  if (from === to) return null
  const fromIndex = HEADING_CYCLE.indexOf(from)
  const toIndex = HEADING_CYCLE.indexOf(to)
  const delta = (toIndex - fromIndex + 4) % 4
  if (delta === 1) return 'right'
  if (delta === 3) return 'left'
  return 'around'
}

export function buildSteps(path: GridNode[], startHeading: Heading): DirectionStep[] {
  if (path.length < 2) return []

  const legHeadings: Heading[] = []
  for (let i = 1; i < path.length; i++) {
    legHeadings.push(headingBetween(path[i - 1], path[i]))
  }

  const steps: DirectionStep[] = []
  let currentHeading = startHeading
  let i = 0
  let nodeIndex = 0

  while (i < legHeadings.length) {
    const legHeading = legHeadings[i]
    const turn = turnBetween(currentHeading, legHeading)
    if (turn) {
      const turnNode = path[nodeIndex]
      const landmarkBuilding = buildingAdjacentToIntersection(turnNode.col, turnNode.row)
      steps.push({
        kind: 'turn',
        turn,
        atLandmark: landmarkBuilding ? landmarkBuilding.name : 'the traffic light',
      })
      currentHeading = legHeading
    }

    let blocks = 0
    while (i < legHeadings.length && legHeadings[i] === currentHeading) {
      blocks++
      i++
      nodeIndex++
    }
    if (blocks > 0) {
      steps.push({ kind: 'straight', blocks })
    }
  }

  return steps
}

function stepToClause(step: DirectionStep): string {
  if (step.kind === 'straight') {
    return pickRandom(STRAIGHT_TEMPLATES)(step.blocks ?? 0)
  }
  return pickRandom(TURN_TEMPLATES)(step.turn ?? 'right', step.atLandmark ?? 'the traffic light')
}

export function generateDirections(
  start: GridNode,
  startHeading: Heading,
  target: BuildingDef,
): GeneratedDirections {
  const goal = { col: target.block.col, row: target.block.row }
  const path = findPath(start, goal)
  const steps = buildSteps(path, startHeading)

  const clauses = steps.map(stepToClause).filter((c) => c.length > 0)
  const turnByTurnText = clauses.length > 0 ? joinClauses(clauses) : ''

  const refBuilding = target.nearbyLandmarkId ? BUILDINGS_BY_ID[target.nearbyLandmarkId] : undefined
  const locatingSentence = refBuilding
    ? pickRandom(LOCATING_TEMPLATES)(capitalizeFirst(target.name), refBuilding.name)
    : `${capitalizeFirst(target.name)} will be just ahead.`

  const text = [turnByTurnText, locatingSentence].filter((s) => s.length > 0).join(' ')

  return { steps, text }
}

function capitalizeFirst(text: string): string {
  return text[0].toUpperCase() + text.slice(1)
}
