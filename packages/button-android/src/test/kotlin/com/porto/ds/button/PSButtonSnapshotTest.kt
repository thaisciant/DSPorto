package com.porto.ds.button

import app.cash.paparazzi.Paparazzi
import org.junit.Rule
import org.junit.Test

class PSButtonSnapshotTest {

    @get:Rule val paparazzi = Paparazzi()

    @Test fun primarySmDefault() = paparazzi.snapshot {
        PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary, size = ButtonSize.SM)
    }

    @Test fun primaryMdDefault() = paparazzi.snapshot {
        PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary, size = ButtonSize.MD)
    }

    @Test fun primaryLgDefault() = paparazzi.snapshot {
        PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary, size = ButtonSize.LG)
    }

    @Test fun primaryMdDisabled() = paparazzi.snapshot {
        PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary, size = ButtonSize.MD, isDisabled = true)
    }

    @Test fun primaryMdLoading() = paparazzi.snapshot {
        PSButton(label = "Primary", onPress = {}, variant = ButtonVariant.Primary, size = ButtonSize.MD, isLoading = true)
    }

    @Test fun secondaryMdDefault() = paparazzi.snapshot {
        PSButton(label = "Secondary", onPress = {}, variant = ButtonVariant.Secondary, size = ButtonSize.MD)
    }

    @Test fun secondaryMdDisabled() = paparazzi.snapshot {
        PSButton(label = "Secondary", onPress = {}, variant = ButtonVariant.Secondary, size = ButtonSize.MD, isDisabled = true)
    }

    @Test fun secondaryMdFullWidth() = paparazzi.snapshot {
        PSButton(label = "Full Width", onPress = {}, variant = ButtonVariant.Secondary, size = ButtonSize.MD, fullWidth = true)
    }
}
