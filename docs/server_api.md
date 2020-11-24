---
id: server_api
title: Eik server - Programatic API
sidebar_label: Programatic API
---

The Eik service is distributed as a [Fastify](https://www.fastify.io/) plugin and has the following programatic API:

## Constructor

Create a new Eik service instance.

```js
const Service = require('@eik/service');
const service = new Service(options);
```

### options (optional)

An Object containing misc configuration. The following values can be provided:

| option     | default | type     | required  | details                                                             |
| ---------- | ------- | -------- | --------- | ------------------------------------------------------------------- |
| customSink | `null`  | `object` | `false`   | A custom sink                                                       |

#### customSink

A custom sink. The sink must extend the [sink interface](https://github.com/eik-lib/sink).

Example using the [Google Cloud Storage sink](https://github.com/eik-lib/sink-gcs):

```js
const Service = require('@eik/service');
const Sink = require('@eik/sink-gcs');

// Set up the Google Cloud Storage sink
const sink = new Sink(...);

// Set up the Eik service as a plugin
const service = new Service({ customSink: sink });
```

## API

An Eik service instance has the following API:

### .api()

The Eik service as a [Fastify plugin](https://www.fastify.io/docs/latest/Plugins/). The returned function must be passed on to the Fastify `.register()` method:

```js
const fastify = require('fastify');
const Service = require('@eik/service');

// Set up the Eik service as a plugin
const service = new Service({ customSink: sink });

// Set up Fastify
const app = fastify({
    ignoreTrailingSlash: true,
});

// Register the Eik service in Fastify
app.register(service.api());
```

This will mount the [Eik REST API](/docs/server_rest_api) into the Fastify application the plugin is registered to.

Due to how the REST API deals with wildcards on pathnames to resolve files, it is recommended that the `ignoreTrailingSlash` option on the Fastify constructor that the plugin is registered to is set to `true`. If this is not done, file resolving might not work as expected. 

### .health() (async)

Executes a health check on the Eik service. The health check mainly determines if the service is able to execute all methods needed to function properly using the current configured sink.

We recommend executing the health check before the service begins accepting HTTP traffic:

```js
const run = async () => {
    await service.health();
    await app.listen(service.config.get('http.port'), service.config.get('http.address'));
}
run();
```

Throws if any of the health checks fails.

## Properties

An Eik service instance has the following properties:

### .metrics

Property that exposes a metric stream. Please see the [metrics section](/docs/server_metrics) for further documentation.

### .config

Property that exposes internal configuration. Can be used to retrieve internal configuration. Config is built upon [Node Convict](https://github.com/mozilla/node-convict).

```js
const Service = require('@eik/service');

const service = new Service();
service.logger.info(`Server is running in ${service.config.get('env')} mode`);
```

### .logger

Property that exposes the internal logger. Can be used to do additional logging. The internal logger is [Pino](https://github.com/pinojs/pino).

```js
const Service = require('@eik/service');

const service = new Service();
service.logger.info(`Server is running in ${service.config.get('env')} mode`);
```

### .sink

Property that exposes the currently used sink. Please see the [sink section](/docs/server_metrics) for further documentation.
