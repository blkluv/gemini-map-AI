import React from 'react';
import './App.css';
import Leaflet from './Components/Leaflet/Leaflet.jsx';
import Gemini from './Components/Gemini/Gemini.jsx';

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
                            <a href="https://creai.digital" target="_blank" rel="noopener noreferrer">
                                MAP.
                            </a>{' '}
                            | Powered by: CREAI.DIGITAL
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
