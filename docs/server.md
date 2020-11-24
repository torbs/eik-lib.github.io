---
id: server
title: Server
sidebar_label: Server
---

The Eik server is a node.js application distributed as the [`@eik/service`](https://www.npmjs.com/package/@eik/service) NPM package. It aims to be runnable as a service out of the box but still be flexible and customizable enough to suite a wide range of infrastructures needs.

The only pre-requirement to run the Eik server is [node.js 12.x or newer](https://nodejs.org/).

The fastest way to get a running instance of the Eik server is by using NPX:

```sh
npx @eik/service
```

This will install the latest Eik server and start it at [http://localhost:4001](http://localhost:4001). By default all uploaded assets will be stored in a sub-folder of the OS temp directory (NOTE: they will be lost when the OS clears the temp directory). The default authentication key is `change_me`.

## Overview






## Customized setup

The Eik service builds upon [Fastify](https://www.fastify.io/) and is in addition to being a standalone server also exposed as a Fastify plugin. This makes it extremely flexible and easy to set up a custom Eik service.

Example of a custom server using the sink for Google Cloud Storage and extending the HTTP API with custom ready checks:

```js
const fastify = require('fastify');
const Service = require('@eik/service');
const Sink = require('@eik/sink-gcs');

// Set up the Google Cloud Storage sink
const sink = new Sink(...);

// Set up the Eik service as a plugin
const service = new Service({ customSink: sink });

// Set up Fastify
const app = fastify({
    ignoreTrailingSlash: true,
    modifyCoreObjects: false,
    trustProxy: true,
});

// Register the Eik service in Fastify
app.register(service.api());

// Append custom HTTP ready checks
app.get('/_/health', (request, reply) => {
    reply.send('ok');
});

app.get('/_/ready', (request, reply) => {
    reply.send('ok');
});

// Start the server
const run = async () => {
    await service.health();
    await app.listen(service.config.get('http.port'), service.config.get('http.address'));
}
run();
```
