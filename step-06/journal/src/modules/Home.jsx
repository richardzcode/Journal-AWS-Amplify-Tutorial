import React, { Component } from 'react';
import {
    Container,
    Segment,
    Header,
    Form,
    Menu,
    Dropdown,
    Loader,
    Icon
} from 'semantic-ui-react';

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
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTrash = this.handleTrash.bind(this);
        this.translateItem = this.translateItem.bind(this);

        this.state = {
            ts: new Date().getTime(),
            date: today(),
            dates: [],
            selected: []
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
        const textKey = writingTitle? path + writingTitle.replace(/\s+/g, '_') : new Date().getTime();
        const textContent = JSON.stringify({
            title: writingTitle,
            content: writingContent
        })
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

    handleSelect(item, selected_items) {
        this.setState({ selected: selected_items });
    }

    handleTrash() {
        const { selected } = this.state;
        if (!selected || selected.length === 0) { return; }

        const that = this;
        Promise.all(selected.map(item => Storage.remove(item.key)))
            .then(data => {
                logger.debug(data);
                that.setState({ ts: new Date().getTime() });
            })
            .catch(err => {
                logger.error(err);
                that.setState({ ts: new Date().getTime() });
            });
    }

    translateItem(data) {
        if ((data.type === 'text') && data.textKey.endsWith('.json')) {
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
        const { user, path, textKey, textContent, ts, date, dates, select, selected } = this.state;
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
                            <Icon
                                name="hand outline up"
                                size="large"
                                color={select? 'black' : 'grey'}
                                onClick={() => this.setState({ select: !this.state.select })}
                            />
                            <Icon
                                name="trash outline"
                                size="large"
                                color={selected && selected.length > 0? 'black' : 'grey'}
                                onClick={this.handleTrash}
                            />
                        </Menu.Item>
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
                    <Loader active={this.state.loading} />
                    <S3Album
                        path={path}
                        ts={ts}
                        picker
                        select={select}
                        onSelect={this.handleSelect}
                        translateItem={this.translateItem}
                        onPick={() => this.setState({ loading: true })}
                        onLoad={() => this.setState({ loading: false })}
                        onError={() => this.setState({ loading: false })}
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
