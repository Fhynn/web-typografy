/**
 * Returns true when the user has asked the OS to minimise animation
 * ("Reduce motion" / prefers-reduced-motion: reduce).
 * Safe to call during render and inside effects.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
