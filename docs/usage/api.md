# API

This macro exports two methods for you to use.

1. The default export: `createTitle`
2. A named export: `setConfigForThisFile`


## createTitle

The default export (`createTitle`) will be what you use most. 
You can see example usage for `createTitle` in [Automatic Titles](/usage/automatic-titles) or [Manual Titles](/usage/manual-titles).

It takes in 2 optional parameters and will return a string:

1. `manualTitle` which can be a `string` or `undefined`
2. `useManualTitleOverride` which can be a `boolean` or `undefined`


type signature:

```typescript
export default function createTitle(manualTitle?: string, useManualTitleOverride?: boolean): string;
```

## setConfigForThisFile

This named export is useful if you need to apply a certain config on a per-file basis. 
You can see example usage for `setConfigForThisFile` in [rootDir](/config/rootDir) or [removeDupeTitle](/config/removeDupeTitle)


`setConfigForThisFile` expects a config object that excludes the `subExtensions` option ([you can read why it's excluded](/config/subExtensions#setconfigforthisfile)).

Either `rootDir` or `removeDupeTitle` can be defined inside the config object you pass to `setConfigForThisFile`.

type signature:

```typescript
interface MacroConfig {
  /** This is the root directory where your storybook components live and is stripped from the generated title. Defaults to "src" */
  rootDir?: string;
  /** Control whether or not to remove a duplicate title for generated titles if the parent folder and filename are the same. Defaults to `false` */
  removeDupeTitle?: boolean;
}

export function setConfigForThisFile(config: MacroConfig);
```
