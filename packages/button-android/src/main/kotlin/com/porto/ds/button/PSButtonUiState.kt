package com.porto.ds.button

import androidx.compose.ui.graphics.Color

data class ButtonTokenSet(
    val backgroundColor: Color,
    val foregroundColor: Color,
    val borderColor: Color,
    val borderWidth: Float,
    val focusRingColor: Color,
)

data class ButtonUiState(
    val variant: ButtonVariant = ButtonVariant.Primary,
    val size: ButtonSize = ButtonSize.MD,
    val interactionState: ButtonInteractionState = ButtonInteractionState.Default,
    val isDisabled: Boolean = false,
    val isLoading: Boolean = false,
    val tokenSet: ButtonTokenSet = ButtonUiState.defaultTokenSet(),
) {
    companion object {
        fun defaultTokenSet() =
            ButtonTokenSet(
                backgroundColor = PSButtonTokens.Colors.Background.Primary,
                foregroundColor = PSButtonTokens.Colors.Foreground.Primary,
                borderColor = Color.Transparent,
                borderWidth = 0f,
                focusRingColor = PSButtonTokens.Colors.Border.FocusRing,
            )
    }
}
