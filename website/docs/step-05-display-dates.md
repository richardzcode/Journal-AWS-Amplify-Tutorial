---
id: step-05-display-dates
title: Step 05 - List of Journals
sidebar_label: Display Dates
---

# Display Dates

Convert to dropdown options
```
    const history = dates.map(date => {
        return {
            key: date,
            value: date,
            text: date
        };
    });
```

Display
```
        <Dropdown
            position="right"
            placeholder="History"
            options={history}
            onChange={this.handleDateChange}
        />
```
