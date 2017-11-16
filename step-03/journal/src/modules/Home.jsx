import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Home extends Component {
    render() {
        const { authState, authData } = this.props;
        return (
            <div id="home-module">
                <Header as="h1">Home</Header>
                <div>{authState}</div>
            </div>
        );
    }
}
