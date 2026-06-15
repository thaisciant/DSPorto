import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../src/Button'

const meta: Meta<typeof Button> = {
  title: 'DS Essential 2.0/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:  { control: 'select', options: ['primary','secondary','ghost','destructive'] },
    size:     { control: 'select', options: ['sm','md','lg'] },
    isDisabled: { control: 'boolean' },
    isLoading:  { control: 'boolean' },
    fullWidth:  { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// ── Primary ──────────────────────────────────────────────────────────────────
export const PrimarySmDefault: Story = { args: { label: 'Primary', variant: 'primary', size: 'sm', onPress: () => {} } }
export const PrimaryMdDefault: Story = { args: { label: 'Primary', variant: 'primary', size: 'md', onPress: () => {} } }
export const PrimaryLgDefault: Story = { args: { label: 'Primary', variant: 'primary', size: 'lg', onPress: () => {} } }
export const PrimaryMdDisabled: Story = { args: { label: 'Primary', variant: 'primary', size: 'md', isDisabled: true, onPress: () => {} } }
export const PrimaryMdLoading: Story  = { args: { label: 'Primary', variant: 'primary', size: 'md', isLoading: true,  onPress: () => {} } }

// ── Secondary ────────────────────────────────────────────────────────────────
export const SecondarySmDefault: Story  = { args: { label: 'Secondary', variant: 'secondary', size: 'sm', onPress: () => {} } }
export const SecondaryMdDefault: Story  = { args: { label: 'Secondary', variant: 'secondary', size: 'md', onPress: () => {} } }
export const SecondaryLgDefault: Story  = { args: { label: 'Secondary', variant: 'secondary', size: 'lg', onPress: () => {} } }
export const SecondaryMdDisabled: Story = { args: { label: 'Secondary', variant: 'secondary', size: 'md', isDisabled: true, onPress: () => {} } }
export const SecondaryMdLoading: Story  = { args: { label: 'Secondary', variant: 'secondary', size: 'md', isLoading: true,  onPress: () => {} } }
export const SecondaryMdFullWidth: Story= { args: { label: 'Full width', variant: 'secondary', size: 'md', fullWidth: true,  onPress: () => {} } }

// ── Ghost ────────────────────────────────────────────────────────────────────
export const GhostSmDefault: Story  = { args: { label: 'Ghost', variant: 'ghost', size: 'sm', onPress: () => {} } }
export const GhostMdDefault: Story  = { args: { label: 'Ghost', variant: 'ghost', size: 'md', onPress: () => {} } }
export const GhostLgDefault: Story  = { args: { label: 'Ghost', variant: 'ghost', size: 'lg', onPress: () => {} } }
export const GhostMdDisabled: Story = { args: { label: 'Ghost', variant: 'ghost', size: 'md', isDisabled: true, onPress: () => {} } }

// ── Destructive ──────────────────────────────────────────────────────────────
export const DestructiveSmDefault: Story  = { args: { label: 'Remover', variant: 'destructive', size: 'sm', onPress: () => {} } }
export const DestructiveMdDefault: Story  = { args: { label: 'Remover', variant: 'destructive', size: 'md', onPress: () => {} } }
export const DestructiveLgDefault: Story  = { args: { label: 'Remover', variant: 'destructive', size: 'lg', onPress: () => {} } }
export const DestructiveMdDisabled: Story = { args: { label: 'Remover', variant: 'destructive', size: 'md', isDisabled: true, onPress: () => {} } }
