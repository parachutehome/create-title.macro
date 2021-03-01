import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title:
      "should support case sensitivity with `true` for `removeDupeTitle`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              removeDupeTitle: true
            });
            createTitle();
        `,
    output: `"dist/__tests__/Dupetitle-Case-Sensitive/dupetitle-case-sensitive";`,
  },
];

pluginTester({
  plugin,
  pluginName: "create-title.macro",
  babelOptions: {
    filename: __filename,
  },
  tests,
});
