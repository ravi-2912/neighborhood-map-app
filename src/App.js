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
        map: {}
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
    /*toggle
            ? this.state.map.setOptions({ styles: styles['default'] })
            : this.state.map.setOptions({ styles: styles['hide'] });*/

    componentDidMount() {
        var cafeVenueData;
        let getVenueData = () => {
            //this.state.cafes.map((cafe, i) =>
            FSAPI.venue(this.state.cafes[3].id).then(res => console.log('venue fetch', res));
        };

        FSAPI.search('cafe', this.state.loc)
            .then(res =>
                this.setState({ cafes: res.response.venues, searchedCafes: res.response.venues }, function() {
                    getVenueData();
                })
            )
            .catch(err => {
                console.log(err);
                this.setState(
                    {
                        cafes: CAFE.CovCafeList.response.venues,
                        searchedCafes: CAFE.CovCafeList.response.venues
                    },
                    function() {
                        getVenueData();
                    }
                );
            });

        console.log(cafeVenueData);
    }

    render() {
        return (
            <div className="App s-layout">
                <Sidebar
                    query={this.state.query}
                    cafes={this.state.searchedCafes}
                    onQuery={this.onQuery}
                    markers={this.state.markers}
                    onTogglePOI={this.onTogglePOI}
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
