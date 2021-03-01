import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title: "should strip only the configured subextension - `.sb`",
    pluginOptions: {
      "create-title": { subExtensions: ['.sb'] },
    },
    code: `
            import createTitle from '../../macro';
         
            createTitle();
        `,
    output: `
      "dist/__tests__/subExtensions/component.example";
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
