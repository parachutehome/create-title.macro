import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title:
      "should support not stripping custom subextension that's not found",
    pluginOptions: {
      "create-title": { subExtensions: ['.mycustomstory'] },
    },
    code: `
            import createTitle from '../../macro';
         
            createTitle();
        `,
    output: `
      "dist/__tests__/subExtensions/component.stories";
    `,
  },
  {
    title: "should strip default subextensions - `.stories`",
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
