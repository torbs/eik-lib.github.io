---
id: overview
title: Overview
sidebar_label: Overview
---

Eik is an [asset server](/docs/server) for serving ESM and CSS assets. The Eik server can run and be integrated with your own infrastructure. Eik comes with a [client](/docs/client) for easy upload and management of your assets.

## Introduction

To understand Eik we need to understand what we are trying to achieve so lets start with a fairly common issue:

In a moderate or large sized web site it is very common that the site is built and served as [multiple applications](https://martinfowler.com/articles/microservices.html) which live at different pathnames on the site. It's also common for each of these applications to have a dedicated team of developers with the goal of being as autonomous as possible. To achieve this, each application and team should depend on each other as little as possible.

Lets say we have a site where the frontpage (`site.com`) is one application. Then we have a web shop, a second application, on `site.com/shop` and finally there is a third application handling checkout on `site.com/checkout`. 

Let's also say that all of these applications are using [lit-html](https://lit-html.polymer-project.org/) for templating in the browser. We then have different applications depending on the same library that we want to be developed and deployed to production autonomously. Problems can arise when some of these application start to depend on different versions of the same library.

Our challenge is to avoid the end user having to end up downloading different versions of the same library as they move between the different applications on our site. We want to maximize end user performance by downloading lit-html once and not having to download one specific version when accessing `site.com` (eg. v1.2.0) and then downloading another specific version (eg. v1.1.1) when moving to `site.com/shop` and finally ending up with perhaps having to download yet another version (eg. v1.1.2) when they check out at `site.com/checkout`.

The Eik solution is to make all applications point to the same version of the same library in production despite that the applications are developed using different patch or minor version. If the library then has appropriate HTTP cache headers, the browser will do the rest and make sure the library is loaded over the wire only once during the user's visit to our site.


## How Eik works

The main role of the Eik server is to serve static assets uploaded to the server. Upon upload, assets will be given a new versioned pathname for each upload and are considered imutable. A change in an asset is a new version on the Eik server. By doing so, served assets can be cached forever in the end users browser.

The Eik server also has a concept called an alias. An alias is an non imutable pahname which can be set to redirect requests to it, to an imutable asset pathname. 

Example: Lets say we upload lit-html version 1.1.1 to a Eik server. This version of lit-html will then live on the imutable URL `/npm/lit-html/1.1.1`. We can then set an alias for lit-html and this alias will be on the non imutable pathname `/npm/lit-html/v1`. Any request to any file under the alias at `/npm/lit-html/v1` we will then be redirected to the matching file under `/npm/lit-html/1.1.1`.

Later on we publish lit-html version 1.2.0 to the Eik server. This version will then live on the imutable pathname `/npm/lit-html/1.2.0`. We can then update the existing alias at the non imutable pathname `/npm/lit-html/v1` to point to the new version. Requests to any file under the alias at `/npm/lit-html/v1` will then be redirected to its matching file under `/npm/lit-html/1.2.0`.

In our challenge outlined in the above introduction each of the applications described can load lit-html through its alias (`/npm/lit-html/v1`) and they will all load the same version of lit-html. The alias acts as a static path to a shared library, lit-html, accross the applications. It is now possible to bump new versions of a library without having to rebuild and redeploy each applicaion to production. 

## ESM imports 

Before we proceed we need to highlight some ECMA Script Module (ESM) import statement basics. 

ESM import statements can be relative. A relative ESM import statement must start with either `/`, `./` or `../`:

```js
import * as mymod from '/my_module.js';
import * as mymod from './my_module.js';
import * as mymod from '../my_module.js';
```

ESM import statements can also be absolute and must start with a http protocol:

```js
import * as mylib from 'https://eik-server.com/pkg/mylib/v3/main.js';
```

Though; its very common to see ESM import statements which does not apply to any of these (note that `my_library` does not start with `/`, `./` or `../`):

```js
import * as mylib from 'my_library';
```

These are called bare imports and are not legal ESM import statements. A browser can not handle such an import statement. Bare import statements are commonly used when a module is installed through a package manager, such as NPM, and then transpiled through a build step to one of the legal ESM import statements before served to a browser.

In Eik, we utilize bare imports. Which brings us to Import Maps.

## Import Maps

Import Maps is a fairly new and to become web standard. Shortly explained a Import Map is a simple mapping, in form of a object, between a bare import statement to a legal ESM import statement. The idea is that an Import Map should be used to translate bare import statements to fully qualified import statements in ESM modules.

An Import Map looks something like this:

```json
{
    "my_library": "https://eik-server.com/pkg/mylib/v3/main.js",
    "lit-html": "https://eik-server.com/npm/lit-html/v1/"
}
```

Eik has support for storing Import Maps under a dedicated namespace. Import Maps are versioned and imutable and can be aliased in the same way as assets can.

Eik come with the feature to apply Image Maps to uploaded packages of assets to Eik.

## How it all play together

In Eik we use Import Maps and aliasing of assets to align the version of libraries accross multiple applications on a site while maintaining the posibillity to develop and deploy each application to production separately.

Lets go through this with our challenge outlined in the above introduction:

We know that lit-html is a library all our applications will be using so we want to align the version accross our applications. To do so, we publish a version 1.2.0 of lit-html to our Eik server and it is then available at `https://eik-server.com/npm/lit-html/1.2.0`.

To make the reference to lit-html more static over time we create an alias to point to version 1.2.0 and lit-html can be requested through `https://eik-server.com/npm/lit-html/v1`. As mentioned earlier, this give us the posibillity to bump versions of lit-html without having to rebuild and redeploy each of our applications to production.

Next, we need to create a mapping between the bare import statement developers will use when developing the applications and the aliased URL of lit-html. We can do so by making an Import Map as follow:

```json
{
    "lit-html": "/npm/lit-html/v1"
}
```

When created we publish this Import Map to our Eik server and we create an alias for it. If we named the Import Map "site-mapping" and versioned it as 1.0.1 during upload to the Eik server, it will now be available on the alias `https://eik-server.com/map/site-mapping/v1`.

In each application we can now depend on and install lit-html through NPM as many projects already do. Each application can now locally be developed by refering lit-html through its bare import statement:

```js
import * as lit from 'lit-html';
```

When an application is ready to be put into production, the frontend code should be uploaded as a package to the Eik server too. Upon preparation of our application to upload to the Eik server we will apply our Import Map. This will transform our bare import statements to a legal ESM import statement pointing to the lit-html alias defined in the Import Map:

```js
import * as lit from '/npm/lit-html/v1';
```

Now our applications use a ESM import statement pointing to the alias for lit-html which makes sure multiple applications on our site align to the same version of lit-html. While doing so, we've also been able to develop our application in isolation without depending or interfering with other applications utlilizing the same library.
