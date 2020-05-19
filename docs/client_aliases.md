---
id: client_aliases
title: Aliases
sidebar_label: Aliases
---

Aliases are general package versions that point to exact package versions.

The need to redeploy your application every time you update a client side bundle can be avoided by using aliasing.

In an application, we can reference an alias instead of a specific version and whenever we need to, we can update our alias and our application will automatically be updated.

For example, an alias by the name `v1` might be set up to point to the exact package version `1.0.0`. The alias itself is independent of the version and since it is just an HTTP redirect, can be easily updated to point at a new version. 

## Application aliases

### Using an aliased version

Creating aliases allows you to include the alias script tags in your application with no need to update the script tag every time you publish a new bundle version.

```js
<script type="module" defer src="https://myeikserver.com/my-app/v1/main/index.js">
```

### Publishing an alias

You can create an alias by running the package-alias command

```
eik package-alias <app name> <version> <alias>
```

```sh
eik package-alias my-app 1.0.0 1
```

### Updating an alias

After publishing a new version of a package

```sh
eik package --name my-app --js ./path/to/client.js --css ./path/to/styles.css
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik package-alias my-app 1.0.1 1
```

And now `v1` will point to `1.0.1` instead of `1.0.0`

## NPM aliases

### Using an aliased version

Creating aliases allows you to include the alias script tags in your application with no need to update the script tag every time you publish a new bundle version.

```js
<script type="module" defer src="https://myeikserver.com/my-app/v1/main/index.js">
```

### Publishing an alias

You can create an alias by running the package-alias command

```
eik package-alias <app name> <version> <alias>
```

```sh
eik package-alias my-app 1.0.0 1
```

### Updating an alias

After publishing a new version of a package

```sh
eik package --name my-app --js ./path/to/client.js --css ./path/to/styles.css
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik package-alias my-app 1.0.1 1
```

And now `v1` will point to `1.0.1` instead of `1.0.0`

## Import map aliases

### Using an aliased version

Creating aliases allows you to include the alias script tags in your application with no need to update the script tag every time you publish a new bundle version.

```js
<script type="module" defer src="https://myeikserver.com/my-app/v1/main/index.js">
```

### Publishing an alias

You can create an alias by running the package-alias command

```
eik package-alias <app name> <version> <alias>
```

```sh
eik package-alias my-app 1.0.0 1
```

### Updating an alias

After publishing a new version of a package

```sh
eik package --name my-app --js ./path/to/client.js --css ./path/to/styles.css
```

The alias can then be updated with the same alias command as before giving it the newly published version

```sh
eik package-alias my-app 1.0.1 1
```

And now `v1` will point to `1.0.1` instead of `1.0.0`