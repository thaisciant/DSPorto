// Generated from channel.component.button.* — DS Essential 2.0
// Source of truth: button-tokens.html · DO NOT EDIT MANUALLY
export const buttonTokens = {
  color: {
    bg: {
      primary:             '#0047CC',
      primaryHover:        '#003087',
      primaryActive:       '#001A5C',
      primaryDisabled:     '#D8D8EE',
      secondary:           'transparent',
      secondaryHover:      '#E8EFFF',
      secondaryActive:     '#B8D4FF',
      ghost:               'transparent',
      ghostHover:          '#E8EFFF',
      ghostActive:         '#B8D4FF',
      destructive:         '#CC2200',
      destructiveHover:    '#7A1300',
      destructiveDisabled: '#D8D8EE',
    },
    fg: {
      primary:             '#FFFFFF',
      primaryDisabled:     '#8888AA',
      secondary:           '#0047CC',
      secondaryDisabled:   '#8888AA',
      ghost:               '#0047CC',
      ghostDisabled:       '#8888AA',
      destructive:         '#FFFFFF',
      destructiveDisabled: '#8888AA',
    },
    border: {
      secondary:           '#0047CC',
      secondaryDisabled:   '#D8D8EE',
      focusRing:           '#5B9BFF',
    },
  },
  numericValues: {
    radius:               '8px',
    borderWidthSecondary: '1px',
    focusRingWidth:       '2px',
    focusRingOffset:      '2px',
    sm: { height: '32px', paddingX: '12px', paddingY: '6px',  iconSize: '16px', gap: '4px' },
    md: { height: '40px', paddingX: '16px', paddingY: '9px',  iconSize: '20px', gap: '4px' },
    lg: { height: '48px', paddingX: '20px', paddingY: '12px', iconSize: '24px', gap: '8px' },
  },
  typography: {
    fontWeight: '600',
    sm: { fontSize: '12px' },
    md: { fontSize: '14px' },
    lg: { fontSize: '16px' },
  },
} as const

export type ButtonTokens = typeof buttonTokens
