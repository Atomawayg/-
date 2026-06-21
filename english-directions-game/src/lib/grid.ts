export const GRID_SIZE = 5
export const BLOCK_COUNT = GRID_SIZE - 1
export const BLOCK_SIZE = 20
export const ROAD_WIDTH = 7
export const BUILDING_FOOTPRINT_RATIO = 0.6
export const TRIGGER_RATIO = 0.8

export function intersectionWorldPos(col: number, row: number): { x: number; z: number } {
  return { x: col * BLOCK_SIZE, z: row * BLOCK_SIZE }
}

export function blockCenterWorldPos(col: number, row: number): { x: number; z: number } {
  return { x: col * BLOCK_SIZE + BLOCK_SIZE / 2, z: row * BLOCK_SIZE + BLOCK_SIZE / 2 }
}

export const WORLD_MIN = -BLOCK_SIZE / 2
export const WORLD_MAX = BLOCK_COUNT * BLOCK_SIZE + BLOCK_SIZE / 2
