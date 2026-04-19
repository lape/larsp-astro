import kebabcase from "lodash.kebabcase";
import slugify from "slugify";

/**
 * Check if string contains non-Latin characters
 */
const hasNonLatin = (str: string): boolean => /[^\x00-\x7F]/.test(str);

/**
 * Slugify a string using a hybrid approach:
 * - For Latin-only strings: use slugify (eg: "E2E Testing" -> "e2e-testing", "TypeScript 5.0" -> "typescript-5.0")
 * - For strings with non-Latin characters: use lodash.kebabcase (preserves non-Latin chars)
 */
export const slugifyStr = (str: string): string => {
  // Treat "/" and "&" as word separators so tags like "Chat/Messaging"
  // or "Cats & Dogs" produce readable slugs.
  const preprocessed = str.replace(/[/&]/g, " ");
  if (hasNonLatin(preprocessed)) {
    // Preserve non-Latin characters (e.g., Burmese, Chinese, etc.)
    return kebabcase(preprocessed);
  }
  // Handle Latin strings with better number/acronym handling
  return slugify(preprocessed, { lower: true });
};

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
