import { getNormalizedBase } from "./getNormalizedBase";

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
    rootDir: string;
}

export function getNormalizedData({ base, filename, rootDir }: GetNormalizedDataParams): NormalizedData  {
    const normalizedBase = getNormalizedBase(base, rootDir);

    const normalizedBasePaths = normalizedBase.split('/');
    const parentFolderName = normalizedBasePaths[normalizedBasePaths.length - 1];

    // get rid of `.stories` in filename
    const normalizedFilename = filename.replace('.stories', '');

    return {
        normalizedBase,
        normalizedFilename,
        parentFolderName,
    };
}