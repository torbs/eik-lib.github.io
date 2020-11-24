---
id: overview_workflow
title: Workflow
sidebar_label: Workflow
---

In Eik, Import Maps and aliasing of assets are used to align library versions across multiple applications. Keeping in mind that import maps are a thing of the future, there are different strategies we can apply when mapping assets. Depending on the strategy choosen, the workflow will be a little bit different.

N.B. Regardless of the strategy one chooses, Eik does not force any structure for how the source is organized or what language it's written in (for example TypeScript). There can also be multiple entry points for the source in your application.

Configuration for which Eik server to use and which import maps to apply etc is defined in [the eik.json file](/docs/overview_eik_json). Depending on the workflow used, there may be a difference in which workflow module(s) use this configuration.

## Ahead of time mapping

When working with ahead of time mapping the workflow is as follow:

![Workflow of ahead of time mapping](/img/workflow_ahead_of_time_mapping.min.svg)

When applying mapping ahead of time there must be a build step regardless if the source needs one or not. It is in this step that import statements in your assets will be rewritten with the mapping values from one or more provided import maps. Eik [supports multiple build tools](/docs/mapping_plugins) by providing plugins for these tools which will do this mapping. 

When your build process runs, the Eik plugin used with the build tool will fetch the defined import maps from the Eik server defined for the project. When the build process is complete, the built application assets should be stored in one or more output folders. 

The next step in the workflow is uploading the built application assets to the Eik server. This is done by the [Eik client](/docs/client_app_packages).

Upon upload Eik will calculate integrity hashes and store these in `./eik/integrity.json`. These hashes can be used for [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and should be used when referring to your assets in your HTML.

At this point your application assets are available on the Eik server and the server side part of the application can be applied to production by referring to the assets on the Eik server in the HTML.

## Browser mapping

When working with mapping in the browser the workflow is as follows:

![Workflow of abrowser mapping](/img/workflow_browser_mapping.min.svg)

As previously mentioned, Eik doesn't force any particular structure for how your source code should be organized and when it comes to mapping in the browser, the question of whether or not your project should have a build step is completely up to you. The important thing to note with regards to build steps is that the `files` field in `eik.json` must point to either your source files in the case where you have no build step or to the files in the output folder of your build step if you do.

The main step in this workflow is uploading the assets to the Eik server. This is done by the [Eik client](/docs/client_app_packages).

Upon upload Eik will calculate integrity hashes and store these in `./eik/integrity.json`. These hashes can be used for [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and should be used when referring your assets in your HTML.

At this point your application assets will be available on the Eik server and the server side part of the application can be applied to production referring to the assets on the Eik server in the HTML.

To apply the mapping the server side part of the application should also pull the import maps, defined in the eik.json, from the Eik server and include these in the HTML as inline script blocks as according to the specification.

## Referencing assets

Absolute URLs to the assets on the Eik server can be built from the fields found in an `eik.json` file:

```js
fs.readFile('./eik.json', (err, data) => {
    if (err) throw err;
    const eik = JSON.parse(data);
    console.log(`${eik.server}/pkg/${eik.name}/${eik.version}/file.ext`);
});
```

The `@eik/common` module contains multiple [helper methods](https://github.com/eik-lib/common#helpers) to build absolute URLs to assets from `eik.json`.
