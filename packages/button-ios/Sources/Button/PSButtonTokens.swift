// Generated from channel.component.button.* — DS Essential 2.0
// Source of truth: button-tokens.html · DO NOT EDIT MANUALLY
import UIKit

public enum PSButtonTokens {
    public enum Color {
        public enum Background {
            public static let primary             = UIColor(hex: "#0047CC")
            public static let primaryHover        = UIColor(hex: "#003087")
            public static let primaryActive       = UIColor(hex: "#001A5C")
            public static let primaryDisabled     = UIColor(hex: "#D8D8EE")
            public static let secondary           = UIColor.clear
            public static let secondaryHover      = UIColor(hex: "#E8EFFF")
            public static let secondaryActive     = UIColor(hex: "#B8D4FF")
            public static let ghost               = UIColor.clear
            public static let ghostHover          = UIColor(hex: "#E8EFFF")
            public static let destructive         = UIColor(hex: "#CC2200")
            public static let destructiveHover    = UIColor(hex: "#7A1300")
            public static let destructiveDisabled = UIColor(hex: "#D8D8EE")
        }
        public enum Foreground {
            public static let primary             = UIColor.white
            public static let primaryDisabled     = UIColor(hex: "#8888AA")
            public static let secondary           = UIColor(hex: "#0047CC")
            public static let secondaryDisabled   = UIColor(hex: "#8888AA")
            public static let ghost               = UIColor(hex: "#0047CC")
            public static let ghostDisabled       = UIColor(hex: "#8888AA")
            public static let destructive         = UIColor.white
            public static let destructiveDisabled = UIColor(hex: "#8888AA")
        }
        public enum Border {
            public static let secondary         = UIColor(hex: "#0047CC")
            public static let secondaryDisabled = UIColor(hex: "#D8D8EE")
            public static let focusRing         = UIColor(hex: "#5B9BFF")
        }
    }
    public enum Size {
        public enum SM {
            public static let height:   CGFloat = 32
            public static let paddingX: CGFloat = 12
            public static let paddingY: CGFloat = 6
            public static let iconSize: CGFloat = 16
            public static let gap:      CGFloat = 4
            public static let fontSize: CGFloat = 12
        }
        public enum MD {
            public static let height:   CGFloat = 40
            public static let paddingX: CGFloat = 16
            public static let paddingY: CGFloat = 9
            public static let iconSize: CGFloat = 20
            public static let gap:      CGFloat = 4
            public static let fontSize: CGFloat = 14
        }
        public enum LG {
            public static let height:   CGFloat = 48
            public static let paddingX: CGFloat = 20
            public static let paddingY: CGFloat = 12
            public static let iconSize: CGFloat = 24
            public static let gap:      CGFloat = 8
            public static let fontSize: CGFloat = 16
        }
    }
    public static let radius:          CGFloat = 8
    public static let borderWidth:     CGFloat = 1
    public static let focusRingWidth:  CGFloat = 2
    public static let fontWeight             = Font.Weight.semibold
}

// MARK: - UIColor hex initializer
extension UIColor {
    convenience init(hex: String) {
        var rgb: UInt64 = 0
        Scanner(string: hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted))
            .scanHexInt64(&rgb)
        let r = CGFloat((rgb & 0xFF0000) >> 16) / 255
        let g = CGFloat((rgb & 0x00FF00) >> 8) / 255
        let b = CGFloat(rgb & 0x0000FF) / 255
        self.init(red: r, green: g, blue: b, alpha: 1)
    }
}
