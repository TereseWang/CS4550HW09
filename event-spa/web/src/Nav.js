import { Nav, Navbar, Row, Col, Form, Button ,Container, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { api_login } from './api';

function LoginForm() {
  const [email, setName] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(email, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <div className="mr-1 h5 mt-2 font-weight-bold text-light ml-5">Email:</div>
      <Form.Control name="email"
                    type="text"
                    onChange={(ev) => setName(ev.target.value)}
                    value={email}
                    className="ml-1 mr-1"/>
      <div className="mr-1 h5 mt-2 font-weight-bold text-light">Password:</div>
      <Form.Control name="password"
                    type="password"
                    onChange={(ev) => setPass(ev.target.value)}
                    value={pass}
                    className="ml-1"/>
      <Button className="h3 ml-1 mt-1 font-weight-bold" type="submit">
        Logins
      </Button>
    </Form>
  );
}

let SessionInfo = connect()(({session, dispatch}) => {
  function logout() {
    dispatch({type: 'session/clear'});
  }
  return (
    <div className="h4 mt-5 ml-5 font-weight-bold">
      Logged in as {session.email} &nbsp;
      <Button onClick={logout}>Logout</Button>
    </div>
  );
});


function LOI({session}) {
  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(
  ({session}) => ({session}))(LOI);

function Link({to, children}) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link"
               activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}

function AppNav({error}) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }
  return (
    <Container fluid className="bg-info">
      <Row>
        <Col>
          <Nav>
            <h1 className="mr-5 display-1 font-weight-bold text-light">HWZone</h1>
            <LoginOrInfo />
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav variant="tabs" defaultActiveKey="/" className="h3 font-weight-bold">
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
          </Nav>
        </Col>
      </Row>
      { error_row }
    </Container>
  );
}

export default connect(({error}) => ({error}))(AppNav);
