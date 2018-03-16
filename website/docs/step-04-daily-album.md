---
id: step-04-daily-album
title: Step 04 - Everyday Journal
sidebar_label: Daily Album
---

# Daily Album

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
