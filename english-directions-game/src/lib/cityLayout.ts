import type { BuildingDef, GridCell } from '../types/game'
import { BLOCK_COUNT } from './grid'

export const BUILDINGS: BuildingDef[] = [
  {
    id: 'hospital',
    name: 'the hospital',
    block: { col: 0, row: 0 },
    color: '#ffd6e0',
    roofColor: '#ff8fa3',
    heightUnits: 3,
    isTargetable: true,
    nearbyLandmarkId: 'library',
  },
  {
    id: 'library',
    name: 'the library',
    block: { col: 1, row: 0 },
    color: '#cfe8ff',
    roofColor: '#7fb8f0',
    heightUnits: 2,
    isTargetable: true,
    nearbyLandmarkId: 'hospital',
  },
  {
    id: 'school',
    name: 'the school',
    block: { col: 3, row: 0 },
    color: '#fff3b0',
    roofColor: '#f0c93a',
    heightUnits: 2,
    isTargetable: true,
    nearbyLandmarkId: 'office',
  },
  {
    id: 'park',
    name: 'the park',
    block: { col: 0, row: 2 },
    color: '#c8f4de',
    roofColor: '#7fdba0',
    heightUnits: 0,
    isPark: true,
    isTargetable: true,
    nearbyLandmarkId: 'apartments',
  },
  {
    id: 'bakery',
    name: 'the bakery',
    block: { col: 2, row: 2 },
    color: '#ffe1c6',
    roofColor: '#f5a35c',
    heightUnits: 1,
    isTargetable: true,
    nearbyLandmarkId: 'apartments',
  },
  {
    id: 'office',
    name: 'the office building',
    block: { col: 3, row: 1 },
    color: '#e3d6ff',
    roofColor: '#b59af0',
    heightUnits: 4,
    isTargetable: false,
  },
  {
    id: 'apartments',
    name: 'the apartment building',
    block: { col: 1, row: 2 },
    color: '#ffe0ef',
    roofColor: '#e98fc0',
    heightUnits: 5,
    isTargetable: false,
  },
  {
    id: 'shop',
    name: 'the corner shop',
    block: { col: 3, row: 3 },
    color: '#d9f2d0',
    roofColor: '#8fcf6a',
    heightUnits: 1,
    isTargetable: false,
  },
]

export const BUILDINGS_BY_ID: Record<string, BuildingDef> = Object.fromEntries(
  BUILDINGS.map((b) => [b.id, b]),
)

export const TARGETABLE_BUILDINGS = BUILDINGS.filter((b) => b.isTargetable)

export function buildCityLayout(): GridCell[][] {
  const layout: GridCell[][] = []
  for (let row = 0; row < BLOCK_COUNT; row++) {
    const rowCells: GridCell[] = []
    for (let col = 0; col < BLOCK_COUNT; col++) {
      const building = BUILDINGS.find((b) => b.block.col === col && b.block.row === row)
      if (building) {
        rowCells.push({
          col,
          row,
          type: building.isPark ? 'park' : 'building',
          buildingId: building.id,
        })
      } else {
        rowCells.push({ col, row, type: 'empty' })
      }
    }
    layout.push(rowCells)
  }
  return layout
}

export const CITY_LAYOUT: GridCell[][] = buildCityLayout()

export function buildingAdjacentToIntersection(col: number, row: number): BuildingDef | undefined {
  const candidates: Array<{ col: number; row: number }> = [
    { col: col - 1, row: row - 1 },
    { col, row: row - 1 },
    { col: col - 1, row },
    { col, row },
  ]
  for (const c of candidates) {
    const building = BUILDINGS.find((b) => b.block.col === c.col && b.block.row === c.row)
    if (building) return building
  }
  return undefined
}
