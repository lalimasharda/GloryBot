# Final Report on GloryBot

### Final Demo of GloryBot 
[Demo Link](https://www.youtube.com/watch?v=Fr39cowgUtU&feature=youtu.be)

### Problem Statement
In this project, we are addressing the issue of acknowledging an employee's core competencies and rewarding them based on their contribution towards all the projects currently active in their organization. Our primary assumptions are that the organization uses GitHub to keep track of all the on-going projects and they use Slack for communication. Through GloryBot, we wish to provide a way in which managers and higher authorities can keep a track of their employee's and team's progress, see who is most actively participating in each project, whose work is the most productive and also see how they are helpful and resourceful to the organization. We make sure that every hard working employee is recognized for their work and their milestones are celebrated with everyone in the team and organization. Our primary goal is to build a peer-to-peer recognition platform, where the reward would be in the form of points and badges (aka titles) and also notifying peers of the employee achievements in the form of an up-to-date summary. Our reward bot will also ensure that the rewards are instantly awarded and cut down on a lot of manual work of screening each employee’s contributions. At the end of the day, a healthy competition in the office environment is a win-win situation for the employees and the company.

### Primary Features
Our bot requires access to the GitHub and Slack accounts of the organization to function fully. Our primary features are awarding different types of badges, maintaining a leaderboard for all the team members and celebrating employee milestones. The features are discussed in detail below:

1. The Badges: Our bot assigns badges like “Bug Fixer”,“Top Contributor”, "The Committer" and "The Unstoppable" to employees of the team based on the actions they have performed on GitHub. Users can also unlock higher levels of each badge as and when they cross each milestone/threshold.

    - The Bug Fixer badge: This badge is dedicated to users that help solve ‘issues’ that are tagged as a ‘Bug’.
    ![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/BugFixer.png) 
    
    - Top Contributor - This badge is given to the star performers of the repository and it is calculated by the number of activities done in the repository.
    ![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/TopContributor.png)
    
    - The Unstoppable - This badge is inspired by the Snapchat streak feature and is given to a user who performs an activity everyday(not including weekends) for 100 days straight.
    
    - The Commiter - This badge is awarded to users who have performed commit points greater than or equal to 10 and they can level up for every 10 points they achieve.
    ![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/Committer.png)
    

2. The Leaderboard: GloryBot also maintains a leaderboard by awarding a certain number of points to each employee based on their actions. The weightage of points depends on the action performed (see [Activity-Points table](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Design.md#activity---points-table)) and at the end of every week, month and year, it announces the top 3 employees on Slack channels.

![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/Leaderboard_slack.png)

3. Celebrating anniversaries: We also celebrate the bot's anniversary with the user reminding them of how long GloryBot has been recognizing their work and efforts.

![](https://github.ncsu.edu/csc510-fall2019/CSC510-6/blob/master/Diagrams/Anniversary%20screencapture.PNG)

### Project Reflection
On the overall, having different dedicated phases to develop software such as the Design, Testing and Process phases, has been instrumental in what we have achieved with the implementation of our bot. Without these phases, we would have ended up being very unstructured and haphazard in our development process and our product would have had so many loop holes that might not have been able to detect or overcome. Following the proper guidelines defined within each of these phases helped us create a more wholesome product which can be further improved and extended by adding new functionalities with great ease.

Through the design phase, we were able to determine our software requirements, feasibility issues, what features to add in our bot and plan ahead on how we would tackle each problem and complete the implementation phase as efficiently as possible. The design phase definitely helped us ease our transition into the oncoming phases.

In the testing phase, we got a glimpse into what our product would actually turn out to be and what the users can expect from our bot. Selenium testing and Mocking played an important role in this as we had to fabricate our functionalities in such a way as though they were a part of our actual bot and verify if the results were what we expected. This also helped us write good modularised code that covered all the basic test cases that we could think of as a good start for our bot.

The process phase was all about the actual implementation - connecting all endpoints and components of our bot, writing the real logic, creating and managing a database etc and then making the bot work. We had to work on getting permissions for accessing data from GitHub and posting messages and rewards on Slack. We developed skills in JavaScript, Git and version control and also learnt new software engineering practices such as scrum-ban, pair programming etc. We also got an opportunity to develop our soft skills in team building, team collaboration, documentation, commmunication etc.

We believe that each phase in Software Engineering is an important part of developing a software and very much needed in order to ensure that our end product turns out well and according to the users expectations. It allows us to take a systematic, disciplined and a quantifiable approach towards building software and adhering to good software engineering principles helps us build a reliable and safe product for our customers.

### Limitations

1. The bot is limited to function on a single repository at a time. If a member is working on multiple repositories, he/she is considered a separate individual for that repository rather than combining points from actions on both the repositories.

2. Currently, as the slack bot is not made public, it only works with the workspace in which the bot was created.

3. The bot only considers the number of actions to maintain the scoreboard rather than determining the scale and significance of each action and then adding points to the leaderboard accordingly. For instance, the member would get 3 points for every commit, no matter how small or how big is the committed change.

4. Leaderboard only displays the total points earned by individual and there is no information regarding the badges of an individual is shown.

5. The badges get displayed only when the user passes the level threshold for the badges, there is no way to retrieve badges from user command.


### Future Work

1. Determine the significance and importance of each action and reward points to a member accordingly.

2. Increase the palate of the actions by which the points can be awarded. For instance, leaderboard currently is limited to actions like merge, commit, pull and issues. We could include deployments, different branch activities, etc.

3. Make the bot work on the workspace level to maintain common leaderboard across all the repositories, rather than maintaining records on only one repository at a time.

4. Submit the bot to slack and make it public.

5. Add more badges like the enhancer, multi-tasker, etc.

6. Develope leaderboard to include more information like badges earned by each individual and level of badges assigned to each individual.

7. Retrieve badge information using user input just like leaderboard.
