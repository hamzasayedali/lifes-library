import React, { useState, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Person from './Person';
import Location from './Location';
import './App.scss';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState(Date);
  const [memories, setMemories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/api/memories", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location,
        event,
        people,
        date
      })
    })
    .then((res) => res.json())
    .then((data)=>setData(data.message));      

  }

  React.useEffect(() => {
    fetch("/api/memories")
      .then((res) => res.json())
      .then((serverMemories)=>setMemories(serverMemories));
  }, []);



  return (
    <Fragment>
      <p>{!data ? "" : data}</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEnterLocation">
          <Form.Label>Location of Memory</Form.Label>
          <Form.Control name="location" type="text" placeholder="Enter Location" onChange={(e) => {setLocation(e.target.value)} } value={location}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnterEvent">
          <Form.Label>Event</Form.Label>
          <Form.Control name="title" type="text" placeholder="Enter Event" onChange={ (e) => {setEvent(e.target.value)} } value={event}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnterPeople">
          <Form.Label>Who Were You With?</Form.Label>
          <Form.Control name="people" type="text" placeholder="Enter Persons Name" onChange={ (e) => {setPeople(e.target.value)} } value={people}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnterDate">
          <Form.Label>Enter Date</Form.Label>
          <Form.Control name="date" type="date" placeholder="choose date" onChange={ (e) => {setDate(e.target.value)} } value={date} />
        </Form.Group>

        <Button variant="primary" type="submit">Save Memory</Button>
      </Form>

      <h2>
        Old Memories
      </h2>
      <Row>
        {memories.map((memory, index) => {
          return (
            <Col key={index} xs={12} sm={4} md={3}>
              <Card style={{ width: '20rem' }}>
                <Card.Header>
                  <Card.Title>{memory.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                      <Link to={`/locations/${memory.location}`}>{memory.location}</Link>
                    </Card.Subtitle>
                    <Card.Text>
                      {memory.people.split(',').map(person => (
                    <span><Link to={`/people/${person}`}>{person}</Link>&nbsp;</span>
                  ))}<br />
                      <cite>{memory.date}</cite>
                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
}

function App() {
  return (
    <Router>
      <Container>
        <h1>Life's Library</h1>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/people/:person">
            <Person />
          </Route>
          <Route path="/locations/:location">
            <Location />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App;
