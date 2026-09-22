import { describe, expect, it } from 'vitest'
import { move } from './navigation'

describe('beat navigation', () => {
  const counts = [4, 4]
  it('advances beats and crosses scene boundaries', () => {
    expect(move({ scene: 0, beat: 2 }, 1, counts)).toEqual({ scene: 0, beat: 3 })
    expect(move({ scene: 0, beat: 3 }, 1, counts)).toEqual({ scene: 1, beat: 0 })
  })
  it('moves backward safely across scenes', () => {
    expect(move({ scene: 1, beat: 0 }, -1, counts)).toEqual({ scene: 0, beat: 3 })
    expect(move({ scene: 0, beat: 0 }, -1, counts)).toEqual({ scene: 0, beat: 0 })
  })
  it('stops at the final beat', () => expect(move({ scene: 1, beat: 3 }, 1, counts)).toEqual({ scene: 1, beat: 3 }))
})
