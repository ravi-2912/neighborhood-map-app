import React, { Component } from 'react';
import GMap from './components/GMap';
import Sidebar from './components/Sidebar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <GMap />
            </div>
        );
    }
}

export default App;
