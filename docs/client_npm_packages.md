---
id: client_npm_packages
title: ESM Friendly NPM Packages
sidebar_label: NPM Packages
---

One task Eik can perform is to take packages that have been published to NPM and create and serve ESM friendly versions for you to use in your app packages.

This is similar to what [unpkg](https://unpkg.com/) and [pika](https://www.pika.dev/) do except that Eik will automatically transpile [common js](https://en.wikipedia.org/wiki/CommonJS) packages into an ESM version (as well as a fallback version for older browsers) before serving.

When combined with Eik's aliasing feature, this gives you a powerful way to manage dependency versions across multiple applications.

## The eik npm command

To view subcommands and additional help in your terminal you can use

```sh
eik npm --help
```

## Publishing from NPM

As an example of how this works, let's publish a version of the popular `lodash` package to Eik.

### Install a specific version 

Call the command with the name and version of the package you want to install from NPM.

```sh
eik npm lodash 4.17.15
```

### Install the latest version

It's possible to omit the version argument to get the latest available version on NPM.

```sh
eik npm lodash
```

## Accessing installed NPM packages

### The Eik meta command

To view publish information, you can use the `eik meta` command.

```sh
eik meta lodash
```

### Server URLs

Package URLs follow a specific format which are predictable so you can import any published packages into your application code via its URL.

#### Package URL format

```
http(s)://<server origin>/npm/<package name>/<package version>/index.js
```

#### ESM Imports

```js
import lodash from 'https://myeikserver.com/npm/lodash/4.17.15/index.js'
```