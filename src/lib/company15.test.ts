import { describe, expect, it } from 'vitest'
import { calculateFinancials, fifteenMinuteCompany } from './company15'

describe('15-minute company branching', () => {
  it('calculates internally consistent recurring economics', () => {
    const direct = calculateFinancials(fifteenMinuteCompany.segments.a, 500)
    expect(direct).toEqual({ mrr: 49500, arr: 594000, monthlyGrossProfit: 37125, cacPaybackMonths: 240 / (99 * .75) })
  })

  it('materially changes economics and positioning by segment', () => {
    const segments = Object.values(fifteenMinuteCompany.segments)
    expect(new Set(segments.map(segment => segment.monthlyPrice)).size).toBe(3)
    expect(new Set(segments.map(segment => segment.acquisitionCost)).size).toBe(3)
    expect(new Set(segments.map(segment => segment.headline)).size).toBe(3)
    expect(calculateFinancials(segments[2], segments[2].customers[1]).arr).not.toBe(calculateFinancials(segments[0], segments[0].customers[1]).arr)
  })
})
