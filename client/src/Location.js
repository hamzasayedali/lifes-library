import React from 'react';
import { useParams } from 'react-router-dom';

function Location() {
  const { location } = useParams();
  return <h2>Memories around {location}</h2>;
}

export default Location;
