---
id: step-05-get-list
title: Step 05 - List of Journals
sidebar_label: Get List
---

# Get List

Over time user may record lots of daily happenings. That can be handled by a little bit more data structure. In this turorial we keep it simple, just list all memories and extract out dates from the list.

Get list of everything
```
    Storage.list(user.id)
        .then(data => {
            logger.debug('list of everything', data);
            this.extractDates(data);
        })
        .catch(err => logger.error('error when get list of everything', err));
```

Extract dates
```
    extractDates(list) {
        const date_list = list.map(item => {
            const match = item.key.match(/\/(\d{4}-\d{2}-\d{2})\//);
            return match? match[1] : null;
        });

        const unique_dates = Array.from(new Set(date_list)).sort().reverse();
        this.setState({ dates: unique_dates });
    }
```
