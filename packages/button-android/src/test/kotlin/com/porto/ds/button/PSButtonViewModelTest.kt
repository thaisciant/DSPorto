package com.porto.ds.button

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class PSButtonViewModelTest {
    private val vm = PSButtonViewModel()

    // resolveTokenSet — Primary default
    @Test
    fun primaryDefaultReturnsBrandBlue() {
        val t = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Default)
        assertEquals(PSButtonTokens.Colors.Background.Primary, t.backgroundColor)
        assertEquals(PSButtonTokens.Colors.Foreground.Primary, t.foregroundColor)
    }

    @Test
    fun primaryHoverReturnsDarkerBlue() {
        val t = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Hover)
        assertEquals(PSButtonTokens.Colors.Background.PrimaryHover, t.backgroundColor)
    }

    @Test
    fun primaryActiveReturnsDarkestBlue() {
        val t = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Active)
        assertEquals(PSButtonTokens.Colors.Background.PrimaryActive, t.backgroundColor)
    }

    @Test
    fun primaryDisabledReturnsNeutral() {
        val t = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Disabled)
        assertEquals(PSButtonTokens.Colors.Background.PrimaryDisabled, t.backgroundColor)
        assertEquals(PSButtonTokens.Colors.Foreground.PrimaryDisabled, t.foregroundColor)
    }

    @Test
    fun primaryLoadingBehavesLikeDisabled() {
        val loading = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Loading)
        val disabled = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Disabled)
        assertEquals(disabled.backgroundColor, loading.backgroundColor)
    }

    // resolveTokenSet — Secondary
    @Test
    fun secondaryDefaultHasTransparentBgAndBrandBorder() {
        val t = vm.resolveTokenSet(ButtonVariant.Secondary, ButtonInteractionState.Default)
        assertEquals(PSButtonTokens.Colors.Background.Secondary, t.backgroundColor)
        assertEquals(PSButtonTokens.Colors.Border.Secondary, t.borderColor)
        assertTrue(t.borderWidth > 0f)
    }

    @Test
    fun secondaryDisabledHasNeutralBorder() {
        val t = vm.resolveTokenSet(ButtonVariant.Secondary, ButtonInteractionState.Disabled)
        assertEquals(PSButtonTokens.Colors.Border.SecondaryDisabled, t.borderColor)
    }

    // resolveTokenSet — Destructive
    @Test
    fun destructiveDefaultHasRedBg() {
        val t = vm.resolveTokenSet(ButtonVariant.Destructive, ButtonInteractionState.Default)
        assertEquals(PSButtonTokens.Colors.Background.Destructive, t.backgroundColor)
    }

    // Focus ring consistency
    @Test
    fun focusRingIsConsistentAcrossVariants() {
        val p = vm.resolveTokenSet(ButtonVariant.Primary, ButtonInteractionState.Focus)
        val s = vm.resolveTokenSet(ButtonVariant.Secondary, ButtonInteractionState.Focus)
        assertEquals(PSButtonTokens.Colors.Border.FocusRing, p.focusRingColor)
        assertEquals(p.focusRingColor, s.focusRingColor)
    }

    // processIntent — Press blocked when disabled
    @Test
    fun pressIntentIgnoredWhenDisabled() {
        vm.processIntent(
            ButtonIntent.Configure(
                ButtonVariant.Primary,
                ButtonSize.MD,
                isDisabled = true,
                isLoading = false,
            ),
        )
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertFalse(called)
    }

    // processIntent — Press blocked when loading
    @Test
    fun pressIntentIgnoredWhenLoading() {
        vm.processIntent(
            ButtonIntent.Configure(
                ButtonVariant.Primary,
                ButtonSize.MD,
                isDisabled = false,
                isLoading = true,
            ),
        )
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertFalse(called)
    }

    // processIntent — Press fires when enabled
    @Test
    fun pressIntentCallsCallbackWhenEnabled() {
        vm.processIntent(
            ButtonIntent.Configure(
                ButtonVariant.Primary,
                ButtonSize.MD,
                isDisabled = false,
                isLoading = false,
            ),
        )
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertTrue(called)
    }

    // processIntent — Configure with isLoading implies isDisabled
    @Test
    fun configureWithLoadingImpliesDisabled() {
        vm.processIntent(
            ButtonIntent.Configure(
                ButtonVariant.Primary,
                ButtonSize.MD,
                isDisabled = false,
                isLoading = true,
            ),
        )
        assertTrue(vm.uiState.value.isDisabled)
    }

    // US3 — Size token values match spec (T042)
    @Test
    fun smSizeTokensMatchSpec() {
        assertEquals(32.0f, PSButtonTokens.Sizes.SM.height.value, 0f)
        assertEquals(12.0f, PSButtonTokens.Sizes.SM.paddingX.value, 0f)
        assertEquals(6.0f, PSButtonTokens.Sizes.SM.paddingY.value, 0f)
        assertEquals(16.0f, PSButtonTokens.Sizes.SM.iconSize.value, 0f)
        assertEquals(4.0f, PSButtonTokens.Sizes.SM.gap.value, 0f)
    }

    @Test
    fun mdSizeTokensMatchSpec() {
        assertEquals(40.0f, PSButtonTokens.Sizes.MD.height.value, 0f)
        assertEquals(16.0f, PSButtonTokens.Sizes.MD.paddingX.value, 0f)
        assertEquals(9.0f, PSButtonTokens.Sizes.MD.paddingY.value, 0f)
        assertEquals(20.0f, PSButtonTokens.Sizes.MD.iconSize.value, 0f)
        assertEquals(4.0f, PSButtonTokens.Sizes.MD.gap.value, 0f)
    }

    @Test
    fun lgSizeTokensMatchSpec() {
        assertEquals(48.0f, PSButtonTokens.Sizes.LG.height.value, 0f)
        assertEquals(20.0f, PSButtonTokens.Sizes.LG.paddingX.value, 0f)
        assertEquals(12.0f, PSButtonTokens.Sizes.LG.paddingY.value, 0f)
        assertEquals(24.0f, PSButtonTokens.Sizes.LG.iconSize.value, 0f)
        assertEquals(8.0f, PSButtonTokens.Sizes.LG.gap.value, 0f)
    }

    @Test
    fun focusRingColorMatchesSpec() {
        assertEquals(
            PSButtonTokens.Colors.Border.FocusRing,
            vm.resolveTokenSet(
                ButtonVariant.Primary,
                ButtonInteractionState.Focus,
            ).focusRingColor,
        )
    }

    @Test
    fun borderRadiusTokenMatchesSpec() {
        assertEquals(8.0f, PSButtonTokens.Radius.value, 0f)
    }
}
