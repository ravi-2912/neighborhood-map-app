import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as MapStyle from './GMaps_styles';

class GMap extends Component {
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
                styles: MapStyle.retro_simplified_labelOff
            });
        } catch (err) {
            console.log('[ GMaps > initMap() ]: Google Maps could not be initialised.\n', err);
        } finally {
            if (map) {
                var infowindow = new window.google.maps.InfoWindow({});
                this.props.onInfoWindowUpdate(infowindow);
                this.props.onMapUpdate(map);
                this.generateMarkers();
            }
        }
    };
    generateMarkers = () => {
        var markers = [];
        this.props.cafes.forEach((cafe, i) =>
            setTimeout(() => {
                const loc = { lat: cafe.location.lat, lng: cafe.location.lng };

                let mark = new window.google.maps.Marker({
                    position: loc,
                    map: this.props.map,
                    title: cafe.name,
                    animation: window.google.maps.Animation.DROP
                });

                mark.addListener('click', () => {
                    this.props.map.panTo(mark.getPosition());
                    this.props.infoWindow.setContent(
                        `<div class="info-window" tabIndex=1>
                            <h1>${cafe.name}</h1>
                            <address>
                                ${cafe.location.formattedAddress[0]}, ${cafe.location.formattedAddress[1]}, ${
                            cafe.location.formattedAddress[2]
                        }
                            </address>
                            <p>
                            <a href="https://foursquare.com/v/${
                                cafe.id
                            }" target="_blank">Read more on <b>Fourquare</b>.</a>
                            </p>
                        </div>`
                    );
                    this.props.infoWindow.open(this.props.map, mark);
                });

                mark.addListener('mouseover', function() {
                    this.setAnimation(window.google.maps.Animation.BOUNCE);
                });

                mark.addListener('mouseout', function() {
                    this.setAnimation(null);
                });
                markers.push(mark);
            }, i * 100)
        );
        this.props.onMapMarkerUpdate(markers);
    };

    removeMarkers = () => {
        this.props.markers.map(mark => mark.setMap(null));
        this.props.onMapMarkerUpdate([]);
    };

    togglePOI = prevProps => {
        if (this.props.poi !== prevProps.poi) {
            this.props.poi
                ? this.props.map.setOptions({ styles: MapStyle.retro_simplified_labelOn })
                : this.props.map.setOptions({ styles: MapStyle.retro_simplified_labelOff });
        }
    };

    componentWillReceiveProps(prevProps) {
        if (this.props.cafes.length !== prevProps.cafes.length) {
            this.removeMarkers();
        }

        this.togglePOI(prevProps);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cafes.length !== prevProps.cafes.length) {
            window.google && this.generateMarkers();
        }
        this.togglePOI(prevProps);
    }

    componentDidMount() {
        window.initMap = this.initMap;

        this.loadJS(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAqTOMMBtXHqq8QFxZJxXE7fMOUMJtTx_w&callback=initMap'
        );
        //this.togglePOI(prevProps);
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
