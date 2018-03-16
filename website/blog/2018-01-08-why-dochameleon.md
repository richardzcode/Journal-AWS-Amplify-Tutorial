---
title: Why Dochameleon
author: Richard Zhang
authorGitHub: richardzcode
---

It is not hard to guess where the idea of Dochameleon is from.

With [Docusaurus](https://github.com/facebook/Docusaurus) built and maintained by awesome team from Facebook, why do I want to build another one?

One personal reason is I am so excited about Docusaurus. Can't stop checking around, rewrite, restruct source code. So only way to satisfy is to create a new project.

<!--truncate-->

Here are some technical reasons,

1. Dev server and site generation are written separately. Inconsistency is inevitable.
2. Pages can not share building blocks.
3. Big CSS file makes styling hard.

At the same time some features are removed. I feel they are a bit too opinionated with complexity, may not suited for all open source projects.

1. Search with [algolia](https://www.algolia.com/).
2. Multi-Language with [crowdin](https://crowdin.com/).
3. Project version support.

For example, at the end of the day multi-language and versioning are grouped by file hierarchies. One options is to just take pull requests on GitHub.
