import React from 'react'
import './button.css'
import type { ButtonProps } from './button.types'

export function Button({
  label,
  variant  = 'primary',
  size     = 'md',
  onPress,
  isDisabled  = false,
  isLoading   = false,
  fullWidth   = false,
  iconLeading,
  iconTrailing,
  accessibilityLabel,
}: ButtonProps): React.ReactElement {
  const effectivelyDisabled = isDisabled || isLoading

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth        ? 'btn--full-width' : '',
    isLoading        ? 'btn--loading'    : '',
    effectivelyDisabled ? 'btn--disabled' : '',
  ].filter(Boolean).join(' ')

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (effectivelyDisabled) { e.preventDefault(); return }
    onPress()
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={effectivelyDisabled}
      aria-disabled={isDisabled ? 'true' : undefined}
      aria-busy={isLoading ? 'true' : undefined}
      aria-label={accessibilityLabel ?? label}
      onClick={handleClick}
    >
      {isLoading ? (
        <span className="btn__icon btn__icon--leading" aria-hidden="true">
          <span className="btn__spinner" role="presentation" />
        </span>
      ) : iconLeading ? (
        <span className="btn__icon btn__icon--leading" aria-hidden="true">
          {iconLeading}
        </span>
      ) : null}

      <span className="btn__label">{label}</span>

      {iconTrailing && !isLoading && (
        <span className="btn__icon btn__icon--trailing" aria-hidden="true">
          {iconTrailing}
        </span>
      )}
    </button>
  )
}
