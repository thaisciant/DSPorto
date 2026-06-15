import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../src/Button'

const meta: Meta<typeof Button> = {
  title: 'DS Essential 2.0/Button/Responsive',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const FullWidthMobile: Story = {
  args: { label: 'Full Width at 320px', onPress: () => {}, fullWidth: true },
  decorators: [(Story) => (
    <div style={{ width: '320px', padding: '16px' }}>
      <Story />
    </div>
  )],
}

export const FullWidthTablet: Story = {
  args: { label: 'Full Width at 768px', onPress: () => {}, fullWidth: true },
  parameters: { viewport: { defaultViewport: 'tablet' } },
  decorators: [(Story) => (
    <div style={{ width: '768px', padding: '16px' }}>
      <Story />
    </div>
  )],
}

export const IntrinsicDesktop: Story = {
  args: { label: 'Intrinsic width on desktop', onPress: () => {} },
  parameters: { viewport: { defaultViewport: 'desktop' } },
}
