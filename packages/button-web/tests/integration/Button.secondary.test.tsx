import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../../src/Button'

describe('Button — Secondary variant', () => {
  it('renders with secondary class', () => {
    render(<Button label="Secondary" onPress={vi.fn()} variant="secondary" />)
    expect(screen.getByRole('button')).toHaveClass('btn--secondary')
  })

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn()
    render(<Button label="Secondary" onPress={onPress} variant="secondary" />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Secondary" onPress={onPress} variant="secondary" isDisabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('SM/MD/LG sizes are all present via class', () => {
    const { rerender } = render(<Button label="S" onPress={vi.fn()} variant="secondary" size="sm" />)
    expect(screen.getByRole('button')).toHaveClass('btn--sm')
    rerender(<Button label="M" onPress={vi.fn()} variant="secondary" size="md" />)
    expect(screen.getByRole('button')).toHaveClass('btn--md')
    rerender(<Button label="L" onPress={vi.fn()} variant="secondary" size="lg" />)
    expect(screen.getByRole('button')).toHaveClass('btn--lg')
  })

  it('disabled secondary has aria-disabled', () => {
    render(<Button label="Disabled" onPress={vi.fn()} variant="secondary" isDisabled />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })
})
