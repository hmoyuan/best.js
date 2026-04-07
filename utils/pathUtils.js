import { pathToFileURL } from 'url';
import path from 'path';

/**
 * Convert a file system path to an import specifier suitable for dynamic import().
 * Converts absolute paths to file:// URLs (required for Windows ESM compatibility).
 * Leaves relative paths and package names unchanged.
 *
 * @param {string} modulePath - The file system path or import specifier
 * @returns {string} A valid import specifier for dynamic import()
 */
export function toImportSpecifier(modulePath) {
  return path.isAbsolute(modulePath)
    ? pathToFileURL(modulePath).href
    : modulePath;
}
