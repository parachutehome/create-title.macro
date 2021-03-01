### Automatic Titles

Let the macro do the work for you and automatically create the title.

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

In this situation, the macro will generate the title as is (e.g. with the dupe title).
If you want to change this behavior then take a look at the
config option, [removeDupeTitle](/config/removeDupeTitle).


```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(), // output: components/controls/Checkbox
    // ...
}
```
