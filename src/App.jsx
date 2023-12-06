// src/App.js
import React from 'react';
import Weather from './components/Weather';

function App() {
  const apiKey = 'c51eb163b2bb6284a6158ba26245a147 ';

  return (
    <div className="App">
      <Weather apiKey={apiKey} />
    </div>
  );
}

export default App;
