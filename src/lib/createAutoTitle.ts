import { getNormalizedData } from "./getNormalizedData";

interface CreateAutoTitleParams {
    /** The base path for the file where the macro was called. */
    base: string;
    /** The name of the file where the macro was called. */
    filename: string;
    /** The rootDir that's passed as a macro config option */
    rootDir: string;
}

export function createAutoTitle({ base, filename, rootDir }: CreateAutoTitleParams): string {
    const { normalizedBase, normalizedFilename, parentFolderName } = getNormalizedData({
        base,
        filename,
        rootDir
    });

    if (normalizedFilename === 'index' || normalizedFilename === parentFolderName) {
        /**
         * We use parent folder name (a.k.a the last path)
         * as the file name instead of `index` for more
         * readable results.
         *
         * The last path is included in `normalizedBase`.
         */
        return normalizedBase;
    }

    /**
     * Use the filename as the title
     */
    return `${normalizedBase}/${normalizedFilename}`;
}