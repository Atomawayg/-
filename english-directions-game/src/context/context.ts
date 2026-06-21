import { createContext, type Dispatch } from 'react'
import type { GameAction, GameState } from '../types/game'

export interface GameStateContextValue {
  state: GameState
  dispatch: Dispatch<GameAction>
}

export const GameStateContext = createContext<GameStateContextValue | null>(null)
