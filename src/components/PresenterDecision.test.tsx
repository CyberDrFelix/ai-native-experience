import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PresenterDecision } from './PresenterDecision'

const choices = [
  { id: 'a', label: 'FIRST', outcome: 'ONE' },
  { id: 'b', label: 'SECOND', outcome: 'TWO', metrics: [{ label: 'SPEED', value: 'HIGH' }] },
  { id: 'c', label: 'THIRD', outcome: 'THREE' },
]

describe('PresenterDecision', () => {
  it('supports mouse selection with accessible pressed state', () => {
    const onSelect = vi.fn()
    render(<PresenterDecision active choices={choices} selectedId="b" showConsequence={false} onSelect={onSelect} />)
    expect(screen.getByRole('button', { name: /SECOND/ })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: /FIRST/ }))
    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('supports A–C keyboard selection', () => {
    const onSelect = vi.fn()
    render(<PresenterDecision active choices={choices} selectedId={null} showConsequence={false} onSelect={onSelect} />)
    fireEvent.keyDown(window, { key: 'c' })
    expect(onSelect).toHaveBeenCalledWith('c')
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('renders the configured consequence', () => {
    render(<PresenterDecision active choices={choices} selectedId="b" showConsequence onSelect={() => undefined} />)
    expect(screen.getByText('SPEED')).toBeInTheDocument()
    expect(screen.getByText('TWO')).toBeInTheDocument()
  })
})
