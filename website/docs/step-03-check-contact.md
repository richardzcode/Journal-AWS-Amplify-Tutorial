---
id: step-03-check-contact
title: Step 03 - Authentication UI
sidebar_label: Check Contact Verification
---

# Check Contact Verification

User may forget password. In order to be able to recover password, user has to have one of the contact info verified. We should prompt user about this.

Update `src/components/LoginForm`:
```
    constructor(props) {
        super(props);

        this.checkContat = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    signIn() {
        const { username, password } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signIn(username, password)
            .then(user => this.checkContact(user))
            .catch(err => this.error(err));
    }
```
