package com.porto.ds.button

sealed class ButtonIntent {
    object Press : ButtonIntent()

    object HoverEnter : ButtonIntent()

    object HoverExit : ButtonIntent()

    data class Configure(
        val variant: ButtonVariant,
        val size: ButtonSize,
        val isDisabled: Boolean,
        val isLoading: Boolean,
    ) : ButtonIntent()
}
