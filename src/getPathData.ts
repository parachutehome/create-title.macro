import path from "path";
import findPkgDir from "pkg-dir";
import { toUnix } from "upath";

/**
 * The logic here was copied and adjusted from the
 * paths.macro project. Big thanks to them as it
 * served as a good jumping off point!
 *
 * @see https://github.com/storybookjs/paths.macro
 */

interface PathData {
  /** The name of the file where the macro was called. */
  filename: string;
  /** The base path for the file where the macro was called. */
  base: string;
}

export function getPathData(initialFilePath: string): PathData {
  const osDependentAbsolute = path.resolve(initialFilePath);
  const fileAbsolute = toUnix(osDependentAbsolute);
  const file = path.basename(fileAbsolute);
  const extension = path.extname(fileAbsolute);
  const filename = file.replace(extension, "");
  const npmRoot = toUnix(findRootPathAttempt(osDependentAbsolute));
  const baseAbsolute = fileAbsolute.replace(file, "");
  const base = baseAbsolute.replace(npmRoot, "");

  return {
    filename,
    base,
  };
}

function findRootPathAttempt(startingDir: string): string {
  const rootPath = findPkgDir.sync(startingDir);

  if (!rootPath) {
    return "";
  }

  return rootPath;
}
