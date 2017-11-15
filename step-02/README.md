# Step 02 - Authentication

AWS Amplify solved the authentication for developers. Let's use it.

## 1. Prepare

Install package, core library and react specific.
```
npm install --save aws-amplify
npm install --save aws-amplify-react
```

**Create a AWS Mobile Hub project**

Go to [Mobile Hub Import](../mobile-hub-import) to quickly setup the backend on AWS.

**Download config file**

Once project created, open "Hosting and Streaming"
![Hosting and Streaming](host_and_streaming.png)

At the bottom of page, "Download aws-exports.js file".
![Download aws-exports.js file](download_aws_exports.png)

Download and save to `src` folder

## 2. Configure AWS Amplify

Open `src/App.js`, add these lines
```
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

## 3. Add Authenticator

Open `src/modules/Login.jsx`, change content to:
```
import React, { Component } from 'react';

import { Authenticator } from 'aws-amplify-react';

export default class Login extends Component {
    render() {
        return <Authenticator />
    }
}
```

Now `npm start`. Login becomes real
![Authenticator](authenticator.png)
