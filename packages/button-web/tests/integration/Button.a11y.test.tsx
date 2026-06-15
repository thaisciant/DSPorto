import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../../src/Button'

expect.extend(toHaveNoViolations)

describe('Button — accessibility', () => {
  it('primary default has no axe violations', async () => {
    const { container } = render(<Button label="Publicar" onPress={vi.fn()} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('secondary default has no axe violations', async () => {
    const { container } = render(<Button label="Salvar" onPress={vi.fn()} variant="secondary" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('disabled button has no axe violations', async () => {
    const { container } = render(<Button label="Disabled" onPress={vi.fn()} isDisabled />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('loading button has no axe violations', async () => {
    const { container } = render(<Button label="Loading" onPress={vi.fn()} isLoading />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
