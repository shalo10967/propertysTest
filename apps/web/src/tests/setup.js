import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}

