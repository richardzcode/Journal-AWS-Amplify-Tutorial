import React, { Component } from 'react';
import { Container, Segment, Header, Form } from 'semantic-ui-react';

import { Auth } from 'aws-amplify';
import { S3Album, S3Text } from 'aws-amplify-react';

const today = () => {
    const dt = new Date();
    return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
}

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);

        this.state = { ts: new Date().getTime() };
    }

    componentDidMount() {
        Auth.currentUserInfo()
            .then(user => this.setState({ user: user, path: user.id + '/' + today() + '/' }))
            .catch(err => console.log(err));
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    save() {
        const { path, writingKey, writingContent } = this.state;
        const textKey = writingKey? path + writingKey.replace(/\s+/g, '_') : null;
        const textContent = writingContent;
        this.setState({ textKey: textKey, textContent: textContent });
    }

    memberView() {
        const { user, path, textKey, textContent, ts } = this.state;
        if (!user) { return null; }

        const key = textKey? textKey + '.txt' : null;

        return (
            <Container>
                <Header as="h2" attached="top">{today()}</Header>
                <Segment attached>
                    <S3Album path={path} ts={ts} picker />
                </Segment>
                <Segment attached>
                    <Form>
                        <Form.Input
                            name="writingKey"
                            placeholder="Key to identify the writing"
                            onChange={this.handleChange}
                        />
                        <Form.TextArea
                            name="writingContent"
                            placeholder="Write something ..."
                            onChange={this.handleChange}
                        />
                        <Form.Button onClick={this.save}>Save</Form.Button>
                    </Form>
                    <S3Text
                        hidden
                        contentType="text/plain"
                        textKey={key}
                        body={textContent}
                        onLoad={() => this.setState({ ts: new Date().getTime() })}
                    />
                </Segment>
            </Container>
        )
    }

    guestView() {
        return (
            <Container>Guest Home</Container>
        )
    }

    render() {
        const { authState } = this.props;
        return (
            <div id="home-module">
                { authState === 'signedIn'? this.memberView() : this.guestView() }
            </div>
        );
    }
}
