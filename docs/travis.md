---
id: travis
title: Travis
sidebar_label: Travis
---

Publishing to an Eik server from a Travis CI build can be achieved with a few commands.

## Setup secrets in Travis

Two secrets will need to be available in order to publish to your Eik server and commit to your git repository. Travis provides a settings page where you can set secret environment variables and we recommend that you use this to do so.

The Eik server key will need to be obtained from your Eik server provider, a Github personal access token can be created by visiting [this page](https://github.com/settings/tokens).

![](/img/travis-settings.png)
![](/img/travis-settings-page.png)

## Set up versioning and publishing in .travis.yml

The following gives an example of how to run version and publish commands from `.travis.yml`. The login command uses the `EIK_SERVER_KEY` that was setup in the previous step.

```yml
language: node_js
node_js:
  - 14
before_script:
  - npm i -g @eik/cli
script:
  - eik login -k $EIK_SERVER_KEY
  - eik version
  - eik package
```

If you have a build step that you need to run before publish, you could just insert that into the `script` section as shown.

```yml
script:
  - <build command here>
  - eik login -k $EIK_SERVER_KEY
  - eik version
  - eik package
```

## Create a commit script

The most challenging part of publishing from CI is committing back to your git repository. The following is an example of a script that commits changes to `eik.json` and pushes that commit back to github. It uses the `GH_TOKEN` script defined in the first step.

**commit.sh**

```sh
#!/usr/bin/env bash

# Set the repo name from the github url
# For git@github.schibsted.io:finn/min-finn.git, the repo name would be min-finn
REPO="<repo name>"

# Travis doesn't make it easy to get the current branch so... this...
BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)

# Set the user email and name for the commit, set these to whatever you prefer
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

# Travis checks out a commit hash rather than a branch so we need to add the branch, fetch it and check it out
git remote set-branches --add origin $BRANCH
git fetch origin
git branch $BRANCH origin/$BRANCH
git checkout $BRANCH

# Push the changes to the remote
git push origin $BRANCH
```

## Run the commit script from .travis.yml

```yml
script:
  - eik login -k $EIK_SERVER_KEY
  - eik version
  - eik package
  - ./commit.sh
```

Once setup, when you push changes to Github, if any of the files to be published have changed, you should automatically get a new published version of your assets on your Eik server and your `eik.json` file will have been updated with the new semver version number.