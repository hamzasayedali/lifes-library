import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.scss';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data)=>setData(data.message));
  }, []);

  return (
    <Container>
      <h1>Life's Library</h1>
      <p>{!data ? "Loading..." : data}</p>

      <Form>
        <Form.Group className="mb-3" controlId="formEnterLocation">
          <Form.Label>Location of Memory</Form.Label>
          <Form.Control type="location" placeholder="Enter Location" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnterEvent">
          <Form.Label>Event</Form.Label>
          <Form.Control type="event" placeholder="Enter Event" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEnterPeople">
          <Form.Label>Who Were You With?</Form.Label>
          <Form.Control type="attendees" placeholder="Enter Persons Name" />
        </Form.Group>
        <Button variant="primary" type="submit">Save Memory</Button>
      </Form>

    </Container>
  );
}

export default App;
