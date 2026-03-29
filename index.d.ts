export interface SlugOptions {
  /** The character used to separate words. Default: '-' */
  separator?: string;
  /** Whether to convert the slug to lowercase. Default: true */
  lowercase?: boolean;
  /** Maximum length of the generated slug. Default: Infinity */
  maxLength?: number;
  /** Remove leading/trailing separator. Default: true */
  trim?: boolean;
  /** Words to remove from the slug. */
  stopWords?: string[];
}

export interface UniqueSlugOptions extends SlugOptions {
  /** List of already taken slugs. */
  existingSlugs?: string[];
  /** Use a random suffix instead of a counter. Default: false */
  randomSuffix?: boolean;
  /** Async function to check if a slug exists (e.g. in a database). */
  checkCallback?: (slug: string) => Promise<boolean> | boolean;
}

/**
 * Convert text into a URL-friendly slug.
 * @param text - The text to convert into a slug.
 * @param options - Configuration options.
 * @returns The formatted slug.
 */
export function createSlug(text: string, options?: SlugOptions): string;

/**
 * Generate a unique slug from text, ensuring it doesn't conflict with existing slugs.
 * @param text - The text to convert into a slug.
 * @param options - Configuration options (including existingSlugs or checkCallback).
 * @returns A unique slug (returns a Promise if checkCallback is used).
 */
export function generateUniqueSlug(
  text: string,
  options?: UniqueSlugOptions
): Promise<string> | string;

/**
 * Quick check if a string is a valid slug format.
 * @param slug - The slug to validate.
 * @param options - Should match the options used to create the slug (e.g. separator).
 */
export function isValidSlug(slug: string, options?: { separator?: string }): boolean;
