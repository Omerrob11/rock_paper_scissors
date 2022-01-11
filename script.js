let totalRounds = 5;
let currentRound = 0;

let computerPoints = 0;
let playerPoints = 0;

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

  console.log(playersPicksMessage);
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

// When changing dom, all console.log() messages will direct a specifeid div to change
function printRoundWinner(winner) {
  let roundWinnerMessage = `And the winner of this round is ${winner}`;
  console.log(roundWinnerMessage);
}

function addScore(winner) {
  if (winner === "computer") {
    computerPoints += 1;
  } else if (winner === "player") {
    playerPoints += 1;
  } else {
    computerPoints += 1;
    playerPoints += 1;
  }
}

function getGameWinner() {
  if (computerPoints > playerPoints) {
    return "computer";
  } else if (computerPoints === playerPoints) {
    return "tie";
  } else {
    return "player";
  }
}

function printWinner(winner) {
  console.log(`and the winner of this game is.... ${winner}`);
}
