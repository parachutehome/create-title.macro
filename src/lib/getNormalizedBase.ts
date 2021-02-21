/**
 * @returns {string} base path excluding the root dir and any leading/trailing forward slash
 */
export function getNormalizedBase(base: string, rootDir: string): string {
    // get rid of leading and trailing `/`
    let newBase: string = base
        .replace(/^\//, '')
        .replace(/\/$/, '');

    // make sure the rootDir ends with a trailing slash
    // e.g. /src/ -> src/ or ./src/ -> src/
    const normalizedRootDir = rootDir.replace(/[\/.]*/g, '') + '/';

    //  get rid of leading `src/` or rootDir in the new base
    newBase = newBase.replace(normalizedRootDir, '');

    return newBase;
}
