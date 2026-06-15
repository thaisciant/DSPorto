import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../../src/Button'

// T057 — Ghost + Destructive variant tests

describe('Button — Ghost variant', () => {
  it('renders with ghost class', () => {
    render(<Button label="Cancel" onPress={vi.fn()} variant="ghost" />)
    expect(screen.getByRole('button')).toHaveClass('btn--ghost')
  })

  it('fires onPress when enabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Cancel" onPress={onPress} variant="ghost" />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Cancel" onPress={onPress} variant="ghost" isDisabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('SM/MD/LG sizes apply correctly', () => {
    const { rerender } = render(<Button label="G" onPress={vi.fn()} variant="ghost" size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('btn--sm')
    rerender(<Button label="G" onPress={vi.fn()} variant="ghost" size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('btn--lg')
  })
})

describe('Button — Destructive variant', () => {
  it('renders with destructive class', () => {
    render(<Button label="Remover" onPress={vi.fn()} variant="destructive" />)
    expect(screen.getByRole('button')).toHaveClass('btn--destructive')
  })

  it('fires onPress when enabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Remover" onPress={onPress} variant="destructive" />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Remover" onPress={onPress} variant="destructive" isDisabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Button label="Remover" onPress={vi.fn()} variant="destructive" isDisabled />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })
})
