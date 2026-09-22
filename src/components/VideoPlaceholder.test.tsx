import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { VideoPlaceholder } from './VideoPlaceholder'

const copy = { src: './video/digital-felix-india-greeting.mp4', label: 'DIGITAL FELIX', state: 'PRODUCTION VIDEO · LOCAL', fallbackTitle: 'Digital Felix greeting unavailable', fallbackStatus: 'CONTINUE LIVE WITH FELIX' }

describe('VideoPlaceholder', () => {
  beforeEach(() => vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined))
  afterEach(() => { cleanup(); vi.restoreAllMocks() })

  it('uses the local production asset without native controls', () => {
    render(<VideoPlaceholder active handover={false} copy={copy} />)
    const video = screen.getByLabelText('Digital Felix production video').querySelector('video')
    expect(video).toHaveAttribute('src', copy.src)
    expect(video).not.toHaveAttribute('controls')
    expect(screen.getByRole('button', { name: /PLAY DIGITAL FELIX/ })).toBeInTheDocument()
  })

  it('retains a static fallback when media loading fails', () => {
    render(<VideoPlaceholder active handover={false} copy={copy} />)
    const video = screen.getByLabelText('Digital Felix production video').querySelector('video')
    if (!video) throw new Error('video element missing')
    fireEvent.error(video)
    expect(screen.getByText(copy.fallbackTitle)).toBeInTheDocument()
    expect(screen.getByText(copy.fallbackStatus)).toBeInTheDocument()
  })
})
