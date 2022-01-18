let totalRounds = 5;
let currentRound = 0;

let computerPoints = 0;
let playerPoints = 0;

function game(e) {
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
  printScore();

  // console.log(roundWinner);

  for (let i = 0; i < totalRounds; i++) {
    // currentRound += 1;
    // let playerSelection = getPlayerSelection();
    // let computerSelection = getComputerChoice();
    // printPlayersPicks(playerSelection, computerSelection);
    // let roundWinner = playRound(playerSelection, computerSelection);
    // printRoundWinner(roundWinner);
    // addScore(roundWinner);
    // printScore();
    // if (computerPoints === 3) {
    //   let winner = calcGameWinner();
    //   printScore();
    //   printWinner(winner);
    //   break;
    // } else if (playerPoints === 3) {
    //   let winner = calcGameWinner();
    //   printScore();
    //   printWinner(winner);
    //   break;
    // }
    // if (currentRound === 5) {
    //   let winner = calcGameWinner();
    //   printScore();
    //   printWinner(winner);
    // }
  }
}

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
  let playerPickPara = document.querySelector(".picks__player");
  let computerPickPara = document.querySelector(".picks__computer");

  playerPickPara.textContent = `Player Select ${playerSelection}`;
  computerPickPara.textContent = `Computer Select ${computerSelection}`;
  // let playersPicksMessage = `Player Select ${playerSelection}, Computer Select ${computerSelection}`;

  // console.log(playersPicksMessage);
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

// When changing dom, all console.log() messages will direct a specifeid div to change
function printRoundWinner(winner) {
  let roundWinnerMessage = `And the winner of this round is ${winner}`;
  console.log(roundWinnerMessage);
}

function addScore(winner) {
  let playerScorePara = document.querySelector("#score__player");
  let computerScorePara = document.querySelector("#score__computer");

  if (winner === "computer") {
    computerPoints += 1;
    computerScorePara.textContent = `Computer Points:${computerPoints}`;
  } else if (winner === "player") {
    playerPoints += 1;
    playerScorePara.textContent = `Player Points: ${playerPoints}`;
  }
  //     else {
  //     computerPoints += 1;
  //     playerPoints += 1;
  //   }
}

function printScore() {
  console.log(`Computer has ${computerPoints}, player has ${playerPoints}`);
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
  console.log(`and the winner of this game is.... ${winner}`);
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
