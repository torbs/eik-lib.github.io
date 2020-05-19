---
id: client_putting_it_all_together
title: Putting It All Together
sidebar_label: Putting It All Together
---

To further improve things, we can use aliases with NPM package and import maps to make it easier to update versions without the need to update and redeploy applications.

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

## Package application code

Package application code giving the command the URL to the previously published import map alias URL.

```sh
eik package --name my-app --js ./scripts.js --map https://myeikserver.com/map/my-map/v1
```

The application package `my-app` version `1.0.0` should now be available at `https://myeikserver.com/pkg/my-app/1.0.0`

## Alias application code

Alias the application package for use in any script tags the application renders. This avoids the need to update the HTML whenever a new version of the application package is created.

```sh
eik package-alias my-app 1.0.0 1
```

An alias for the application package `my-app` version `1.0.0` should now be available at `https://myeikserver.com/pkg/my-app/v1`

## Consuming an application bundle

The aliased application bundle can be included in an HTML page using script tags like so

```html
<script src="https://myeikserver.com/pkg/my-app/v1/main/index.js" type="module" defer></script>
<script src="https://myeikserver.com/pkg/my-app/v1/ie11/index.js" nomodule defer></script>
```