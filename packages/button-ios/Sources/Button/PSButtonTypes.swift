import Foundation

public enum PSButtonVariant {
    case primary, secondary, ghost, destructive
}

public enum PSButtonSize {
    case sm, md, lg

    public var height: CGFloat   { switch self { case .sm: return 32; case .md: return 40; case .lg: return 48 } }
    public var paddingX: CGFloat { switch self { case .sm: return 12; case .md: return 16; case .lg: return 20 } }
    public var paddingY: CGFloat { switch self { case .sm: return 6;  case .md: return 9;  case .lg: return 12 } }
    public var iconSize: CGFloat { switch self { case .sm: return 16; case .md: return 20; case .lg: return 24 } }
    public var gap: CGFloat      { switch self { case .sm: return 4;  case .md: return 4;  case .lg: return 8  } }
    public var fontSize: CGFloat { switch self { case .sm: return 12; case .md: return 14; case .lg: return 16 } }
}

public enum PSButtonState {
    case `default`, hover, focus, active, disabled, loading
}

public struct PSButtonTokenSet {
    public let backgroundColor: UIColor
    public let foregroundColor: UIColor
    public let borderColor: UIColor
    public let borderWidth: CGFloat
    public let focusRingColor: UIColor
}
