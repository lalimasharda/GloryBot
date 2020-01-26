const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const ts_mockito = require("ts-mockito");

const main = require("../main.js");

// Load mock data
const data = require("../mock.json")
const data2 = require("../bugFixerTrigger.json")
const data3 = require("../leaderBoardData.json")
const User = require("../../RewardBot/User.js")

const bugFixers = new Object();
const leaderBoard = new Object();

///////////////////////////
// TEST SUITE FOR MOCHA
///////////////////////////

describe('testMain', function () {

  // MOCK SERVICE
  var mockServiceContributors = nock("https://api.github.com")
    .persist() // This will persist mock interception for lifetime of program.
    .get("/repos/testuser/Hello-World/contributors")
    .reply(200, JSON.stringify(data.contributorsList) );

  describe('#findTopContributor()', function () {
    // TEST CASE
   	it('should find top contributor', async function () {
      let top_contributor = await main.findTopContributor("testuser", "Hello-World");
      expect(top_contributor.userName).to.equal("octocat");
      expect(top_contributor.contributions).to.equal(32);
    });
  });

  describe('#checkForBadgeBugFixer()', function () {
    // TEST CASE
   	it('should identify whether new BugFixer Badge should be sent or not', async function () {
      //for loop simulates issue created in real time
      for(var dummyPayload of data2.list)
      {
        bugFixers[dummyPayload.sender.login] = await main.checkForBadgeBugFixer(dummyPayload);
      }
      expect(bugFixers["lalimasharda"]).to.equal(false);
      expect(bugFixers["amj23897"]).to.equal(true);
    });
  });
  
  describe('#createLeaderBoard()', function () {
    // TEST CASE
   	it('should create a leaderboard and identify users in top 2 positions', async function () {
      //for loop simulates issue created in real time
      for(var dummyPayload of data3.list)
      {
        leaderBoard[dummyPayload.pusher.name] = await main.createLeaderBoard(dummyPayload);
      }
      
      var usersSorted = await main.updatePositions(leaderBoard);
    
      expect(usersSorted[0]).to.equal("lalimasharda");
      expect(usersSorted[1]).to.equal("amj23897");
    });
  });
  
  describe('#checkJoinDateAnniversary()', function () {
    // TEST CASE
    it('should return true if today is user\'s joinDate Anniversary', async function () {
      let mockedUserTrue = ts_mockito.mock(User); //this user will have joindate set as today's date
      //function to remove time
      Date.prototype.withoutTime = function () {
        var d = new Date(this);
        d.setHours(0, 0, 0, 0);
        return d;
      }
      var date = new Date();  //todays date
      mockedUserTrue.joinDate = date.withoutTime();
      
      birthday_check_true = await main.checkJoinDateAnniversary(mockedUserTrue);
      
      expect(birthday_check_true).to.equal(true);
    });

    // TEST CASE
    it('should return false if today is not user\'s joinDate Anniversary', async function () {
      let mockedUserFalse = ts_mockito.mock(User); //this user will have joindate set as today's date-1 
      //function to remove time
      Date.prototype.withoutTime = function () {
        var d = new Date(this);
        d.setHours(0, 0, 0, 0);
        return d;
      }
      var date = new Date();  //todays date
      date.setDate(date.getDate()-1); //setting false user's joindate as today's date - 1
      mockedUserFalse.joinDate = date.withoutTime();

      birthday_check_false = await main.checkJoinDateAnniversary(mockedUserFalse);
      
      expect(birthday_check_false).to.equal(false);
    });
  });
});
