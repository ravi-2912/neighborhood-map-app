import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as MapStyle from './GMaps_styles';

class GMap extends Component {
    state = {
        map: {},
        info: {},
        markers: []
    };

    static propTypes = {
        onMapMarkerUpdate: PropTypes.func.isRequired
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
                var infowindow = new window.google.maps.InfoWindow({});
                this.setState({ map: map, info: infowindow });
                this.generateMarkers();
            }
        }
    };
    generateMarkers = () => {
        var markers = [];
        this.props.cafes.forEach(cafe => {
            const loc = { lat: cafe.location.lat, lng: cafe.location.lng };

            let mark = new window.google.maps.Marker({
                position: loc,
                map: this.state.map,
                title: cafe.name
            });

            mark.addListener('click', () => {
                this.state.map.panTo(mark.getPosition());
                this.state.info.setContent(`
                    <div tabIndex="1" name=test>
                        <p>Hello</p>
                        <p>Tip provided by <a tabIndex="1" href="https://foursquare.com/">FOURSQUARE</a></p>
                    </div>`);
                this.state.info.open(this.state.map, mark);
            });

            mark.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE);
            });

            mark.addListener('mouseout', function() {
                this.setAnimation(null);
            });
            markers.push(mark);
        });
        this.setState({ markers });
        this.props.onMapMarkerUpdate(markers);
    };

    removeMarkers = () => {
        this.state.markers.map(mark => mark.setMap(null));
        this.setState({ markers: [] });
        this.props.onMapMarkerUpdate([]);
    };

    componentWillUpdate(prevProps) {
        if (this.props.cafes.length !== prevProps.cafes.length) {
            this.removeMarkers();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.cafes.length !== prevProps.cafes.length) {
            this.generateMarkers();
        }
    }

    componentDidMount() {
        window.initMap = this.initMap;

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
