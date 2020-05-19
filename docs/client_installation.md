---
id: client_installation
title: Client Installation
sidebar_label: Installation
---

In order to interact with an Eik server, you must install the client which can then be used to perform a variety of tasks such as mirroring NPM packages, publishing app packages, aliasing, publishing import maps and more. Interacting with the client is done via the command line in a terminal. To get started, you will need to node [Node.js](https://nodejs.org/en/) installed which comes with the [NPM](npmjs.com) package manager.

## Installation using NPM

```sh
npm install @eik/cli
```

## The eik command

Once installed, open a terminal and type the following to get started

```sh
eik --help
```

## Checking connection to a server

Once you have an Eik server up and running, you can run a ping command to check that the client can reach the server

```sh
eik ping http://myeikserver.com
```

## Adding command autocomplete

If you would like to be able to get tab key autocomplete for your eik commands, you can concatentate the following script to your `.zshrc` or `.bashrc` file.

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