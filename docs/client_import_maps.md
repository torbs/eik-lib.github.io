---
id: client_import_maps
title: Import Maps
sidebar_label: Import Maps
---

Common dependencies can be separated out of your application bundles by the use of import maps.
Import maps map "bare" imports in your code to common dependencies at published URLs.

### Bare imports

A "bare" import is an import that is not specified as an absolute or a relative URL such as:

```js
import React from 'react';
```

An import like this has no meaning and your browser will not know what to do with it. However, writing code like this is common since bundlers like [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) resolve these during bundling.

During Eik application packaging, if a "bare" import is used in your code, by default, it will be assumed to be a reference to a package in your `node_modules` folder and that package will then be inlined into the bundle. The import or require statement will be replaced with the actual code being imported.

If you were to produce bundles for different pages of your application, a large dependency such as react would be inlined in this way into each and every bundle and the user would be forced to download React each time they visit a page that uses a different bundle.

To avoid this, its possible to publish a separate version of react and have each bundle reference that same published version so that the user only ever downloads it once. React could be published using the `eik npm` command which would give us a URL that can used to reference React in application code.

```js
import React from 'https://assets.myeikserver.com/npm/react/16.17.4/index.js';
```

The problem with this is that we will need to replace our code's import statements each time a new version of React is published. When we have a lot of different applications across our organisation or just a number of bundles withing a single application, making updates quickly becomes a time consuming process.

### Import maps

An import map can be used to automate mapping between a "bare" import and the URL of the published version during bundling. We can continue to write:

```js
import React from 'react';
```

and when we bundle our application code, `react` will be replaced with `https://assets.myeikserver.com/npm/react/16.17.4/index.js`.

### Writing an import map

An import map is just a JSON file that's served at a specific URL. Eik includes support for uploading and versioning import maps.

```json
{
    "imports": {
        "react": "https://assets.myeikserver.com/npm/react/16.17.4/index.js"
    }
}
```

### Publishing an import map

Each import map is uniquely identified by a name and a version. To publish an import map, you need to create your import map locally as a JSON file and then upload it together with the name and version using the `eik map` command.

```sh
eik map my-map 1.0.0 ./import-map.json
```

The given import map will be uploaded and then served on an Eik server at the path `/map/my-map/1.0.0`

#### Example
```
https://assets.myeikserver.com/map/my-map/1.0.0
```

### Packaging with an import map

When running `eik package`, it's possible to provide the URL to an import map to have the command replace any matching bare imports

```sh
eik package --name my-app --js ./assets/scripts.js --map https://myeikserver.com/map/my-map/1.0.0
```

Continuing with the example above, any import statements using bare imports to refer to react will be changed from:

```js
import React from 'react';
```

to:

```js
import React from 'https://assets.myeikserver.com/npm/react/16.17.4/index.js';
```