import React, { Component } from 'react';

import { Authenticator, Greetings } from 'aws-amplify-react';

export default class Login extends Component {
    render() {
        return <Authenticator hide={[Greetings]} />
    }
}
