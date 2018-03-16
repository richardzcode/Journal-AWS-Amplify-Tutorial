---
id: step-04-user-info
title: Step 04 - Everyday Journal
sidebar_label: User Information
---

# User Information

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
