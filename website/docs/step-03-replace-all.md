---
id: step-03-replace-all
title: Step 03 - Authentication UI
sidebar_label: Replace all Auth components
---

# Replace all Auth components

In process of replacing all Auth components. Here are a couple small things.

**Semantic UI radio button**

The radio button from Semantic UI fires `onChange` event on label as target. Which will cause an issue in collecting state. The actual radio button state is passed as the second parameter. We need to translate it before calling `this.handleInputChange`

For example in `src/components/VerifyContactForm.js`
```
        <Form.Radio
            label="Email"
            name="email"
            onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
         />
          <Form.Radio
            label='Phone Number'
            name="phone_number"
            onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
          />
```

**hideDefault**

In order to replace default Auth forms, we provide `hide` list to `Authenticator`. Once all reaplaced, we could simply pass a `hideDefault` property, no need to write the whole list.

```
    <Authenticator hideDefault />
```
