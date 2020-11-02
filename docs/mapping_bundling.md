---
id: mapping_bundling
title: Bundling
sidebar_label: Bundling
---

Tools like [Microbundle], [Create React App][cra], [Vuex] and [Next.js] are popular for one primary reason: nobody likes configuring bundlers. We just want to write our app code and move on with our day.

## Why we forked [microbundle]

We love [microbundle] <3. But it doesn't support import maps. We [forked it][eik-microbundle] to add that functionality. We're currently experimenting and discovering the optimal way of generating import mapped esm bundles as well as IE11 fallback bundles. The long term goal is to land contributions to [microbundle] so we can one day delete our [fork][eik-microbundle].

## Using [@eik/microbundle][eik-microbundle]

Installing from npm:

```sh
npm install @eik/microbundle
```

Since we intend to one day delete our fork, we use the same name for our binary command as [microbundle]:

```sh
microbundle --help
```

Beyond implementing the rollup and postcss plugins for eik import mapping, there are some differences in our fork from the original. Pay attention to the readme for eik microbundle for up to date information on those.

## Bundling applications

In this guide "applications" are projects with a `package.json` that publishes assets to eik, but not to npm.
For these use cases we can use the simple setup, given this `package.json`:

```json
{
  "esmodule": "dist/esm.js",
  "nomodule": "dist/ie11.js",
  "scripts": {
    "build": "microbundle src/assets/client.js"
  },
  "dependencies": {
    "@eik/microbundle": "^0.2.10"
  },
  "devDependencies": {
    "@eik/cli": "^1.4.3"
  }
}
```

And an `eik.json` like:

```json
{
  "version": "1.0.0",
  "name": "my-pack",
  "files": {
    "/": "./dist/*"
  },
  "import-map": ["..."]
}
```

You'll have `esm.js`, `esm.css` and `ie11.js` generated for you when you run `npm run build` and then run `eik version && eik publish`. Ready to be used like this:

```html
<link
  href="http://assets.myserver.com/pkg/my-pack/1.0.0/esm.css"
  rel="stylesheet"
/>
<script
  src="http://assets.myserver.com/pkg/my-pack/1.0.0/esm.js"
  type="module"
></script>
<script
  src="http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js"
  nomodule
></script>
```

## Bundling libraries

Libraries that are published to both eik and npm need should use this setup (this example uses TypeScript):

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "files": ["dist/"],
  "scripts": {
    "prebuild": "npx rimraf dist/** dist-eik/**",
    "build": "npm run build:dist && npm run build:dist-eik",
    "build:dist": "microbundle src/index.ts -o ./dist/index.js -f cjs && microbundle src/index.ts -o ./dist/index.es.js -f esm --no-pkg-main",
    "build:dist-eik": "microbundle src/index.ts -o ./dist-eik/esm.js --no-pkg-main -f modern && microbundle src/index.ts -o ./dist-eik/ie11.js --no-pkg-main -f iife",
    "publish:eik": "eik login -k $EIK_SERVER_KEY && eik publish"
  },
  "typings": "dist/index.d.ts",
  "devDependencies": {
    "@eik/cli": "1.4.3",
    "@eik/microbundle": "^0.2.10",
    "rimraf": "^3.0.2"
  }
}
```

What's important to note here is the usage of `--no-pkg-main` to bypass the filename template feature of microbundle, which works sligtly differently in our fork and might change in the future. Using `--no-pkg-main` ensures it'll always work.

[eik-microbundle]: https://github.com/eik-lib/microbundle#readme
[microbundle]: https://github.com/developit/microbundle#readme
[cra]: https://create-react-app.dev/
[vuex]: https://vuex.vuejs.org/
[next.js]: https://nextjs.org/
