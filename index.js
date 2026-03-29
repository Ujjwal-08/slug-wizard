/**
 * Default transliteration map for common non-Latin characters.
 */
const charMap = {
  "&": "and",
  "+": "plus",
  "@": "at",
  "#": "hash",
  "$": "dollar",
  "%": "percent",
  "=": "equals",
  "*": "star",
};

/**
 * Convert text into a URL-friendly slug with customizable options.
 * @param {string} text - The text to convert into a slug.
 * @param {object} [options] - Configuration options.
 * @param {string} [options.separator='-'] - The character used to separate words.
 * @param {boolean} [options.lowercase=true] - Whether to convert the slug to lowercase.
 * @param {number} [options.maxLength=Infinity] - Maximum length of the generated slug.
 * @param {boolean} [options.trim=true] - Remove leading/trailing separator.
 * @param {Array<string>} [options.stopWords=[]] - Words to remove from the slug.
 * @returns {string} - The formatted slug.
 */
function createSlug(text, options = {}) {
  const {
    separator = "-",
    lowercase = true,
    maxLength = Infinity,
    trim = true,
    stopWords = [],
  } = options;

  let slug = text.toString();

  // Basic transliteration/symbol replacement
  for (const [char, replacement] of Object.entries(charMap)) {
    slug = slug.split(char).join(` ${replacement} `);
  }

  slug = slug
    .normalize("NFD") // Normalize Unicode characters (e.g., é → e)
    .replace(/[\u0300-\u036f]/g, ""); // Remove accents

  if (lowercase) slug = slug.toLowerCase();

  // Clean up characters: keep only alphanumeric and spaces (temporarily)
  slug = slug.replace(/[^a-z0-9\s]/gi, "");

  // Remove stop words
  if (stopWords.length > 0) {
    const stopWordsRegex = new RegExp(
      `\\b(${stopWords.join("|")})\\b`,
      "gi"
    );
    slug = slug.replace(stopWordsRegex, "");
  }

  // Final formatting
  slug = slug
    .trim()
    .replace(/\s+/g, separator) // Replace spaces/multiple separators with the separator
    .replace(new RegExp(`${separator}+`, "g"), separator);

  // Truncate to maxLength (word-safe)
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    if (trim) {
      // Don't end with a separator
      const lastSep = slug.lastIndexOf(separator);
      if (lastSep !== -1) slug = slug.substring(0, lastSep);
    }
  }

  if (trim) {
    const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    slug = slug.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, "g"), "");
  }

  return slug;
}

/**
 * Generate a unique slug from text, ensuring it doesn't conflict with existing slugs.
 * @param {string} text - The text to convert into a slug.
 * @param {object} [options] - Configuration options.
 * @param {Array<string>} [options.existingSlugs=[]] - List of already taken slugs.
 * @param {boolean} [options.randomSuffix=false] - Use a random suffix instead of a counter.
 * @param {function} [options.checkCallback] - Async function to check if a slug exists.
 * @returns {Promise<string>|string} - A unique slug.
 */
function generateUniqueSlug(text, options = {}) {
  const {
    existingSlugs = [],
    randomSuffix = false,
    checkCallback,
    ...slugOptions
  } = options;

  const baseSlug = createSlug(text, slugOptions);
  
  const isTaken = async (val) => {
    if (existingSlugs.includes(val)) return true;
    if (checkCallback) return await checkCallback(val);
    return false;
  };

  const generate = async () => {
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await isTaken(uniqueSlug)) {
      if (randomSuffix) {
        const random = Math.random().toString(36).substring(2, 6);
        uniqueSlug = `${baseSlug}-${random}`;
      } else {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }
    return uniqueSlug;
  };

  // If callback is provided, we must return a promise
  if (checkCallback) return generate();
  
  // Synchronous version if no callback
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (existingSlugs.includes(uniqueSlug)) {
    if (randomSuffix) {
      const random = Math.random().toString(36).substring(2, 6);
      uniqueSlug = `${baseSlug}-${random}`;
    } else {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  return uniqueSlug;
}

/**
 * Quick check if a string is a valid slug format.
 * @param {string} slug 
 * @param {object} options
 * @returns {boolean}
 */
function isValidSlug(slug, options = {}) {
  const { separator = "-" } = options;
  const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^[a-z0-9]+(${escapedSep}[a-z0-9]+)*$`);
  return regex.test(slug);
}

// Export functions
export { createSlug, generateUniqueSlug, isValidSlug };
  