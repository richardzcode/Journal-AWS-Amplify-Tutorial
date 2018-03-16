---
id: step-05-switch-date
title: Step 05 - List of Journals
sidebar_label: Switch Date
---

# Switch Date

```
    handleDateChange(evt, data) {
        const date = data.value;
        const { user } = this.state;
        const path = user.id + '/' + date + '/';

        this.setState({
            date: date,
            path: path
        });
    }
```
