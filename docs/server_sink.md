---
id: server_sink
title: Eik server - Sink
sidebar_label: Sink
---

The Eik server has a file sink concept which caters for the posibillity to write files to, and read files from different storage backends by swapping out sink modules in the server. Because each sink implements the same public API, it is possible to use one sink in one environment and a different sink in another. 

## Built in sinks

To make it easy to start up an Eik server, the server is shipped with a couple of built in sinks. The file system sink is the default sink in use when a server is started without specifying a sink.

### File system

The file system sink will write files to and from the local file system. By default all files are stored in the default OS temp folder. Do note that files stored in the default OS temp folder will, on most OSes, be deleted without warning by the OS at some point.

To set an alternative path, please see the XXXXXXXXXXXXXXXXXXX configuration.

### In memory

The in memory sink will write files to and from memory. Files written to this sink will disappear when the Eik server is restarted. This sink is handy for spinning up an Eik server to run tests against.

To enable the in memory sink, please see the XXXXXXXXXXXXXXXXXXX configuration.

## Custom sinks

A custom sink is normally pulled in as a dependent module and passed on to the `customSink` property on the constructor of the @eik/service in a [custom server setup](/docs/server#customized-setup).

Example of using the sink for Google Cloud Storage:

```js
const fastify = require('fastify');
const Service = require('@eik/service');
const Sink = require('@eik/sink-gcs');

const sink = new Sink(...);
const service = new Service({ customSink: sink });

const app = fastify({
    ignoreTrailingSlash: true,
});

app.register(service.api());
```

A custom sink normally takes its own set of properties, such as authentication keys etc, so please see the documentation for each sink for what's required.

### Available custom sinks

These custom sinks are available:

 * [Google Cloud Storage](https://github.com/eik-lib/sink-gcs)

Please feel free to let us know if you have a custom sink you would like to have listed.

## Implementing a custom sink

Implementing a custom sink is fairly stright forward. A custom sink must extend the [Eik sink interface](https://github.com/eik-lib/sink) and implement all the methods in the public API and its public properties. If this is not done, the custom sink will not be usable in the Eik server since validation depends upon the extension of the interface.

The [Google Cloud Storage sink](https://github.com/eik-lib/sink-gcs) is a good example to look at when implementing a custom sink.

### Constructor

A sink must be a `class` which extends the [Eik sink interface](https://github.com/eik-lib/sink). There are no restrictions on what arguments, methods or properties you assign the class except that you must implement the methods in the sink interface.

```js
const Sink = require('@eik/sink');

const SinkCustom = class SinkCustom extends Sink {
    constructor() {
        super();
    }
    write() {}
    read() {}
    delete() {}
    exist() {}
    get metrics() {}
}
```

### API

A sink must implement the following API:

#### write(filePath, contentType)

| argument    | default | type     | required  | details                                                                                              |
| ----------- | ------- | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| filePath    | `null`  | `string` | `true`    | Pathname of the file relative to `root` in the [file structure](/docs/server_file_structure) in Eik  |
| contentType | `null`  | `string` | `true`    | Content type of the file                                                                             |

This method is called when a file is to be written to storage. The method must return a `Promise` and resolve with a `WritableStream` when the storage is ready to be written too. The server will pipe the byte stream of the file to this stream. Upon any errors, the promise should reject with an `Error` object

```js
const { Writable } = require('stream');
const Sink = require('@eik/sink');

const SinkCustom = class SinkCustom extends Sink {
    constructor() {
        super();
    }
    write() {
        return new Promise(resolve, reject) {
            const to = new Writable(...);
            resolve(to);
        }
    }
}
```

#### read(filePath)

| argument    | default | type     | required  | details                                                                                              |
| ----------- | ------- | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| filePath    | `null`  | `string` | `true`    | Pathname of the file relative to `root` in the [file structure](/docs/server_file_structure) in Eik  |

This method is called when a file is to be read from storage. The method must return a `Promise` and resolve with a `ReadableStream` when the storage is ready to be read from. Upon any errors, the promise should reject with an `Error` object


```js
const { Readable } = require('stream');
const Sink = require('@eik/sink');

const SinkCustom = class SinkCustom extends Sink {
    constructor() {
        super();
    }
    read() {
        return new Promise(resolve, reject) {
            const to = new Readable(...);
            resolve(to);
        }
    }
}
```

#### delete(filePath)

| argument    | default | type     | required  | details                                                                                              |
| ----------- | ------- | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| filePath    | `null`  | `string` | `true`    | Pathname of the file relative to `root` in the [file structure](/docs/server_file_structure) in Eik  |

This method is called when a file is to be deleted from storage. The method must return a `Promise` and resolve with no value when the file is deleted from storage. If any errors occur, the promise should reject with an `Error` object

#### exist(filePath)

| argument    | default | type     | required  | details                                                                                              |
| ----------- | ------- | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| filePath    | `null`  | `string` | `true`    | Pathname of the file relative to `root` in the [file structure](/docs/server_file_structure) in Eik  |

This method is called to check if a file exists in storage. The method must return a `Promise` and resolve with no value if the file exists in storage. If the file does not exist the promise should reject with no error object. Upon any errors, the promise should reject with an `Error` object.

### Properties

A sink must implement the following properties:

#### .metrics

A getter for a [metric stream](https://github.com/metrics-js/client). The metric stream can be used to emit metrics from the sink into [the overall metric stream](/docs/server_metrics) in the server.

Example:

```js
const Metrics = require('@metrics/client');
const Sink = require('@eik/sink');

const SinkCustom = class SinkCustom extends Sink {
    constructor() {
        super();
        this._metrics = new Metrics();
        this._counter = this._metrics.counter({
            name: 'eik_custom_sink',
            description: 'Counter measuring access to the custom sink',
        });
    }
    write(filePath, contentType) {
        return new Promise(resolve, reject) {
            this._counter.inc();

        }
    }
}
```

### Validation

We recommend you validate the arguments for all methods. The [Eik sink interface](https://github.com/eik-lib/sink) contain static methods to do so which can be used when implementing a sink:

```js
const Sink = require('@eik/sink');

const SinkCustom = class SinkCustom extends Sink {
    constructor() {
        super();
    }
    write(filePath, contentType) {
        return new Promise(resolve, reject) {
            try {
                super.constructor.validateFilePath(filePath);
                super.constructor.validateContentType(contentType);
            } catch (error) {
                reject(error);
                return;
            }

        }
    }
}
```

### Security

A sink should take care of protecting against [Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal). It should not be possible to access files outside the `root` of the file structure in Eik by passing in a hostile pathname through the REST API of Eik. Each `filePath` argument on each method should be checked for such.

Please see OWASPs guide on preventing [Path Traversal](https://github.com/OWASP/wstg/blob/master/document/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include.md).
