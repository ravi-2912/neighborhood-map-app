import React, { Component } from 'react';
import GMap from './components/GMap';
import Sidebar from './components/Sidebar';
import './App.css';
import * as CAFE from './components/CovCafeLsit';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
    state = {
        map: {},
        loc: {
            lat: 52.4083,
            lng: -1.5071
        },
        cafes: CAFE.CovCafeList.response.venues,
        query: '',
        searchedCafes: CAFE.CovCafeList.response.venues
    };

    onMapLoad = map => {
        this.setState({ map });
    };

    onQuery = query => {
        if (!query) {
            this.setState({ query: '', searchedCafes: this.state.cafes });
            return;
        }
        this.setState(
            {
                query: query,
                searchedCafes: []
            },
            function() {
                this.search();
            }.bind(this)
        );
    };

    search = () => {
        let searchedCafes;
        const match = new RegExp(escapeRegExp(this.state.query), 'i');
        searchedCafes = this.state.cafes.filter(cafe => match.test(cafe.name));
        this.setState({ searchedCafes });
    };

    render() {
        return (
            <div className="App s-layout">
                <Sidebar query={this.state.query} cafes={this.state.searchedCafes} onQuery={this.onQuery} />
                <GMap cafes={this.state.searchedCafes} loc={this.state.loc} onMapLoad={this.onMapLoad} />
            </div>
        );
    }
}

export default App;
