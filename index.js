/**
 * Convert text into a URL-friendly slug.
 * @param {string} text - The text to convert into a slug.
 * @returns {string} - The formatted slug.
 */
function createSlug(text) {
    return text
      .toString() // Ensure it's a string
      .normalize("NFD") // Normalize Unicode characters (e.g., é → e)
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading & trailing spaces
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and dashes
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-"); // Remove multiple dashes
  }
  
  /**
   * Generate a unique slug from text, ensuring it doesn't conflict with existing slugs.
   * @param {string} text - The text to convert into a slug.
   * @param {Array<string>} existingSlugs - A list of existing slugs to ensure uniqueness.
   * @returns {string} - A unique slug.
   */
  function generateUniqueSlug(text, existingSlugs = []) {
    let baseSlug = createSlug(text);
    let uniqueSlug = baseSlug;
    let counter = 1;
  
    // Ensure uniqueness by appending a number if necessary
    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  
    return uniqueSlug;
  }
  
  // Export functions
  export {
    createSlug,
    generateUniqueSlug,
  };
  