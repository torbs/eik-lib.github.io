---
id: client_installation
title: Client Installation
sidebar_label: Installation
---

In order to interact with an Eik server, you must install the client which can then be used to perform a variety of tasks such as mirroring NPM packages, publishing app packages, aliasing, publishing import maps and more. Interacting with the client is done via the command line in a terminal. To get started, you will need to have [Node.js](https://nodejs.org/en/) installed which comes with the [NPM](htps://npmjs.com) package manager.

*N.B.* To use the client, you will need to know the address of an Eik server with which to interact. If you don't yet have a server to work with, please visit [the server docs](/docs/server) to get started configuring and running an Eik server.

## Installation using NPM

```sh
npm install @eik/cli
```

## The Eik command

Once installed, in your terminal, type the following command to get started.

```sh
eik --help
```

## Checking connection to a server

Once you have an Eik server up and running, you can run a ping command to check that the client can reach the server

```sh
eik ping http://myeikserver.com
```

## Adding command autocomplete

If you would like to be able to use tab key autocompletion for Eik commands, you can concatentate the following script to your `.zshrc` or `.bashrc` file.

```
###-begin-eik-completions-###
_eik_yargs_completions()
{
  local reply
  local si=$IFS
  IFS=$'
' reply=($(COMP_CWORD="$((CURRENT-1))" COMP_LINE="$BUFFER" COMP_POINT="$CURSOR" eik --get-yargs-completions "${words[@]}"))
  IFS=$si
  _describe 'values' reply
}
compdef _eik_yargs_completions eik
###-end-eik-completions-###
```

Once done, you should be able to hit tab while typing Eik commands and get helpful autocomplete suggestions.
