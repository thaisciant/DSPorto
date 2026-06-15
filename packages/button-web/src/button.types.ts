export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize    = 'sm' | 'md' | 'lg'
export type ButtonState   = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading'

export interface ButtonTokenSet {
  backgroundColor: string
  foregroundColor: string
  borderColor: string
  borderWidth: string
  focusRingColor: string
  focusRingWidth: string
  focusRingOffset: string
  borderRadius: string
}

export interface ButtonProps {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  onPress: () => void
  isDisabled?: boolean
  isLoading?: boolean
  fullWidth?: boolean
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
  accessibilityLabel?: string
}
