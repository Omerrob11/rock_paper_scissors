let totalRounds = 5;
let currentRound = 0;

let computerPoints = 0;
let playerPoints = 0;

function game(e) {
  currentRound++;
  printCurrentRound(currentRound);

  let playerSelection = getPlayerChoice(e);
  let computerSelection = getComputerChoice();
  console.log(
    `player choice:${playerSelection}, computer choice: ${computerSelection}`
  );
  // Printing picks to screen
  printPlayersPicks(playerSelection, computerSelection);

  // Determine round winner
  let roundWinner = playRound(playerSelection, computerSelection);

  // Printing round winner to screen
  printRoundWinner(roundWinner);

  // Determine current score
  addScore(roundWinner);

  // Printing current score
  printScore(playerPoints, computerPoints);

  if (currentRound === 5 || computerPoints === 3 || playerPoints === 3) {
    let winner = calcGameWinner();
    printWinner(winner);
  }
}

function printCurrentRound(currentRound) {
  let currentRoundPara = document.querySelector(".round-number__current");
  currentRoundPara.textContent = `Current Round Is : ${currentRound}`;
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
  let playerPickPara = document.querySelector(".picks__player");
  let computerPickPara = document.querySelector(".picks__computer");

  playerPickPara.textContent = `Player Select ${playerSelection}`;
  computerPickPara.textContent = `Computer Select ${computerSelection}`;
}

function playRound(playerSelection, computerSelection) {
  if (
    (computerSelection === "rock" && playerSelection === "paper") ||
    (computerSelection === "scissors" && playerSelection === "rock") ||
    (computerSelection === "paper" && playerSelection === "scissors")
  ) {
    return "player";
  } else if (playerSelection === computerSelection) {
    return "tie";
  } else {
    return "computer";
  }
}

function printRoundWinner(winner) {
  let printRoundMessage = document.querySelector("#round-winner__message");
  winner === "tie"
    ? (printRoundMessage.textContent = "it's a tie!")
    : (printRoundMessage.textContent = `And the winner of this round is ${winner}`);
}

function addScore(winner) {
  if (winner === "computer") {
    computerPoints += 1;
  } else if (winner === "player") {
    playerPoints += 1;
  }
}

function printScore(playerPoints, computerPoints) {
  let playerScorePara = document.querySelector("#score__player");
  let computerScorePara = document.querySelector("#score__computer");

  playerScorePara.textContent = `Player Points: ${playerPoints}`;
  computerScorePara.textContent = `Computer Points:${computerPoints}`;
}

function calcGameWinner() {
  if (computerPoints > playerPoints) {
    return "computer";
  } else if (computerPoints === playerPoints) {
    return "tie";
  } else {
    return "player";
  }
}

function printWinner(winner) {
  let winnerMessage = document.querySelector("#game-winner__message");
  winner === "tie"
    ? (winnerMessage.textContent = "I'ts a tie game !")
    : (winnerMessage.textContent = `and the winner of the game is ${winner}`);
}

// Listening for player selection

let buttons = document.querySelectorAll(".player-selection__btn");
console.log(buttons);

buttons.forEach((btn) => {
  btn.addEventListener("click", game);
  console.log(btn);
});

function getPlayerChoice(e) {
  return e.target.textContent.trim().toLowerCase();
}
