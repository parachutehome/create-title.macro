import { MacroError } from "babel-plugin-macros";
import { createAutoTitle, createManualTitle } from "./lib";

import type { NodePath } from "@babel/core";
import type {
  BooleanLiteral,
  CallExpression,
  StringLiteral,
  TemplateLiteral,
} from "@babel/types";
import type { PathData } from "./getPathData";
import type { Babel } from "./macro";

interface Params extends PathData {
  paths: NodePath[];
  babel: Babel;
}

export function handleDefaultReference({
  paths,
  base,
  filename,
  babel: { types: t },
}: Params): void {

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
      type arg = CallExpression["arguments"][number] | undefined;
      const firstArg: arg = args.length > 0 ? args[0] : undefined;
      const secondArg: arg = args.length > 0 ? args[1] : undefined;

      // Make sure firstArg is a string or undefined
      // and secondArg is a boolean or undefined
      if (
        (firstArg === undefined || firstArg?.type === "StringLiteral" || firstArg?.type === "TemplateLiteral") &&
        (secondArg === undefined || secondArg?.type === "BooleanLiteral")
      ) {
        // createTitle.macro('apple')
        //                   ^^^^^^^
        const manualTitle: string| undefined = getStringFromNode(firstArg);

        // createTitle.macro('apple', true)
        //                            ^^^^
        const useManualTitleOverride = Boolean(
          (secondArg as Partial<BooleanLiteral>)?.value
        );

        if (manualTitle === undefined || manualTitle === "") {
          const newTitle = createAutoTitle({
            base,
            filename,
          });

          parentPath.replaceWith(t.stringLiteral(newTitle));
        } else {
          const newTitle = createManualTitle({
            base,
            manualTitle,
            useManualTitleOverride,
          });

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
}

function createErrorMessage(line?: number): string {
  const msg1 = `Invalid input given to macro at line ${line}. `;
  const msg2a = `Make sure you are calling the macro with proper parameter types like the following:\n`;
  const msg2b = `createTitle() or createTitle('Foo') or createTitle('Foo', true)`;

  return line ? msg1 + msg2a + msg2b : msg2a + msg2b;
}

function getStringFromNode(node: StringLiteral | TemplateLiteral | undefined) {
  if (node === undefined) {
    return undefined;
  }

  switch(node.type) {
    case "StringLiteral":
      return node.value;
    case "TemplateLiteral":
      return node.quasis[0].value.raw;
    default:
      return undefined
  }
}
