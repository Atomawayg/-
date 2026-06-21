import { useEffect } from 'react'
import { useGameState } from '../../context/useGameState'
import { BUILDINGS_BY_ID } from '../../lib/cityLayout'

const FEEDBACK_DURATION = 2500

export function RoundFeedback() {
  const { state, dispatch } = useGameState()
  const isCorrect = state.phase === 'arrived'
  const isWrong = state.phase === 'wrong'

  useEffect(() => {
    if (!isCorrect && !isWrong) return
    const timer = setTimeout(() => dispatch({ type: 'START_NEW_ROUND' }), FEEDBACK_DURATION)
    return () => clearTimeout(timer)
  }, [isCorrect, isWrong, dispatch])

  if (!isCorrect && !isWrong) return null

  const target = BUILDINGS_BY_ID[state.targetBuildingId]

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <div className={`rounded-2xl px-8 py-5 text-center shadow-2xl ${isCorrect ? 'bg-pastel-mint' : 'bg-pastel-pink'}`}>
        <p className="text-2xl font-bold text-slate-800">{isCorrect ? 'Great job!' : "That's not quite right."}</p>
        <p className="mt-1 text-slate-700">
          {isCorrect ? `You found ${target.name}! +${state.lastDelta} points` : `That isn't ${target.name}. ${state.lastDelta} points`}
        </p>
      </div>
    </div>
  )
}
