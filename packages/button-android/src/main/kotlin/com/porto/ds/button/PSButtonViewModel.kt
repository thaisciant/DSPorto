package com.porto.ds.button

import androidx.compose.ui.graphics.Color
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class PSButtonViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(ButtonUiState())
    val uiState: StateFlow<ButtonUiState> = _uiState.asStateFlow()

    fun processIntent(intent: ButtonIntent, onPress: (() -> Unit)? = null) {
        val current = _uiState.value
        when (intent) {
            is ButtonIntent.Press -> {
                if (!current.isDisabled && !current.isLoading) {
                    onPress?.invoke()
                }
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
                _uiState.value = current.copy(
                    variant    = intent.variant,
                    size       = intent.size,
                    isDisabled = impliedDisabled,
                    isLoading  = intent.isLoading,
                    interactionState = if (impliedDisabled) ButtonInteractionState.Disabled
                                       else ButtonInteractionState.Default,
                    tokenSet = resolveTokenSet(
                        intent.variant,
                        if (impliedDisabled) ButtonInteractionState.Disabled else ButtonInteractionState.Default,
                    ),
                )
            }
        }
    }

    fun resolveTokenSet(variant: ButtonVariant, state: ButtonInteractionState): ButtonTokenSet {
        val t = PSButtonTokens.Colors
        val isDisabled = state == ButtonInteractionState.Disabled || state == ButtonInteractionState.Loading

        val bg: Color = when {
            variant is ButtonVariant.Primary && state == ButtonInteractionState.Hover   -> t.Background.PrimaryHover
            variant is ButtonVariant.Primary && state == ButtonInteractionState.Active  -> t.Background.PrimaryActive
            variant is ButtonVariant.Primary && isDisabled                              -> t.Background.PrimaryDisabled
            variant is ButtonVariant.Primary                                            -> t.Background.Primary
            variant is ButtonVariant.Secondary && state == ButtonInteractionState.Hover -> t.Background.SecondaryHover
            variant is ButtonVariant.Secondary && state == ButtonInteractionState.Active-> t.Background.SecondaryActive
            variant is ButtonVariant.Secondary                                          -> t.Background.Secondary
            variant is ButtonVariant.Ghost && state == ButtonInteractionState.Hover     -> t.Background.GhostHover
            variant is ButtonVariant.Ghost                                              -> t.Background.Ghost
            variant is ButtonVariant.Destructive && state == ButtonInteractionState.Hover -> t.Background.DestructiveHover
            variant is ButtonVariant.Destructive && isDisabled                          -> t.Background.DestructiveDisabled
            variant is ButtonVariant.Destructive                                        -> t.Background.Destructive
            else                                                                        -> t.Background.Primary
        }
        val fg: Color = when {
            isDisabled -> t.Foreground.PrimaryDisabled
            variant is ButtonVariant.Primary     -> t.Foreground.Primary
            variant is ButtonVariant.Secondary   -> t.Foreground.Secondary
            variant is ButtonVariant.Ghost       -> t.Foreground.Ghost
            variant is ButtonVariant.Destructive -> t.Foreground.Destructive
            else                                 -> t.Foreground.Primary
        }
        val (borderColor, borderWidth) = if (variant is ButtonVariant.Secondary)
            (if (isDisabled) t.Border.SecondaryDisabled else t.Border.Secondary) to PSButtonTokens.BorderWidth.value
        else Color.Transparent to 0f

        return ButtonTokenSet(
            backgroundColor = bg,
            foregroundColor = fg,
            borderColor     = borderColor,
            borderWidth     = borderWidth,
            focusRingColor  = t.Border.FocusRing,
        )
    }

    private fun updateInteraction(newState: ButtonInteractionState) {
        val current = _uiState.value
        _uiState.value = current.copy(
            interactionState = newState,
            tokenSet = resolveTokenSet(current.variant, newState),
        )
    }
}
