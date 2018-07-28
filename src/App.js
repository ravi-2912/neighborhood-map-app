import React, { Component } from 'react';
import GMap from './components/GMap';
import Sidebar from './components/Sidebar';
import * as CAFE from './components/CovCafeLsit';
import escapeRegExp from 'escape-string-regexp';
import * as FSAPI from './FourSquareAPI';
import './App.css';

class App extends Component {
    state = {
        loc: {
            lat: 52.4083,
            lng: -1.5071
        },
        cafes: {},
        query: '',
        searchedCafes: CAFE.CovCafeList.response.venues,
        markers: [],
        poi: false,
        map: {},
        info: {},
        venuesPic: {}
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

    onMapMarkerUpdate = markers => this.setState({ markers });

    onMapUpdate = map => this.setState({ map });

    onTogglePOI = toggle => this.setState({ poi: toggle });

    onMouseOver = i => window.google.maps.event.trigger(this.state.markers[i], 'mouseover');
    //onMouseOver = i => this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);

    onMouseOut = i => window.google.maps.event.trigger(this.state.markers[i], 'mouseout');
    //onMouseOut = i => this.state.markers[i].setAnimation(null);

    onClick = i => window.google.maps.event.trigger(this.state.markers[i], 'click');

    componentDidMount() {
        FSAPI.search('cafe', this.state.loc)
            .then(res => this.setState({ cafes: res.response.venues, searchedCafes: res.response.venues }))
            .catch(err => {
                console.log(err);
                this.setState({
                    cafes: CAFE.CovCafeList.response.venues,
                    searchedCafes: CAFE.CovCafeList.response.venues
                });
            });
    }

    render() {
        return (
            <div className="App s-layout">
                <Sidebar
                    query={this.state.query}
                    cafes={this.state.searchedCafes}
                    onQuery={this.onQuery}
                    onTogglePOI={this.onTogglePOI}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onClick={this.onClick}
                />
                <GMap
                    map={this.state.map}
                    markers={this.state.markers}
                    cafes={this.state.searchedCafes}
                    loc={this.state.loc}
                    onMapMarkerUpdate={this.onMapMarkerUpdate}
                    onMapUpdate={this.onMapUpdate}
                    poi={this.state.poi}
                />
            </div>
        );
    }
}

export default App;
