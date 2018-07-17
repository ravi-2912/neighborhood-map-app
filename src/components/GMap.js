import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as MapStyle from './GMaps_styles';

class GMap extends Component {
    static propTypes = {
        loc: PropTypes.object.isRequired,
        onMapLoad: PropTypes.func.isRequired
    };

    loadJS = src => {
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        script.src = src;
        script.async = false;
        ref.parentNode.insertBefore(script, ref);
    };

    initMap = () => {
        let map;
        try {
            map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: this.props.loc,
                styles: MapStyle.retro_simplified
            });
        } catch (err) {
            console.log('[ GMaps > initMap() ]: Google Maps could not be initialised.\n', err);
        } finally {
            if (map) {
                this.props.onMapLoad(map);
            }
        }
        // Adds a marker to the map.
        function addMarker(location, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            return new window.google.maps.Marker({
                position: location,
                map: map,
                animation: window.google.maps.Animation.DROP
            });
        }
        const cafes = this.props.cafes;
        cafes.map(cafe => addMarker({ lat: cafe.location.lat, lng: cafe.location.lng }, map));
    };

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadJS(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAqTOMMBtXHqq8QFxZJxXE7fMOUMJtTx_w&callback=initMap'
        );
    }

    render() {
        return (
            <main className="s-layout__content">
                <div id="map" />
            </main>
        );
    }
}

export default GMap;
