---
id: client_login
title: Client Login
sidebar_label: Client Login
---

To make use of the Eik client, it is necessary to authenticate with an Eik server. To do this, the `eik login` command can be used.

## The Eik login command

```
eik login
```

The login command will ask for a server URL and a server key. Server keys are configured on the server and, once entered, the client will authenticate with the server and receive back a JSON web token which it will save in an `.eikrc` file in the users home directory for use in subsequent commands. 

![Login screenshot](/img/login.png)

## Authenticating 

### Without the command prompt

It is possible to bypass login prompts by providing the server URL and key via command line flags.

```sh
eik login --server https://assets.myeikserver.com --key ######
```

### With multiple Eik servers

It is possible to be authenticated against several Eik servers at once by calling the `eik login` command multiple times and providing different server URLs and keys each time. 

```sh
eik login --server https://assets.myeikserver1.com --key ######
eik login --server https://assets.myeikserver2.com --key ######
```

## Once logged in

So long as the client is logged in to a single server, all subsequent commands will know which server to use and provide credentials automatically.

```sh
eik npm lodash
```

*N.B.* If the client is authenticated with more than one server, it may be necessary to tell the client which server to use when using commands since the client will not decide which authenticated server to give precedence to. The `--server` (or `-s` for short) flag can be used to do this.

```sh
eik npm lodash --server https://assets.myeikserver.com
```