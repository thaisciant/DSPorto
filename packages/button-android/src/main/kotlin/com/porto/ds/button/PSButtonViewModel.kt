package com.porto.ds.button

import androidx.compose.ui.graphics.Color
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class PSButtonViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(ButtonUiState())
    val uiState: StateFlow<ButtonUiState> = _uiState.asStateFlow()

    fun processIntent(
        intent: ButtonIntent,
        onPress: (() -> Unit)? = null,
    ) {
        val current = _uiState.value
        when (intent) {
            is ButtonIntent.Press -> {
                if (!current.isDisabled && !current.isLoading) onPress?.invoke()
            }
            is ButtonIntent.HoverEnter -> {
                if (!current.isDisabled && !current.isLoading) {
                    updateInteraction(ButtonInteractionState.Hover)
                }
            }
            is ButtonIntent.HoverExit -> {
                if (!current.isDisabled && !current.isLoading) {
                    updateInteraction(ButtonInteractionState.Default)
                }
            }
            is ButtonIntent.Configure -> {
                val impliedDisabled = intent.isDisabled || intent.isLoading
                val newState =
                    if (impliedDisabled) {
                        ButtonInteractionState.Disabled
                    } else {
                        ButtonInteractionState.Default
                    }
                _uiState.value =
                    current.copy(
                        variant = intent.variant,
                        size = intent.size,
                        isDisabled = impliedDisabled,
                        isLoading = intent.isLoading,
                        interactionState = newState,
                        tokenSet = resolveTokenSet(intent.variant, newState),
                    )
            }
        }
    }

    fun resolveTokenSet(
        variant: ButtonVariant,
        state: ButtonInteractionState,
    ): ButtonTokenSet {
        val bg = PSButtonTokens.Colors.Background
        val fg = PSButtonTokens.Colors.Foreground
        val brd = PSButtonTokens.Colors.Border
        val isDisabled = state == ButtonInteractionState.Disabled || state == ButtonInteractionState.Loading

        val backgroundColor: Color =
            when {
                variant is ButtonVariant.Primary && state == ButtonInteractionState.Hover -> bg.PrimaryHover
                variant is ButtonVariant.Primary && state == ButtonInteractionState.Active -> bg.PrimaryActive
                variant is ButtonVariant.Primary && isDisabled -> bg.PrimaryDisabled
                variant is ButtonVariant.Primary -> bg.Primary
                variant is ButtonVariant.Secondary && state == ButtonInteractionState.Hover -> bg.SecondaryHover
                variant is ButtonVariant.Secondary && state == ButtonInteractionState.Active -> bg.SecondaryActive
                variant is ButtonVariant.Secondary -> bg.Secondary
                variant is ButtonVariant.Ghost && state == ButtonInteractionState.Hover -> bg.GhostHover
                variant is ButtonVariant.Ghost -> bg.Ghost
                variant is ButtonVariant.Destructive && state == ButtonInteractionState.Hover -> bg.DestructiveHover
                variant is ButtonVariant.Destructive && isDisabled -> bg.DestructiveDisabled
                variant is ButtonVariant.Destructive -> bg.Destructive
                else -> bg.Primary
            }

        val foregroundColor: Color =
            when {
                isDisabled -> fg.PrimaryDisabled
                variant is ButtonVariant.Primary -> fg.Primary
                variant is ButtonVariant.Secondary -> fg.Secondary
                variant is ButtonVariant.Ghost -> fg.Ghost
                variant is ButtonVariant.Destructive -> fg.Destructive
                else -> fg.Primary
            }

        val (borderColor, borderWidth) =
            if (variant is ButtonVariant.Secondary) {
                (if (isDisabled) brd.SecondaryDisabled else brd.Secondary) to PSButtonTokens.BorderWidth.value
            } else {
                Color.Transparent to 0f
            }

        return ButtonTokenSet(
            backgroundColor = backgroundColor,
            foregroundColor = foregroundColor,
            borderColor = borderColor,
            borderWidth = borderWidth,
            focusRingColor = brd.FocusRing,
        )
    }

    private fun updateInteraction(newState: ButtonInteractionState) {
        val current = _uiState.value
        _uiState.value =
            current.copy(
                interactionState = newState,
                tokenSet = resolveTokenSet(current.variant, newState),
            )
    }
}
