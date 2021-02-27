import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

const tests = [
  {
    title: "should generate auto title",
    code: `
            import createTitle from '../macro';
            createTitle();
        `,
    output: `"dist/__tests__/macro.test";`,
  },
  {
    title: "should generate manual title",
    code: `
            import createTitle from '../macro';
            createTitle('apple');
        `,
    output: `"dist/__tests__/apple";`,
  },
  {
    title: "should generate auto title when passed an empty string",
    code: `
            import createTitle from '../macro';
            createTitle('');
        `,
    output: `"dist/__tests__/macro.test";`,
  },
  {
    title: "should apply manual override",
    code: `
            import createTitle from '../macro';
            createTitle('apple', true);
        `,
    output: `"apple";`,
  },
  {
    title: "should not apply manual override",
    code: `
            import createTitle from '../macro';
            createTitle('apple', false);
        `,
    output: `"dist/__tests__/apple";`,
  },
  {
    title: "should do nothing",
    code: `import createTitle from '../macro';`,
    output: ``,
  },
  {
    title: "should fail due to incorrect macro invocation",
    code: `
            import createTitle from '../macro';
            createTitle
        `,
    error: true,
  },
  {
    title: "should fail when invoking as a template literal expression",
    code: `
            import createTitle from '../macro';
            createTitle\`bad\`
        `,
    error: true,
  },
  {
    title: "should fail when invoking with wrong parameter type - number",
    code: `
            import createTitle from '../macro';
            createTitle(5)
        `,
    error: true,
  },
  {
    title: "should fail when invoking with wrong parameter type - boolean",
    code: `
            import createTitle from '../macro';
            createTitle(false)
        `,
    error: true,
  },
  {
    title: "should fail when invoking with wrong parameter type - number",
    code: `
            import createTitle from '../macro';
            createTitle(5)
        `,
    error: true,
  },
  {
    title: "should fail when invoking with wrong parameter type - array",
    code: `
            import createTitle from '../macro';
            createTitle([])
        `,
    error: true,
  },
  {
    title: "should fail when invoking with wrong parameter type - object",
    code: `
            import createTitle from '../macro';
            createTitle({})
        `,
    error: true,
  },
  {
    title: "should do nothing due to no macro import",
    code: `createTitle();`,
    output: `createTitle();`,
  },
  {
    title: "should allow duplicate path name if using manual title",
    code: `
            import createTitle from '../macro';
            createTitle('__tests__');
        `,
    output: `"dist/__tests__/__tests__";`,
  },
  {
    title: 'should remove "rootDir" when passed as macro plugin option',
    pluginOptions: {
      "create-title.macro": { rootDir: "dist/" },
    },
    code: `
            import createTitle from '../macro';
            createTitle('apple');
        `,
    output: `"__tests__/apple";`,
  },
  {
    title: 'should ignore removing "rootDir" because it\'s not found',
    pluginOptions: {
      "create-title.macro": { rootDir: "bad/" },
    },
    code: `
            import createTitle from '../macro';
            createTitle('apple');
        `,
    output: `"dist/__tests__/apple";`,
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
