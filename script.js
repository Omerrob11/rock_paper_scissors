let totalRounds = 5;
let currentRound = 0;

let computerPoints = 0;
let userPoints = 5;

function getPlayerSelection() {
  let playerChoice = null;
  do {
    playerChoice = prompt("Please choose between Rock, Paper, Scissors");
    playerChoice = playerChoice === null ? null : playerChoice.toLowerCase();

    if (
      playerChoice !== "paper" &&
      playerChoice !== "rock" &&
      playerChoice !== "scissors"
    ) {
      console.log(
        "Error, please check a value that is one of the possible 3 choices"
      );
    }
    debugger;
  } while (
    playerChoice !== "paper" &&
    playerChoice !== "rock" &&
    playerChoice !== "scissors"
  );
  return playerChoice;
}
