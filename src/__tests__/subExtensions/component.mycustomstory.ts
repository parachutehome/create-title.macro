import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title:
      "should support custom sub extensions as macro plugin option",
    pluginOptions: {
      "create-title.macro": { subExtensions: ['.mycustomstory'] },
    },
    code: `
            import createTitle from '../../macro';
         
            createTitle();
        `,
    output: `
      "dist/__tests__/subExtensions/component";
    `,
  },
  {
    /**
     * `subExtensions` should only be defined as a macro plugin option
     */
    title:
      "should fail to support custom sub extensions via `setConfigForThisFile`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';

            setConfigForThisFile({
              subExtensions: ['.mycustomstory']
            });
         
            createTitle();
        `,
    error: true
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
