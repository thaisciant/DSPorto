package com.porto.ds.button

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

@Composable
private fun PreviewSection(
    title: String,
    content: @Composable ColumnScope.() -> Unit,
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.padding(vertical = 8.dp),
    ) {
        Text(title, fontSize = 11.sp, color = Color(0xFF8888AA))
        content()
    }
}

@Composable
private fun PreviewRow(content: @Composable RowScope.() -> Unit) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        content = content,
    )
}

// ---------------------------------------------------------------------------
// Variants — MD size, default state
// ---------------------------------------------------------------------------

@Preview(name = "Variants", showBackground = true, backgroundColor = 0xFFF5F5F5)
@Composable
private fun PreviewVariants() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        PreviewSection("Primary") {
            PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary)
        }
        PreviewSection("Secondary") {
            PSButton(label = "Secondary", onPress = {}, variant = ButtonVariant.Secondary)
        }
        PreviewSection("Ghost") {
            PSButton(label = "Ghost", onPress = {}, variant = ButtonVariant.Ghost)
        }
        PreviewSection("Destructive") {
            PSButton(label = "Destructive", onPress = {}, variant = ButtonVariant.Destructive)
        }
    }
}

// ---------------------------------------------------------------------------
// Sizes — Primary variant
// ---------------------------------------------------------------------------

@Preview(name = "Sizes", showBackground = true, backgroundColor = 0xFFF5F5F5)
@Composable
private fun PreviewSizes() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        PreviewSection("SM / MD / LG") {
            PreviewRow {
                PSButton(label = "Small", onPress = {}, size = ButtonSize.SM)
                PSButton(label = "Medium", onPress = {}, size = ButtonSize.MD)
                PSButton(label = "Large", onPress = {}, size = ButtonSize.LG)
            }
        }
    }
}

// ---------------------------------------------------------------------------
// States — Primary variant, MD size
// ---------------------------------------------------------------------------

@Preview(name = "States", showBackground = true, backgroundColor = 0xFFF5F5F5)
@Composable
private fun PreviewStates() {
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp),
    ) {
        PreviewSection("Default") {
            PSButton(label = "Default", onPress = {})
        }
        PreviewSection("Disabled") {
            PSButton(label = "Disabled", onPress = {}, isDisabled = true)
        }
        PreviewSection("Loading") {
            PSButton(label = "Loading", onPress = {}, isLoading = true)
        }
    }
}

// ---------------------------------------------------------------------------
// Full width
// ---------------------------------------------------------------------------

@Preview(name = "Full Width", showBackground = true, backgroundColor = 0xFFF5F5F5, widthDp = 360)
@Composable
private fun PreviewFullWidth() {
    Column(
        modifier =
            Modifier
                .padding(16.dp)
                .fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        PreviewSection("Full width — Primary") {
            PSButton(label = "Confirm", onPress = {}, fullWidth = true)
        }
        PreviewSection("Full width — Secondary") {
            PSButton(
                label = "Cancel",
                onPress = {},
                variant = ButtonVariant.Secondary,
                fullWidth = true,
            )
        }
    }
}

// ---------------------------------------------------------------------------
// All variants × all states (matrix)
// ---------------------------------------------------------------------------

@Preview(name = "Matrix", showBackground = true, backgroundColor = 0xFFF5F5F5)
@Composable
private fun PreviewMatrix() {
    val variants =
        listOf(
            ButtonVariant.Primary to "Primary",
            ButtonVariant.Secondary to "Secondary",
            ButtonVariant.Ghost to "Ghost",
            ButtonVariant.Destructive to "Destructive",
        )

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        variants.forEach { (variant, name) ->
            PreviewSection(name) {
                PreviewRow {
                    PSButton(label = "Default", onPress = {}, variant = variant)
                    PSButton(label = "Disabled", onPress = {}, variant = variant, isDisabled = true)
                    PSButton(label = "Loading", onPress = {}, variant = variant, isLoading = true)
                }
            }
        }
    }
}
