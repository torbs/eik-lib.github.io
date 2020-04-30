---
id: server_file_structure
title: Eik server - File structure
sidebar_label: File structure
---

The EIK server stores files in the following structure:

```sh
:root
└── :org
    ├── map
    │   └── :name
    │       ├── :version.import-map.json
    │       ├── :major.alias.json
    │       └── versions.json
    ├── pkg
    │   └── :name
    │       ├── :version
    │       │   ├── *
    │       ├── :version.package.json
    │       ├── :major.alias.json
    │       └── versions.json
    └── npm
        └── :name
            ├── :version
            │   ├── *
            ├── :version.package.json
            ├── :major.alias.json
            └── versions.json
```

Parameters:

-   `:root` is the root folder for everything.
-   `:org` is the name of an organisation.
-   `:name` is the name of a package.
-   `:version` is the full semver version of a package.
-   `:major` is the major semver version of a full semver version of a package.

## Packages

Packages are stored under `/:root/:org/pkg/:name/:version/` and the structure of a package is
arbitrary and untouched during upload by the service.

The file structure of a package is stored in a package file at `/:root/:org/pkg/:name/:version.package.json`.

## NPM Packages

NPM packages are packages from the NPM registry that are then published to Eik as a "copy". Packages from
the NPM registry are published under this namespace to avoid name collision with other packages.

NPM packages are stored under `/:root/:org/npm/:name/:version/` and the structure of a package is
arbitrary and untouched during upload by the service.

The file structure of a NPM package is stored in a package file at `/:root/:org/pkg/:name/:version.package.json`.

## Import Maps

Import maps are stored under `/:root/:org/map/:name/:version.import-map.json`. The filename of
import maps is strict and conforms to the version number it's given with a `.json` extension.

The filename of import maps prior to uploading to the service can be anything. The service will
convert the file name according to the parameters given when uploading it.

## Aliases

Packages, NPM packages and import map versions can be aliased. An alias is a semver major version of a
full semver version and is a way to map a major version to a given full semver version of a
package or import map.

This alias mapping is stored alongside the version of a package or import map version:

-   Package alias path: `/:root/:org/pkg/:name/:major.alias.json`
-   NPM package alias path: `/:root/:org/npm/:name/:major.alias.json`
-   Import map alias path: `/:root/:org/map/:name/:major.alias.json`
