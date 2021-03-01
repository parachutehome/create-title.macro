import { getNormalizedBase } from "./getNormalizedBase";
import { getMacroConfig } from "../macroConfig";

interface NormalizedData {
  /** The base path excluding the rootDir and leading/trailing forward slash. */
  normalizedBase: string;
  /** The file name excluding `.stories` sub extension */
  normalizedFilename: string;
  /** Name of the parent folder the file is in. */
  parentFolderName: string;
}

interface GetNormalizedDataParams {
  base: string;
  filename: string;
}

export function getNormalizedData({
  base,
  filename,
}: GetNormalizedDataParams): NormalizedData {
  const { subExtensions } = getMacroConfig();
  const normalizedBase = getNormalizedBase(base);

  const normalizedBasePaths = normalizedBase.split("/");
  const parentFolderName = normalizedBasePaths[normalizedBasePaths.length - 1];

  // get rid of sub extensions like `.stories` or `.story` in filename
  const regexStr = subExtensions.join("|");
  const regexFilename = new RegExp(regexStr, "i");
  const normalizedFilename = filename.replace(regexFilename, "");

  return {
    normalizedBase,
    normalizedFilename,
    parentFolderName,
  };
}
