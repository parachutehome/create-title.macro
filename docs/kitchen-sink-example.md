# Kitchen Sink Example

Here's an example using everything.

## Babel Macros Config

```
// babel-plugin-macros.config.js
module.exports = {
  "create-title": {
    rootDir: "src/client",
    removeDupeTitle: true,
    subExtensions: [".mystory"]
  },
}
```

## Example Usage

```javascript
// src/client/components/Button.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

```javascript
// src/client/components/Media/index.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Media
  // ...
}
```


```javascript
// src/client/components/Checkbox/Checkbox.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Checkbox
  // ...
}
```


```javascript
// src/client/components/Input/input.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Input/input
  // ...
}
```

```javascript
// src/client/components/Video/index.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle('MyVideo'); // output: components/MyVideo
  // ...
}
```

```javascript
// src/client/components/Image/Image.mystory.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle('examples/MyImage', true); // output: examples/MyImage
  // ...
}
```

```javascript
// src/client/components/Header/index.mystory.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  rootDir: '',
});

export default {
  title: createTitle(); // output: src/client/components/Header
  // ...
}
```

```javascript
// src/client/components/Footer/Footer.mystory.js

import createTitle, { setConfigForThisFile } from '@parachutehome/create-title.macro';

setConfigForThisFile({
  rootDir: '',
  removeDupeTitle: false,
});

export default {
  title: createTitle(); // output: src/client/components/Footer/Footer
  // ...
}
```

```javascript
// src/client/components/Menu/Menu.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Menu/Menu.stories
  // ...
}
```

> In the above case, remember we set the `subExtensions` to a custom value. So the `.stories` will be included in the generated title
> which will look like `Menu.stories`. In this scenario, the macro sees that `Menu.stories` !== `Menu` and outputs `components/Menu/Menu.stories`

