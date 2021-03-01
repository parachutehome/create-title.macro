# create-title.macro

[![npm (scoped)](https://img.shields.io/npm/v/@parachutehome/create-title.macro?style=flat-square)](https://www.npmjs.com/package/@parachutehome/create-title.macro "View this project on npm")
![status](https://img.shields.io/badge/status-stable-green?style=flat-square)
![status](https://img.shields.io/badge/maintained-yes-green?style=flat-square)

Automatically generate titles for your stories in [Storybook](https://storybook.js.org/).

This [babel macro](https://github.com/kentcdodds/babel-plugin-macros) was created to 
streamline the developer experience when working with stories inside Storybook. The macro
will automatically generate a title for your stories -- eliminating the need to 
write them out which can be a time saver especially when a story is nested deep inside
multiple folders.

## Getting Started

## Install

```bash
npm i --save-dev @parachutehome/create-title.macro
```

If you haven't set up your project yet to support babel macros then [read the guide here](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md).

tl;dr

```bash
npm i --save-dev @parachutehome/create-title.macro babel-plugin-macros
```

Then in your `.babelrc`:

```json
{
  "plugins": ["macros"]
}
```

## Example Usage

```javascript
// src/components/Button/index.stories.js

import createTitle from '@parachutehome/create-title.macro';

export default {
  title: createTitle(); // output: components/Button
  // ...
}
```

## Documentation

You can view the full documentation for this babel macro [online here](https://parachutehome.github.io/create-title.macro/).

## Contributing

If you would like to help contribute features or bug fixes to this macro, then please read the [contributing guide here](/CONTRIBUTING.md).

## Previous Art

- https://github.com/storybookjs/paths.macro

The [paths.macro](https://github.com/storybookjs/paths.macro), created by Storybook,
served as inspiration, and a great jumping off point. Big thanks for their work!
