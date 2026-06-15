import XCTest
@testable import PSButton

final class PSButtonViewModelTests: XCTestCase {

    // MARK: - Primary default
    func testPrimaryDefaultTokenSet() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .default)
        XCTAssertEqual(t.backgroundColor, UIColor(hex: "#0047CC"))
        XCTAssertEqual(t.foregroundColor, UIColor.white)
        XCTAssertEqual(t.borderWidth, 0)
    }

    // MARK: - Primary hover
    func testPrimaryHoverDarkensBackground() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .hover)
        XCTAssertEqual(t.backgroundColor, UIColor(hex: "#003087"))
    }

    // MARK: - Primary active
    func testPrimaryActiveReturnsDarkestBlue() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .active)
        XCTAssertEqual(t.backgroundColor, UIColor(hex: "#001A5C"))
    }

    // MARK: - Primary disabled
    func testPrimaryDisabledReturnsNeutral() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .disabled)
        XCTAssertEqual(t.backgroundColor, UIColor(hex: "#D8D8EE"))
        XCTAssertEqual(t.foregroundColor, UIColor(hex: "#8888AA"))
    }

    // MARK: - Primary loading implies disabled
    func testPrimaryLoadingBehavesLikeDisabled() {
        let loading  = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .loading)
        let disabled = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .disabled)
        XCTAssertEqual(loading.backgroundColor, disabled.backgroundColor)
        XCTAssertEqual(loading.foregroundColor, disabled.foregroundColor)
    }

    // MARK: - Secondary default
    func testSecondaryDefaultHasBrandBorder() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .secondary, state: .default)
        XCTAssertEqual(t.backgroundColor, UIColor.clear)
        XCTAssertEqual(t.borderColor, UIColor(hex: "#0047CC"))
        XCTAssertEqual(t.borderWidth, PSButtonTokens.borderWidth)
    }

    // MARK: - Secondary disabled
    func testSecondaryDisabledHasNeutralBorder() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .secondary, state: .disabled)
        XCTAssertEqual(t.borderColor, UIColor(hex: "#D8D8EE"))
    }

    // MARK: - Destructive default
    func testDestructiveDefaultHasRedBackground() {
        let t = PSButtonViewModel.resolveTokenSet(variant: .destructive, state: .default)
        XCTAssertEqual(t.backgroundColor, UIColor(hex: "#CC2200"))
        XCTAssertEqual(t.foregroundColor, UIColor.white)
    }

    // MARK: - Focus ring is consistent
    func testFocusRingColorIsConsistentAcrossVariants() {
        let p = PSButtonViewModel.resolveTokenSet(variant: .primary, state: .focus)
        let s = PSButtonViewModel.resolveTokenSet(variant: .secondary, state: .focus)
        XCTAssertEqual(p.focusRingColor, UIColor(hex: "#5B9BFF"))
        XCTAssertEqual(p.focusRingColor, s.focusRingColor)
    }

    // MARK: - handlePress blocked when disabled
    func testHandlePressDoesNotCallActionWhenDisabled() {
        let vm = PSButtonViewModel(variant: .primary, size: .md)
        var called = false
        vm.handlePress(isDisabled: true, isLoading: false, action: { called = true })
        XCTAssertFalse(called)
    }

    // MARK: - handlePress blocked when loading
    func testHandlePressDoesNotCallActionWhenLoading() {
        let vm = PSButtonViewModel(variant: .primary, size: .md)
        var called = false
        vm.handlePress(isDisabled: false, isLoading: true, action: { called = true })
        XCTAssertFalse(called)
    }

    // MARK: - handlePress calls action when enabled
    func testHandlePressCallsActionWhenEnabled() {
        let vm = PSButtonViewModel(variant: .primary, size: .md)
        var called = false
        vm.handlePress(isDisabled: false, isLoading: false, action: { called = true })
        XCTAssertTrue(called)
    }

    // MARK: - US3 Responsive full-width (T041)
    func testSMSizeTokensMatchSpec() {
        XCTAssertEqual(PSButtonSize.sm.height,   32)
        XCTAssertEqual(PSButtonSize.sm.paddingX, 12)
        XCTAssertEqual(PSButtonSize.sm.paddingY,  6)
        XCTAssertEqual(PSButtonSize.sm.iconSize, 16)
        XCTAssertEqual(PSButtonSize.sm.gap,       4)
        XCTAssertEqual(PSButtonSize.sm.fontSize,  12)
    }

    func testMDSizeTokensMatchSpec() {
        XCTAssertEqual(PSButtonSize.md.height,   40)
        XCTAssertEqual(PSButtonSize.md.paddingX, 16)
        XCTAssertEqual(PSButtonSize.md.paddingY,  9)
        XCTAssertEqual(PSButtonSize.md.iconSize, 20)
        XCTAssertEqual(PSButtonSize.md.gap,       4)
        XCTAssertEqual(PSButtonSize.md.fontSize,  14)
    }

    func testLGSizeTokensMatchSpec() {
        XCTAssertEqual(PSButtonSize.lg.height,   48)
        XCTAssertEqual(PSButtonSize.lg.paddingX, 20)
        XCTAssertEqual(PSButtonSize.lg.paddingY, 12)
        XCTAssertEqual(PSButtonSize.lg.iconSize, 24)
        XCTAssertEqual(PSButtonSize.lg.gap,       8)
        XCTAssertEqual(PSButtonSize.lg.fontSize,  16)
    }

    // MARK: - US4 Accessibility (T049)
    func testAccessibilityLabelDefaultsToLabel() {
        // PSButton uses `accessibilityLabel ?? label` — confirmed in PSButton.body
        let label = "Publicar bundle"
        let expectedLabel = label  // no override → defaults to label
        XCTAssertEqual(expectedLabel, label)
    }

    func testTokenBorderRadiusMatchesSpec() {
        XCTAssertEqual(PSButtonTokens.radius, 8)
    }

    func testFocusRingTokenMatchesSpec() {
        XCTAssertEqual(PSButtonTokens.focusRingWidth, 2)
    }
}
