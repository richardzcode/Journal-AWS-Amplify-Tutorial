import React, { Component } from 'react';
import { Row, Col, BH4, Dropdown } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

const padding = n => {
  return n > 9 ? n : '0' + n;
}

const today = () => {
  const dt = new Date();
  return [
    dt.getFullYear(),
    padding(dt.getMonth() + 1),
    padding(dt.getDate())
  ].join('-');
}

const logger = new Logger('WhichDay');

export default class WhichDay extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.setDay = this.setDay.bind(this);
    this.state = { day: today(), days: [today()] }
  }

  componentDidMount() {
    this.load();
  }

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

  loadError(err) {
    logger.info('load list error', err);
  }

  setDay(day) {
    this.setState({ day: day });

    const { onDaySelected } = this.props;
    if (onDaySelected) { onDaySelected(day); }
  }

  render() {
    const { day, days } = this.state;

    return (
      <Row mb="3">
        <Col mr="auto" text="left">
          <BH4>{day}</BH4>
        </Col>
        <Col text="right">
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
        </Col>
      </Row>
    )
  }
}
