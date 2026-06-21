import type { TurnDirection } from '../types/game'

export const STRAIGHT_TEMPLATES: Array<(n: number) => string> = [
  (n) => `go straight for ${n} block${n === 1 ? '' : 's'}`,
  (n) => `continue straight for ${n} block${n === 1 ? '' : 's'}`,
  (n) => `keep going for ${n} more block${n === 1 ? '' : 's'}`,
  (n) => `drive straight ahead for ${n} block${n === 1 ? '' : 's'}`,
]

function turnPhrase(dir: TurnDirection): string {
  return dir === 'around' ? 'turn around' : `turn ${dir}`
}

export const TURN_TEMPLATES: Array<(dir: TurnDirection, landmark: string) => string> = [
  (dir, landmark) => `${turnPhrase(dir)} at ${landmark}`,
  (dir, landmark) =>
    dir === 'around' ? `turn around near ${landmark}` : `make a ${dir} turn at ${landmark}`,
  (dir, landmark) => `${turnPhrase(dir)} when you reach ${landmark}`,
]

export const LOCATING_TEMPLATES: Array<(target: string, ref: string) => string> = [
  (target, ref) => `${target} will be next to ${ref}.`,
  (target, ref) => `${target} will be right across from ${ref}.`,
  (target, ref) => `${target} is on the corner, close to ${ref}.`,
  (target, ref) => `${target} will be just past ${ref}.`,
]

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function capitalize(text: string): string {
  if (text.length === 0) return text
  return text[0].toUpperCase() + text.slice(1)
}

export function joinClauses(clauses: string[]): string {
  if (clauses.length === 0) return ''
  if (clauses.length === 1) return `${capitalize(clauses[0])}.`
  if (clauses.length === 2) return `${capitalize(clauses[0])}, and ${clauses[1]}.`
  const head = clauses.slice(0, -1).join(', ')
  const tail = clauses[clauses.length - 1]
  return `${capitalize(head)}, and ${tail}.`
}
