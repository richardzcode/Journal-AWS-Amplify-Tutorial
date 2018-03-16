---
id: step-03-federated
title: Step 03 - Authentication UI
sidebar_label: Federated Sign In
---

# Federated Sign In

`withFederated` HOC turns buttons into Federated sign in button.

* Build UI
  - style your own button
  - trigger `props.facebookSignIn | props.googleSignIn | props.amazonSignIn` at the right time
* Transform UI
  - withFederated(...)
* Render UI
  - pass in `federated` property with app ids
  - handle `onStateChange` to notify sign in event

```
import { AuthPiece, withFederated } from 'aws-amplify-react';

const FederatedButtons = (props) => (
    <div>
        <Button
            color='blue'
            fluid
            size='large'
            onClick={props.facebookSignIn}
        >Facebook</Button>
    </div>
);

const Federated = withFederated(FederatedButtons);

const federated_data = {
    google_client_id: '',
    facebook_app_id: '__replace_with_your_facebook_app_id__',
    amazon_client_id: ''
};

...

    // in login form render method,
    // trigger AuthPiece.handleAuthStateChange when state changes, i.e. signed in
    <Federated federated={federated_data} onStateChange={this.handleAuthStateChange} />

```
