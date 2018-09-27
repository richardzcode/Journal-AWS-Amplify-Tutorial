# Step 07 - List of Journals

We have a journal now, but only for today. What about history?

* [1. Get List](#1-get-list)
* [2. Display Dates](#2-display-dates)
* [3. Switch Date](#3-switch-date)
* [4. Run App](#4-run-app)

## 1. Get List

Over time user may record lots of daily happenings. That can be handled by a little bit more data structure. In this turorial we keep it simple, just list all memories and extract out dates from the list.

Create `src/components/WhichDay.jsx` to select from days.

Get list of everything
```
  load() {
    const { rootPath } = this.props;
    Storage.list(rootPath)
      .then(data => this.loadSuccess(data))
      .catch(err => this.loadError(err));
  }

  loadSuccess(data) {
    logger.info('load list success', data);
    const days = data.map(item => {
      const match = item.key.match(/\/(\d{4}-\d{1,2}-\d{1,2})\//);
      return match? match[1] : null;
    })
    .filter (day => !!day);
    const day_set = new Set([today()].concat(days));
    const unique_days = Array.from(day_set).sort().reverse();
    this.setState({ days: unique_days });
  }
```

Extract dates
```
  loadSuccess(data) {
    logger.info('load list success', data);
    const days = data.map(item => {
      const match = item.key.match(/\/(\d{4}-\d{1,2}-\d{1,2})\//);
      return match? match[1] : null;
    })
    .filter (day => !!day);
    const day_set = new Set([today()].concat(days));
    const unique_days = Array.from(day_set).sort().reverse();
    this.setState({ days: unique_days });
  }
```

## 2. Display Dates

Display with `<Dropdown>`

```
          <Dropdown>
            <Dropdown.Button secondary>{day}</Dropdown.Button>
            <Dropdown.Menu>
              { days.map(day => {
                  return (
                    <Dropdown.Item
                      href="#"
                      key={day}
                      onClick={() => this.setDay(day)}
                    >
                      {day}
                    </Dropdown.Item>
                  )
              })}
            </Dropdown.Menu>
          </Dropdown>
```

## 3. Switch Date

`<WhichDay>` emit `onDaySelected` event, then `<Home>` page update accordingly

```
  setDay(day) {
    this.setState({ day: day });

    const { onDaySelected } = this.props;
    if (onDaySelected) { onDaySelected(day); }
  }
```

## 4. Run App

```
npm start
```

<img src="journal-by-day.png" width="480px" />

[Step 08 - Go Live](../step-08)
