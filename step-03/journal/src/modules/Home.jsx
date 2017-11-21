import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import { Auth } from 'aws-amplify';

const UserInfo = (props) => {
    return (
        <div>{JSON.stringify(props.user)}</div>
    )
}

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        Auth.currentUserInfo()
            .then(user => this.setState({ user: user }))
            .catch(err => console.log(err));
    }

    memberView() {
        const { user } = this.state;
        return (
            <Container>
                Member Home
                <UserInfo user={user} />
            </Container>
        )
    }

    guestView() {
        return (
            <Container>Guest Home</Container>
        )
    }

    userInfo() {
    }

    render() {
        const { authState } = this.props;
        return (
            <div id="home-module">
                { authState === 'signedIn'? this.memberView() : this.guestView() }
                <UserInfo />
            </div>
        );
    }
}
