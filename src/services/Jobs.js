// use this module to aggregate results from various jobs APIs
import { getJobsIndeed } from "./APIs/Indeed";

export async function getJobs(searchTerms, startingLocation) {
	const jobsIndeed = await getJobsIndeed(searchTerms, startingLocation);

	return jobsIndeed;
}