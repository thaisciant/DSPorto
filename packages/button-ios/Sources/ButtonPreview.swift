// Xcode Previews — T059
import SwiftUI

#if DEBUG
struct PSButton_Previews: PreviewProvider {
    static var previews: some View {
        ScrollView {
            VStack(spacing: 16) {
                Group {
                    Text("Primary").font(.caption.bold())
                    HStack(spacing: 8) {
                        PSButton(label: "SM", size: .sm, action: {})
                        PSButton(label: "MD", size: .md, action: {})
                        PSButton(label: "LG", size: .lg, action: {})
                    }
                    PSButton(label: "Disabled", isDisabled: true, action: {})
                    PSButton(label: "Loading",  isLoading: true,  action: {})
                }
                Divider()
                Group {
                    Text("Secondary").font(.caption.bold())
                    HStack(spacing: 8) {
                        PSButton(label: "SM", variant: .secondary, size: .sm, action: {})
                        PSButton(label: "MD", variant: .secondary, size: .md, action: {})
                        PSButton(label: "LG", variant: .secondary, size: .lg, action: {})
                    }
                    PSButton(label: "Disabled", variant: .secondary, isDisabled: true, action: {})
                    PSButton(label: "Full width", variant: .secondary, fullWidth: true, action: {})
                }
                Divider()
                Group {
                    Text("Ghost").font(.caption.bold())
                    HStack(spacing: 8) {
                        PSButton(label: "SM", variant: .ghost, size: .sm, action: {})
                        PSButton(label: "MD", variant: .ghost, size: .md, action: {})
                        PSButton(label: "LG", variant: .ghost, size: .lg, action: {})
                    }
                }
                Divider()
                Group {
                    Text("Destructive").font(.caption.bold())
                    HStack(spacing: 8) {
                        PSButton(label: "SM", variant: .destructive, size: .sm, action: {})
                        PSButton(label: "MD", variant: .destructive, size: .md, action: {})
                        PSButton(label: "LG", variant: .destructive, size: .lg, action: {})
                    }
                    PSButton(label: "Disabled", variant: .destructive, isDisabled: true, action: {})
                }
            }
            .padding()
        }
        .previewDisplayName("Button — All Variants")
    }
}
#endif
