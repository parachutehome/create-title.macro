import { createMacro, MacroError } from "babel-plugin-macros";
import { getPathData } from "./getPathData";
import { createAutoTitle, createManualTitle, createErrorMessage } from "./lib";

import type { CallExpression } from "@babel/types";
import type { MacroHandler, Options } from "babel-plugin-macros";

const macro: MacroHandler = ({
  references,
  state,
  config,
  babel: { types: t },
}) => {
  const { base, filename } = getPathData(state.file.opts.filename!);
  const paths = references.default;

  /**
   * We default to `src` as the rootDir
   * for no big reason. It's just
   * a common folder name where
   * all of the code lives in.
   */
  const rootDir: string = config?.rootDir ?? "src";

  for (const { parentPath } of paths) {
    /**
     * We ensure the macro is being invoked by
     * a Call Expression. In laymen terms, how
     * we would call a function with parenthesis.
     *
     * e.g. `createTitle('apple')`
     */
    const isCallExpression = parentPath.isNodeType("CallExpression");

    if (isCallExpression) {
      const parentNode = parentPath.node as CallExpression;
      const args = parentNode.arguments;
      type arg = CallExpression["arguments"][0] | undefined;
      const firstArg: arg = args.length > 0 ? args[0] : undefined;
      const secondArg: arg = args.length > 0 ? args[1] : undefined;

      // Make sure firstArg is a string or undefined
      // and secondArg is a boolean or undefined
      if (
        (firstArg === undefined || firstArg.type === "StringLiteral") &&
        (secondArg === undefined || secondArg.type === "BooleanLiteral")
      ) {
        // createTitle.macro('apple')
        //                   ^^^^^^^
        const manualTitle: string | undefined = firstArg?.value ?? undefined;

        // createTitle.macro('apple', true)
        //                            ^^^^
        const useManualTitleOverride = Boolean(secondArg?.value);

        if (manualTitle) {
          const newTitle = createManualTitle({
            base,
            manualTitle,
            useManualTitleOverride,
            rootDir,
          });

          parentPath.replaceWith(t.stringLiteral(newTitle));
        } else {
          const newTitle = createAutoTitle({ base, filename, rootDir });

          parentPath.replaceWith(t.stringLiteral(newTitle));
        }

        // needed to avoid hitting the default MacroError we have below
        // since this has been a valid use of the macro
        continue;
      }
    }

    const line = parentPath.node?.loc?.start?.line;
    const message = createErrorMessage(line);
    throw new MacroError(message);
  }
};

const macroOptions: Options = {
  configName: "create-title.macro",
};

export default createMacro(macro, macroOptions);
