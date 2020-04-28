import React from 'react';
import './App.css';
import ScrollBasedBezier from './components/ScrollBasedBezier';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Oh, hello
        <ScrollBasedBezier headerHeight={10} />
      </header>

      <div className="main__content">
        <p>
          I am a software engineer based in San Jose, California. I enjoy
          working with React on the front end. I am currently employed at
          Intuit, Inc. in Mountain View. Oh, and I have a dog; her name is Pim.
        </p>
      </div>
    </div>
  );
}

export default App;
