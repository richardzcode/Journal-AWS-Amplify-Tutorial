---
id: step-02-prepare
title: Step 02 - Authentication
sidebar_label: Prepare
---

# Prepare

### Library

Install package, core library and react specific.
```
npm install --save aws-amplify
npm install --save aws-amplify-react
```

### Service

Create a AWS Mobile Hub project with [awsmobile-CLI](https://github.com/aws/awsmobile-cli)

```
npm install -g awsmobile-cli

awsmobile init
awsmobile user-signin enable
awsmobile user-files enable
awsmobile push
```
