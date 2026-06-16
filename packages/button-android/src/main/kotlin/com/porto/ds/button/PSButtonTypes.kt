package com.porto.ds.button

sealed class ButtonVariant {
    object Primary : ButtonVariant()

    object Secondary : ButtonVariant()

    object Ghost : ButtonVariant()

    object Destructive : ButtonVariant()
}

enum class ButtonSize {
    SM,
    MD,
    LG,
    ;

    val tokens: ButtonSizeTokens get() =
        when (this) {
            SM -> PSButtonTokens.Sizes.SM
            MD -> PSButtonTokens.Sizes.MD
            LG -> PSButtonTokens.Sizes.LG
        }
}

enum class ButtonInteractionState {
    Default,
    Hover,
    Focus,
    Active,
    Disabled,
    Loading,
}
