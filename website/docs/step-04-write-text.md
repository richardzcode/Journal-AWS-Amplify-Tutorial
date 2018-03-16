---
id: step-04-write-text
title: Step 04 - Everyday Journal
sidebar_label: Write Text
---

# Write Text

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
