---
id: server_metrics
title: Eik server - Metrics
sidebar_label: Metrics
---

The Eik server exposes a [metric stream](https://github.com/metrics-js/client) which emits internal metrics
on the server. These metrics are intended to give numbers on how the server as an application is behaving and 
performing and is an important tool in the toolbox for monitoring the servers health status. These metrics do 
not provide statistics on assets uploaded to the asset server.

The metrics the server provides are not bound to any particular metric system so it's possible to provide the metrics to 
any monitoring system as preferred. The metric stream emits a set of generic metric objects that can be altered and
piped as desired.

Please see [@metrics/client](https://github.com/metrics-js/client) for examples of how to consume these metrics in 
your preferred monitoring system.

## Usage

The `@eik/service` module exposes a `.metric` property. This property holds a plain Node.js object stream which
emits the metrics as objects on the stream.

This stream can be piped into a metrics consumer or any other Node.js writable / transform stream for further 
processing.

Example of metrics being piped into a prometheus consumer:

```js
const MetricsConsumer = require('@metrics/prometheus-consumer');
const prometheus = require('prom-client');
const Service = require('@eik/service');
const fastify = require('fastify');

const service = new Service();

const metricsConsumer = new MetricsConsumer({
    client: prometheus,
});

service.metrics.pipe(metricsConsumer);

const app = fastify();
app.register(service.api());

app.get('/_/metrics', (request, reply) => {
    reply.type(metricsConsumer.registry.contentType);
    reply.send(metricsConsumer.registry.metrics());
});

const run = async () => {
    await app.listen(8080, '0.0.0.0');
}
run();
```

## Metrics

Each metric provided by the server has a unique `name` and a `type` defining what type (counter, histogram, etc) of 
metric it is.

The server exposes these metrics:

| Name                          | Type      | Description                                                                                    |
|-------------------------------|-----------|------------------------------------------------------------------------------------------------|
| eik_core_auth_post_handler    | histogram | Time taken in a [login](server_rest_api.md#login) method                                       |
| eik_core_pkg_get_handler      | histogram | Time taken in a [public package](server_rest_api.md#public-package-url) method                 |
| eik_core_pkg_log_handler      | histogram | Time taken in a [package version overview](server_rest_api.md#package-version-overview) method |
| eik_core_pkg_put_handler      | histogram | Time taken in a [upload package](server_rest_api.md#upload-a-package) method                   |
| eik_core_versions_get_handler | histogram | Time taken in a [latest package versions](server_rest_api.md#latest-package-versions) method   |
| eik_core_alias_get_handler    | histogram | Time taken in a [public alias](server_rest_api.md#public-alias-url) method                     |
| eik_core_alias_put_handler    | histogram | Time taken in a [create alias](server_rest_api.md#create-alias) method                         |
| eik_core_alias_post_handler   | histogram | Time taken in a [update alias](server_rest_api.md#update-alias) method                         |
| eik_core_alias_del_handler    | histogram | Time taken in a [delete alias](server_rest_api.md#delete-alias) method                         |
| eik_core_map_get_handler      | histogram | Time taken in a [public import maps](server_rest_api.md#public-import-maps-url) method         |
| eik_core_map_put_handler      | histogram | Time taken in a [upload import maps](server_rest_api.md#upload-an-import-map) method           |
