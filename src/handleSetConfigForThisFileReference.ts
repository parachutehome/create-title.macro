import { MacroError } from "babel-plugin-macros";
import { setMacroConfig } from "./macroConfig";

import type { NodePath } from "@babel/core";
import type { CallExpression, ObjectExpression } from "@babel/types";

interface Params {
  paths: NodePath[];
}

export function handleSetConfigForThisFileReference({ paths }: Params): void {
  for (const { parentPath } of paths) {
    /**
     * We ensure the macro is being invoked by
     * a Call Expression. In laymen terms, how
     * we would call a function with parenthesis.
     *
     * e.g. `setConfigForThisFile({ rootDir: '', removeDupeTitle: true })`
     */
    const isCallExpression = parentPath.isNodeType("CallExpression");

    if (isCallExpression) {
      const parentNode = parentPath.node as CallExpression;
      const args = parentNode.arguments;
      type arg = CallExpression["arguments"][number] | undefined;
      const firstArg: arg = args.length > 0 ? args[0] : undefined;

      // Make sure firstArg is an object
      if (firstArg !== undefined && firstArg.type === "ObjectExpression") {
        // e.g. setConfigForThisFile({ rootDir: '', removeDupeTitle: true })
        const config = transformObjectExpressionToObjectLiteral(firstArg);
        setMacroConfig(config);

        parentPath.remove();

        // needed to avoid hitting the default MacroError we have below
        // since this has been a valid use of `setConfigForThisFile`
        continue;
      }
    }

    const line = parentPath.node?.loc?.start?.line;
    const message = createErrorMessage(line);
    throw new MacroError(message);
  }
}

function transformObjectExpressionToObjectLiteral(objExpr: ObjectExpression) {
  const result: { [x: string]: string | boolean } = {};

  for (const property of objExpr.properties) {
    if (property.type !== "ObjectProperty") {
      throw new MacroError(createErrorMessage(property.loc?.start?.line));
    }

    if (property.key.type !== "Identifier") {
      throw new MacroError(createErrorMessage(property.loc?.start?.line));
    }

    const objKey = property.key.name;

    if (
      property.value.type !== "StringLiteral" &&
      property.value.type !== "BooleanLiteral"
    ) {
      throw new MacroError(
        createTypeErrorMessage(objKey, property.loc?.start?.line)
      );
    }

    const objValue = property.value.value;

    result[objKey] = objValue;
  }

  return result;
}

function createErrorMessage(line?: number): string {
  const msg1 = `Invalid input given to macro at line ${line}. `;
  const msg2a = `Make sure you are calling \`setConfigForThisFile\` with an object like the following:\n`;
  const msg2b = `setConfigForThisFile({ rootDir: '', removeDupeTitle: true })`;

  return line ? msg1 + msg2a + msg2b : msg2a + msg2b;
}

function createTypeErrorMessage(objKey: string, line?: number): string {
  const msg1 = `Invalid input given to macro at line ${line}. `;
  const msg2a = `Config property "${objKey}" was passed an incorrect type for the value.\n`;
  const msg2b = `The macro config type signature: \`{ rootDir: string, removeDupeTitle: boolean }\``;

  return line ? msg1 + msg2a + msg2b : msg2a + msg2b;
}
