import { describe, it, expect } from 'vitest'
import { ButtonTokenResolver } from '../../src/ButtonTokenResolver'

const resolver = new ButtonTokenResolver()

describe('ButtonTokenResolver', () => {
  // Primary — default
  it('primary default returns brand blue bg and white fg', () => {
    const t = resolver.resolve('primary', 'default')
    expect(t.backgroundColor).toBe('#0047CC')
    expect(t.foregroundColor).toBe('#FFFFFF')
    expect(t.borderColor).toBe('transparent')
    expect(t.borderRadius).toBe('8px')
  })

  // Primary — hover
  it('primary hover returns darker blue', () => {
    const t = resolver.resolve('primary', 'hover')
    expect(t.backgroundColor).toBe('#003087')
  })

  // Primary — active
  it('primary active returns darkest blue', () => {
    const t = resolver.resolve('primary', 'active')
    expect(t.backgroundColor).toBe('#001A5C')
  })

  // Primary — disabled
  it('primary disabled returns neutral bg and muted fg', () => {
    const t = resolver.resolve('primary', 'disabled')
    expect(t.backgroundColor).toBe('#D8D8EE')
    expect(t.foregroundColor).toBe('#8888AA')
  })

  // Primary — loading (implies disabled)
  it('primary loading behaves like disabled', () => {
    const t = resolver.resolve('primary', 'loading')
    expect(t.backgroundColor).toBe('#D8D8EE')
    expect(t.foregroundColor).toBe('#8888AA')
  })

  // Secondary — default
  it('secondary default has transparent bg, brand border', () => {
    const t = resolver.resolve('secondary', 'default')
    expect(t.backgroundColor).toBe('transparent')
    expect(t.borderColor).toBe('#0047CC')
    expect(t.borderWidth).toBe('1px')
    expect(t.foregroundColor).toBe('#0047CC')
  })

  // Secondary — hover
  it('secondary hover fills with xlight blue', () => {
    const t = resolver.resolve('secondary', 'hover')
    expect(t.backgroundColor).toBe('#E8EFFF')
  })

  // Secondary — disabled
  it('secondary disabled has neutral border', () => {
    const t = resolver.resolve('secondary', 'disabled')
    expect(t.borderColor).toBe('#D8D8EE')
    expect(t.foregroundColor).toBe('#8888AA')
  })

  // Ghost — default
  it('ghost default has transparent bg and no border', () => {
    const t = resolver.resolve('ghost', 'default')
    expect(t.backgroundColor).toBe('transparent')
    expect(t.borderColor).toBe('transparent')
    expect(t.foregroundColor).toBe('#0047CC')
  })

  // Destructive — default
  it('destructive default has red bg and white fg', () => {
    const t = resolver.resolve('destructive', 'default')
    expect(t.backgroundColor).toBe('#CC2200')
    expect(t.foregroundColor).toBe('#FFFFFF')
  })

  // Destructive — hover
  it('destructive hover returns darker red', () => {
    const t = resolver.resolve('destructive', 'hover')
    expect(t.backgroundColor).toBe('#7A1300')
  })

  // Focus ring is state-independent
  it('focus ring tokens are the same regardless of variant', () => {
    const primary = resolver.resolve('primary', 'focus')
    const secondary = resolver.resolve('secondary', 'focus')
    expect(primary.focusRingColor).toBe('#5B9BFF')
    expect(primary.focusRingWidth).toBe('2px')
    expect(primary.focusRingOffset).toBe('2px')
    expect(secondary.focusRingColor).toBe(primary.focusRingColor)
  })
})
