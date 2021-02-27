/**
 * Set the config for this file only. `setConfigForThisFile` provides a way
 * to override the config for this macro on a per-file basis.
 * 
 * @param {{rootDir: string | undefined, removeDupeTitle: boolean | undefined }} config 
 */
export function setConfigForThisFile(config: {
  /** If undefined, defaults to global `rootDir` value which initially is `src` */
  rootDir?: string;
  /** If undefined, defaults to global `removeDupeTitle` value which initially is `false` */
  removeDupeTitle?: boolean;
}): void;

/**
 * This macro will automatically generate
 * titles for your stories in Storybook.
 *
 *
 * This babel macro was created to streamline the developer experience when working
 * with stories inside Storybook. The macro will automatically generate a title
 * for your stories -- eliminating the need to write them out which can be a time
 * saver especially when a story is nested deep inside multiple folders.*
 *
 *
 * @param {string} [manualTitle]
 * @param {boolean} [useManualTitleOverride=false]
 * @returns {string} title
 *
 * @example <caption>Auto generate title</caption>
 *
 * // src/components/media/Image.js
 * import createTitle from '@parachutehome/create-title.macro';
 * createTitle(); // outputs: `components/media/Image`
 *
 * @example <caption>Manual title</caption>
 *
 * // src/components/media/Image.js
 * import createTitle from '@parachutehome/create-title.macro';
 * createTitle('Apple'); // outputs: `components/media/Apple`
 *
 * @example <caption>Manual override with specified title</caption>
 *
 * // src/components/media/Image.js
 * import createTitle from '@parachutehome/create-title.macro';
 * createTitle('Apple', true); // outputs: `Apple`
 *
 * For more information about the macro visit the README.
 */
export default function createTitle(
  manualTitle?: string,
  useManualTitleOverride?: boolean
): string;
