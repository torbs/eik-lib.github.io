---
id: mapping_import_map
title: Import Map
sidebar_label: Import Map
---

A key concept in Eik is to align the dependents of a module to the same version. A part of this concept is [Import Maps](https://github.com/WICG/import-maps) which makes it possible to map import statements in modules.

Import Maps are a fairly new concept and will hopefully be supported in browsers in the close future. Import Maps allow [ECMA Script Modules (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) "bare" import specifiers, such as `import {html, render} from 'lit-html'` which will throw when used in a browser, to work by being mapped to a relative or absolute URLs the browser can use to load the module.

In other words; in an ESM we can import a module like so:

```js
import {html, render} from 'lit-html';
```

Then an Import Map can be loaded as following in the browser:

```html
<script type="importmap">
{
  "imports": {
    "lit-html": "https://cdn.eik-server.com/npm/lit-html/v1/lit-html.js",
  }
}
</script>
```

When the Import Map is applied, our code will act as we have written:

```js
import {html, render} from 'lit-html';

import * as lit from 'https://cdn.eik-server.com/npm/lit-html/v1/lit-html.js'
```

## Choose a Strategy

Browser support for Import Maps is currently (October 2020) limited. There are polyfills available for Import Maps and its fully possible to apply Import Map to modules ahead of time through build tools. Eik does not dictate which strategy, a polyfill or ahead of time, one uses to append Import Maps to modules but its advised that an organization aligns on the same strategy across its teams.

It is also worth keeping in mind that one is not locked to one strategy forever. An Import Map used to apply mapping ahead of time will work as intended in browsers the day there is full browser support for Import Maps.
