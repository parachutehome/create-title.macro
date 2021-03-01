# rootDir

!> This is an optional config option. See the [default value](#default-value)

This is used to denote the root directory where your components for Storybook live. 
It's used when auto creating a title by stripping the `rootDir` from the generated title.
It's useful when you prefer not to include the `rootDir` in the generated title.

Here's how it looks in action with and without the stripping:

**With NO `rootDir` stripping**

```javascript
// src/components/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: src/components/Button
  // ...
}
```

**With `rootDir` stripping**

```javascript
// src/components/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

## Default Value

By default, `rootDir` is set to `src`. There's no specific reason for this other then
the fact that `src` is a common folder name used for project structure. 

For example, this type of project structure:

```
|- src/
|-- components/
|---- Button.stories.js
|---- Checkbox.stories.js
|- package.json
```

## Macro Config Option

?> NOTE: The macro config option applies to your entire project

If your root directory is different, then you can specify a new value by setting it as a macro config option.
If you haven't already, read how config options work with babel macros [here](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config).

### `babel-plugin-macros.config.js`

Assuming you've created a `babel-plugin-macros.config.js` file, you can define the macro config option like the following:

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    rootDir: "lib",
  },
}
```

### Keep rootDir in generated title

If you prefer to keep the `rootDir` in the generated title then configure `rootDir` with an empty string.

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    rootDir: "",
  },
}
```

Results in the following:

```javascript
// src/components/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: src/components/Button
  // ...
}
```

### Nested rootDir

In the situation where your `rootDir` is inside 1 or more folders (e.g. `src/client`) then you can specify the 
nested rootDir path like so:

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    rootDir: "src/client",
  },
}
```

Results in the following:

```javascript
// src/client/components/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

This technique is helpful when you have a project structure like:

```
|- src/
|-- client/
|---- components/
|------ Button.stories.js
|-- server/  
```

## setConfigForThisFile

?> **NOTE:** setConfigForThisFile only applies to the file it's called in

If you only want to set the `rootDir` on a per-file basis, then you can use the exported `setConfigForThisFile` named function.

For example:

```javascript
// src/components/Button.stories.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  rootDir: ""
});

export default {
  title: createTitle(); // output: src/components/Button
  // ...
}
```

OR

```javascript
// web/src/components/Button.stories.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  rootDir: "web/src"
});

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

### Last call wins

If for any reason you are calling `setConfigForThisFile` multiple times inside a single file,
then the last call wins and will use that config value.

```javascript
// src/components/Button/Button.stories.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  rootDir: "src"
});

const title1 = createTitle(); // output: src/components/Button/Button

// this config wins
setConfigForThisFile({
  rootDir: ""
});

const title2 = createTitle(); // output: src/components/Button/Button
```
