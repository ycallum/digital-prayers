/**
 * Represents a Buddhist chant with metadata for display and reading
 */
export interface Chant {
  /** Unique identifier for the chant (kebab-case) */
  id: string
  /** Display title of the chant (Chinese) */
  title: string
  /** Brief description of the chant's purpose */
  description: string
  /** Estimated reading time in minutes */
  readingTime: number
  /** Full text content of the chant */
  content: string
}
