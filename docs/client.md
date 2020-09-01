---
id: client
title: Client
sidebar_label: Client
---

## Installation

```sh
npm install -g @eik/cli
```

## Quickstart guide

### Step 1.

Generate an eik.json file in the current directory

```sh
eik init
```

Fill in the generated `eik.json` file with the necessary details.

For the `server` property, you will need to have set up and know the address to, and Eik asset server.
See [the server docs](/docs/server)

Set the `files` property of `eik.json` with paths to client side
asset files in your project relative to the `eik.json` file.
Eg. if you have a `scripts.js` file in an assets directory, the `js.input` value will be `assets/scripts.js`

### Step 2

Run publish to publish your assets to the server

```sh
eik publish
```

## Additional tasks

### Publishing global dependencies

When you wish to share a version of a module, you can use the `dependency` command to do so.

This feature does the following:

- converts a module already published to npm to esm
- makes it available through the asset server

#### Example use case

You might decide that all teams across your organisation should use the same version of lodash via a published URL (rather than each team bundling their own version).

To do so you would run:

```sh
eik dependency lodash 4.17.15
```

After running this, an esm friendly version of lodash will be available at the url:
`http://<asset server url>/pkg/lodash/4.17.15`

It's now possible for each team to reference this globally published module directly in their
own client side code as follows:

```js
import lodash from `http://<asset server url>/pkg/lodash/4.17.15`;
```

This has the benefit that if all teams are referencing lodash in this way, the browser will cache the module the first time it encounters it and on subsequent pages will not need to download it again.

### Aliasing published modules

Aliasing allows you to tag specific published versions of modules with a more general tag or version that you are also able to centrally change as needed.

The benefit of this is that you can alias a specific version of a dependency and then update that alias overtime as you publish new versions of the dependency and have all dependents immediately receive the change.

#### Example use case

Taking the previous example 1 step further, before we saw that we could globally publish a specific version of lodash, in this case `4.17.15`.

We can now set a major semver alias for this version:

```sh
eik alias lodash 4.15.15 4
```

We can now change our import statement to:

```js
import lodash from `http://<asset server url>/pkg/lodash/v4`;
```

and everything will work as before.

When a new version of lodash comes out, we can create a global dependency for it as before:

```sh
eik dependency lodash 4.17.16
```

And then update the major semver alias to the new version like so:

```sh
eik alias lodash 4.15.16 4
```

In this way, no client side code will need to be updated to reflect this change and it is considerably easier for multiple teams to stay in sync, using the same global shared dependency

### Using import maps to map "bare imports"

Import maps are [an emerging standard](https://github.com/WICG/import-maps) and a way to map "bare imports" such as `foo` in the import statement `import { bar, baz } from 'foo'` to modules to be loaded. With Eik, we provide a way to upload import map files and to specify them for use in bundling. Doing so allows you to specify a common set of shared modules, whether they be `react` or `lit-html` etc.

Making use of import maps is done as follows.

1. Define an import map json file
2. Use the Eik CLI to upload the import map to the server
3. Specify the URL to your import map file(s) in your `eik.json` file
4. Use the `publish` commands, your import maps will be used to map bare imports in your code to the URLs you have defined in your import maps

#### Import maps, an example

Given the following import map file `import-map.json`

```json
{
  "imports": {
    "lit-html": "http://assets.examplecdn.com/pkg/lit-html/v1/index.js",
    "lodash": "http://assets.examplecdn.com/pkg/lodash/v4/index.js"
  }
}
```

The following command will upload the import map file `./import-map.json` in the current directory using the name `my-import-map` and the version `1.0.0`

```sh
eik map my-import-map 1.0.0 ./import-map.json
```

Given the following line now added to `eik.json`

```json
{
  "import-map": ["http://assets.examplecdn.com/map/my-import-map/1.0.0"]
}
```

When we run `eik publish` any "bare imports" refering to either `lit-html` or `lodash` will be mapped to the URLs in our map.

In this way, you can control which version of `react` or `lit-html` or `lodash` all your apps are using. In combination with package `alias` URLs, you have a powerful way to manage key shared dependencies for your apps in production without the need to redeploy or rebundle when a new version of a dependency is released.

### Accessing meta information about a package

It's possible to access information about a published package with the `meta` command. The command
returns information in JSON format.

#### Example

```sh
eik meta lodash 4.17.16
```

## API Documentation

### Command Summary

| command    | aliases | description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| init       | i       | Create an eik.json file in the current directory             |
| login      |         | Authenticates client with eik server                            |
| ping       |         | Pings eik server                                                |
| publish    | p, pub  | Publish an app bundle                                           |
| dependency | d, dep  | Publish a dependency bundle                                     |
| map        | m       | Sets or deletes a "bare" import entry in an import-map file     |
| alias      | a       | Sets a major semver alias for a given dependency or map         |
| meta       | show    | Retrieves meta information for a package                        |

### Commands Overview

#### init

This command takes no input and creates a new `eik.json` file in the current directory with the following content:

```json
{
  "name": "",
  "server": "",
  "js": {
    "input": "",
    "options": {}
  },
  "css": {
    "input": "",
    "options": {}
  },
  "import-map": []
}
```

You will then need to set the various fields as appropriate. If you are running a local asset server, the default server url should be `http://localhost:8080`.

##### eik.json properties

| property     | description                                                         |
| ------------ | ------------------------------------------------------------------- |
| name         | App name, must be unique to the Eik server                          |
| server       | Address to the asset server                                         |
| js           | Configuration for JavaScript assets                                 |
| css          | Configuration for CSS assets                                        |
| import-map   | Specify import maps to be used to map bare imports during bundling  |

###### name

All asset uploads must have a name. When publishing a dependency from npm the name will be the package name taken from the module's `package.json` file. When publishing the assets for your app, the `name` field of your project's `eik.json` file is used.
Names may contain any letters or numbers as well as the `-` and `_` characters.

```json
{
  "name": "my-awesome-app"
}
```

###### server

This is the address to the asset server you are using. This might be a locally running version of the asset server (usually `http://assets.examplecdn.com`) or an asset server running in production (TBD)

```json
{
  "server": "http://assets.examplecdn.com"
}
```

###### js

This field is used to configure bundling and publishing of JavaScript assets. Use `js.input` to configure the location on disk, relative to `eik.json`, where the entrypoint for your JavaScript client side assets are located.

_scripts.js file inside assets folder_

```json
{
  "js": {
    "input": "./assets/scripts.js"
  }
}
```

###### css

This field is used to configure bundling and publishing of CSS assets. Use `css.input` to configure the location on disk, relative to `eik.json`, where the entrypoint for your CSS client side assets are located.

_styles.css file inside assets folder_

```json
{
  "css": {
    "input": "./assets/styles.css"
  }
}
```

###### import-map

This field is used to configure the location of any import map files to be used when creating bundles. The field should be an array and can hold any number of url strings pointing to locations of import-map files that will be downloaded and merged together

_defining a single import map file_

```json
{
  "import-map": ["http://assets.examplecdn.com/map/my-import-map/1.0.0"]
}
```

#### login

Authenticate with the configured Eik server. The `server` field in `eik.json` will be used to determine which server to authenticate with. It is also possible to set the server without the need for an `eik.json`
file using the command line flag `--server` or `-s`

The command takes the form:

```sh
eik login [optional arguments]
```

**Example**

_Authenticate with Eik server using a prompt_

```bash
eik login
```

_Authenticate with Eik server using a given key_

```bash
eik login --key some_key
```

#### ping

Ping the configured Eik server.

**Example**

_Ping Eik server_

```sh
eik ping
```

#### publish

This command publishes the app's client side assets to an Eik server based on the values in an `eik.json` file in the current directory.

The command takes the form:

```sh
eik publish [optional arguments]
```

**Example**

_Publishing app assets to server_

```bash
eik publish
```

#### dependency

This command will download the specified (by name and version) package from NPM, create a bundle with it and then publish it to the Eik server. The resulting bundle will be in esm module format, converting from common js if needed.

_Note_ The arguments `server` and `import-map` are taken from `eik.json` if such a file is present in the current directory. If not, you will need to specify these values with the command line flags `--server` and `--map`.

The command takes the form:

```sh
eik dependency [optional arguments] <name> <version>
```

**Example**

_Publishing a dependency from npm_

```bash
eik dependency lit-html 1.1.2
# eik dependency --server http://assets.examplecdn.com --map http://assets.examplecdn.com/finn/map/my-import-map/1.0.0 lit-html 1.1.2
```

#### alias

This command creates a semver alias for a given published bundle. Creating aliases allows for more flexible referencing of published bundles. You can update an alias to point to the latest version of a bundle without needing to update every client that makes use of your bundle.

_Note_ The `server` argument is taken from `eik.json` if such a file is present in the current directory. If not, you will need to specify this values with the command line flag `--server`.

The command takes the form:

```sh
eik alias [optional arguments] <name> <version> <alias>
```

_Example_

Running the following command...

```bash
eik alias lit-html 1.1.2 1
# eik alias --server http://assets.examplecdn.com lit-html 1.1.2 1
```

...will create or update the `lit-html` alias `1` to point at `lit-html` version `1.1.2`

#### map

This command uploads an import map json file you have created locally to the server. You must upload the file with a `name` and a `version` and the file must be of the form:

```json
{
  "imports": {
    "<dependency name 1>": "url to dependency",
    "<dependency name 2>": "url to dependency"
  }
}
```

_Note_ The argument `server` is taken from `eik.json` if such a file is present in the current directory. If not, you will need to specify this value with the command line flag `--server`.

The command takes the form:

```sh
eik map [optional arguments] <name> <version> <path to file>
```

```bash
eik map my-import-map 1.0.0 ./import-map.json
# eik map --server http://assets.examplecdn.com my-import-map 1.0.0 ./import-map.json
```

#### meta

This command fetches and displays meta information about a package from the server

The command takes the form:

```sh
eik meta [optional arguments] <name> <version>
```

_Example_

Running the following command...

```bash
eik meta lit-html 1.1.2
# eik meta --server http://assets.examplecdn.com lit-html 1.1.2
```

Will print meta information about the package `lit-html` version `1.1.2` in JSON format.

## Programmatic Usage

All of the commands described above can be used programmatically by importing this package. Each command and its programmatic usage is given below.

### init

```js
const cli = require("@eik/cli");
const result = await new cli.Init(options).run();
```

#### options

| name    | description                           | type   | default         | required |
| ------- | ------------------------------------- | ------ | --------------- | -------- |
| logger  | log4j compliant logger object         | object | `null`          | no       |
| cwd     | path to current working directory     | string | `process.cwd()` | no       |
| name    | app name                              | string | `''`            | no       |
| server  | URL to asset server                   | string | `''`            | no       |
| js      | path to client side script entrypoint | string | `''`            | no       |
| css     | path to client side style entrypoint  | string | `''`            | no       |

### publish

```js
const cli = require("@eik/cli");
const result = await new cli.publish.App(options).run();
```

#### options

| name    | description                           | type     | default         | required |
| ------- | ------------------------------------- | -------- | --------------- | -------- |
| logger  | log4j compliant logger object         | object   | `null`          | no       |
| cwd     | path to current working directory     | string   | `process.cwd()` | no       |
| name    | app name                              | string   |                 | yes      |
| server  | URL to asset server                   | string   |                 | yes      |
| js      | path to client side script entrypoint | string   |                 | yes      |
| css     | path to client side style entrypoint  | string   |                 | yes      |
| map     | array of urls of import map files     | string[] | `[]`            | no       |
| dryRun  | exit early and print results          | boolean  | false           | no       |

### dependency

```js
const cli = require("@eik/cli");
const result = await new cli.publish.Dependency(options).run();
```

#### options

| name    | description                       | type     | default         | required |
| ------- | --------------------------------- | -------- | --------------- | -------- |
| logger  | log4j compliant logger object     | object   | `null`          | no       |
| cwd     | path to current working directory | string   | `process.cwd()` | no       |
| name    | app name                          | string   |                 | yes      |
| server  | URL to asset server               | string   |                 | yes      |
| map     | array of urls of import map files | string[] | `[]`            | no       |
| dryRun  | exit early and print results      | boolean  | false           | no       |

### map

```js
const cli = require("@eik/cli");
const result = await new cli.publish.Map(options).run();
```

#### options

| name    | description                            | type   | default         | required |
| ------- | -------------------------------------- | ------ | --------------- | -------- |
| logger  | log4j compliant logger object          | object | `null`          | no       |
| cwd     | path to current working directory      | string | `process.cwd()` | no       |
| name    | app name                               | string |                 | yes      |
| version | app version                            | string |                 | yes      |
| server  | URL to asset server                    | string |                 | yes      |
| file    | path to import map file to be uploaded | string |                 | yes      |

### alias

```js
const cli = require("@eik/cli");
const result = await new cli.Alias(options).run();
```

#### options

| name    | description                             | type   | default | choices      | required |
| ------- | --------------------------------------- | ------ | ------- | ------------ | -------- |
| logger  | log4j compliant logger object           | object | `null`  |              | no       |
| server  | URL to asset server                     | string |         |              | yes      |
| type    | type of resource to alias               | string |         | `pkg`, `map` | yes      |
| name    | app name                                | string |         |              | yes      |
| alias   | major number of a semver version number | string |         |              | yes      |

### meta

```js
const cli = require("@eik/cli");
const result = await new cli.Meta(options).run();
```

| name    | description                   | type   | default | choices | required |
| ------- | ----------------------------- | ------ | ------- | ------- | -------- |
| logger  | log4j compliant logger object | object | `null`  |         | no       |
| server  | URL to asset server           | string |         |         | yes      |
| name    | package name                  | string |         |         | yes      |
