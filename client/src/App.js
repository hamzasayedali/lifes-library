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
  const [date, setDate] = useState(Date);

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/api/add", {
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
    fetch("/api")
      .then((res) => res.json())
      .then((data)=>setData(data.message));
  }, []);

  return (
    <Container>
      <h1>Life's Library</h1>
      <p>{!data ? "Loading..." : data}</p>

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



    </Container>
  );
}

export default App;
