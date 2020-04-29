import React from 'react';
import './App.css';
import ScrollBasedBezier from './components/ScrollBasedBezier';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        oh hello,
        <ScrollBasedBezier headerHeight={10} />
      </header>

      <div className="main__content">
        <h1>i'm kathy.</h1>
        <p>
          I am a software engineer based in San Jose, California. I enjoy
          working with React on the front end. Oh, and I have a dog; her name is
          Pim.
        </p>

        <h3>contact</h3>
        <ul>
          <li>email: kathyluu820@gmail.com</li>
        </ul>

        <h3>experience</h3>
        <ul>
          <li>
            <div>Intuit</div>
            <div>2020 – present</div>
          </li>
          <li>
            <div>Doctor.com</div>
            <div>2017 – 2020</div>
          </li>
        </ul>

        <h3>projects</h3>
        <ul>
          <li>Two Half-Hitches</li>
          <li>Murakami Wedding</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
