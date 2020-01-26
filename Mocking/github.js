const got  = require('got');

const token = "token " + "YOUR TOKEN";
const urlRoot = "https://api.github.com";

async function getContributors(owner, repo) {
	const url = urlRoot + "/repos/" + owner + "/" + repo + "/contributors";
	const options = {
		method: 'GET',
		headers: {
			"content-type": "application/json",
			"Authorization": token
		},
		json: true
	};

	// Send a http request to url
	let issues = (await got(url, options)).body;
	return issues;
}

exports.getContributors = getContributors;
