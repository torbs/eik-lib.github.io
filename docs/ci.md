---
id: ci
title: CI Overview
sidebar_label: Overview
---

While it is fully possible (and in many cases perfectly acceptable) to simply publish new versions of your assets manually as needed, you may find yourself preferring an automated approach.

To do so, Eik provides a version command that can be used to automate versioning. When running the version command a new version number will be generated in `eik.json` if and only if the assets to be published have changed since the last publish. This makes it safe to run on every CI build.

The process for publishing new asset versions from CI is as follows:

1. Login to the Eik server
1. Run the `eik version` command
2. Run the `eik package` command
3. Commit new version change to `eik.json`
4. Push the change back to the repository

For your specific C.I. platform, see the related guide.

* [Travis CI](./travis.md)