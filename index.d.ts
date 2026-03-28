/**
 * Convert text into a URL-friendly slug.
 * @param text - The text to convert into a slug.
 * @returns The formatted slug.
 */
export function createSlug(text: string): string;

/**
 * Generate a unique slug from text, ensuring it doesn't conflict with existing slugs.
 * @param text - The text to convert into a slug.
 * @param existingSlugs - A list of existing slugs to ensure uniqueness.
 * @returns A unique slug.
 */
export function generateUniqueSlug(text: string, existingSlugs?: string[]): string;
