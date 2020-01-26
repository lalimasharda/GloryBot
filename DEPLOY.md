# Milestone: DEPLOYMENT

In this milestone, we have achieved a fully working and deployed version of GloryBot - A Reward Bot that will be used in Github and Slack..

### Deployment
We have utilised Ansible as our configuration management tool to automate the entire deployment process of our bot. Our bot will be hosted on an AWS-EC2 instance. The ansible playbooks will setup the environment for our bot, deploy it on the AWS instance and start the bot server.
The playbook to perform the above setup is written in script.yml.

#### Instructions to run the Ansible Script:
1. Clone our repository locally and navigate to the Deployment Script folder. 
2. We have emailed you the pem file which is required for connection to our AWS EC-2 instance.  
3. Change the ansible_ssh_private_key_file variable in the inventory file to point at the pem file in your system.  
4. Run the following command: ansible-playbook script.yml -i inventory.

### Acceptance Testing
Please make sure that all the following account set ups and app installations are being done in a new incognito session in your browser. The login credentials for test GitHub and Slack accounts have been emailed to the TAs. 
(Subject: "CSC510 - Team 6: GloryBot Login credentials for TAs", Dated: Dec 1, 2019, 5:10 PM).

#### Bot Installation steps:

1. Once the user has all the above accounts set up, they can naviagte to our GitHub app installation [page].
2. They have to then install the app and choose the repository that is to be monitored by GloryBot. We have already created a repository named GloryBotTest which the TAs can choose to test.
3. Once the app gets installed on GitHub, the user is redirected to Slack to give the bot access to their Slack channel where all the messages will be posted.
4. The user can choose the workspace on top-right corner of Slack website and then choose the Slack channel in it.
5. Once our Slack app is also installed, the user should be redirected to a simple web page to ensure that the bot is now successfully running.

Confirmation Page: 

![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/dev/Diagrams/Installation%20Confirmation%20Page.png)


Slack Confirmation:

![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/dev/Diagrams/SlackInstall.png)


#### Bot Uninstallation steps:
Incase the TAs want to test the bot multiple times, they can choose to uninstall and reinstall our apps as follows:
1. Naviagte to our GitHub app [page].
2. Click on Configuration.
3. Scroll to the bottom of the page and press Uninstall (you can choose to uninstall only from a certain repos here).
4. They can then follow the bot installation steps above if they want to reinstall the bot.


**Test Instructions** for TAs:

Our three use cases can be found [here]. Following are the steps to perform to check each use case:

* To check for the Bug Fixer badge:
    * The user needs to close 3 issues that have been labeled as a "bug". This will reward them with a Level 1 Bug Fixer badge.
    * If the user continues fixing buggy issues, they can unlock higher levels of the Bug Fixer badge.

* To check for the Top Contributor badge:
    * The user needs to perform any 4 GitHub activites (Fixing issues, commiting, pull requests or successful merges). This will reward them with a Level 1 Top Contributor badge.
    * If the user continues performing activities and working hard on their projetcs, they can unlock higher levels of the Top Contributor badge.

* To check for the Commiter badge:
    * The user needs to commit 3 times at least. This will reward them with a Level 1 Commiter badge.
    * If the user continues commiting and contributing code to the project, they can unlock higher levels of the Commiter badge.

* Leaderboard:
    * Every activity the user performs will be converted to points and their total scores are updated continuously.
    * The points are awarded according to [Activity Points table].
    * The user should be able to view the leaderboard by mentioning the bot alongwith the word leaderboard, i.e, type "@GloryBot leaderboard" on the Slack channel.

* Celebrating app’s anniversary at the company
    * This use case tracks the anniversary of our bot every 1st, 6th and 12th month completed at the company and every year after that. The messages get displayed automatically via a cron process.  


### Screencasts

**Continuous Integration (CI) Server**

[Link to the CI screencast](https://drive.google.com/file/d/1YeV-JcHLUlF-FN66yzUNxUIPNpQlekRd/view?usp=sharing)


**Setup and Deployment using Ansible**

[Link to the Ansible screencast](https://drive.google.com/file/d/11FxljD8ad7jZFyWevp08dLSQluxHOmzM/view?usp=sharing)


[page]: https://github.com/apps/10Oct
[here]: https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Design.md
[Activity Points table]: https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Design.md#activity---points-table

<!-- **Login credentials** for TA:  
**Github Account**:  
username: csc510tas  
password: CSC510#TAs

**Google Account associated**:  
email - id: csc510tas@gmail.com  
password: CSC510#TAs

** Slack Account **
Workspace: csc510team6
email - id: csc510tas@gmail.com  
password: CSC510#TAs -->
