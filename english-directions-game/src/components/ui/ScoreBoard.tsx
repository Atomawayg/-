import { useGameState } from '../../context/useGameState'

export function ScoreBoard() {
  const { state } = useGameState()

  return (
    <div className="pointer-events-none shrink-0 rounded-xl border border-white/60 bg-white/80 px-4 py-2 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Score</p>
      <p className="text-2xl font-bold text-slate-800">{state.score}</p>
      <p className="text-xs text-slate-500">Round {state.roundCount}</p>
    </div>
  )
}
