import { describe, expect, it } from 'vitest'
import { isInteractiveTarget, navigationDirectionForKey } from './presenterKeys'

describe('navigationDirectionForKey', () => {
  it.each(['ArrowRight', 'PageDown', 'ArrowDown', ' '])('maps %s to next in Bratislava V2', (key) => {
    expect(navigationDirectionForKey(key, true)).toBe(1)
  })

  it.each(['ArrowLeft', 'PageUp', 'ArrowUp'])('maps %s to previous in Bratislava V2', (key) => {
    expect(navigationDirectionForKey(key, true)).toBe(-1)
  })

  it('preserves the India edition key mappings', () => {
    expect(navigationDirectionForKey('ArrowRight', false)).toBe(1)
    expect(navigationDirectionForKey(' ', false)).toBe(1)
    expect(navigationDirectionForKey('ArrowLeft', false)).toBe(-1)

    for (const key of ['PageDown', 'ArrowDown', 'PageUp', 'ArrowUp']) {
      expect(navigationDirectionForKey(key, false)).toBeNull()
    }
  })
})

describe('isInteractiveTarget', () => {
  it.each(['button', 'input', 'select', 'textarea'])(
    'recognizes a focused %s as interactive',
    (tagName) => {
      expect(isInteractiveTarget(document.createElement(tagName))).toBe(true)
    },
  )

  it('recognizes descendants of interactive controls', () => {
    const button = document.createElement('button')
    const label = document.createElement('span')
    button.append(label)

    expect(isInteractiveTarget(label)).toBe(true)
  })

  it('does not classify presentation surfaces as interactive', () => {
    expect(isInteractiveTarget(document.createElement('div'))).toBe(false)
  })
})
