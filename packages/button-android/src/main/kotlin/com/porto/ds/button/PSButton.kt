package com.porto.ds.button

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.disabled
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.stateDescription
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun PSButton(
    label: String,
    onPress: () -> Unit,
    modifier: Modifier = Modifier,
    variant: ButtonVariant = ButtonVariant.Primary,
    size: ButtonSize = ButtonSize.MD,
    isDisabled: Boolean = false,
    isLoading: Boolean = false,
    fullWidth: Boolean = false,
    iconLeading: ImageVector? = null,
    iconTrailing: ImageVector? = null,
    accessibilityLabel: String? = null,
    vm: PSButtonViewModel = viewModel(),
) {
    require(label.isNotBlank()) { "PSButton: label must not be blank" }

    val effectivelyDisabled = isDisabled || isLoading
    val uiState by vm.uiState.collectAsState()

    LaunchedEffect(variant, size, isDisabled, isLoading) {
        vm.processIntent(ButtonIntent.Configure(variant, size, isDisabled, isLoading))
    }

    val t = uiState.tokenSet
    val sz = size.tokens
    val shape = RoundedCornerShape(PSButtonTokens.Radius)

    val border =
        if (variant is ButtonVariant.Secondary) {
            BorderStroke(PSButtonTokens.BorderWidth, t.borderColor)
        } else {
            null
        }

    val rowModifier =
        modifier
            .defaultMinSize(minWidth = 44.dp, minHeight = 44.dp)
            .height(sz.height)
            .then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)
            .semantics {
                role = Role.Button
                contentDescription = accessibilityLabel ?: label
                if (effectivelyDisabled) disabled()
                if (isLoading) stateDescription = "Loading"
            }

    Button(
        onClick = { vm.processIntent(ButtonIntent.Press, onPress = onPress) },
        modifier = rowModifier,
        enabled = !effectivelyDisabled,
        shape = shape,
        colors =
            ButtonDefaults.buttonColors(
                containerColor = t.backgroundColor,
                contentColor = t.foregroundColor,
                disabledContainerColor = t.backgroundColor,
                disabledContentColor = t.foregroundColor,
            ),
        border = border,
        contentPadding = PaddingValues(horizontal = sz.paddingX, vertical = sz.paddingY),
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(sz.gap),
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(sz.iconSize),
                    color = t.foregroundColor,
                    strokeWidth = 2.dp,
                )
            } else if (iconLeading != null) {
                Icon(
                    imageVector = iconLeading,
                    contentDescription = null,
                    modifier = Modifier.size(sz.iconSize),
                )
            }

            Text(
                text = label,
                fontSize = sz.fontSize,
                fontWeight = PSButtonTokens.fontWeight,
            )

            if (!isLoading && iconTrailing != null) {
                Icon(
                    imageVector = iconTrailing,
                    contentDescription = null,
                    modifier = Modifier.size(sz.iconSize),
                )
            }
        }
    }
}
