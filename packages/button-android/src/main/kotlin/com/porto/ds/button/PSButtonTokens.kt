// Generated from channel.component.button.* — DS Essential 2.0
// Source of truth: button-tokens.html · DO NOT EDIT MANUALLY
package com.porto.ds.button

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object PSButtonTokens {
    object Colors {
        object Background {
            val Primary             = Color(0xFF0047CC)
            val PrimaryHover        = Color(0xFF003087)
            val PrimaryActive       = Color(0xFF001A5C)
            val PrimaryDisabled     = Color(0xFFD8D8EE)
            val Secondary           = Color.Transparent
            val SecondaryHover      = Color(0xFFE8EFFF)
            val SecondaryActive     = Color(0xFFB8D4FF)
            val Ghost               = Color.Transparent
            val GhostHover          = Color(0xFFE8EFFF)
            val Destructive         = Color(0xFFCC2200)
            val DestructiveHover    = Color(0xFF7A1300)
            val DestructiveDisabled = Color(0xFFD8D8EE)
        }
        object Foreground {
            val Primary             = Color(0xFFFFFFFF)
            val PrimaryDisabled     = Color(0xFF8888AA)
            val Secondary           = Color(0xFF0047CC)
            val SecondaryDisabled   = Color(0xFF8888AA)
            val Ghost               = Color(0xFF0047CC)
            val GhostDisabled       = Color(0xFF8888AA)
            val Destructive         = Color(0xFFFFFFFF)
            val DestructiveDisabled = Color(0xFF8888AA)
        }
        object Border {
            val Secondary         = Color(0xFF0047CC)
            val SecondaryDisabled = Color(0xFFD8D8EE)
            val FocusRing         = Color(0xFF5B9BFF)
        }
    }
    object Sizes {
        object SM {
            val height   = 32.dp;  val paddingX = 12.dp; val paddingY = 6.dp
            val iconSize = 16.dp;  val gap      = 4.dp;  val fontSize = 12.sp
        }
        object MD {
            val height   = 40.dp;  val paddingX = 16.dp; val paddingY = 9.dp
            val iconSize = 20.dp;  val gap      = 4.dp;  val fontSize = 14.sp
        }
        object LG {
            val height   = 48.dp;  val paddingX = 20.dp; val paddingY = 12.dp
            val iconSize = 24.dp;  val gap      = 8.dp;  val fontSize = 16.sp
        }
    }
    val Radius        = 8.dp
    val BorderWidth   = 1.dp
    val FocusRingWidth = 2.dp
    val FontWeight    = FontWeight.SemiBold
}
