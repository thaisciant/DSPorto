import SwiftUI

public struct PSButton: View {
    public let label: String
    public let variant: PSButtonVariant
    public let size: PSButtonSize
    public let isDisabled: Bool
    public let isLoading: Bool
    public let fullWidth: Bool
    public let iconLeading: Image?
    public let iconTrailing: Image?
    public let accessibilityLabel: String?
    public let action: () -> Void

    @StateObject private var viewModel: PSButtonViewModel

    public init(
        label: String,
        variant: PSButtonVariant = .primary,
        size: PSButtonSize = .md,
        isDisabled: Bool = false,
        isLoading: Bool = false,
        fullWidth: Bool = false,
        iconLeading: Image? = nil,
        iconTrailing: Image? = nil,
        accessibilityLabel: String? = nil,
        action: @escaping () -> Void
    ) {
        precondition(!label.trimmingCharacters(in: .whitespaces).isEmpty,
                     "PSButton: label must not be empty")
        self.label = label
        self.variant = variant
        self.size = size
        self.isDisabled = isDisabled
        self.isLoading = isLoading
        self.fullWidth = fullWidth
        self.iconLeading = iconLeading
        self.iconTrailing = iconTrailing
        self.accessibilityLabel = accessibilityLabel
        self.action = action
        _viewModel = StateObject(wrappedValue: PSButtonViewModel(variant: variant, size: size))
    }

    private var tokens: PSButtonTokenSet {
        PSButtonViewModel.resolveTokenSet(
            variant: variant,
            state: (isDisabled || isLoading) ? .disabled : .default
        )
    }

    public var body: some View {
        Button(action: {
            viewModel.handlePress(isDisabled: isDisabled, isLoading: isLoading, action: action)
        }) {
            HStack(spacing: size.gap) {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(.circular)
                        .tint(Color(tokens.foregroundColor))
                        .frame(width: size.iconSize, height: size.iconSize)
                } else if let icon = iconLeading {
                    icon.resizable()
                        .frame(width: size.iconSize, height: size.iconSize)
                }

                Text(label)
                    .font(.system(size: size.fontSize, weight: PSButtonTokens.fontWeight))

                if !isLoading, let icon = iconTrailing {
                    icon.resizable()
                        .frame(width: size.iconSize, height: size.iconSize)
                }
            }
            .foregroundColor(Color(tokens.foregroundColor))
            .padding(.horizontal, size.paddingX)
            .padding(.vertical, size.paddingY)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .frame(height: size.height)
            .background(Color(tokens.backgroundColor))
            .overlay(
                RoundedRectangle(cornerRadius: PSButtonTokens.radius)
                    .stroke(Color(tokens.borderColor), lineWidth: tokens.borderWidth)
            )
            .cornerRadius(PSButtonTokens.radius)
        }
        .disabled(isDisabled || isLoading)
        .accessibilityLabel(accessibilityLabel ?? label)
        .accessibilityAddTraits(.isButton)
        .accessibilityValue(isLoading ? "Loading" : "")
    }
}
