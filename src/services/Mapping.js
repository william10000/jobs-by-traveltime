// use this module to aggregate results from various maps APIs and potentially do retries if one API is down
import { getIsochronesBing, getLocationBing } from "./APIs/BingMaps";

export async function getIsochrones(startingLocation) {
	const isochronesBing = await getIsochronesBing(startingLocation);

	return isochronesBing;
}

export async function getLocation(startingLocation) {
	const locationBing = await getLocationBing(startingLocation);

	return locationBing;
}

