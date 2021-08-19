import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.scss';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [people, setPeople] = useState("");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data)=>setData(data.message));
  }, []);

  return (
    <Container>
      <h1>Life's Library</h1>
      <p>{!data ? "Loading..." : data}</p>
      <Button>Save Memory</Button>

      <Form>
        <Form.Group controlId="formEnterLocation">
          <Form.Label>Location of Memory</Form.Label>
          <Form.Control type="location" placeholder="Enter Location" onChange={(e) => {setLocation(e.target.value)} } value={location}/>
        </Form.Group>

        <Form.Group controlId="formEnterEvent">
          <Form.Label>Event</Form.Label>
          <Form.Control type="event" placeholder="Enter Event" onChange={ (e) => {setEvent(e.target.value)} } value={event}/>
        </Form.Group>

        <Form.Group controlId="formEnterPeople">
          <Form.Label>Who Were You With?</Form.Label>
          <Form.Control type="attendees" placeholder="Enter Persons Name" onChange={ (e) => {setPeople(e.target.value)} } value={people}/>
        </Form.Group>
      </Form>

    </Container>
  );
}

export default App;
