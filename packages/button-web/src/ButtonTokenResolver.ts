import { buttonTokens } from '@ps/tokens/button'
import type { ButtonVariant, ButtonState, ButtonTokenSet } from './button.types'

export class ButtonTokenResolver {
  resolve(variant: ButtonVariant, state: ButtonState): ButtonTokenSet {
    const isDisabledState = state === 'disabled' || state === 'loading'
    const c = buttonTokens.color
    const n = buttonTokens.numericValues

    return {
      backgroundColor:  this.resolveBackground(c.bg, variant, state),
      foregroundColor:  isDisabledState ? c.fg[`${variant}Disabled` as keyof typeof c.fg] ?? c.fg.primaryDisabled
                                       : c.fg[variant as keyof typeof c.fg] as string,
      borderColor:      variant === 'secondary'
                          ? (isDisabledState ? c.border.secondaryDisabled : c.border.secondary)
                          : 'transparent',
      borderWidth:      variant === 'secondary' ? n.borderWidthSecondary : '0',
      focusRingColor:   c.border.focusRing,
      focusRingWidth:   n.focusRingWidth,
      focusRingOffset:  n.focusRingOffset,
      borderRadius:     n.radius,
    }
  }

  private resolveBackground(
    bg: typeof buttonTokens.color.bg,
    variant: ButtonVariant,
    state: ButtonState,
  ): string {
    if (state === 'disabled' || state === 'loading') {
      const disabledKey = `${variant}Disabled` as keyof typeof bg
      return bg[disabledKey] ?? bg.primaryDisabled
    }
    const stateKey = state !== 'default' && state !== 'focus'
      ? `${variant}${state.charAt(0).toUpperCase() + state.slice(1)}` as keyof typeof bg
      : variant as keyof typeof bg
    return bg[stateKey] ?? bg[variant as keyof typeof bg] as string
  }
}
