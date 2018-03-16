---
title: Staging Step
author: Richard Zhang
authorGitHub: richardzcode
---

The basic idea of Dochameleon is to generate a static web server by using [Server-Side-Rendering](https://reactjs.org/docs/react-dom-server.html). Contents are combined from core library and specific project.

Combining from two sources can be tricky. So there is a staging step. Which in essence copies files from the two sources into one place, for SSR to generate from, and for developers to inspect on.

The one place can be found at `node_modules/dochameleon/lib/stage`, contains a file structure like this:

```bash
node_modules/dochameleon/lib/stage/
├── Blog.js
├── Docs.js
├── Pages.js
├── blog
│   └── 2018-01-08-why-dochameleon.md
│   └── 2018-01-10-stage-step.md
├── components
│   ├── Button.js
│   ├── CollapseIcon.js
│   ├── FeatureCallout.js
│   ├── FeatureCallouts.js
│   ├── Features.js
│   ├── Footer.js
│   ├── Head.js
│   ├── HeaderNav.js
│   ├── HelpDetails.js
│   ├── HomeSplash.js
│   ├── MarkdownBlock.js
│   ├── Page.js
│   ├── Showcase.js
│   ├── SideNav.js
│   ├── blog
│   ├── docs
│   ├── featureCallouts.json
│   ├── features.json
│   ├── help.json
│   └── users.json
├── dfs.js
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   ├── exampledoc4.md
│   ├── exampledoc5.md
│   └── sidebars.json
├── pages
│   ├── help.js
│   ├── index.js
│   └── users.js
├── parse
│   ├── Markdown.js
│   └── toSlug.js
├── static
│   ├── css
│   └── img
└── theme
    ├── blog.js
    ├── main.js
    ├── markdown.js
    └── pages.js
```
