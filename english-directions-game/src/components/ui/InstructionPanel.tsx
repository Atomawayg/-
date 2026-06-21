import { useGameState } from '../../context/useGameState'
import { useSpeech } from '../../hooks/useSpeech'

export function InstructionPanel() {
  const { state } = useGameState()
  const { speak, isSupported, isSpeaking } = useSpeech()

  return (
    <div className="pointer-events-auto w-full rounded-xl border border-white/60 bg-white/90 px-5 py-4 shadow-lg sm:max-w-xl sm:flex-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Directions</p>
      <p className="mt-1 text-slate-800">{state.instructionText}</p>
      <button
        type="button"
        onClick={() => speak(state.instructionText)}
        disabled={!isSupported}
        className="mt-3 rounded-lg bg-pastel-sky px-3 py-1.5 text-sm font-semibold text-slate-700 shadow disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSpeaking ? '🔊 Playing…' : '🔊 Play audio'}
      </button>
    </div>
  )
}
