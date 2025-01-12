import React from 'react';
import './App.css';
import { Leaflet } from './Components/Leaflet/Leaflet.jsx'
import { Gemini } from './Components/Gemini/Gemini.jsx';

function App() {
    return (
      <div className='container'>
        <div className="data-container">
            <div className="left">
                <div className="gemini">
                <h1 className='map-head'>
                    <img src='/assets/logo.png' alt='GeminiMap Logo' className='logo' />
                </h1>
                    <Gemini />
                    <p className='mark'>
                        <a href="https://www.linkedin.com/in/ryanwjanuardi/" target="_blank" rel="noopener noreferrer"> KohRyanStudio </a> | Powered by: <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer"> Leaflet</a>, <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"> Gemini</a>, <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>, <a href="https://locationiq.com/" target="_blank" rel="noopener noreferrer">LocationIQ</a>
                    </p>
                </div>
            </div>
            <div className="right">
                <Leaflet />
            </div>
        </div>
        </div>
    );
}

export default App;
