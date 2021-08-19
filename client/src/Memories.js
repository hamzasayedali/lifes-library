import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Memories({ memories }) {
  return (
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
  );
}

export default Memories;
