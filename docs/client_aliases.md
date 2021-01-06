---
id: client_aliases
title: Aliases
sidebar_label: Aliases
---

Aliases are general package versions that point to exact package versions.

The need to redeploy your application every time you update a client side bundle can be avoided by using aliasing.

In an application, we can reference an alias instead of a specific version and whenever we need to, we can update our alias and our application will automatically be updated.

For example, an alias by the name `v1` might be set up to point to the exact package version `1.0.0`. The alias itself is independent of the version and since it is just an HTTP redirect, can be easily updated to point at a new version. 

## Application aliases

### Using an aliased version

Creating aliases allows you to include the alias script tags in your application with no need to update the script tag every time you publish a new bundle version.

```js
<script type="module" defer src="https://myeikserver.com/pkg/my-app/v1/index.js">
```

### Publishing an alias

You can create an alias by running the package-alias command

```
eik package-alias <app name> <version> <alias>
```

```sh
eik package-alias my-app 1.0.0 1
```

### Updating an alias

After publishing a new version of a package `1.0.1`

```sh
eik version patch
eik package
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik package-alias my-app 1.0.1 1
```

And now `v1` will point to `1.0.1` instead of `1.0.0`

## NPM aliases

### Using an aliased version

Creating aliases for NPM packages that have an Eik mirror allows you to include the alias script tags in your application without needing to update the script tag every time you publish a new bundle version.

```js
<script type="module" defer src="https://myeikserver.com/npm/lodash/v4/index.js">
```

### Publishing an alias

You can create an alias by running the npm-alias command

```
eik npm-alias <npm package name> <version> <alias>
```

```sh
eik npm-alias lodash 4.17.18 4
```

### Updating an alias

After publishing a new version of the NPM package

```sh
eik npm lodash 4.17.19
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik npm-alias lodash 4.17.19 4
```

And now `v4` will point to `4.17.19` instead of `4.17.18`

## Import map aliases

### Using an aliased version

Creating import map aliases allows you to include the import map alias in your application's Eik config without the need to update it every time you publish a new version of the import map.

### Publishing an alias

You can create an alias by running the map-alias command

```
eik map-alias <map name> <version> <alias>
```

```sh
eik map-alias my-map 1.0.0 1
```

### Updating an alias

After publishing a new version of an import map

```sh
eik map my-map 1.0.1 ./import-map.json
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik map-alias my-map 1.0.1 1
```

And now `v1` will point to `1.0.1` instead of `1.0.0`
