import { useCallback, useRef } from 'react'

interface UseTouchSwipeOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}

export function useTouchSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50
}: UseTouchSwipeOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchEnd = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return

    const deltaX = touchStart.current.x - touchEnd.current.x
    const deltaY = touchStart.current.y - touchEnd.current.y
    const isLeftSwipe = deltaX > threshold
    const isRightSwipe = deltaX < -threshold
    const isUpSwipe = deltaY > threshold
    const isDownSwipe = deltaY < -threshold

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp()
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown()
    }
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  }
}
