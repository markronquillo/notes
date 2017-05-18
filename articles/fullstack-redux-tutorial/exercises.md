1. The Invalid Vote Prevention

The server should not allow entries to be voted if they are not included in the current pair. Add a failing unit test to illustrate the problem and then fix the logic.

2. Improved Vote State Reset

The client currently reset the hasVoted state when the new voted pair does not inlcude the entry that was voted. This has one major problem: If two consecutive pairs include the same entry, which will always happen during the last rounds of the vote, the state is not reset. The user cna't vote on the last round because their buttons are disabled!.

Modify the system so that it creates a unique identifier for each round of votes instead and the voted state is tracked based on this round id.

Hint: Track a running counter of rounds on the server. When a user votes, save the current round number in the client state. When the state updates, reset the voted state if the round number has changed.

3. Duplicate Vote Prevention

A user can still vote serveral times during the same round, if they just refresh the page. because their voted state is lost. Fix this.

Hint: Generate unique identifiers for each user and keep track of who has voted what on the server, so that if a user votes again, their previous vote for the round is nullified. If you do this, you can also skip the disabling of the voting buttons, since it is possible for the user to change their mind during the round.

