---
id: overview
title: Overview
sidebar_label: Overview
---

Eik consist of 3 main parts. First of all Eik is an [asset server](/docs/server) for serving [ECMA Script Modules (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and CSS assets. The second part of Eik is a [client](/docs/client) for easy upload and management of your assets to the Eik server. The third part is a set of mapping utils one can plug into build tools to map assets on the Eik server with each other.

## Introduction

To understand Eik we need to understand what we are trying to achieve so lets start with a fairly common issue:

In a moderate or large sized web site it is very common that the site is built and served as [multiple applications](https://martinfowler.com/articles/microservices.html) which live at different pathnames on the site. It's also common for each of these applications to have a dedicated team of developers with the goal of being as autonomous as possible. To achieve this, each application and team should depend on each other as little as possible.

Lets say we have a site where the frontpage (`site.com`) is one application. Then we have a web shop, a second application, on `site.com/shop` and finally there is a third application handling checkout on `site.com/checkout`. 

Let's also say that all of these applications are using [lit-html](https://lit-html.polymer-project.org/) for templating in the browser. We then have different applications depending on the same library that we want to be developed and deployed to production autonomously. Problems can arise when some of these application start to depend on different versions of the same library.

Our challenge is to avoid the end user having to end up downloading different versions of the same library as they move between the different applications on our site. We want to maximize end user performance by downloading lit-html once and not having to download one specific version when accessing `site.com` (eg. v1.2.0) and then downloading another specific version (eg. v1.1.1) when moving to `site.com/shop` and finally ending up with perhaps having to download yet another version (eg. v1.1.2) when they check out at `site.com/checkout`.

The Eik solution is to make all applications point to the same version of the same library in production despite that the applications are developed using different patch or minor version. If the library then has appropriate HTTP cache headers, the browser will do the rest and make sure the library is loaded over the wire only once during the user's visit to our site.


## How Eik works

The main role of the Eik server is to serve static assets uploaded to the server. Upon upload, assets will be given a new versioned pathname for each upload and are considered imutable. A change in an asset is a new version on the Eik server. By doing so, served assets can be cached forever in the end users browser.

The Eik server also has the concept called an alias. An alias is a non immutable pathname which can be set to redirect requests to it, to an immutable asset pathname. 

For example, let us say that we upload lit-html version 1.1.1 to an Eik server. This version of lit-html will then live on the immutable URL `/npm/lit-html/1.1.1`. We can then set an alias for lit-html and this alias will be on the non immutable pathname `/npm/lit-html/v1`. Any request to any file under the alias at `/npm/lit-html/v1` will then be redirected to the matching file under `/npm/lit-html/1.1.1`.

Later on, when we publish lit-html version 1.2.0 to the Eik server, this version will then live on the immutable pathname `/npm/lit-html/1.2.0`. We can then update the existing alias at the non imutable pathname `/npm/lit-html/v1` to point to the new version. Requests to any file under the alias at `/npm/lit-html/v1` will then be redirected to its matching file under `/npm/lit-html/1.2.0`.

In order to meet the challenge outlined in the introduction above, each of the applications described can load lit-html through its alias (`/npm/lit-html/v1`) and they will all load the same version. The alias acts as a static path to a shared library (in this case lit-html) across all the applications. It's then possible to publish new versions of a library without having to rebuild and redeploy each application to production. 

## ESM imports 

Before we proceed, we should go over some ESM import statement basics. 

ESM import statements can be relative. A relative ESM import statement must start with either `/`, `./` or `../`:

```js
import * as mymod from '/my_module.js';
import * as mymod from './my_module.js';
import * as mymod from '../my_module.js';
```

ESM import statements can also be absolute in which case they must start with an HTTP protocol:

```js
import * as mylib from 'https://eik-server.com/pkg/mylib/v3/main.js';
```

Due to the prevalence of asset bundling, it's very common to see ESM import statements which do not comply with any of the statements outlined above (note that `my_library` does not start with `/`, `./` or `../`):

```js
import * as mylib from 'my_library';
```

These type of statements are called "bare imports" and are not legal ESM import statements. A browser can not handle such an import statement. Bare import statements are commonly used when a module is installed through a package manager, such as NPM, and then transpiled through a build step to one of the legal ESM import statements before being served to the browser.

In Eik, we utilize bare imports to align modules (ex; the applications in our example) to the same version of modules it depends on (ex; lit-html in our example). Which brings us to Import Maps.

## Import Maps

Import Maps are a fairly new and up and coming web standard. An Import Map is a simple object mapping between a bare import statement and a legal ESM import statement. The idea is that an Import Map should be used to map bare import statements to fully qualified import statements in ESM.

An Import Map looks something like this:

```json
{
    "my_library": "https://eik-server.com/pkg/mylib/v3/main.js",
    "lit-html": "https://eik-server.com/npm/lit-html/v1/"
}
```

Eik has support for storing Import Maps under a dedicated namespace. Import Maps are versioned and immutable and can be aliased in the same way that assets can.

Eik's mapping utils is used to apply Import Maps to assets during bundling.

## Mapping it together

In Eik, we use Import Maps and aliasing of assets to align the versions of libraries across multiple applications on a site while maintaining the possibility to develop and deploy each application to production separately.

Let's go through this, keeping in mind the challenge we outlined in the introduction above.

We know that lit-html is a library that all our applications will be using so we want to align the version in use across all of them. To do so, we publish version 1.2.0 of lit-html to our Eik server after which time it will be available at `https://eik-server.com/npm/lit-html/1.2.0`.

To make the reference to lit-html more static over time we create an alias to point to version 1.2.0 and lit-html can be requested through `https://eik-server.com/npm/lit-html/v1`. As mentioned earlier, this give us the possibillity to update versions of lit-html without having to rebuild and redeploy each of our applications to production.

Next, we need to create a mapping between the bare import statement developers will use when developing the applications and the aliased URL of lit-html. We can do so by making an Import Map as follow:

```json
{
    "lit-html": "/npm/lit-html/v1"
}
```

Once created, we publish this Import Map to our Eik server and then create an alias for it. If we were to name the Import Map "site-mapping" and versioned it as 1.0.1 during the upload to the Eik server, it would then be available at the alias URL `https://eik-server.com/map/site-mapping/v1`.

In each application we can now depend on and install lit-html through NPM as is common practice. Each application can then locally reference lit-html through its bare import statement like so:

```js
import * as lit from 'lit-html';
```

In the build tool used by the applications we can now add the appropiate Eik mapping utility which will read a set of defined Import Maps (in our example, "site-mapping") from the Eik server and apply these Import Maps to the application code. This will map our bare import statements into legal ESM import statements pointing to the lit-html alias defined in the Import Map:

```js
import * as lit from '/npm/lit-html/v1';
```

Now our application defines an ESM import statement that points to the alias for lit-html which makes sure multiple applications on our site align to the same version of lit-html. By doing this, we're able to develop our application in isolation without depending or interfering with any other applications that utilise the same library.

The final step in this process is uploading the application code as a package to the Eik server. Which is done by the Eik client.
