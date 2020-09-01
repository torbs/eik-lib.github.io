---
id: client_putting_it_all_together
title: Putting It All Together
sidebar_label: Putting It All Together
---

Aliases can be used with application packages, NPM packages and import maps to make it easier to update versions without the need to update and redeploy applications.

In the following example, the `@podium/browser` package will be set up as a dependency that multiple pages bundles can include without the module being inlined (and therefore duplicated).

## Publish from NPM

Publish an Eik mirror of the NPM package `@podium/browser`. Eik installs a local copy of the module, bundles it into a single ESM friendly file and uploads it to an Eik server ready for use.

```sh
eik npm @podium/browser 1.0.0-beta.2
```

`@podium/browser` should now be available at `https://myeikserver.com/npm/@podium/browser/1.0.0-beta.2/index.js`

## Alias NPM package

Create an alias pointing to the exact version of `@podium/browser` that we published to Eik. In this case, `1.0.0-beta.2` will be aliased to `v1`.

```sh
eik npm-alias @podium/browser 1.0.0-beta.2 1
```

An alias for `@podium/browser` should now be available at `https://myeikserver.com/npm/@podium/browser/v1/index.js`

## Create an import map

Create an import map JSON file that uses the `podium/browser` alias `v1` rather than the exact version so that if we need to update the module, it wont be necessary to update the import map.

```json
{
    "imports": {
        "@podium/browser": "https://myeikserver.com/npm/@podium/browser/v1/index.js"
    }
}
```

And then publish the import map to an Eik server

```sh
eik map my-map 1.0.0 ./import-map.json
```

The import map should now be available at `https://myeikserver.com/map/my-map/1.0.0`

## Alias import map

Create an alias of the import map for use when packaging application code.

```sh
eik map-alias my-map 1.0.0 1
```

An alias for the import map `my-map` version `1.0.0` should now be available at `https://myeikserver.com/map/my-map/v1`

## Update eik.json

Enter the import map alias URL in `eik.json` so that plugins can use it to replace bare imports with Eik URLs.

eik.json
```json
{
    "server": "https://myeikserver.com",
    "name": "my-app",
    "version": "1.0.0",
    "files": {
        "./esm.js": "./bundle.js",
        "./esm.js.map": "./bundle.js.map",
    },
    "import-map": "https://myeikserver.com/map/my-map/v1"
}
```

## Bundle local code (rollup example)

This assumes you are already familiar with using Rollup and the instructions here only show how to augment an existing setup.

Add `@eik/rollup-plugin-import-map` to your rollup config file

```sh
npm install -D @eik/rollup-plugin-import-map
```

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import eik from '@eik/rollup-plugin-import-map';

export default {
    input: './src/index.js',
    output: {
        file: './bundle.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        eik(),
        resolve(),
        commonjs(),
        babel(),
    ],
};
```

*n.b.* The `js` field in `eik.json` is set to read `bundle.js` which is produced by the rollup build.

## publish bundled code to Eik server

```sh
eik package
```

## Consuming an application bundle

The application bundle can be included in an HTML page using a script tag like so

```html
<script src="https://myeikserver.com/pkg/my-app/1.0.0/esm.js" type="module" defer></script>
```

Any bare references to `@podium/browser` will have been replaced with absolute URLs to the Eik server.