import React from 'react';
import logo from './logo.svg';
import './App.css';
import Bar from './components/chart.js';
import VectorMap from 'react-jvectormap';
import Dashboard from './components/Dashboards.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard/>
      </header>
      <Bar/>
      <div style={{width: 500, height: 500}}>
            <VectorMap map={'us_aea'}
                       backgroundColor="#3b96ce"
                       ref="map"
                       containerStyle={{
                           width: '100%',
                           height: '100%'
                       }}
                       containerClassName="map"
            />
        </div>
    </div>
  );
}

export default App;
