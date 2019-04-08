export function isVoted(authedUser, question) {
  const votes = [...question.optionOne.votes, ...question.optionTwo.votes];

  return votes.includes(authedUser);
}
