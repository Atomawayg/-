import type { RefObject } from 'react'
import type { ControlState } from '../../types/game'
import { InstructionPanel } from './InstructionPanel'
import { ScoreBoard } from './ScoreBoard'
import { MiniMap } from './MiniMap'
import { RoundFeedback } from './RoundFeedback'
import { TouchControls } from './TouchControls'

interface GameUIProps {
  controlsRef: RefObject<ControlState>
}

export function GameUI({ controlsRef }: GameUIProps) {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 flex flex-col items-start gap-2 p-3 sm:flex-row sm:justify-between">
        <ScoreBoard />
        <InstructionPanel />
        <MiniMap />
      </div>
      <RoundFeedback />
      <TouchControls controlsRef={controlsRef} />
    </>
  )
}
