
# Manual Titles

In the event where you need manual control of the title generation
then you can try the following approaches.

## Using an `index.stories.js` file

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

## Using a named file

```javascript
// src/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Apple
    // ...
}
```

## Using a named file with the same name as the parent folder

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Checkbox/Apple
    // ...
}
```

## Passing an empty string

If you pass an empty string to `createTitle` it will automatically create a title for you.

```javascript
// src/components/controls/Input.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(''), // output: components/controls/Input
    // ...
}
```

## Using a string literal

You've already seen how to use a string literal in the previous examples.

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle('Apple'), // output: components/controls/Checkbox/Apple
    // ...
}
```

?> **NOTE:** This macro does not evaluate dynamic/computed strings

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js

const myvar = 'Big';

export default {
    title: createTitle('My' + myvar + 'Title'),
    // ...
}
```

In this scenario, the macro will fail and output an error.

## Using a template literal

You can also use a template literal when manually creating a title. 

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

export default {
    title: createTitle(`Apple`), // output: components/controls/Checkbox/Apple
    // ...
}
```

?> **NOTE:** This macro does not evaluate variables in your template literal 

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

const myvar = "Big";

export default {
    title: createTitle(`My${myvar}Title`), // output: My
    // ...
}
```

In this scenario, it will output an incomplete title -- `My`.

> The takeaway here is to avoid computing a dynamic manual title

## Using a variable for manual titles

Currently, this macro does not support using a variable for manual titles.

```javascript
// src/components/controls/Checkbox/Checkbox.stories.js
import createTitle from '@parachutehome/create-title.macro';

const myvar = "Title";

export default {
    title: createTitle(myvar), 
    // ...
}
```

In this scenario, the macro will fail and output an error.

## Manual Override

If you need full control of the output value for the title, then you have 2 options:

### Pass `true` as the second param

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

### Don't use the Macro

```javascript
// src/components/controls/Button/index.stories.js

export default {
    title: 'lib/Apple' 
    // ...
}
```
