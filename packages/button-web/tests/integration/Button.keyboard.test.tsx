import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../../src/Button'

describe('Button — keyboard navigation', () => {
  it('receives focus via Tab', async () => {
    render(<Button label="Focus" onPress={vi.fn()} />)
    await userEvent.tab()
    expect(screen.getByRole('button')).toHaveFocus()
  })

  it('activates on Enter key', async () => {
    const onPress = vi.fn()
    render(<Button label="Enter" onPress={onPress} />)
    await userEvent.tab()
    await userEvent.keyboard('{Enter}')
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('activates on Space key', async () => {
    const onPress = vi.fn()
    render(<Button label="Space" onPress={onPress} />)
    await userEvent.tab()
    await userEvent.keyboard(' ')
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('does not activate on Escape key', async () => {
    const onPress = vi.fn()
    render(<Button label="Escape" onPress={onPress} />)
    await userEvent.tab()
    await userEvent.keyboard('{Escape}')
    expect(onPress).not.toHaveBeenCalled()
  })

  it('disabled button is not reachable via Tab', async () => {
    render(<Button label="Disabled" onPress={vi.fn()} isDisabled />)
    await userEvent.tab()
    expect(screen.getByRole('button')).not.toHaveFocus()
  })
})
