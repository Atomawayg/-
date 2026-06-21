import type { BuildingDef } from '../types/game'
import { BLOCK_SIZE, BUILDING_FOOTPRINT_RATIO, TRIGGER_RATIO, WORLD_MAX, WORLD_MIN } from './grid'

export interface AABB {
  minX: number
  maxX: number
  minZ: number
  maxZ: number
}

export function buildingFootprint(building: BuildingDef, ratio = BUILDING_FOOTPRINT_RATIO): AABB {
  const centerX = building.block.col * BLOCK_SIZE + BLOCK_SIZE / 2
  const centerZ = building.block.row * BLOCK_SIZE + BLOCK_SIZE / 2
  const half = (BLOCK_SIZE * ratio) / 2
  return { minX: centerX - half, maxX: centerX + half, minZ: centerZ - half, maxZ: centerZ + half }
}

export function pointInAABB(x: number, z: number, box: AABB): boolean {
  return x >= box.minX && x <= box.maxX && z >= box.minZ && z <= box.maxZ
}

export function resolveCollision(
  x: number,
  z: number,
  prevX: number,
  prevZ: number,
  buildings: BuildingDef[],
  carRadius: number,
): { x: number; z: number } {
  let resultX = x
  let resultZ = z

  for (const building of buildings) {
    if (building.isPark) continue
    const box = buildingFootprint(building)
    const expanded: AABB = {
      minX: box.minX - carRadius,
      maxX: box.maxX + carRadius,
      minZ: box.minZ - carRadius,
      maxZ: box.maxZ + carRadius,
    }
    if (pointInAABB(resultX, resultZ, expanded)) {
      if (!pointInAABB(prevX, resultZ, expanded)) {
        resultX = prevX
      } else if (!pointInAABB(resultX, prevZ, expanded)) {
        resultZ = prevZ
      } else {
        resultX = prevX
        resultZ = prevZ
      }
    }
  }

  resultX = Math.min(Math.max(resultX, WORLD_MIN + carRadius), WORLD_MAX - carRadius)
  resultZ = Math.min(Math.max(resultZ, WORLD_MIN + carRadius), WORLD_MAX - carRadius)

  return { x: resultX, z: resultZ }
}

export function checkBuildingTrigger(
  x: number,
  z: number,
  buildings: BuildingDef[],
): BuildingDef | null {
  for (const building of buildings) {
    const box = buildingFootprint(building, TRIGGER_RATIO)
    if (pointInAABB(x, z, box)) return building
  }
  return null
}
