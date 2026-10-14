export type NavigationDirection = -1 | 1 | null

const bratislavaNextKeys = new Set(['ArrowRight', 'PageDown', 'ArrowDown', ' '])
const bratislavaPreviousKeys = new Set(['ArrowLeft', 'PageUp', 'ArrowUp'])

export function navigationDirectionForKey(key: string, isBratislavaV2: boolean): NavigationDirection {
  if (isBratislavaV2) {
    if (bratislavaNextKeys.has(key)) return 1
    if (bratislavaPreviousKeys.has(key)) return -1
    return null
  }

  if (key === 'ArrowRight' || key === ' ') return 1
  if (key === 'ArrowLeft') return -1
  return null
}

export function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    target.closest(
      'button, input, select, textarea, [contenteditable="true"], [role="button"], [role="combobox"], [role="listbox"]',
    ) !== null
  )
}
