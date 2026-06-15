import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../../src/Button'

describe('Button — interaction', () => {
  it('calls onPress when clicked', async () => {
    const onPress = vi.fn()
    render(<Button label="Click me" onPress={onPress} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('does not call onPress when disabled', async () => {
    const onPress = vi.fn()
    render(<Button label="Disabled" onPress={onPress} isDisabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('does not call onPress when loading', async () => {
    const onPress = vi.fn()
    render(<Button label="Loading" onPress={onPress} isLoading />)
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('renders label text', () => {
    render(<Button label="Publicar bundle" onPress={vi.fn()} />)
    expect(screen.getByText('Publicar bundle')).toBeInTheDocument()
  })

  it('renders correct aria-label when accessibilityLabel provided', () => {
    render(<Button label="Save" onPress={vi.fn()} accessibilityLabel="Save document" />)
    expect(screen.getByRole('button', { name: 'Save document' })).toBeInTheDocument()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Button label="Disabled" onPress={vi.fn()} isDisabled />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  it('sets aria-busy when loading', () => {
    render(<Button label="Loading" onPress={vi.fn()} isLoading />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('applies full-width class when fullWidth=true', () => {
    render(<Button label="Full" onPress={vi.fn()} fullWidth />)
    expect(screen.getByRole('button')).toHaveClass('btn--full-width')
  })

  it('activates with keyboard Enter', async () => {
    const onPress = vi.fn()
    render(<Button label="Enter" onPress={onPress} />)
    screen.getByRole('button').focus()
    await userEvent.keyboard('{Enter}')
    expect(onPress).toHaveBeenCalled()
  })

  it('activates with keyboard Space', async () => {
    const onPress = vi.fn()
    render(<Button label="Space" onPress={onPress} />)
    screen.getByRole('button').focus()
    await userEvent.keyboard(' ')
    expect(onPress).toHaveBeenCalled()
  })
})
