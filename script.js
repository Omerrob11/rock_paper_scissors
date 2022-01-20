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

  if (computerPoints === 5 || playerPoints === 5) {
    let winner = calcGameWinner();
    printWinner(winner);
    printPlayAgainBtn();
    removeListeners();
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

  let convertPlayerToEmoji = null;

  switch (playerSelection) {
    case "rock":
      convertPlayerToEmoji = "&#x270A";
      break;
    case "paper":
      convertPlayerToEmoji = "&#x270B";
      break;
    case "scissors":
      convertPlayerToEmoji = "&#x1F918";
  }

  let convertComputerToEmoji = null;
  if (computerSelection === "rock") {
    convertComputerToEmoji = "&#x270A";
  } else if (computerSelection === "paper") {
    convertComputerToEmoji = "&#x270B";
  } else {
    convertComputerToEmoji = "&#x1F918";
  }

  playerPickPara.innerHTML = `Player Selected ${convertPlayerToEmoji}`;
  computerPickPara.innerHTML = `Computer Selected ${convertComputerToEmoji}`;
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
  let printRoundMessage = document.querySelector(".round-winner__message");
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
  let playerScorePara = document.querySelector(".score__player");
  let computerScorePara = document.querySelector(".score__computer");

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
  let winnerMessage = document.querySelector(".game-winner__message");
  winner === "tie"
    ? (winnerMessage.textContent = "I'ts a tie game !")
    : (winnerMessage.textContent = `and the winner of the game is ${winner}`);
}

function printPlayAgainBtn() {
  let gameWinnerDiv = document.querySelector("#game-winner");
  debugger;
  let playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.classList.add("play-again-btn");
  playAgainBtn.addEventListener("click", resetGameScore);
  gameWinnerDiv.appendChild(playAgainBtn);
}

// Listening for player selection

let buttons = document.querySelectorAll(".player-selection__btn");
console.log(buttons);

buttons.forEach((btn) => {
  btn.addEventListener("click", game);
  // console.log(btn);
});

function getPlayerChoice(e) {
  let converEmojiToString = e.target.textContent
    .trim()
    .codePointAt(0)
    .toString(16);

  let convertToGameOption = null;

  let emo = String.fromCodePoint("0x" + converEmojiToString);

  converEmojiToString === "270a"
    ? (convertToGameOption = "rock")
    : converEmojiToString === "270b"
    ? (convertToGameOption = "paper")
    : converEmojiToString === "1f918"
    ? (convertToGameOption = "scissors")
    : null;

  return convertToGameOption;
}

function removeListeners() {
  let allPlayerSelectionBtn = document.querySelectorAll(
    ".player-selection__btn"
  );
  console.log(allPlayerSelectionBtn);
  allPlayerSelectionBtn.forEach((btn) => {
    btn.removeEventListener("click", game);
  });
}

function resetGameScore() {
  let currentRoundReset = document.querySelector(".round-number__current");
  currentRoundReset.textContent = "Current Round Is : 0";

  let computerScoreReset = document.querySelector(".score__computer");
  computerScoreReset.textContent = "Computer Points: 0";

  let playerPointsReset = document.querySelector(".score__player");
  playerPointsReset.textContent = "Player Points: 0";

  let picksComputerReset = document.querySelector(".picks__computer");
  picksComputerReset.textContent = "Computer Selected: ?";

  let picksPlayerReset = document.querySelector(".picks__player");
  picksPlayerReset.textContent = "Player Selected: ?";

  let roundWinnerMessageReset = document.querySelector(
    ".round-winner__message"
  );
  roundWinnerMessageReset.textContent = "";

  let gameWinnerMessageReset = document.querySelector(".game-winner__message");
  gameWinnerMessageReset.textContent = "";

  let playAgainBtn = document.querySelector(".play-again-btn");
  let gameWinnerDiv = document.querySelector("#game-winner");
  gameWinnerDiv.removeChild(playAgainBtn);

  currentRound = 0;

  computerPoints = 0;
  playerPoints = 0;

  let buttons = document.querySelectorAll(".player-selection__btn");
  console.log(buttons);

  buttons.forEach((btn) => {
    btn.addEventListener("click", game);
    // console.log(btn);
  });
}
