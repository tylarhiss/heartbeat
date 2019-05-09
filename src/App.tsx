import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [shouldHeartbeat, setShouldHeartbeat] = useState(false);
  const [host, setHost] = useState('');
  const [token, setToken] = useState('');

  const test = (
    <>
      <input
        type="text"
        name=""
        id=""
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <input
        type="text"
        name=""
        id=""
        value={host}
        onChange={e => setHost(e.target.value)}
      />
    </>
  );

  useEffect(() => {
    if (!shouldHeartbeat) {
      return;
    }

    let timerTimeout = setTimeout(() => {
      console.log('test');
    }, 60000);

    return () => {
      if (timerTimeout) {
        clearTimeout(timerTimeout);
      }
    };
  }, [shouldHeartbeat]);

  return (
    <div className="App">
      <header className="App-header">
        {!shouldHeartbeat && test}

        <button onClick={() => setShouldHeartbeat(b => !b)}>
          {!shouldHeartbeat ? 'Start' : 'Stop'}
        </button>

        {shouldHeartbeat && <div className="heart" />}
      </header>
    </div>
  );
};

export default App;
