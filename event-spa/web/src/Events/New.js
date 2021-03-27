import { Row, Col, Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_event, fetch_events } from '../api';
import Datetime from 'react-datetime';

export default function EventsNew() {
  let history = useHistory();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: ""
  });

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
    create_event(event).then(() => {
        history.push("/");
        fetch_events();
    });
  }

  function update(field, ev) {
    let newEvent = Object.assign({}, event);
    newEvent[field] = ev.target.value;
    setEvent(newEvent);
  }

  function updateDate(date) {
    let newEvent = Object.assign({}, event);
    newEvent["date"] = date;
    setEvent(newEvent);
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control type="text"
              onChange={
                (ev) => update("name", ev)}
              value={event.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <br></br>
            <Datetime onChange={(date) => updateDate(date)} value={event.date} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={
                            (ev) => update("description", ev)
                          }
                          value={event.description} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
