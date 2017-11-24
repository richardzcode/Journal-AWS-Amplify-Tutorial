# Step 04 - Everyday Journal

Now, let's build some features. We are going to build an app that let users store everyday journal.

* [1. User Information](#1-user-information)
* [2. Daily Album](#2-daily-album)
* [3. Write Text](#3-write-text)
* [4. Refresh Album](#4-refresh-album)
* [5. Run App](#5-run-app)

## 1. User Information

First we need to make sure every user has his/her own space. Let's get user information first.

Import `Auth`
```
import { Auth } from 'aws-amplify';
```

Get current user info
```
    componentDidMount() {
        Auth.currentUserInfo()
            .then(user => this.setState({ user: user })) // we need user.id
            .catch(err => console.log(err));
    }
```

## 2. Daily Album

To keep it simple, we organize our journal base on datetime. One day one album. Journal contains image and text.

This can be easily achieved with `S3Album` from `aws-amplify-react`

Imports
```
import { Container, Segment, Header } from 'semantic-ui-react';
import { S3Album } from 'aws-amplify-react';
```

Today as string
```
const today = () => {
    const dt = new Date();
    return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
}
```

Render `S3Album` with userId and date as path in `memberView`
```
    memberView() {
        const { user } = this.state;
        if (!user) { return null; }

        const path = user.id + '/' + today() + '/';
        return (
            <Container>
                <Header as="h2" attached="top">{today()}</Header>
                <Segment attached>
                    <S3Album path={path} picker />
                </Segment>
            </Container>
        )
    }
```

## 3. Write Text

`S3Album` let us select photo, as well as text from device. However as a journal of course need to be able to write something.

Add an input form
```
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
```

Handle input
```
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    save() {
        const { path, writingTitle, writingContent } = this.state;
        const textKey = writingTitle? path + writingTitle.replace(/\s+/g, '_') : null;
        const textContent = JSON.stringify({
            title: writingTitle,
            constent: writingContent
        });
        this.setState({ textKey: textKey, textContent: textContent });
    }
```

Use a hidden S3Text to save content
```
    const { user, path, textKey, textContent, ts } = this.state;
    if (!user) { return null; }

    const key = textKey? textKey + '.json' : null;

    render() {
        ...

        <S3Text
            hidden
            contentType="application/json"
            textKey={key}
            body={textContent}
            onLoad={() => this.setState({ ts: new Date().getTime() })}
        />

        ...
    }
```

We save text content with title in json format. By default `S3Album` / `S3Text` will display raw json, not very reader friendly. We can add a `translateItem` property to `S3Album`

```
        <S3Album
            path={path}
            ts={ts}
            picker
            translateItem={this.translateItem}
        />
```

`translateItem` method
```
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
```

## 4. Refresh Album

Notice on `S3Text.onLoad` we set a state `ts`. This is to tell `S3Album` to reload so new writing can be displayed in album.

```
        <S3Album path={path} ts={ts} picker />
```

## 5. Run App

```
npm start
```

<img src="daily_journal.png" width="360px" />

[Step 05 - List of Journals](../step-05)
