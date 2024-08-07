import React from 'react';
import CountryList from './countriesList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>XCOUNTRIES</h1>
      </header>
      <CountryList />
    </div>
  );
};

export default App;