import React from 'react';
import './App.css';
import ScrollBasedBezier from './components/ScrollBasedBezier';

function App() {
  return (
    <div className="App">
      <header className="App-header">Hi, I'm Kathy...</header>

      <ScrollBasedBezier headerHeight={55} />

      <div className="main__content">
        <p>
          ...And I'm a frontend engineer. I've used mainly React in my work but
          by no means would I call myself an expert. Currently, I work at{' '}
          <a href="https://www.doctor.com" target="_blank">
            Doctor.com
          </a>
          . I've been fortunate enough to have been a part of completing many
          products and services DDC has to offer.
        </p>
        <p>
          Outside of coding, I like going to the great outdoors with my trusty
          four-legged companion, Pim. In contrast to my head down work, I enjoy
          the relief and exhilaration from stepping into nature and getting
          soaked by waterfalls. Being outside in nature reminds me that life
          goes beyond words and screens. Tiring out the pup is a big plus, too.
        </p>
      </div>
    </div>
  );
}

export default App;
