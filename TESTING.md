Component Testing
We faced a lot of limitations due to enzyme being incompatible with a lot of the frameworks/packages we were working with (couldn't use enzyme with useparams(), which knocked out a lot of our components such as joingame and addquestion. Also couldn't pass props/jest functions into material UI buttons). This greatly limited the scope of our testing. 
We also didn't have a lot of components to test since many of our features were nested together in pages and couldn't be separated, or were very similar (e.g. questiontile and gametile)
Pls be gentle :(

Header.test
- only text/link tests to ensure that the header produced the correct links (links that were correctly labelled)
- couldn't test that they were redirecting correctly because the redirect was done through the router, we were told by a tutor in a help session that enzyme doesnt allow for that kind of testing

GameTile.test
- tested to ensure that the GameTile displayed the correct game name and game owner as passed in through its props.
- tested to ensure that the edit and delete buttons were there
- tested to ensure that clicking on the start button would bring up the game started modal
- couldn't test that the edit/delete buttons were clickable using jest.fn() because materialUI buttons dont allow for it (as advised by a tutor in a help session)

Register.test
- tested that it had all the correctly labelled input fields for registering new users
- couldnt test clicking button called specific functions/reroute for same reasons as above (register button is a redirect)
- tested to ensure validation checks (invalid email, mismatching passwords) were working

Dashboard.test
- Not a whole lot to test, since the dashboard is essentially just a container for the gametiles
- Just ensured that the add new game button existed and was clickable
- couldn't check that clicking on add new game called the appropriate handler which redirected to add new game page for reasons mentioned above



Integration Test - addQuestion.js (the one that's not the happy path)

Rationale:
Adding questions to a created quiz is a fundamental feature to this application. Without the ability to add questions, most of the other functionality for the application will be inaccessible. For example, without the ability to add questions, players can't play an actual game, admins cant get meaninful results, and the whole application basically becomes pointless. We chose this feature over editing or deleting questions because they all stem from adding questions.
As such, we believe adding questions is a core feature of the application which is why we chose to test it.
steps:

create acount
create new game
edit newly created game
click add new question
fill in details for new question
submit new question
navigate back to dashboard
navigate back to created game
verify that the question has been added and is visible in the form of a questionTile
logout and log back in

We chose to keep testing some basic user functionality in this test (creating acc, logging out and in again) just to ensure that these features aren't affected by question adding. It also makes it easier to run this test in isolation (creating account here instead of having to keep a test one ready in the db to login with).