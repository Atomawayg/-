import { useReducer, type ReactNode } from 'react'
import { GameStateContext } from './context'
import { createInitialState, gameReducer } from './gameReducer'

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)

  return <GameStateContext.Provider value={{ state, dispatch }}>{children}</GameStateContext.Provider>
}
