import React, { Component } from 'react';
import GMap from './components/GMap';
import Sidebar from './components/Sidebar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App s-layout">
                <Sidebar />
                <GMap />
            </div>
        );
    }
}

export default App;
