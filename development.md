# Developer Setup #

These are some ideas to help you get started contributing to Fused Holiday. By no means am I trying to tell you how to do what it is you do best! That said, if you think these suggestions are not based in reality, please edit, commit, push, and send a pull request.

I recommend you add GitHub for Windows if you are a first time git user, or not familiar with command line interfaces. GitHub for windows provides a visual user interface for basic git commands. [http://windows.github.com/](http://windows.github.com/ "http://windows.github.com/")

**Prerequisites for everyone**

* [GitHub for windows](http://windows.github.com)
* [Chrome Stable](https://www.google.com/intl/en/chrome/browser/)

**Prerequisites for developers**

* [Chrome Canary](https://tools.google.com/dlpage/chromesxs)
* [Newest FireFox](http://www.mozilla.org/en-US/firefox/new/)
* [Sublime Text 2](http://www.sublimetext.com/2)

**Prerequisites for testers (and editors?)**

* [Chrome Canary](https://tools.google.com/dlpage/chromesxs)
* [Newest FireFox](http://www.mozilla.org/en-US/firefox/new/)

**Working on the project**

1. Once you feel you have a basic grasp over git and github, please go to the [Fused Holiday repo](https://github.com/lazor-base/fused-holiday "Fused Holiday Repo") and fork the repository.
2. In GitHub for windows, if you refresh the main page, below the github header on the left you should see lazor-base.
	1. If not, try signing out and signing in again. (likewise if you have issues cloning the repository, signing out and signing in will fix that.)
3. Click your username under the github header, and clone the lazor-base/fused-holiday repository that you forked earlier.
4. Work!

**Submitting your work**

1. Make sure everything you've worked on is comitted.
2. Create a pull request on the [Fused Holiday repo](https://github.com/lazor-base/fused-holiday "Fused Holiday Repo").
3. To avoid having to merge code, you should take a break until your pull request is accepted and merged into the team repo.
4. When your pull request is accepted, open up a shell in your local repo via the following:
	1. Open your **local** repository in github for windows.
	2. Select tools->Open a shell here
5. Type in the shell window (without the quotes, and copy-pasting doesn't work) "git fetch git@github.com:lazor-base/fused-holiday.git"
6. If it doesn't say something along the lines of "the code was merged successfully, immidiately let [me](https://github.com/ArkahnX "me") know, and I will walk you through it.


## Help with git and GitHub ##

I recommend you read through and try the four topics at the top of the [GitHub help page](https://help.github.com/ "GitHub help page"). From GitHub:

**Comments / Questions / Help**

* New to Git, GitHub, and/or version control? Check out our [help documentation](https://help.github.com/) to get started!
* Questions about Git/GitHub? Please email support@github.com and be sure to include 'GitHub Game Off' in the subject.
* Questions specific to the GitHub Game Off? Please [create an issue](https://github.com/github/game-off-2012/issues/new). That will be the offical FAQ.
* The official Twitter hashtag is [#ggo12](https://twitter.com/search/realtime?q=%23ggo12).

## Artists/Creative design ##

Please keep your assets in relevant folders and commit often!
When an art piece is ready for production, push it to the master branch.

## Programmers ##

* Add features
* Fix issues
* Commits should explain code changes to other developers, and functionality changes to testers/editors. Separate the two with <br>`----------`<br> which creates a horizontal line. (refer to [markdown's guide](http://daringfireball.net/projects/markdown/syntax#hr))
	* Commits to development should explain exactly what was changed in code, and functionality, so editors and testers can confirm.
	* Commits to Master should summarize all of your commits made after your previous commit to master.

## Testers ##

Should be able to follow the guidelines on README.md and be able to clone the game and play it. If this fails, you must submit an issue, stating what you did, what happened, and all other necessary details.

If you can't duplicate functionality outlined in a commit message, log an issue.

If something doesn't feel right, log an issue.

## Editors ##

* Read the commit data to master (or development, depending on what needs to be tested)
* Confirm that the program does what the commit says it should, or file an issue.
	* Unnecessary issues are easy to solve, so **anything** you think is off, make an issue.
* Make note of all necessary details, such as commit ids, error messages in console, etc.