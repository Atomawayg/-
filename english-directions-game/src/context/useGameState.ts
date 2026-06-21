import { useContext } from 'react'
import { GameStateContext, type GameStateContextValue } from './context'

export function useGameState(): GameStateContextValue {
  const ctx = useContext(GameStateContext)
  if (!ctx) throw new Error('useGameState must be used within a GameStateProvider')
  return ctx
}
