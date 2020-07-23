---
id: client_app_packages
title: Application Packages
sidebar_label: Application Packages
---

Publishing and serving your application's client side assets is the main task Eik was designed for. Given local paths to client side bundle files you produce, Eik will package up the files and upload them to an Eik server where they will be served for use in your production applications.

## Producing packages

Use the `package` command to package and upload local JavaScript and CSS bundle files to an Eik server from where they will be served.

### eik.json definitions

In your app's `eik.json` file, you can use the `js` and `css` keys to define local file paths to be included when packaging. One or both of `js` and `css` must be defined and the definitions can be either a string path or an object that maps URL paths to local filesystem entrypoint paths.

#### string entrypoints

```json
{
    "js": "./scripts.js",
    "css": "./styles.css",
}
```

#### object entrypoints

```json
{
    "js": {
        "./scripts.js": "./scripts.js",
        "./scripts.js.map": "./scripts.js.map",
    },
    "css": {
        "./styles.css": "./styles.css",
        "./styles.css.map": "./styles.css.map",
    },
}
```

### The publish command

With entrypoints defined in `eik.json`, running the `eik package` command will assemble files (specified by entrypoints) into an archive and upload the archive to the Eik server defined by the `server` field in `eik.json`.

```sh
eik package
```

Once uploaded, the archive will be unpacked and the files served at the appropriate paths.

Some examples of how entrypoint definitions correspond to final file locations:

#### Example 1.

*eik.json*

```json
{
    "server": "http://assets.myserver.com",
    "name": "my-pack",
    "version": "1.0.0",
    "js": "./scripts.js",
    "css": "./styles.css",
}
```

*URLs after packaging*

* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.js`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.css`

#### Example 2.

*eik.json*

```json
{
    "server": "http://assets.myserver.com",
    "name": "my-pack",
    "version": "1.0.0",
    "js": { 
        "./esm.js": "./scripts.js",
        "./esm.js.map": "./scripts.js.map",
        "./ie11.js": "./scripts-fallback.js",
        "./ie11.js.map": "./scripts-fallback.js.map",
    },
    "css": {
        "./styles.css": "./styles.css",
        "./styles.css.map": "./styles.css.map",
    }
}
```

*URLs after packaging*

* `http://assets.myserver.com/pkg/my-pack/1.0.0/esm.js`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/esm.js.map`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js.map`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/styles.css`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/styles.css.map`
