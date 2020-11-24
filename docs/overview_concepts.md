---
id: overview_concepts
title: Concepts
sidebar_label: Concepts
---

Eik is for serving ESM and CSS but we use the term packages when we refer what is uploaded to an Eik server. A package can contain any set of files which are considered to be static assets on a web site. Despite being agnostic in its opinion about what a package can contain, Eik does have a package type definition which comes into play when organizing assets.

## Package Types

Eik differentiates between the types of packages it hosts. These are: Packages, NPM Packages and Import Maps. On the server, these different types live under separate URL namespaces to avoid conflicts with each other. 

### Eik Packages

Eik packages are normally produced by websites and web applications. Such a package typically consists of bundled application code which, most of the time, does not really make much sense to publish as a module to a public repository such as NPM.

Packages live under the [/pkg/](server_rest_api.md#packages) namespace on an Eik server.

### NPM Packages

NPM packages are modules replicated from the [NPM repository](https://www.npmjs.com/) with the intention that they be loadable by browsers. This is similar to what [unpkg](https://unpkg.com/) and [pika](https://www.pika.dev/) do, with the exception that Eik does not proxy NPM modules as Unpkg and Pika do. Eik has taken a different approach and it is necessary to manually publish modules from NPM to Eik as well as do any transpiling from (for example) CommonJS to ESM as a manual process before publishing.

NPM Packages live under the [/npm/](server_rest_api.md#npm-packages) namespace on an Eik server.

### Import Maps

Import Maps are handled as single JSON files in Eik and not treated as a package. It's only possible to upload a single file and not a group of files like it is when uploading packages.

Import Maps live under the [/map/](server_rest_api.md#import-maps) namespace on a Eik server.

## Naming and versioning

A package intended to be published to an Eik server should follow the [NPM module naming convention](https://github.com/npm/validate-npm-package-name):

- package name length should be greater than zero
- all characters in a package name must be lowercase i.e., no uppercase or mixed case names are allowed
- package name *can* consist of hyphens
- package name *must not* contain non-url-safe characters (since name ends up being part of a URL)
- package name *should not* start with `.` or `_`
- package name *should not* contain leading or trailing spaces
- package name *should not* contain any of the following characters: `~)('!*`
- package name *cannot* be the same as a node.js/io.js core module nor a reserved/blacklisted name. For example, the following names are invalid:
    + http
    + stream
    + node_modules
    + favicon.ico
- package name length cannot exceed 214

All packages published to an Eik server is immutable and versioned with [Semantic Versioning](https://semver.org/). This makes it possible to differentiate between what are considered smaller changes to a package which should not break behaviour in a dependency from changes which can be breaking.

Since packages are immutable, the Eik server will set an infinite HTTP cache control header on all files belonging to a package to make use of browser caching.

## Aliasing

Aliasing can be applied to all packages and is a way of having a static URL reference, which can change, to a version of a package. Aliases are mutable and can be set to point to different versions of a package. The alias URL will do a redirect to the full version that it is set to point to.

Lets say we publish `lit-html`  version `1.1.1`  as an NPM package to an Eik server. It will then live on the following URL:

```sh
https://eik-server.com/npm/lit-html/1.1.1/
```

If we then create an alias for this version it will live on the following URL:

```sh
https://eik-server.com/npm/lit-html/v1/
```

Any request to any file under this alias will be redirected to the same path under the package version it refers too.

A request to the following file under the alias:

```sh
https://eik-server.com/npm/lit-html/v1/lit-html.js
```

will redirect to:

```sh
https://eik-server.com/npm/lit-html/1.1.1/lit-html.js
```

Aliasing is not automatic in Eik. Aliases must be created or updated manually when a version of a package is published to an Eik server.

### Aliasing and versioning

Aliasing is tied to the semantic version of each package where the alias is the major version as a single digit pointing to a given full version of the same major version. That means that all 1.x versions of a package can have a `v1` alias and all 2.x versions of the same package can have a `v2` alias at the same time.

This is a feature to make sure there is a way to publish breaking changes in a package without breaking its dependencies. In semantic versioning `patch` and `minor` versions are supposed to not contain breaking changes while a `major` version can contain breaking changes so in a situation where a package introduces a breaking change it should, according to semantic versioning, be published as a new major version.

This breaks a bit with what Eik is trying to solve if we look at the challenge we outlined in our [introduction](overview.md#introduction) but the handling of breaking changes is probably the one place where it's acceptable not to align all dependencies of a package to the same version of it.
