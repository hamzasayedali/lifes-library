import React from 'react';
import { useParams } from 'react-router-dom';
import Memories  from './Memories';
import { useState } from 'react';

function Person() {
  const { person } = useParams();
  const [memories, setMemories] = useState([]);
  const [newMemories, setNewMemories] = useState(true);

  React.useEffect(() => {
    if (newMemories) {
      fetch(`/api/people/${person}/memories`)
        .then((res) => res.json())
        .then((serverMemories) => setMemories(serverMemories));
      setNewMemories(false);
    }
  }, [newMemories, person]);

  return(
    <>
      <h2>Memories with {person}</h2>
      <Memories memories={memories} />
    </>
  ) 
}

export default Person;
