# subExtensions 

!> This is an optional config option. See the [default value](#default-value)

Storybook lets you configure how it [finds your story files](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project)
using globs. Storybook's default glob grabs your stories either by naming the file as `*.stories.{js|ts|md}` or by keeping them in a `stories/` folder.

`subExtensions` are used by stripping them away in the generated title. If you end up changing the sub-extension, `.stories` or `.story`, to something else then use this config option, `subExtensions`, to match the new sub-extension(s).

You can see the default config for `subExtensions` in action here:

```javascript
// src/components/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

OR

```javascript
// src/components/Button.story.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

If you are creating your stories in a designated `stories/` folder where no sub-extension is needed then this config option won't affect the output of the 
generated title.

For example:

```javascript
// src/stories/Button.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

## Default Value

By default, `subExtensions` are set to `[".stories", ".story"]`.

## Macro Config Option

?> NOTE: The macro config option applies to your entire project

If you need to customize the `subExtensions`, then you can specify a new value by setting it as a macro config option.
If you haven't already, read how config options work with babel macros [here](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config).

### `babel-plugin-macros.config.js`

Assuming you've created a `babel-plugin-macros.config.js` file, you can define the macro config option like the following:

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    subExtensions: [".mystory", ".sb.example"],
  },
}
```

Results in the following:


```javascript
// src/components/Button.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

```javascript
// src/components/Button.sb.example.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

If you need to include a sub-extension like `.example` in this scenario, then configure the option like
so:


```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    subExtensions: [".sb"],
  },
}
```

Results in the following:


```javascript
// src/components/Button.sb.example.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button.example
  // ...
}
```

## setConfigForThisFile

There is no support for setting `subExtensions` using `setConfigForThisFile`. Reason being that `subExtensions` should be a config
option that's applied project-wide and not to a specific file.
