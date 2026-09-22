import { describe, expect, it } from 'vitest'
import { indiaCfo, validateEdition } from './editions'

describe('edition schema', () => {
  it('accepts the complete edition', () => expect(validateEdition(indiaCfo)).toBe(indiaCfo))
  it('rejects duplicate scenes', () => expect(() => validateEdition({ ...indiaCfo, scenes: [...indiaCfo.scenes, indiaCfo.scenes[0]] })).toThrow(/Duplicate scene/))
})
