var FOURSQUARE_CLIENT_ID = 'OJWWM4KM2QIC1ZYNR2GGNPSYVMFIIMQQJSYCHQJ1DVOQHEIO';
var FOURSQUARE_CLIENT_SECRET = '5X0YJTIWGJC34YIDAAIOAEXXFBB2SHE3JPWNYO23ROQKYMX2';

export const search = (query, location) =>
    fetch(
        `https://api.foursquare.com/v2/venues/search?` +
            `ll=${location.lat},${location.lng}` +
            `&query=${query}` +
            `&limit=20` +
            `&radius=50000` +
            `&client_id=${FOURSQUARE_CLIENT_ID}` +
            `&client_secret=${FOURSQUARE_CLIENT_SECRET}` +
            `&v=20180717`
    )
        .then(handleErrors)
        .catch(err => console.log('Network Error\n', err));

export const venue = venueID =>
    fetch(
        `https://api.foursquare.com/v2/venues/${venueID}?` +
            `&client_id=${FOURSQUARE_CLIENT_ID}` +
            `&client_secret=${FOURSQUARE_CLIENT_SECRET}` +
            `&v=20180717`
    )
        .then(handleErrors)
        .catch(err => console.log('Network Error\n', err));

const handleErrors = response => {
    if (!response.ok) {
        throw Error('FourSqaure response error');
    }
    return response.json();
};
