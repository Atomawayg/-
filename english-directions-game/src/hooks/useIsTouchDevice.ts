import { useState } from 'react'

function detectTouch(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function useIsTouchDevice(): boolean {
  const [isTouch] = useState(detectTouch)
  return isTouch
}
