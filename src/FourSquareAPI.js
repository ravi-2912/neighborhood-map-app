var FOURSQUARE_CLIENT_ID = 'OJWWM4KM2QIC1ZYNR2GGNPSYVMFIIMQQJSYCHQJ1DVOQHEIO';
var FOURSQUARE_CLIENT_SECRET = '5X0YJTIWGJC34YIDAAIOAEXXFBB2SHE3JPWNYO23ROQKYMX2';

export const search = (query, location) =>
    fetch(`https://api.foursquare.com/v2/venues/search?
            ll=${location.lat},${location.lng}
            &query=${query}
            &limit=10
            &radius=50000
            &client_id=${FOURSQUARE_CLIENT_ID}
            &client_secret=${FOURSQUARE_CLIENT_SECRET}
            &v=20180717`)
        .then(res => res.json())
        .catch(err => console.log('Foursquare cannot be reached\n', err));

export const venue = venueID => {
    fetch(`https://api.foursquare.com/v2/venues/${venueID}`)
        .then(res => (res.status === 200 ? res.json() : (res.infowindow.msg = 'Sorry data cannot be loaded')))
        .then(data => data.response.venues)
        .catch(err => console.log('Foursquare cannot be reached\n', err));
};
