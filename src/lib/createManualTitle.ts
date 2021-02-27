import { getNormalizedBase } from "./getNormalizedBase";

interface CreateManualTitleParams {
  /** The base path for the file where the macro was called. */
  base: string;
  /** The manual title to use. */
  manualTitle: string;
  /** Should we use the manual title as the actual value? */
  useManualTitleOverride: boolean;
  /** The rootDir that's passed as a macro config option */
  rootDir: string;
}

export function createManualTitle({
  base,
  manualTitle,
  useManualTitleOverride,
  rootDir,
}: CreateManualTitleParams): string {
  const normalizedBase = getNormalizedBase(base, rootDir);

  if (useManualTitleOverride) {
    return manualTitle;
  }

  return `${normalizedBase}/${manualTitle}`;
}
