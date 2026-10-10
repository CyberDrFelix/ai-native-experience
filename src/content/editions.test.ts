import { describe, expect, it } from 'vitest'
import { bratislavaV2, indiaCfo, validateEdition } from './editions'

describe('edition schema', () => {
  it('accepts the complete edition', () => expect(validateEdition(indiaCfo)).toBe(indiaCfo))
  it('accepts the Bratislava edition independently', () => {
    expect(validateEdition(bratislavaV2)).toBe(bratislavaV2)
    expect(bratislavaV2.scenes.find(scene => scene.id === 'work')?.beats).toHaveLength(29)
    expect(indiaCfo.scenes.find(scene => scene.id === 'work')?.beats).toHaveLength(37)
  })
  it('rejects duplicate scenes', () => expect(() => validateEdition({ ...indiaCfo, scenes: [...indiaCfo.scenes, indiaCfo.scenes[0]] })).toThrow(/Duplicate scene/))
})
