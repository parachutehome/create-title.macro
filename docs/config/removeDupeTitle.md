# removeDupeTitle

!> This is an optional config option. See the [default value](#default-value)

When automaticaly creating a title, you can configure this macro to check if the generated title is a duplicate
of the parent folder it is in and only return one of those duplicated titles.

Here's an example of how this option applies:

**With dupe title (default behavior)**

```javascript
// src/components/Button/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: src/components/Button/Button
  // ...
}
```

**With NO dupe title**

```javascript
// src/components/Button/Button.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: src/components/Button
  // ...
}
```


?> **NOTE:** The macro evaluates the file names and folder names as case-sensitive.

If you have set `removeDupeTitle` to `true`, then this example demonstrates how case-sensitivity plays a role:

```javascript
// src/components/controls/Checkbox/checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Checkbox/checkbox
    // ...
}
```

OR

```javascript
// src/components/controls/checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/checkbox/Checkbox
    // ...
}
```

## Default Value

By default, `removeDupeTitle` is set to `false`.

## Macro Config Option

?> **NOTE:** The macro config option applies to your entire project

If you would prefer to remove dupe titles for your entire project, then you can specify it as a config option.
If you haven't already, read how config options work with babel macros [here](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#config).

### `babel-plugin-macros.config.js`

Assuming you've created a `babel-plugin-macros.config.js` file, you can define the macro config option like the following:

```javascript
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    removeDupeTitle: true,
  },
}

```


## setConfigForThisFile

?> **NOTE:** setConfigForThisFile only applies to the file it's called in

If you only want to remove dupe titles on a per-file basis, then you can use the exported `setConfigForThisFile` named function.

For example:

```javascript
// src/components/Button/Button.stories.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  removeDupeTitle: true
});

export default {
  title: createTitle(); // output: src/components/Button
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
  removeDupeTitle: true
});

const title1 = createTitle(); // output: src/components/Button/Button

// this config wins
setConfigForThisFile({
  removeDupeTitle: false
});

const title2 = createTitle(); // output: src/components/Button/Button
```

