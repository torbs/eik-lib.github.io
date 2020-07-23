---
id: client_import_maps
title: Import Maps
sidebar_label: Import Maps
---

Common dependencies can be separated out of your application bundles by the use of import maps.
Import maps map "bare" imports in your code to common dependencies at published URLs.

By creating and maintaining import maps, perhaps per team, across an entire organisation perhaps both, however you like, you can define which specific version of a dependency should be used across a number of applications. 

Apps use the import map by fetching it from its published URL when they perform a client side code build and then dependencies will automatically be mapped to the endorsed version's URL.

## Bare imports

A "bare" import is an import that is not specified as an absolute or a relative URL such as:

```js
import React from 'react';
```

An import like this has no meaning and your browser will not know what to do with it. However, writing code like this is common since bundlers like [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/) resolve these during bundling.

## About import maps

Import maps are an [emerging standard](https://github.com/WICG/import-maps) that allow control over what URLs get fetched by JavaScript import statements and import() expressions allowing "bare import specifiers", such as `import moment from "moment"`, to work in the browser (without a build step). By following this emerging standard, it will eventually be possible to use import maps in Eik apps without the need to support them during bundling. For now, however, it is necessary to use a plugin such as `rollup-plugin-eik-import-maps` when bundling to replace "bare imports" with values in import map files.

## Example use cases

### Web framework upgrades

For an organisation with many web applications, each with a lot of pages, all using React, it can be easy for many different versions of React to end up in play across the organisation, especially if there are many people or teams involved. For non breaking changes, you might simply prefer that all applications were locked to a specific version. Users moving across pages or apps will then only ever need to download a single version of React, and this is good for the user's page load times and therefore their experience of your application.

## Defining import maps

An import map is just a JSON file that's served at a specific URL. Eik includes support for uploading and versioning import maps.

If we create an import map JSON file named `import-map.json` with the following contents:

```json
{
    "imports": {
        "react": "https://assets.myeikserver.com/npm/react/16.17.4/index.js"
    }
}
```

## Publishing import maps

We can publish it to an Eik server with the following command:

```sh
eik map my-map 1.0.0 ./import-map.json
```

Each import map is uniquely identified by a name and a version and will be uploaded and then served by the Eik server at a path of the form `/map/<name>/<version>` so in the case above, the import map will be published to `/map/my-map/1.0.0` on the Eik server. We can publish updates simply by specifying a newer version that any previously published. Eg. `1.0.1`.

## Using published import maps

### Defining in eik.json

You can specify which named version of an import map your application should use in its `eik.json` file.

```json
{
    "import-map": "http://assets.myserver.com/map/my-map/1.0.0"
}
```

Bundler plugins (see below) use this field to automatically detect which import maps your application uses.

### Usage during bundling

Since import maps map "bare" import specifiers in applications to URLs, in our application we should continue to write import statements of the form:

```js
import React from 'react';
```

However, since import maps are not yet supported in browsers natively, it is necessary to use plugins during bundling to replace bare specifiers with URLs at bundle time.

When the bundler runs, bare import specifiers will be replaced with URLs by whichever plugin you are using. 

For example, using the import map above, any import statements using bare imports to refer to react will be changed from:

```js
import React from 'react';
```

to:

```js
import React from 'https://assets.myeikserver.com/npm/react/16.17.4/index.js';
```

## Supported plugins

We currently support the following plugins

* Rollup: [@eik/rollup-plugin-import-map](https://github.com/eik-lib/rollup-plugin-import-map)

## Usage with Aliases

For even more flexibility, consider using import maps in conjunction with [aliases](/docs/client_aliases). 

* Alias the latest version of React and put the alias into an import map so that upgrading React across all apps using the import map is as simple as updating the Alias
* Alias the latest version of the import map so that applications will automatically get changes when they perform bundles after the alias has been updated (no need to go in and manually update eik.json in each app)