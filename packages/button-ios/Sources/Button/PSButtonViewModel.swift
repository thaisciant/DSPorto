import Foundation
import Combine

public final class PSButtonViewModel: ObservableObject {
    @Published public private(set) var state: PSButtonState = .default
    @Published public private(set) var tokenSet: PSButtonTokenSet

    private let variant: PSButtonVariant
    private let size: PSButtonSize

    public init(variant: PSButtonVariant = .primary, size: PSButtonSize = .md) {
        self.variant = variant
        self.size = size
        self.tokenSet = PSButtonViewModel.resolveTokenSet(variant: variant, state: .default)
    }

    public func handlePress(isDisabled: Bool, isLoading: Bool, action: () -> Void) {
        guard !isDisabled && !isLoading else { return }
        state = .active
        action()
        state = .default
    }

    public static func resolveTokenSet(variant: PSButtonVariant, state: PSButtonState) -> PSButtonTokenSet {
        let t = PSButtonTokens.self
        let isDisabled = state == .disabled || state == .loading

        let bg: UIColor
        let fg: UIColor
        let border: UIColor
        let borderWidth: CGFloat

        switch (variant, state) {
        case (.primary, .hover):   bg = t.Color.Background.primaryHover
        case (.primary, .active):  bg = t.Color.Background.primaryActive
        case (.primary, .disabled), (.primary, .loading): bg = t.Color.Background.primaryDisabled
        case (.primary, _):        bg = t.Color.Background.primary
        case (.secondary, .hover): bg = t.Color.Background.secondaryHover
        case (.secondary, .active): bg = t.Color.Background.secondaryActive
        case (.secondary, _):      bg = t.Color.Background.secondary
        case (.ghost, .hover):     bg = t.Color.Background.ghostHover
        case (.ghost, .active):    bg = t.Color.Background.ghostHover
        case (.ghost, _):          bg = t.Color.Background.ghost
        case (.destructive, .hover): bg = t.Color.Background.destructiveHover
        case (.destructive, .disabled), (.destructive, .loading): bg = t.Color.Background.destructiveDisabled
        case (.destructive, _):    bg = t.Color.Background.destructive
        }

        fg = isDisabled ? t.Color.Foreground.primaryDisabled : {
            switch variant {
            case .primary:     return t.Color.Foreground.primary
            case .secondary:   return t.Color.Foreground.secondary
            case .ghost:       return t.Color.Foreground.ghost
            case .destructive: return t.Color.Foreground.destructive
            }
        }()

        if variant == .secondary {
            border = isDisabled ? t.Color.Border.secondaryDisabled : t.Color.Border.secondary
            borderWidth = t.borderWidth
        } else {
            border = .clear
            borderWidth = 0
        }

        return PSButtonTokenSet(
            backgroundColor: bg,
            foregroundColor: fg,
            borderColor: border,
            borderWidth: borderWidth,
            focusRingColor: t.Color.Border.focusRing
        )
    }
}
