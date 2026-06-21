import type { GridNode } from '../types/game'
import { GRID_SIZE } from './grid'

function key(node: GridNode): string {
  return `${node.col},${node.row}`
}

export function findPath(start: GridNode, goal: GridNode): GridNode[] {
  if (start.col === goal.col && start.row === goal.row) return [start]

  const queue: GridNode[] = [start]
  const visited = new Set<string>([key(start)])
  const parent = new Map<string, GridNode>()

  while (queue.length > 0) {
    const current = queue.shift()!
    if (current.col === goal.col && current.row === goal.row) {
      return reconstructPath(parent, start, goal)
    }

    const neighbors: GridNode[] = [
      { col: current.col + 1, row: current.row },
      { col: current.col - 1, row: current.row },
      { col: current.col, row: current.row + 1 },
      { col: current.col, row: current.row - 1 },
    ]

    for (const neighbor of neighbors) {
      if (neighbor.col < 0 || neighbor.col >= GRID_SIZE) continue
      if (neighbor.row < 0 || neighbor.row >= GRID_SIZE) continue
      const k = key(neighbor)
      if (visited.has(k)) continue
      visited.add(k)
      parent.set(k, current)
      queue.push(neighbor)
    }
  }

  return [start]
}

function reconstructPath(parent: Map<string, GridNode>, start: GridNode, goal: GridNode): GridNode[] {
  const path: GridNode[] = [goal]
  let current = goal
  while (!(current.col === start.col && current.row === start.row)) {
    const prev = parent.get(key(current))
    if (!prev) break
    path.push(prev)
    current = prev
  }
  return path.reverse()
}
