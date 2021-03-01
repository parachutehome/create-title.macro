import { getNormalizedBase } from "./getNormalizedBase";

interface CreateManualTitleParams {
  /** The base path for the file where the macro was called. */
  base: string;
  /** The manual title to use. */
  manualTitle: string;
  /** Should we use the manual title as the actual value? */
  useManualTitleOverride: boolean;
}

export function createManualTitle({
  base,
  manualTitle,
  useManualTitleOverride,
}: CreateManualTitleParams): string {
  const normalizedBase = getNormalizedBase(base);

  if (useManualTitleOverride) {
    return manualTitle;
  }

  return `${normalizedBase}/${manualTitle}`;
}
