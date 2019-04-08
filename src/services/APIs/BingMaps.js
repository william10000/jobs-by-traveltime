import Axios from 'axios';

const bingMapsEndpoint = 'https://dev.virtualearth.net/REST/v1/';

// returns an array of polygons representing isochrones from the given waypoint
// https://dev.virtualearth.net/REST/v1/Routes/Isochrones?waypoint=31.520759,-97.133597&maxDistance=50&distanceUnit=mile&optimize=distance&travelMode=driving&key=BingMapsKey
export async function getIsochronesBing(startingLocation) {
	// todo: update to use max time with start time and to do
	// multiple max times 15, 30, 60 minutes
	const requestParams = {
		"waypoint": startingLocation.address + ',' + startingLocation.zip,
		"maxTime": 30,
		"dateTime": "03/01/2020 05:42:00", // timezone??
		"optimize": "timeWithTraffic",
		"timeUnit": "minute",
		"travelMode": "driving",
		"key": process.env.REACT_APP_BINGMAPS_KEY
	}
	const isochroneEndpoint = bingMapsEndpoint + 'Routes/Isochrones';
	try {
		var isochronesBing = await Axios.get(isochroneEndpoint, {
			params: requestParams
		});
		return isochronesBing.data.resourceSets[0].resources[0].polygons[0].coordinates;
	}
	catch(err) {
		console.log(JSON.stringify(err));
	}
}

// http://dev.virtualearth.net/REST/v1/Locations?countryRegion={countryRegion}&adminDistrict={adminDistrict}&locality={locality}&postalCode={postalCode}&addressLine={addressLine}&userLocation={userLocation}&userIp={userIp}&usermapView={usermapView}&includeNeighborhood={includeNeighborhood}&maxResults={maxResults}&key={BingMapsKey}  
export async function getLocationBing(startingLocation) {
	const requestParams = {
		"addressLine": startingLocation.address,
		"postalCode": startingLocation.zip,
		"maxResults": 1,
		"key": process.env.REACT_APP_BINGMAPS_KEY
	}

	const locationEndpoint = 'https://cors-anywhere.herokuapp.com/' + bingMapsEndpoint + 'Locations';
	try {
		var locationBing = await Axios.get(locationEndpoint, {
			params: requestParams
		});

		return locationBing.data.resourceSets[0].resources[0];
	}
	catch(err) {
		console.log(JSON.stringify(err));
	}
}

