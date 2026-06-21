import { useEffect, useRef } from 'react'
import type { ControlState } from '../types/game'

const FORWARD_KEYS = new Set(['KeyW', 'ArrowUp'])
const BACKWARD_KEYS = new Set(['KeyS', 'ArrowDown'])
const LEFT_KEYS = new Set(['KeyA', 'ArrowLeft'])
const RIGHT_KEYS = new Set(['KeyD', 'ArrowRight'])

export function useInputControls() {
  const stateRef = useRef<ControlState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const setFlag = (code: string, value: boolean) => {
      const state = stateRef.current
      if (FORWARD_KEYS.has(code)) state.forward = value
      else if (BACKWARD_KEYS.has(code)) state.backward = value
      else if (LEFT_KEYS.has(code)) state.left = value
      else if (RIGHT_KEYS.has(code)) state.right = value
    }

    const handleKeyDown = (e: KeyboardEvent) => setFlag(e.code, true)
    const handleKeyUp = (e: KeyboardEvent) => setFlag(e.code, false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return stateRef
}
