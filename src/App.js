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
        infoWindow: {},
        fsCon: '',
        googleCon: 'red'
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

    onInfoWindowUpdate = infoWindow => this.setState({ infoWindow });

    onTogglePOI = toggle => this.setState({ poi: toggle });

    onMouseOver = i => {
        try {
            window.google.maps.event.trigger(this.state.markers[i], 'mouseover');
        } catch (err) {}
    };
    //onMouseOver = i => this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);

    onMouseOut = i => {
        try {
            window.google.maps.event.trigger(this.state.markers[i], 'mouseout');
        } catch (err) {}
    };
    //onMouseOut = i => this.state.markers[i].setAnimation(null);

    onClick = i => {
        try {
            window.google.maps.event.trigger(this.state.markers[i], 'click');
        } catch (err) {}
    };

    componentDidMount() {
        FSAPI.search('cafe', this.state.loc)
            .then(res =>
                this.setState({ cafes: res.response.venues, searchedCafes: res.response.venues, fsCon: 'green' })
            )
            .catch(err => {
                this.setState({
                    cafes: CAFE.CovCafeList.response.venues,
                    searchedCafes: CAFE.CovCafeList.response.venues
                });
                this.setState({ fsCon: 'red' });
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
                    fsCon={this.state.fsCon}
                />
                <GMap
                    map={this.state.map}
                    markers={this.state.markers}
                    cafes={this.state.searchedCafes}
                    loc={this.state.loc}
                    poi={this.state.poi}
                    infoWindow={this.state.infoWindow}
                    onMapMarkerUpdate={this.onMapMarkerUpdate}
                    onMapUpdate={this.onMapUpdate}
                    onInfoWindowUpdate={this.onInfoWindowUpdate}
                />
            </div>
        );
    }
}

export default App;
