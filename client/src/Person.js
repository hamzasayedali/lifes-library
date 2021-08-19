import React from 'react';
import { useParams } from 'react-router-dom';

function Person() {
  const { person } = useParams();
  return <h2>Memories with {person}</h2>;
}

export default Person;
