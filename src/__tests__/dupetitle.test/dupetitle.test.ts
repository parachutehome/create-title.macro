import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title:
      "should support calling setConfigForThisFile with `true` for `removeDupeTitle`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              removeDupeTitle: true
            });
            createTitle();
        `,
    output: `"dist/__tests__/dupetitle.test";`,
  },
  {
    title:
      "should support calling setConfigForThisFile with `false` for `removeDupeTitle`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              removeDupeTitle: false
            });
            createTitle();
        `,
    output: `"dist/__tests__/dupetitle.test/dupetitle.test";`,
  },
  {
    title:
      "should support calling setConfigForThisFile with `true` for `removeDupeTitle` and `dist/__tests__` for `rootDir`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              rootDir: 'dist/__tests__',
              removeDupeTitle: true
            });
            createTitle();
        `,
    output: `"dupetitle.test";`,
  },
  {
    title:
      "should support calling setConfigForThisFile with `false` for `removeDupeTitle` and `dist/__tests__` for `rootDir`",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              rootDir: 'dist/__tests__',
              removeDupeTitle: false
            });
            createTitle();
        `,
    output: `"dupetitle.test/dupetitle.test";`,
  },
  {
    title: "should support `removeDupeTitle` as macro plugin option",
    pluginOptions: {
      "create-title": { removeDupeTitle: true },
    },
    code: `
            import createTitle from '../../macro';
            createTitle();
        `,
    output: `"dist/__tests__/dupetitle.test";`,
  },
  {
    title:
      "should support calling setConfigForThisFile multiple times -- last call wins",
    code: `
            import createTitle, { setConfigForThisFile } from '../../macro';
            
            setConfigForThisFile({
              rootDir: '',
              removeDupeTitle: false
            });
            createTitle();

            setConfigForThisFile({
              rootDir: 'dist/__tests__',
              removeDupeTitle: true
            });
            createTitle();
        `,
    output: `
      "dupetitle.test";
      "dupetitle.test";
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
