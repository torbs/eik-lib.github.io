---
id: client_app_packages
title: Application Packages
sidebar_label: Application Packages
---

Publishing and serving your application's client side assets is the main task Eik was designed for. Given local paths to client side bundle files you produce, Eik will package up the files and upload them to an Eik server where they will be served for use in your production applications.

## Producing packages

Use the `package` command to package and upload local JavaScript and CSS bundle files to an Eik server from where they will be served.

### eik.json definitions

In your app's Eik config you use the `files` key to define local file paths to be included when packaging.

#### eik.json file entrypoints

```json
{
    "files": {
        "./scripts.js": "./scripts.js",
        "./scripts.js.map": "./scripts.js.map",
        "./styles.css": "./styles.css",
        "./styles.css.map": "./styles.css.map",
    }
}
```

#### package.json file entrypoints

```json
{
    "eik": {
        "files": {
            "./scripts.js": "./scripts.js",
            "./scripts.js.map": "./scripts.js.map",
            "./styles.css": "./styles.css",
            "./styles.css.map": "./styles.css.map",
        }
    }
}
```

### The publish command

With entrypoints defined in the Eik config, running the `eik package` command will assemble files (specified by entrypoints) into an archive and upload the archive to the Eik server defined by the `server` field.

```sh
eik package
```

Once uploaded, the archive will be unpacked and the files served at the appropriate paths.

The following example shows how entrypoint definitions correspond to final file locations:

#### Example.

*Either in eik.json define...*

```json
{
    "server": "http://assets.myserver.com",
    "name": "my-pack",
    "version": "1.0.0",
    "files": {
        "index.js": "./scripts.js",
        "index.js.map": "./scripts.js.map",
        "ie11.js": "./scripts-fallback.js",
        "ie11.js.map": "./scripts-fallback.js.map",
        "index.css": "./styles.css",
        "index.css.map": "./styles.css.map"
    }
}
```

*or in package.json define...*

```json
{
    "eik": {
        "name": "my-pack",
        "version": "1.0.0",
        "server": "http://assets.myserver.com",
        "files": {
            "index.js": "./scripts.js",
            "index.js.map": "./scripts.js.map",
            "ie11.js": "./scripts-fallback.js",
            "ie11.js.map": "./scripts-fallback.js.map",
            "index.css": "./styles.css",
            "index.css.map": "./styles.css.map"
        }
    }
}
```

*then run the command...*

```sh
eik package
```

*URLs after packaging will be...*

* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.js`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.js.map`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js.map`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.css`
* `http://assets.myserver.com/pkg/my-pack/1.0.0/index.css.map`
