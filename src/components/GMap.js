import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import * as MapStyle from './GMaps_styles';

class GMap extends Component {
    state = {
        map: {}
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
        let loc = {
            lat: 52.4083,
            lng: -1.5071
        };
        try {
            map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: loc,
                styles: MapStyle.retro_simplified
            });
        } catch (err) {
            console.log('[ GMaps > initMap() ]: Google Maps not found in window context.\n', err);
        } finally {
            if (map) {
                this.setState({ map });
            }
        }
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
