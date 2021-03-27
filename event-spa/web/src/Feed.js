import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
function Event({event}) {
  return(
    <Col xs="12">
      <div className="card my-2">
        <div className="card-header font-weight-bold h4 text-primary">{event.user.name}</div>
        <div className="card-body">
          <h5 className="card-title h1 mr-2 font-weight-bold text-info">{event.name}</h5>
          <h5 className="card-subtitle text-secondary mr-2 my-2">{event.date}</h5>
          <p className="card-text card-text font-weight-bold h4">{event.description}</p>
        </div>
      </div>
    </Col>
  );
}

function Feed({events}) {
  let cards = events.map((event) => (
    <Event event={event} key={event.id} />
  ));
  let new_link = null;
  new_link = (
      <p><Link className="btn btn-lg btn-primary text-light font-weight-bold mt-4" to="events/new">New Event</Link></p>
  )
  return (
      <div>
      { new_link }
      <Row className="my-4">{cards}</Row>
      </div>
  );
}

export default connect(({events}) => ({events}))(Feed);
