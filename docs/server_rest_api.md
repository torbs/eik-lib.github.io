---
id: server_rest_api
title: Eik server - REST API
sidebar_label: REST API
---

The EIK server has the following REST API:

## Authentication

Authentication is needed to execute multiple API calls in the REST API.

### Endpoint Summary Table

| Name                         | Verb | Endpoint              | Form Fields |
| ---------------------------- | ---- | --------------------- | ----------- |
| [Login](#login)              | POST  | `/auth/login`        | `key`       |

### Login

**Method:** `POST`

Logs a user in to the service.

```bash
https://:assetServerUrl:port/auth/login
```

Form parameters:

-   `key` an authentication key

Status codes:

-   `200` if user is authorized
-   `401` if user is not authorized

Success response: A jwt token

```json
{
    "token": "..."
}
```

Example:

```bash
curl -X POST -i -F key=rfm940c3 http://localhost:4001/auth/login
```

## Packages

A packages is a set of files (javascript, css etc) that is intended to be referenced from an HTML document and
loaded by a browser.

Packages are versioned and consist of one or more files. A package are immutable.

### Endpoint Summary Table

| Name                                      | Verb | Endpoint                      | Form Fields |
| ----------------------------------------- | ---- | ----------------------------- | ----------- |
| [Public Package URL](#public-package-url) | GET  | `/pkg/:name/:version/:extras` |             |
| [Upload a Package](#upload-a-package)     | PUT  | `/pkg/:name/:version`         | `package`   |

### Public Package URL

**Method:** `GET`

Retrieves files from a package at the service.

```bash
https://:assetServerUrl:port/pkg/:name/:version/:extras
```

URL parameters:

-   `:name` is the name of the package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the package. Validator: Comply with [semver validation regex](https://semver.org/).
-   `:extras` whildcard pathname to any file in the package

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/pkg/fuzz/8.4.1/main/index.js
```

### Upload a package

**Method:** `PUT`

Puts a new package at the service.

```bash
https://:assetServerUrl:port/pkg/:name/:version
```

URL parameters:

-   `:name` is the name of the package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the package. Validator: Comply with [semver validation regex](https://semver.org/).

Form parameters:

-   `package` a `tar` or `tar.gz` containing the files of the package

HTTP headers:

-   `Authorization` a jwt authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `303` if package is successfully uploaded. `location` is root of module
-   `400` if validation in URL parameters or form fields fails
-   `401` if user is not authorized
-   `409` if package already exist or version in a major range is not newer than previous version in a major range
-   `415` if file format of the uploaded file is unsupported
-   `502` if package could not be written to the sink

Example:

```bash
curl -X PUT -i -F package=@archive.tgz -H "Authorization: Bearer {:token}" http://localhost:4001/pkg/fuzz/8.4.1
```

### Latest Package versions

**Method:** `GET`

Retrieves an overview of the latest major versions of a package.

```bash
https://:assetServerUrl:port/pkg/:name
```

URL parameters:

-   `:name` is the name of the package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/pkg/fuzz
```

### Package version overview

**Method:** `GET`

Retrieves an overview of the files of a package version.

```bash
https://:assetServerUrl:port/pkg/:name/:version
```

URL parameters:

-   `:name` is the name of the package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the package. Validator: Comply with [semver validation regex](https://semver.org/).

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/pkg/fuzz
```

## NPM Packages

A NPM packages is a local replika of a module found in the [NPM registry](https://www.npmjs.com/) intended to be referenced from a HTML document and
loaded by a browser. In many cases, with exceptions, a NPM Package will be a library or utillity [Packages](#packages) depend on.

NPM Packages are versioned and consist of one or more files. A NPM package are immutable.

### Endpoint Summary Table

| Name                                              | Verb | Endpoint                      | Form Fields |
| ------------------------------------------------- | ---- | ----------------------------- | ----------- |
| [Public NPM Package URL](#public-npm-package-url) | GET  | `/npm/:name/:version/:extras` |             |
| [Upload a NPM Package](#upload-a-npm-package)     | PUT  | `/npm/:name/:version`         | `package`   |

### Public NPM Package URL

**Method:** `GET`

Retrieves files from a NPM package at the service.

```bash
https://:assetServerUrl:port/npm/:name/:version/:extras
```

URL parameters:

-   `:name` is the name of the NPM package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the NPM package. Validator: Comply with [semver validation regex](https://semver.org/).
-   `:extras` wildcard pathname to any file in the NPM package

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/npm/fuzz/8.4.1/main/index.js
```

### Upload a NPM Package

**Method:** `PUT`

Puts a new NPM package on the service.

```bash
https://:assetServerUrl:port/npm/:name/:version
```

URL parameters:

-   `:name` is the name of the NPM package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the NPM package. Validator: Comply with [semver validation regex](https://semver.org/).

Form parameters:

-   `package` a `tar` or `tar.gz` containing the files of the NPM package

HTTP headers:

-   `Authorization` a JWT authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `303` if NPM package is successfully uploaded. `location` is root of module
-   `400` if validation in URL parameters or form fields fails
-   `401` if user is not authorized
-   `409` if NPM package already exist or version in a major range is not newer than previous version in a major range
-   `415` if file format of the uploaded file is unsupported
-   `502` if NPM package could not be written to the sink

Example:

```bash
curl -X PUT -i -F package=@archive.tgz -H "Authorization: Bearer {:token}" http://localhost:4001/npm/fuzz/8.4.1
```

### Latest NPM Package versions

**Method:** `GET`

Retrieves an overview of the latest major versions of a NPM package.

```bash
https://:assetServerUrl:port/npm/:name
```

URL parameters:

-   `:name` is the name of the NPM package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/npm/fuzz
```

### NPM Package version overview

**Method:** `GET`

Retrieves an overview of the files of a NPM package version.

```bash
https://:assetServerUrl:port/npm/:name/:version
```

URL parameters:

-   `:name` is the name of the NPM package. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the NPM package. Validator: Comply with [semver validation regex](https://semver.org/).

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/npm/fuzz
```

## Import Maps

An [import map](https://github.com/WICG/import-maps) holds a mapping or a set of mappings between ECMA Script Module (ESM) bare imports and an absolute URL.
Import maps are versioned and are immutable.

### Endpoint Summary Table

| Name                                            | Verb | Endpoint              | Form Fields |
| ----------------------------------------------- | ---- | --------------------- | ----------- |
| [Public Import Map URL](#public-import-map-url) | GET  | `/map/:name/:version` |             |
| [Upload an Import Map](#upload-an-import-map)   | PUT  | `/map/:name/:version` | `map`       |

### Public Import Maps URL

**Method:** `GET`

Retrieves an import map from the service.

```bash
https://:assetServerUrl:port/map/:name/:version
```

URL parameters:

-   `:name` is the name of the import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the import map. Validator: Comply with [semver validation regex](https://semver.org/).

Status codes:

-   `200` if import map is successfully retrieved
-   `404` if import map is not found

Example:

```bash
curl -X GET http://localhost:4001/map/buzz/8.4.1
```

### Upload an Import Map

**Method:** `PUT`

Puts a new import map at the service.

```bash
https://:assetServerUrl:port/map/:name/:version
```

URL parameters:

-   `:name` is the name of the import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:version` is the version of the import map. Validator: Comply with [semver validation regex](https://semver.org/).

Form parameters:

-   `map` a `json` file (the import map)

HTTP headers:

-   `Authorization` a jwt authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `303` if import map is successfully uploaded. `location` is [Public Import Map URL](#public-import-map-url)
-   `400` if validation in URL parameters or form fields fails
-   `401` if user is not authorized
-   `409` if import map already exist
-   `415` if file format of the uploaded import map is unsupported
-   `502` if import map could not be written to the sink

Example:

```bash
curl -X PUT -i -F map=@import-map.json -H "Authorization: Bearer {:token}" http://localhost:4001/map/buzz/8.4.1
```

### Latest Import Map versions

**Method:** `GET`

Retrieves an overview of the latest versions of a Import Map.

```bash
https://:assetServerUrl:port/map/:name
```

URL parameters:

-   `:name` is the name of the import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).

Status codes:

-   `200` if file is successfully retrieved
-   `404` if file is not found

Example:

```bash
curl -X GET http://localhost:4001/map/buzz
```

## Aliases

An alias is a shorthand between a major version of a package / import map and the set exact version of the package / import map.


### Endpoint Summary Table

| Name                                  | Verb   | Endpoint                       | Form Fields |
| ------------------------------------- | ------ | ------------------------------ | ----------- |
| [Public Alias URL](#public-alias-url) | GET    | `/:type/:name/v:alias/:extras` |             |
| [Create Alias](#create-alias)         | PUT    | `/:type/:name/v:alias`         | `version`   |
| [Update Alias](#update-alias)         | POST   | `/:type/:name/v:alias`         | `version`   |
| [Delete Alias](#delete-alias)         | DELETE | `/:type/:name/v:alias`         |             |

### Public Alias URL

**Method:** `GET`

Retrieves files from a package or an import map at the service.

```bash
https://:assetServerUrl:port/:type/:name/v:alias/:extras
```

URL parameters:

-   `:type` is the type to retrieve from. Validator: `pkg` or `map`.
-   `:name` is the name of the package / import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:alias` is the major version of the package / import map. Validator: Comply with [semver validation regex](https://semver.org/).
-   `:extras` whildcard pathname to any file in a package. Does not apply to import maps.

Status codes:

-   `303` if alias exist
-   `404` if alias is not found

Example:

```bash
curl -X GET -L http://localhost:4001/pkg/fuzz/v8/main/index.js
curl -X GET -L http://localhost:4001/map/buzz/v4
```

### Create Alias

**Method:** `PUT`

Create a new alias.

```bash
https://:assetServerUrl:port/:type/:name/v:alias
```

URL parameters:

-   `:type` is the type to retrieve from. Validator: `pkg` or `map`.
-   `:name` is the name of the package / import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:alias` is the major version of the package / import map. Validator: Comply with [semver validation regex](https://semver.org/).

Form parameters:

-   `:version` full version of the package to be aliased

HTTP headers:

-   `Authorization` a jwt authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `303` if alias is successfully created. `location` points to the alias
-   `400` if validation in URL parameters or form fields fails
-   `401` if user is not authorized
-   `409` if alias already exist
-   `502` if alias could not be altered by the sink

Example:

```bash
curl -X PUT -i -F version=8.4.1 -H "Authorization: Bearer {:token}" http://localhost:4001/pkg/fuzz/v8
curl -X PUT -i -F version=4.2.2 -H "Authorization: Bearer {:token}" http://localhost:4001/map/buzz/v4
```

### Update Alias

**Method:** `POST`

Updates an existing alias.

```bash
https://:assetServerUrl:port/:type/:name/v:alias
```

URL parameters:

-   `:type` is the type to retrieve from. Validator: `pkg` or `map`.
-   `:name` is the name of the package / import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:alias` is the major version of the package / import map. Validator: Comply with [semver validation regex](https://semver.org/).

Form parameters:

-   `:version` full version of the package to be aliased

HTTP headers:

-   `Authorization` a jwt authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `303` if alias is successfully created. `location` points to the alias
-   `401` if user is not authorized
-   `404` if alias does not exist
-   `502` if alias could not be altered by the sink

Example:

```bash
curl -X POST -i -F version=8.4.1 -H "Authorization: Bearer {:token}" http://localhost:4001/pkg/fuzz/v8
curl -X POST -i -F version=4.4.2 -H "Authorization: Bearer {:token}" http://localhost:4001/map/buzz/v4
```

### Delete Alias

**Method:** `DELETE`

Deletes an existing alias.

```bash
https://:assetServerUrl:port/:type/:name/v:alias
```

URL parameters:

-   `:type` is the type to retrieve from. Validator: `pkg` or `map`.
-   `:name` is the name of the package / import map. Validator: Comply with [npm package names](https://github.com/npm/validate-npm-package-name).
-   `:alias` is the major version of the package / import map. Validator: Comply with [semver validation regex](https://semver.org/).

HTTP headers:

-   `Authorization` a jwt authorization bearer with the token retrieved from a successful [authentication](#login)

Status codes:

-   `204` if alias is successfully deleted
-   `401` if user is not authorized
-   `404` if alias does not exist
-   `502` if alias could not be altered by the sink

Example:

```bash
curl -X DELETE -H "Authorization: Bearer {:token}" http://localhost:4001/pkg/fuzz/v8
curl -X DELETE -H "Authorization: Bearer {:token}" http://localhost:4001/map/buzz/v4
```
