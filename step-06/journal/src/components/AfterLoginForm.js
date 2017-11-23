import React from 'react'
import { Grid, Message } from 'semantic-ui-react'

import { AuthPiece } from 'aws-amplify-react';

class AfterLoginForm extends AuthPiece {
    render() {
        const { authState } = this.props;
        if ('signedIn' !== authState) { return null; }

        return (
            <div className='login-form'>
              {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
              */}
              <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                  height: 100%;
                }
              `}</style>
              <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Message>
                    You are signed in. Now go to Home to record journal.
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default AfterLoginForm;
