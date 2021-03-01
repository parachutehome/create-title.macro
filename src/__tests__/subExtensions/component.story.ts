import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title: "should strip default subextensions - `.story`",
    code: `
            import createTitle from '../../macro';
         
            createTitle();
        `,
    output: `
      "dist/__tests__/subExtensions/component";
    `,
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
