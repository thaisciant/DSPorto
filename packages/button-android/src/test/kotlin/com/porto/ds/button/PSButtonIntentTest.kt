package com.porto.ds.button

import org.junit.Assert.*
import org.junit.Test

class PSButtonIntentTest {

    @Test fun pressIgnoredWhenDisabled() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = true, isLoading = false))
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertFalse(called)
    }

    @Test fun pressIgnoredWhenLoading() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = false, isLoading = true))
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertFalse(called)
    }

    @Test fun pressFiresWhenEnabled() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = false, isLoading = false))
        var called = false
        vm.processIntent(ButtonIntent.Press, onPress = { called = true })
        assertTrue(called)
    }

    @Test fun hoverEnterUpdatesInteractionState() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = false, isLoading = false))
        vm.processIntent(ButtonIntent.HoverEnter)
        assertEquals(ButtonInteractionState.Hover, vm.uiState.value.interactionState)
    }

    @Test fun hoverExitResetsToDefault() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = false, isLoading = false))
        vm.processIntent(ButtonIntent.HoverEnter)
        vm.processIntent(ButtonIntent.HoverExit)
        assertEquals(ButtonInteractionState.Default, vm.uiState.value.interactionState)
    }

    @Test fun hoverIgnoredWhenDisabled() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = true, isLoading = false))
        vm.processIntent(ButtonIntent.HoverEnter)
        assertEquals(ButtonInteractionState.Disabled, vm.uiState.value.interactionState)
    }

    @Test fun configureWithLoadingTrueImpliesDisabled() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Primary, ButtonSize.MD, isDisabled = false, isLoading = true))
        assertTrue(vm.uiState.value.isDisabled)
        assertTrue(vm.uiState.value.isLoading)
    }

    @Test fun configureUpdatesVariantAndSize() {
        val vm = PSButtonViewModel()
        vm.processIntent(ButtonIntent.Configure(ButtonVariant.Secondary, ButtonSize.LG, isDisabled = false, isLoading = false))
        assertTrue(vm.uiState.value.variant is ButtonVariant.Secondary)
        assertEquals(ButtonSize.LG, vm.uiState.value.size)
    }
}
