const _ = require("underscore");
const github = require("./github.js");
const issueFixers = new Object();
const totalScore = new Object();


// Which person is assigned top contributor in a repo?
async function findTopContributor(owner, repo) {
	// mock data needs list of contributors.
	let contributors = await github.getContributors(owner, repo);
	top_contributor_name = null;
	max_contributions = 0;
	//
	for (contributor of contributors) {
		//console.log(contributor.login);
		if (contributor.contributions > max_contributions) {
			top_contributor_name = contributor.login;
			max_contributions = contributor.contributions;
		}
	}
	return { userName: top_contributor_name, contributions: max_contributions };
}

// checks whether current issue have.
async function checkForBadgeBugFixer(payload) {
	// should be called when an issue is closed
	let isBug=false;
	for (label of payload.issue.labels){
		if (label.name=='bug'){
			isBug=true;
			break;
		}
	}
	if(isBug){
		if (issueFixers.hasOwnProperty(payload.sender.login)){
			issueFixers[payload.sender.login]+=1;
		}
		else{
			issueFixers[payload.sender.login]=1;
		}
		if(issueFixers[payload.sender.login]%3==0)
			return true;
		else
			return false;
	}
	else{
		return false;
	}
}

async function createLeaderBoard(payload){

	if(payload.before !==payload.after)
	{
		if(totalScore.hasOwnProperty(payload.pusher.name))
		{
			totalScore[payload.pusher.name]+=3;
		}
		else
			totalScore[payload.pusher.name]=3;

	}

	return totalScore[payload.pusher.name];

}

async function updatePositions(leaderBoard){

	var sortedScores=Object.values(leaderBoard);
	var sortedUsers=Object.keys(leaderBoard);
	

	for(var i=0;i<sortedScores.length-1;i++)
	{
		for(var j=i+1;j<sortedScores.length;j++)
		{
			if(sortedScores[i]<sortedScores[j])
			{
				var temp1 = sortedScores[i];
				var temp2 = sortedUsers[i];
				sortedScores[i] = sortedScores[j];
				sortedUsers[i] = sortedUsers[j];
				sortedScores[j] = temp1;
				sortedUsers[j] = temp2;
			}
		}
	}

	return sortedUsers;
}

async function checkJoinDateAnniversary(user){
	//function to remove time
	Date.prototype.withoutTime = function () {
		var d = new Date(this);
		d.setHours(0, 0, 0, 0);
		return d;
	}
	var date = new Date();  //today's date
	date = date.withoutTime();
	return (user.joinDate.getDay() === date.getDay() && user.joinDate.monthIndex === date.monthIndex); 
}

exports.findTopContributor = findTopContributor;
exports.checkForBadgeBugFixer = checkForBadgeBugFixer;
exports.createLeaderBoard = createLeaderBoard;
exports.updatePositions = updatePositions;
exports.checkJoinDateAnniversary = checkJoinDateAnniversary;
