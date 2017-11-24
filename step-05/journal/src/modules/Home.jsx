import React, { Component } from 'react';
import { Container, Segment, Header, Form, Menu, Dropdown } from 'semantic-ui-react';

import { Auth, Storage, Logger } from 'aws-amplify';
import { S3Album, S3Text } from 'aws-amplify-react';

const today = () => {
    const dt = new Date();
    return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
}

const logger = new Logger('Home');

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.save = this.save.bind(this);
        this.extractDates = this.extractDates.bind(this);
        this.translateItem = this.translateItem.bind(this);

        this.state = {
            ts: new Date().getTime(),
            date: today(),
            dates: []
        };
    }

    componentDidMount() {
        Auth.currentUserInfo()
            .then(user => {
                const path = user.id + '/' + today() + '/';
                this.setState({ user: user, path: path });

                Storage.list(user.id)
                    .then(data => {
                        logger.debug('list of everything', data);
                        this.extractDates(data);
                    })
                    .catch(err => logger.error('error when get list of everything', err));
            })
            .catch(err => logger.error('error when get current user info', err));
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleDateChange(evt, data) {
        const date = data.value;
        const { user } = this.state;
        const path = user.id + '/' + date + '/';

        this.setState({
            date: date,
            path: path
        });
    }

    save() {
        const { path, writingTitle, writingContent } = this.state;
        const textKey = writingTitle? path + writingTitle.replace(/\s+/g, '_') : null;
        const textContent = JSON.stringify({
            title: writingTitle,
            content: writingContent
        });
        this.setState({ textKey: textKey, textContent: textContent });
    }

    extractDates(list) {
        const date_list = list.map(item => {
            const match = item.key.match(/\/(\d{4}-\d{2}-\d{2})\//);
            return match? match[1] : null;
        });

        const unique_dates = Array.from(new Set(date_list)).sort().reverse();
        this.setState({ dates: unique_dates });
    }

    translateItem(data) {
        if ((data.type === 'text') && data.key.endsWith('.json')) {
            if (!data.content) { return data.content; }

            const content = JSON.parse(data.content);
            return (
                <div>
                    <h3>{content.title}</h3>
                    <div>{content.content}</div>
                </div>
            )
        }
        return data.content;
    }

    memberView() {
        const { user, path, textKey, textContent, ts, date, dates } = this.state;
        if (!user) { return null; }

        const key = textKey? textKey + '.json' : null;

        const history = dates.map(date => {
            return {
                key: date,
                text: date,
                value: date,
            };
        });

        return (
            <Container>
                <Menu size="mini" attached="top">
                    <Menu.Item>
                        <Header as="h2">
                            {date}
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Dropdown
                                position="right"
                                placeholder="History"
                                options={history}
                                onChange={this.handleDateChange}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment attached>
                    <S3Album
                        path={path}
                        ts={ts}
                        picker
                        translateItem={this.translateItem}
                    />
                </Segment>
                <Segment attached>
                    <Form>
                        <Form.Input
                            name="writingTitle"
                            placeholder="Title"
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
                        contentType="application/json"
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
