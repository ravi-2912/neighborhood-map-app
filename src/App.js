import React, { Component } from 'react';
import GMaps from './components/GMaps';
import Sidebar from './components/Sidebar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <GMaps />
            </div>
        );
    }
}

export default App;
