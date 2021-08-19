import React from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data)=>setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Life's Library</h1>
        <p>{!data ? "Loading..." : data}</p>
        <Button>Save Memory</Button>
      </header>
    </div>
  );
}

export default App;
