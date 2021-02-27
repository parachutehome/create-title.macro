import { createMacro, MacroError } from "babel-plugin-macros";
import { getPathData } from "./getPathData";
import { setMacroConfig } from "./macroConfig";
import { handleDefaultReference } from "./handleDefaultReference";
import { handleSetConfigForThisFileReference } from "./handleSetConfigForThisFileReference";

import type { MacroHandler, MacroParams, Options } from "babel-plugin-macros";

export type Babel = MacroParams["babel"];

const macro: MacroHandler = ({ references, state, config, babel }) => {
  const inputFilename = state.file.opts.filename;

  if (inputFilename === undefined || inputFilename === null) {
    throw new MacroError(
      "Unable to create title because the input filename was empty"
    );
  }

  const { base, filename } = getPathData(inputFilename);

  const rootDir = String(config?.rootDir ?? "src");
  const removeDupeTitle = Boolean(config?.removeDupeTitle);

  setMacroConfig({
    rootDir,
    removeDupeTitle,
  });

  /**
   * We want the `default` reference to be at the
   * end of the entries because we want to ensure
   * that `setConfigForThisFile` has a chance
   * to execute before `createTitle` gets called
   */
  const entries = Object.entries(references).sort((left, right) => {
    const [leftReferenceKey] = left;
    const [rightReferenceKey] = right;

    if (leftReferenceKey === "default" || rightReferenceKey === "default") {
      return -1;
    }
    return 1;
  });

  for (const [referenceKey, paths] of entries) {
    /**
     * This macro can be referenced in two ways:
     * 1. Through default export -- whatever it's named (e.g. `createTitle`)
     * 2. Through named export -- `setConfigForThisFile`
     *
     * Each reference has their own handler as they provide
     * different behaviors.
     */

    switch (referenceKey) {
      case "default":
        handleDefaultReference({ paths, base, filename, babel });
        break;
      case "setConfigForThisFile":
        handleSetConfigForThisFileReference({ paths });
        break;
      default:
        throw new MacroError(
          `Unexpected reference used from "@parachutehome/create-title.macro". Please remove the following: ${referenceKey}`
        );
    }
  }
};

const macroOptions: Options = {
  configName: "create-title.macro",
};

export default createMacro(macro, macroOptions);
