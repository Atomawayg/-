import type { PointerEvent, RefObject } from 'react'
import type { ControlState } from '../../types/game'
import { useIsTouchDevice } from '../../hooks/useIsTouchDevice'

interface TouchControlsProps {
  controlsRef: RefObject<ControlState>
}

type ControlKey = keyof ControlState

function buttonHandlers(controlsRef: RefObject<ControlState>, key: ControlKey) {
  const setValue = (value: boolean) => (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    controlsRef.current[key] = value
  }
  return {
    onPointerDown: setValue(true),
    onPointerUp: setValue(false),
    onPointerLeave: setValue(false),
    onPointerCancel: setValue(false),
  }
}

const BUTTON_CLASS =
  'pointer-events-auto flex h-16 w-16 select-none items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-2xl font-bold text-slate-700 shadow-lg active:bg-pastel-sky'

export function TouchControls({ controlsRef }: TouchControlsProps) {
  const isTouchDevice = useIsTouchDevice()
  if (!isTouchDevice) return null

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 grid grid-cols-3 grid-rows-3 gap-2" style={{ touchAction: 'none' }}>
      <div />
      <button type="button" {...buttonHandlers(controlsRef, 'forward')} className={`${BUTTON_CLASS} col-start-2 row-start-1`} aria-label="Forward">
        ▲
      </button>
      <div />
      <button type="button" {...buttonHandlers(controlsRef, 'left')} className={`${BUTTON_CLASS} col-start-1 row-start-2`} aria-label="Turn left">
        ◀
      </button>
      <div />
      <button type="button" {...buttonHandlers(controlsRef, 'right')} className={`${BUTTON_CLASS} col-start-3 row-start-2`} aria-label="Turn right">
        ▶
      </button>
      <div />
      <button type="button" {...buttonHandlers(controlsRef, 'backward')} className={`${BUTTON_CLASS} col-start-2 row-start-3`} aria-label="Backward">
        ▼
      </button>
      <div />
    </div>
  )
}
