import React, { useState, useEffect } from 'react';
import './App.css';
import ECG from './ecg';
import './ecg.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Put } from './Api';

export interface HeartbeatConfig {
  host: string;
  token: string;
  headers: { [key: string]: string };
  timeout: number;
}

export const defaultConfig: HeartbeatConfig = {
  host: 'http://npsnorthcentralus.azure-api.net/sandbox/api/nsk/v1/token',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb3RSRVpBcGkiLCJqdGkiOiI2NDNhMWYzNS1mMTE5LTJiMGUtZjQzYi0yMDY5ODYxOTAxMzIiLCJpc3MiOiJBUEkifQ.nS9W8ibfl9UJTtbNFNZJjSr5MAaCXLpo-Y1RknCd4YM',
  headers: {
    'Ocp-Apim-Subscription-Key': '854db94be14d4af89a8e27539e824c71',
    'Ocp-Apim-trace': 'true',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: 60000
};

function isJson(jsonString: string) {
  try {
    jsonString = JSON.parse(jsonString);
  } catch (e) {
    return false;
  }

  if (typeof jsonString === 'object' && jsonString !== null) {
    return true;
  }

  return false;
}

const App: React.FC = () => {
  const [shouldHeartbeat, setShouldHeartbeat] = useState(false);
  const [json, setJson] = useState(JSON.stringify(defaultConfig, null, 2));
  const [makingRequest, setMakingRequest] = useState(false);
  const [didError, setDidError] = useState(false);

  const SettingsInput = (
    <>
      <CodeMirror
        value={json}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true
        }}
        onBlur={e => {
          const value = e.getValue();
          const validJson = isJson(value);

          if (!validJson) {
            return;
          }

          setJson(JSON.stringify(JSON.parse(value), null, 2));
        }}
        className="wut"
      />
    </>
  );

  useEffect(() => {
    if (!shouldHeartbeat) {
      return;
    }

    const { token, host, headers, timeout } = JSON.parse(
      json
    ) as HeartbeatConfig;
    const makeRequest = () => {
      setMakingRequest(true);
      setDidError(false);
      Put(host, token, headers)
        .catch(() => setDidError(true))
        .finally(() => setMakingRequest(false));
    };

    let intervalId = setInterval(() => {
      makeRequest();
    }, timeout);

    makeRequest();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [shouldHeartbeat, json]);

  return (
    <div className="App">
      <header className="App-header">
        {!shouldHeartbeat && SettingsInput}
        <button id="controlButton" onClick={() => setShouldHeartbeat(b => !b)}>
          {!shouldHeartbeat ? 'Start' : 'Stop'}
        </button>
        {shouldHeartbeat && (
          <ECG requesting={makingRequest} error={didError} animationTime={4} />
        )}
      </header>
    </div>
  );
};

export default App;
