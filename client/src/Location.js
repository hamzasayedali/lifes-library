import React from 'react';
import { useParams } from 'react-router-dom';
import Memories  from './Memories';
import { useState } from 'react';

function Location() {
  const { location } = useParams();
  const [memories, setMemories] = useState([]);
  const [newMemories, setNewMemories] = useState(true);

  React.useEffect(() => {
    if (newMemories) {
      fetch(`/api/locations/${location}/memories`)
        .then((res) => res.json())
        .then((serverMemories) => setMemories(serverMemories));
      setNewMemories(false);
    }
  }, [newMemories, location]);

  return (
  <>
    <h2>Memories around {location}</h2>
    <Memories memories={memories} />
  </>);
}

export default Location;
