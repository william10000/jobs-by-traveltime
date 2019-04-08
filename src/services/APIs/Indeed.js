import Axios from 'axios';

// TODO: update endpoint to prepend proxy only if dev, add pagination
export async function getJobsIndeed(searchTerms, startingLocation) {
  const requestParams = {
    "publisher": "2916132883457866", // from someone else's github repo
    "format": "json",
    "v": 2,
    "latlong": 1,
    "co": 1,
    "limit": 25,
    "q": searchTerms,
    "l": startingLocation.zip,
    "radius": "25",
    "useragent": "hahaha",
  }
  const indeedAPIEndpoint = 'https://cors-anywhere.herokuapp.com/https://api.indeed.com/ads/apisearch';
  
  try {
    Axios.defaults.headers.common['origin'] = "*";
    var jobsIndeed = await Axios.get(indeedAPIEndpoint, {
      params: requestParams
    });
    return jobsIndeed.data.results;
  }
  catch(err) {
    console.log(JSON.stringify(err));
  }
}
