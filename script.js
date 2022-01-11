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
  } while (
    playerChoice !== "paper" &&
    playerChoice !== "rock" &&
    playerChoice !== "scissors"
  );
  return playerChoice;
}

function getComputerChoice() {
  let min = 1;
  let max = 3;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomNumber === 1) {
    return "paper";
  } else if (randomNumber === 2) {
    return "rock";
  } else {
    return "scissors";
  }
}

function printPlayersPicks(playerSelection, computerSelection) {
  let playersPicksMessage = `Player Select ${playerSelection}, Computer Select ${computerSelection}`;

  return playersPicksMessage;
}

function playRound(playerChoice, computerChoice) {
  if (
    (computerChoice === "rock" && playerChoice === "paper") ||
    (computerChoice === "scissors" && playerChoice === "rock") ||
    (computerChoice === "paper" && playerChoice === "scissors")
  ) {
    return "player";
  } else if (playerChoice === computerChoice) {
    return "tie";
  } else {
    return "computer";
  }
}

function printRoundWinner(winner) {
  let roundWinnerMessage = `And the winner of this round is ${winner}`;
  return roundWinnerMessage;
}
