# Milestone: Bot

### Bot Implementation
The two main endpoints of our bot are GitHub and Slack. These applications interact with our bot via two separate apps - the GitHub App and the Slack App, and assist us in tracking and receiving GitHub payload and posting messages on Slack channels respectively. Through these apps, we are able to install webhooks on GitHub as well as Slack that allow us to listen to various events and get its data. 
 
* Synchronizing GitHub with GloryBot: 
	* We created a GitHub app (called 10Oct) that every organization has to install in all of their working repostiories. While doing so, the  app asks for certain read permissions, which when granted, allows us to track all the activities every user makes in those repositories.
	
	* The app does not interact with the user through this endpoint in any way. It just silently runs in the background and listens on the different events that are occuring in the repositories. 

* Synchronizing Slack with GloryBot:
	* Similar to the GitHub app, the Slack app (Called Reward Bot) makes it easier for our bot to interact with users on Slack. After an organization installs our GitHub app on GitHub, they are redirected to Slack, where they can install our Slack app.
	* Once the Slack app is also installed, Glorybot can freely post messages on achievements and rewards that each user has earned based on their  GitHub activities.
 

* Steps for Installation:
	1. Install the GitHub app on your chosen working repositories - [App Link].
 
	2. Once installed, the user is redirected to Slack to seek permission to access the Slack channels of that organization.

	3. Once the Slack app has been installed, the user gets a confirmation message congratulating them on the installation of our bot. At this point, all the dependencies have been installed and our bot is ready to work. 

* Our bot is currently hosted on a Glitch server, but we are planning to move it to a more stable environment, most likely, AWS.

* GitHub app:
![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/GitHubAppInstall.png)
* Slack app:
![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/SlackInstall.png)

### Use Case Refinement

~~~~
Use Case: Give recognition to the user via giving badges - **“Bug Fixer”**, **“Top Contributor”** and **"The Unstoppable"**
1 Preconditions  - Our user must have our GitHub and Slack apps installed
2 Main Flow - The app will have the permission to read all updates/changes/commits made by the user to compute what kind of badge to be awarded if any
3 Subflows - 
	[S1] Make sure that all necessary permissions are provided to the app
	[S2] The user will normally perform their tasks, while the app in the background will track all activities 
	[S3] All activities will be converted to points and checked if the user has achieved any milestone, earning them a new “Badge”.
	[S4] This badge will be announced on the company slack channel privately as well as publicly.
4 Alternative flows -
	[A1] The user performs some activities like commits, merges, pull requests etc but the total number of these individual activities does not cross the threshold, then no badge is awarded to them. 
~~~~
~~~~
Use Case: Maintaining the Leaderboard
1 Preconditions - Our user must have our GitHub and Slack apps installed
2 Main Flow - The app will track all user actions to award "points" for each activity and computing a leaderboard
3 Subflows - 
	[S1] Make sure that all necessary permissions are provided to the apps.
	[S2] The employees must perform some activities on GitHub which will earn them points.
	[S2] The total points earned by each employee will be compared with his/her colleagues.
	[S3] Upon comparison, leaderboards will be created periodically (for e.g., once every month) and announced on Slack.
	[S4] The top 3 hard-working employees will be appreciated and they will be publicly recognized on every Slack channel of their company.
4 Alternative flows -
	[A1] The user is awarded points and accordingly moves up or down the leaderboard but, they don’t make it to the top 3 hard-working employees. 

~~~~
~~~~
Use Case: Celebrating employee’s anniversary at the company
1 Precons - Our user must have our GitHub and Slack apps installed
2 Main Flow - Announce message on Slack channel to celebrate employee's anniversaries in project
3 Subflows -  
	[S1] At every 1st, 6th and 12th month completed by an employee after the bot was installed and every year after that, the bot will send out a congratulatory message. 
4 Alternative flow - 
	[A1] Employee hasn’t completed any of the above specified anniversary points since the bot was installed and no message is posted for them.
~~~~

### Mocking Infrastructure

##### Technologies used
* Mocking and testing was performed in Node.js using libraries such Nock, Mocha, Chai and ts-mockito.
* The data was sampled for each use-case in JSON format.

##### Mocking Process
* The data for mocking was collected by performing dummy actions on a shared repository where the GitHub app was installed.
* The payload of all our actions was captured by the app and sent to our bot server where we stored it in JSON format. 
* We then tested the individual functions that  should be performed on this payload and would compute and update each employee's rewards and progress.
* The code for the whole mocking and testing are written in: main.js, github.js and testMain.js
* All the mock data is stored in: mock.json, bugFixerTrigger.json, leaderBoardData.json
* The testing results can be seen as follows:

![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/mocking_screenshot.png)

##### Mocking code flow
* Test 1: Find Top Contributor of a repository
	* We used Nock to mock the data in this case. 
	* Top Contributor is one of the badges that we would be awarding to employees who has the highest number of contributions in a repository.
	* The findTopContributor() function in main.js computes the user who made the maximum contribution and passes the result to testMain.js for testing.

* Test 2: Check for user to award Bug Fixer Badge
	* In this case, we are rerceiving data for every single issue closed, with issues having different kinds of labels. The Bug Fixer badge is only awarded to those who have closed 3 or more than 3 issues labeled as "bug". 
	* The checkForBadgeBugFixer() function in main.js accepts the payload of individual employees and computes whether a user should be awarded this badge or not based onn the above condition. It returns a true or false back to testMain.js where the result is tested.
	* We have checked for both kinds of users - one that has closed less than 3 bug issues and one that has closed more than 3.

* Test 3: Creating and updating a Leader Board
	* In this case we are computing total points earned by each employee based on all their actions from the payload. A JavaScript object is created where the data is stored in a "user":"points" format. Then we sort this object and assign positions on the leaderboard. 
	* This logic is implemented in createLeaderBoard() and updatePositions() functions in main.js and the top 2 employee names are tested for in testMain.js.

* Test 4: Check anniversary of an employee
	* In this case, we have used Mockito and mocked the User data model from "/RewardBot/User.js". 
	* For testing purposes, we have only considered yearly anniversaries and we have assumed that this function executes every day for all users.
	* The logic behind checking for an employee's anniversary is comparing the month and day for each employee while the year component is incremented by 1.
	* We have tested for a user who will be completing a year as well as a user who will not be completing a year. The function checkJoinDateAnniversary() implements this functionality and it is tested in testMain.js.  

### Selenium Testing

This selenium test uses chromedriver to implement test cases. To run this testing script, appropiate python environment is needed.

Before running the script:
1. Place chromedrive.exe in to same repository and set the environment variable PATH = `path of chromedriver.exe`
2. Set the environment variables, SLACKUSER = `email id of selenium slack user`, SLACKPASS = `password of the selenium slack user`, SLACKWORKSPACE = `workspace url of slack`

##### Test cases:
Test Case 1: To check if the bot is present in the slack channel or not

Test Case 2: To check if the bot is currently active or not

Test Case 3: To check that the messages sent by bot are not null messages

Test Case 4: To check that the bot is sending appropriate messages related to use case 1

Test Case 5: To check that the bot is sending appropriate messages related to use case 2

Test Case 6: To check that the bot is sending appropriate messages related to use case 3



### Screen Cast

##### Bot Implementation
https://drive.google.com/file/d/1dS_TYCqdrElz-F2zkG5sF5-BabZksz6W/view?usp=sharing

##### Selenium Testing
https://drive.google.com/open?id=1g96M9AdbgNt8mnPcff9GlANpxaGLc09n



[App Link]: https://github.com/apps/10Oct
