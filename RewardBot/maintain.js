var User = require('./User.js');
var slackMsg = require('./slackMsg.js');

var slackArray = []
var userArray = []
var user_search = {}
var repos_slack = {}
var repo_user = {}
var whoInstalledApp = {}

  function sendYearlySlackMsg(type){
      console.log("In maintan");
      console.log(repos_slack);
      for (const [key, value] of Object.entries(repos_slack)) {
          let userID = repo_user[key];
          let reply = this.leaderboard_msg(userID, key, type)
          slackMsg.msgSlack(
            { text: 'This is the ' + type +' Leaderboard \n Name          Points \n' + reply }, slackArray[value].url);
      }
  }

  function get_leader_brd(team){    
      let index;
      
      for (let i = 0; i <  slackArray.length; i++){
          if (slackArray[i].team_id === team){
              index = i;
              break;
          }
      }
    
      for (const [key, value] of Object.entries(repos_slack)) {
          if (value === index){
            let userID = repo_user[key];
            let reply = this.leaderboard_msg(userID, key, "Weekly");
            let text = 'This is the Weekly Leaderboard \n Name          Points \n' + reply;
            return text
          }
      }
  }

  // get leader_board message
  function leaderboard_msg(userID,key,type)
  {
      console.log(userID);
      let leader_board = {};
      if(type === "Weekly")
      {
          for (var i in userID){
              let index = user_search[[userID[i], key]];
              leader_board[userArray[index].login] =  userArray[index].points_weekly;
          }
      }
      else if(type === 'Monthly')
      {
        for (var i in userID)
        {
          let index = user_search[[userID[i], key]];
          leader_board[userArray[index].login] =  userArray[index].points_monthly;
        }
      }
      else if(type === "Yearly")
      {
          for (var i in userID)
          {
            let index = user_search[[userID[i], key]];
            leader_board[userArray[index].login] =  userArray[index].points_yearly;
          }
      }
    
      var items = Object.keys(leader_board).map(function(key) {
        return [key, leader_board[key]];
      });

      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
    
        let reply = '';
        console.log(leader_board)

        for (let i in items){
            if (i > 2){
              break;
            }
            console.log(items[i]);
            reply = reply + items[i][0] + '          ' + items[i][1] + '\n';
        }
    
        return reply;
  }


  function addPointsToIssueOpen(userID, repoID){
      userArray[user_search[[userID, repoID]]].points_issueOpen += 1;
      this.addLeaderBoardPoints(userID, repoID, 1);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 1);
  }

  function addPointsToIssueClose(userID, repoID){
      userArray[user_search[[userID, repoID]]].points_issueClose += 1;
      this.addLeaderBoardPoints(userID, repoID, 1);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 1);
  }

  function addPointsToPush(userID, repoID){
      userArray[user_search[[userID, repoID]]].points_push += 3;
      this.addLeaderBoardPoints(userID, repoID, 3);
      this.checkForBadgeCommitter(user_search[[userID, repoID]], repoID);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 3);
  }

  function addPointsToPullRequest(userID, repoID){
      userArray[user_search[[userID, repoID]]].points_pullRequest += 3;
      this.addLeaderBoardPoints(userID, repoID, 3);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 3);
  }

  function addPointsToMerge(userID, repoID){
      userArray[user_search[[userID, repoID]]].points_pullRequest += 5;
      this.addLeaderBoardPoints(userID, repoID, 5);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 5);
  }

  function addPointsToBugFixed(userID, repoID)
  {
      userArray[user_search[[userID, repoID]]].point_bugsFixed += 1;
      this.addLeaderBoardPoints(userID, repoID, 1);
      this.checkForBadgeBugFixer(user_search[[userID, repoID]], repoID);
      this.checkForBadgeContributer(user_search[[userID, repoID]], repoID, 1);
  }

  function addLeaderBoardPoints(userID, repoID, points){
      userArray[user_search[[userID, repoID]]].total_points += points;
      userArray[user_search[[userID, repoID]]].points_weekly += points;
      userArray[user_search[[userID, repoID]]].points_monthly += points;
      userArray[user_search[[userID, repoID]]].points_yearly += points;

  }

  function checkForBadgeBugFixer(index, repoID){
      if (userArray[index].point_bugsFixed%3 === 0){
          userArray[index].badge_BugFixer = Math.floor(userArray[index].point_bugsFixed/3);
          slackMsg.msgSlack({text: this.buildSlackMessage(userArray[index].login, userArray[index].badge_BugFixer, 'BugFixer')}, slackArray[repos_slack[repoID]].url);
      }
  }

  function checkForBadgeContributer(index, repoID, lastPointsAdded){
    let threshold = 10;
    if ( Math.floor(userArray[index].total_points/threshold) === 1 + Math.floor((userArray[index].total_points-lastPointsAdded)/threshold) ){
          userArray[index].badge_Contribitor = Math.floor(userArray[index].total_points/threshold);
          slackMsg.msgSlack({text: this.buildSlackMessage(userArray[index].login, userArray[index].badge_Contribitor, 'Contribitor')}, slackArray[repos_slack[repoID]].url);
      }
    this.checkforBadgeTheUnstoppable(index, repoID);
  }

  function checkforBadgeTheUnstoppable(index, repoID)
  {
    if (userArray[index].git_streak%100 === 0){
          userArray[index].badge_TheUnstoppable = Math.floor(userArray[index].git_streak/100);
          slackMsg.msgSlack({text: this.buildSlackMessage(userArray[index].login, userArray[index].badge_TheUnstoppable, 'The Unstoppable')}, slackArray[repos_slack[repoID]].url);
      }
  }

  function checkForBadgeCommitter(index, repoID){
      if (userArray[index].points_push%9 === 0){
          userArray[index].badge_Committer = Math.floor(userArray[index].points_push/9);
          slackMsg.msgSlack({text: this.buildSlackMessage(userArray[index].login, userArray[index].badge_Committer, 'Committer')}, slackArray[repos_slack[repoID]].url);
      }
  }

  function buildSlackMessage(login, badge, type){
    return "Please congratulate User: " + login + " on receiving Badge: " + type + " of Level: " + badge + "."
  }

  function alreadyMemberNewRepo(repoID, userID){
      repos_slack[repoID] = whoInstalledApp[userID];    
  }

  function addToWhoInstalledApp(userID, slackIndex){
      if(whoInstalledApp[userID]){
          console.log(whoInstalledApp);
          return whoInstalledApp[userID];
      }else{
          whoInstalledApp[userID] = slackIndex;
      }
    
    
      //this.installationCompleteCheck();
      slackMsg.msgSlack({text: 'Congratulations, You are starting to use reward bot '},slackArray[slackIndex].url);
  }
    
  function addToSlackArray(newSlack){
      //slackArray = storeSlackArray.get()
      slackArray.push(newSlack);
      return slackArray.length-1;
  }

  function zeroYearly(){
        userArray.forEach(function(u){
        u.points_yearly = 0;
      });
  }

  function zeroMonthly(){
        userArray.forEach(function(u){
        u.points_monthly = 0;
      });
  }

  function zeroWeekly(){
        userArray.forEach(function(u){
        u.points_weekly = 0;
      });
  }


  function addToUserArray(newUser){
      userArray.push(newUser);
      return userArray.length-1;
  }

  function checkUserInUserSearch(userID, repoID){
      if ([userID, repoID] in user_search){
        console.log("User already present");
        return true;
      }
      return false;
  }

  function userInUserArray(userID){
      userArray.forEach(function(u){
        if(u.id === userID){
          return true;
        }
      });
      return false;
  }

  function userIndexInUserArray(userID){
      for(var i = 0; i < userArray.length; i+=1){
          if (userArray[i].id === userID){
              return i;
          }
      }
      return -1;
  }

  function addToUserSearchDict(userID, repoID, index){
      user_search[[userID, repoID]] = index;
  }

  function addToReposSlackDict(repoID, index){
      if (repoID in repos_slack){
          console.log("The app is already installed in the repo, and messages are send to slack: ");
          console.log(slackArray[repos_slack[repoID]].channel);
      }else{
          repos_slack[repoID] = index;
      }
    
  }

  function addToRepoUserDict(repoID, userID){
    if(repoID in repo_user){
        if(repo_user[repoID].indexOf(userID) === -1){
            repo_user[repoID].push(userID);
        }
    }else{
        repo_user[repoID] = []
        repo_user[repoID].push(userID);
    }
    console.log(repo_user);
  }

  function checkStreak(userID, repoID){
      userArray[user_search[[userID, repoID]]].checkGitStreak();
  }


  function checkUserRepoConnection(userID, repoID, userLogin, userHtmlUrl){
        if(!this.checkUserInUserSearch(userID, repoID)){
              let index;
              let newUser = new User(userID, userLogin, userHtmlUrl, repoID);
              index = this.addToUserArray(newUser); 
              this.addToUserSearchDict(userID, repoID, index);
              this.addToRepoUserDict(repoID, userID);
        }
        this.checkStreak(userID, repoID);
        this.checkAnniversary(userID, repoID);
  }
  
  
  function installationCompleteCheck(){
        console.log("Check for arrays and dictionaries");
        console.log("Slack array is: ");
        console.log(slackArray);
        console.log("User array is: ");
        console.log(userArray);
        console.log("User Search dictinory is: ");
        console.log(user_search);
        console.log("Repos Slack dictniory is: ");
        console.log(repos_slack);
        console.log("Repos User dictniory is: ");
        console.log(repo_user);
  }

  function checkAnniversary(userID, repoID){
      var anniv = userArray[user_search[[userID, repoID]]].checkGitAnniversary();
      var Anniv_msg = "Happy " + userID + " " + anniv + " Anniversary";
      console.log(Anniv_msg);
      if(anniv !== "No")
        slackMsg.msgSlack({text: "Please congratulate " + userArray[user_search[[userID, repoID]]].login +  
                " on their " + anniv + " work anniversary!"}, slackArray[repos_slack[repoID]].url);

  }


module.exports = {
  addToSlackArray,
  checkUserRepoConnection,
  addToRepoUserDict,
  addToReposSlackDict,
  addToUserSearchDict,
  addToUserArray,
  userIndexInUserArray,
  checkUserInUserSearch,
  userInUserArray,
  leaderboard_msg,
  zeroWeekly,
  zeroMonthly,
  zeroYearly,
  checkStreak,
  checkAnniversary,
  addToWhoInstalledApp,
  installationCompleteCheck,
  alreadyMemberNewRepo,
  sendYearlySlackMsg,
  addPointsToIssueOpen,
  addPointsToIssueClose,
  addPointsToPush,
  addPointsToMerge,
  addPointsToPullRequest,
  addPointsToBugFixed,
  checkForBadgeBugFixer,
  checkForBadgeCommitter,  
  checkForBadgeContributer,
  checkforBadgeTheUnstoppable,
  addLeaderBoardPoints,
  get_leader_brd,
  buildSlackMessage,
};
