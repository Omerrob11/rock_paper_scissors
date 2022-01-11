let totalRounds = 5;
let currentRound = 0;

let computerPoints = 0;
let userPoints = 5;

function getPlayerSelection() {
  let playerChoice = prompt("Please choose between Rock, Paper, Scissors");

  playerChoice = playerChoice === null ? null : playerChoice.toLowerCase();
  if (
    playerChoice !== "paper" &&
    playerChoice !== "rock" &&
    playerChoice !== "scissors"
  ) {
    // Here, prompt call the function that call it again

    console.log(
      "Error, please check a value that is one of the possible 3 choices"
    );
    // You change dive here or call function to change div here
    return "error";
  } else {
    return playerChoice;
  }
}
