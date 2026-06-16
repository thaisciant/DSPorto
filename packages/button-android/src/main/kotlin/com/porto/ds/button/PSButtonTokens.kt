// Generated from channel.component.button.* — DS Essential 2.0
// Source of truth: button-tokens.html · DO NOT EDIT MANUALLY
package com.porto.ds.button

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

data class ButtonSizeTokens(
    val height: Dp,
    val paddingX: Dp,
    val paddingY: Dp,
    val iconSize: Dp,
    val gap: Dp,
    val fontSize: TextUnit,
)

object PSButtonTokens {
    object Colors {
        object Background {
            val Primary = Color(0xFF0047CC)
            val PrimaryHover = Color(0xFF003087)
            val PrimaryActive = Color(0xFF001A5C)
            val PrimaryDisabled = Color(0xFFD8D8EE)
            val Secondary = Color.Transparent
            val SecondaryHover = Color(0xFFE8EFFF)
            val SecondaryActive = Color(0xFFB8D4FF)
            val Ghost = Color.Transparent
            val GhostHover = Color(0xFFE8EFFF)
            val Destructive = Color(0xFFCC2200)
            val DestructiveHover = Color(0xFF7A1300)
            val DestructiveDisabled = Color(0xFFD8D8EE)
        }

        object Foreground {
            val Primary = Color(0xFFFFFFFF)
            val PrimaryDisabled = Color(0xFF8888AA)
            val Secondary = Color(0xFF0047CC)
            val SecondaryDisabled = Color(0xFF8888AA)
            val Ghost = Color(0xFF0047CC)
            val GhostDisabled = Color(0xFF8888AA)
            val Destructive = Color(0xFFFFFFFF)
            val DestructiveDisabled = Color(0xFF8888AA)
        }

        object Border {
            val Secondary = Color(0xFF0047CC)
            val SecondaryDisabled = Color(0xFFD8D8EE)
            val FocusRing = Color(0xFF5B9BFF)
        }
    }

    object Sizes {
        val SM = ButtonSizeTokens(height = 32.dp, paddingX = 12.dp, paddingY = 6.dp, iconSize = 16.dp, gap = 4.dp, fontSize = 12.sp)
        val MD = ButtonSizeTokens(height = 40.dp, paddingX = 16.dp, paddingY = 9.dp, iconSize = 20.dp, gap = 4.dp, fontSize = 14.sp)
        val LG = ButtonSizeTokens(height = 48.dp, paddingX = 20.dp, paddingY = 12.dp, iconSize = 24.dp, gap = 8.dp, fontSize = 16.sp)
    }

    val Radius = 8.dp
    val BorderWidth = 1.dp
    val FocusRingWidth = 2.dp
    val fontWeight = FontWeight.SemiBold
}
