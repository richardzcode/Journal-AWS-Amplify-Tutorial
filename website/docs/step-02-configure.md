---
id: step-02-configure
title: Step 02 - Authentication
sidebar_label: Configure AWS Amplify
---

# Configure AWS Amplify

Open `src/App.js`, add these lines
```
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```
