---
id: client_app_packages
title: Application Packages
sidebar_label: Application Packages
---

Publishing and serving your application's client side assets is the main task Eik was designed to do. Given local paths to your client side files, Eik will package up single ESM modules and upload them to an Eik server where they will be served for use in your production applications.

## Producing bundles

Use the `package` command to package and upload local JavaScript and CSS code to an Eik server where they will be served as a single files.

```sh
eik package --name my-app --js ./path/to/client.js --css ./path/to/styles.css
```

On the server, the following file patterns will then be available:

### ESM bundle and source map

The ESM bundle is served at `/main/index.js` alongside a matching source map.

```
http(s)://<server address>/pkg/<name>/<version>/main/index.js
http(s)://<server address>/pkg/<name>/<version>/main/index.js.map
```

#### Example

For a server `https://myeikserver.com` and a bundle name of `my-app`, the URLs for the bundle and its matching source map for a first time publish will be:

```
https://myeikserver.com/pkg/my-app/1.0.0/main/index.js
https://myeikserver.com/pkg/my-app/1.0.0/main/index.js.map
```

### Fallback bundle and source map

A fallback bundle is served at `/ie11/index.js` alongside a matching source map.

```
http(s)://<server address>/pkg/<name>/<version>/ie11/index.js
http(s)://<server address>/pkg/<name>/<version>/ie11/index.js.map
```

#### Example

For a server `https://myeikserver.com` and a bundle name of `my-app`, the URLs for the bundle and its matching source map for a first time publish will be:

```
https://myeikserver.com/pkg/my-app/1.0.0/ie11/index.js
https://myeikserver.com/pkg/my-app/1.0.0/ie11/index.js.map
```

### CSS bundle and source map

The CSS bundle is served at `/main/index.css` alongside a matching source map.

```
http(s)://<server address>/pkg/<name>/<version>/main/index.css
http(s)://<server address>/pkg/<name>/<version>/main/index.css.map
```

#### Example

For a server `https://myeikserver.com` and a bundle name of `my-app`, the URLs for the bundle and its matching source map for a first time publish will be:

```
https://myeikserver.com/pkg/my-app/1.0.0/main/index.css
https://myeikserver.com/pkg/my-app/1.0.0/main/index.css.map
```

## Consuming bundles

Bundles, once created, can be included using a script tag in your application's HTML source code that points to the location of the bundle on an Eik server. Since the bundle uses ESM, you will need to include the attribute `type=module` as shown

### JavaScript ESM bundles

```html
<script type="module" defer src="https://myeikserver.com/my-app/1.0.0/main/index.js">
```

### Fallback bundles

An IE11 compatible fallback bundle will also be produced and served along side the modern ESM version so you can support older browsers.

It's possible to include both bundles in your page so that modern browsers will get the ESM goodness while older browsers will be served the fallback bundle

```html
<script type="module" defer src="https://myeikserver.com/my-app/1.0.0/main/index.js">
<script nomodule defer src="https://myeikserver.com/my-app/1.0.0/ie11/index.js">
```

### CSS bundles

```html
<link href="https://myeikserver.com/my-app/1.0.0/main/index.css" rel="stylesheet">
```


## Dependencies

Your code's depencencies will be inlined and included in a single bundle. Eik uses rollup under the hood to do this and can handle Common JS as well as ESM dependencies. Dependencies can be other files in your project or NPM packages installed into your projects `node_modules` folder.

## Project structure

Your application will include an entrypoint for your JavaScript and/or CSS code. It may also include other dependent files. These might be other local JavaScript or CSS files. These might also be files installed into a `node_modules` folder by the `NPM` package manager. Eik will follow these dependencies and then inline them into a single file. Since Eik follows your import or require statements, It's not important where the files are located. It's up to you how you structure your project files.

### Example project structure

```
- app
    - assets
        - client.js
        - styles.css
        - dep1.js
        - dep2.css
    - node_modules
        - dep3
            - index.js
        - dep4
            - index.css
```

## Entrypoints

When you run the `eik package` command from the project root, you provide it an absolute or relative path to your asset entrypoint files. You can think of your entrypoint files as the main file for your JavaScript or CSS. These files can include other dependencies which Eik will inline as part of packaging.

### Example entrypoints

```
eik package --name my-app --js ./assets/client.js --css ./assets/styles.css
```

## Server artifacts

The command in the the example above will produce 6, self contained files on the server with dependencies inlined into each bundle. These are:

* A modern ESM bundle at the path `/pkg/<name>/<version>/main/index.js`
* A source map for the ESM bundle at the path `/pkg/<name>/<version>/main/index.js.map`
* A fallback bundle for older browsers at the path `/pkg/<name>/<version>/ie11/index.js`
* A source map for the fallback bundle at the path `/pkg/<name>/<version>/ie11/index.js.map`
* A CSS bundle at the path `/pkg/<name>/<version>/main/index.css`
* A CSS bundle source map at the path `/pkg/<name>/<version>/main/index.css.map`

## The assets.json file

It's possible to include an `assets.json` file to store metadata about your project such as the name of the project, location of the Eik server to publish against and the local paths to any JavaScript or CSS files that should be packaged.

Creating an `assets.json` file with the following values in the current working directory reduces the amount of cli boiler plate that needs to be typed.

```json
{
    "name": "my app",
    "js": {
        "input": "./assets/client.js"
    },
    "css": {
        "input": "./assets/styles.css"
    }
}
```

Now, the following command is all that is needed

```sh
eik package
```

It is intended that this file be committed to source control with the rest of your project.

## The .eikrc file

When `eik package` is run, a hidden file, `.eikrc` will be created or updated in the current working directory and will include the published version as well as a matching integrity hash for the version.

`.eikrc` is a JSON hidden file that is **NOT** meant to be committed to source control. You should add it to your `.gitignore` file.

```json
{
    "version": "1.0.0",
    "integrity":"sha512-a216vKYER8xN8xH/sOkWr7r02zPOv//fri/cJw6wCw8xdb6ZWIUJaDx3YSWxza9N32mp4J+hHgQ/l0cDEABkBQ=="
}
```

If you setup publishing on CI, your app build could include this `.eikrc` file and, if needs be, dynamically read in this file at runtime and use it to build the URL path to the script file to go in your page. You might also use aliasing (see below) to avoid the need to know exact versions.