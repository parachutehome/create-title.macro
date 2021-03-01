import { getMacroConfig } from "../macroConfig";

/**
 * @returns {string} base path excluding the root dir and any leading/trailing forward slash
 */
export function getNormalizedBase(base: string): string {
  const { rootDir } = getMacroConfig();

  // get rid of leading and trailing `/`
  let newBase: string = base.replace(/^\//, "").replace(/\/$/, "");

  /**
   * make sure the rootDir ends with a trailing slash
   * e.g. /src/ -> src/
   * e.g. ../src/.. -> src/
   * e.g. ../src/components/.. -> src/components/
   */
  const normalizedRootDir =
    rootDir.replace(/^[/.]*/, "").replace(/[/.]*$/, "") + "/";

  /**
   * get rid of leading rootDir in the new base
   * only if `rootDir` is not an empty string
   */
  if (rootDir.length > 0) {
    newBase = newBase.replace(normalizedRootDir, "");
  }

  return newBase;
}
