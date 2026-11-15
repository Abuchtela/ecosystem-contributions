/**
 * Tests for the handleStatus utility exported from GridCard.tsx.
 *
 * handleStatus maps an execution-status string to the corresponding
 * status label.  We render the returned JSX with React Testing Library
 * and assert the visible text.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { handleStatus } from '@/src/app/(navbar)/(home)/component/GridCard'

function renderStatus(status: string) {
  return render(<div>{handleStatus(status)}</div>)
}

describe('handleStatus', () => {
  it('renders "Not Started" for status "not-started"', () => {
    renderStatus('not-started')
    expect(screen.getByText('Not Started')).toBeInTheDocument()
  })

  it('renders "In Discussion" for status "in-discussion"', () => {
    renderStatus('in-discussion')
    expect(screen.getByText('In Discussion')).toBeInTheDocument()
  })

  it('renders "In Progress - Open" for status "in-progress-open"', () => {
    renderStatus('in-progress-open')
    expect(screen.getByText('In Progress - Open')).toBeInTheDocument()
  })

  it('renders "In Progress - Closed" for status "in-progress-closed"', () => {
    renderStatus('in-progress-closed')
    expect(screen.getByText('In Progress - Closed')).toBeInTheDocument()
  })

  it('renders "Completed" for status "completed"', () => {
    renderStatus('completed')
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('renders "Abandoned" for status "abandoned"', () => {
    renderStatus('abandoned')
    expect(screen.getByText('Abandoned')).toBeInTheDocument()
  })

  it('defaults to "Not Started" for an unknown status', () => {
    renderStatus('unknown-status')
    expect(screen.getByText('Not Started')).toBeInTheDocument()
  })

  it('defaults to "Not Started" for an empty string', () => {
    renderStatus('')
    expect(screen.getByText('Not Started')).toBeInTheDocument()
  })
})
