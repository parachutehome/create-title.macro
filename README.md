# create-title.macro

![status](https://img.shields.io/badge/status-stable-green?style=flat-square)
![status](https://img.shields.io/badge/maintained-yes-green?style=flat-square)
![npm (scoped)](https://img.shields.io/npm/v/parachutehome/create-title.macro?style=flat-square)

> Automatically generate titles for your stories in [Storybook](storybook.js.org/).

This [babel macro](https://github.com/kentcdodds/babel-plugin-macros) was created to 
streamline the developer experience when working with stories inside Storybook. The macro
will automatically generate a title for your stories -- eliminating the need to 
write them out which can be a time saver especially when a story is nested deep inside
multiple folders.

## Install

```
npm i --save-dev @parachutehome/create-title.macro
```

If you haven't set up your project yet to support babel macros then [read the guide here](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md).

tl;dr

```
npm i --save-dev @parachutehome/create-title.macro babel-plugin-macros
```

Then in your `.babelrc`:

```
{
  "plugins": ["macros"]
}
```


## Usage

### Automatically create a title

#### Using an `index.stories.js` file

This macro respects the naming convention that `index` reflects the _default_ file
for a folder.

```javascript
// src/components/controls/Button/index.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Button
    // ...
}
```

#### Using a named file

```javascript
// src/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Input
    // ...
}
```


#### Using a named file with the same name as the parent folder

If the file name of a story is the same as the parent folder, then it will only 
choose one instance of the duplicated name to use in the title.

Note: The macro evaluates the file names and folder names as case-sensitive.

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Checkbox
    // ...
}
```

### Manually create a title

In the event where you need manual control of the title generation
then you can try the following approaches.

#### Using an `index.stories.js` file

In this situation, the macro simply uses the manual title as the result.
It doesn't try to replace the title automatically if it sees an `index` file name.

```javascript
// src/components/controls/Button/index.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Button/Apple
    // ...
}
```

#### Using a named file

```javascript
// src/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Apple
    // ...
}
```

#### Using a named file with the same name as the parent folder

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Checkbox/Apple
    // ...
}
```

#### Manual Override

If you need full control of the output value for the title, then you have 2 options:

##### Pass `true` as the second param

An example scenario where this might be useful is if you need
to manually title a story or stories temporarily as you
restructure your project folder. Then, once that is complete
you can just remove the 2nd param, and, the macro will take 
over again.

```javascript
// src/components/controls/Button/index.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('lib/Apple', true), // output: lib/Apple 
    // ...
}
```

##### Don't use the Macro

```javascript
// src/components/controls/Button/index.stories.js

export default {
    title: 'lib/Apple' 
    // ...
}
```

## Plugin Options

This macro lets you specify the root directory (`rootDir`) where your files live.
When the macro runs it will remove the `rootDir` from the generated title.

- `rootDir` accepts a string. Defaults to `"src"`. 

[Read more](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config) how you can configure macro plugins.

### Example config

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title.macro": {
    rootDir: 'src/lib'
  },
}
```

There is no need to provide a relative path for the rootDir.
The macro internally will strip any leading/trailing `.` or `/` characters.
Just give it the root folder path you want removed.

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title.macro": {
    rootDir: '../src/lib' // no need for `../`
  },
}
```

### Config in action

```javascript
// src/lib/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Input
    // ...
}
```

### Keep `rootDir` in generated title

In the case where you don't want the `rootDir` to be removed, then just
pass an empty string as the config option


#### Example config

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title.macro": {
    rootDir: '' // dont remove rootDir from generated title
  },
}
```

#### Config in action

```javascript
// src/lib/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: src/lib/components/controls/Input
    // ...
}
```

## API

The macro takes in 2 optional parameters: 

`manualTitle: string | undefined`

`useManualTitleOverride: boolean | undefined`


Type signature for the macro function:

```typescript
declare function macro(manualTitle?: string, useManualTitleOverride?: boolean): string;
```

## Previous Art

- https://github.com/storybookjs/paths.macro

The [paths.macro](https://github.com/storybookjs/paths.macro), created by Storybook,
served as inspiration, and a great jumping off point. Big thanks for their work!