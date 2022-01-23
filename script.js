// Global Variables
let currentRound = 0;
let computerPoints = 0;
let playerPoints = 0;

//////// UI elements Reference ////////

// Background Overlay
let activeBackgroundOverlay = document.querySelector(".background-overlay");

// Modal
let modal = document.querySelector(".modal");
let winnerMessage = document.querySelector(".winner-display__message");
let playAgainBtn = document.querySelector(".play-again-button");

// Wrapper
let wrapper = document.querySelector(".wrapper");

// Score
let playerScorePara = document.querySelector(".score__player");
let computerScorePara = document.querySelector(".score__computer");

// Round Winner
let printRoundMessage = document.querySelector(".round-winner__message");

let roundWinnerInsturctions = document.querySelector(
  ".round-winner__instructions"
);

// Picks
let playerPickPara = document.querySelector(".picks_player__emoji");
let computerPickPara = document.querySelector(".picks__computer__emoji");

// Round Number [v]
let currentRoundPara = document.querySelector(".round-number__current");

// Player selection
let playerSelectionBtns = document.querySelectorAll(".player-selection__btn");

function game(e) {
  currentRound++;
  printCurrentRound(currentRound);

  let playerSelection = getPlayerChoice(e);
  let computerSelection = getComputerChoice();

  // Printing picks to screen
  printPlayersPicks(playerSelection, computerSelection);

  // Determine round winner
  let roundWinner = playRound(playerSelection, computerSelection);

  // Printing round winner to screen
  printRoundWinner(roundWinner, playerSelection, computerSelection);

  // Determine current score
  addScore(roundWinner);

  // Printing current score
  printScore(playerPoints, computerPoints);

  if (computerPoints === 5 || playerPoints === 5) {
    let winner = calcGameWinner();
    printWinner(winner);
    removeListeners();
  }
}

// Listening for player selection //
playerSelectionBtns.forEach((btn) => {
  btn.addEventListener("click", game);
});

// Getting player choice in terms of game option //
function getPlayerChoice(e) {
  let converEmojiToString = e.target.textContent
    .trim()
    .codePointAt(0)
    .toString(16);

  let convertToGameOption = null;

  converEmojiToString === "270a"
    ? (convertToGameOption = "rock")
    : converEmojiToString === "270b"
    ? (convertToGameOption = "paper")
    : converEmojiToString === "1f918"
    ? (convertToGameOption = "scissors")
    : null;

  return convertToGameOption;
}

// Getting random computer choice //
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

// Play the round //
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

// Add score //

function addScore(winner) {
  if (winner === "computer") {
    computerPoints += 1;
  } else if (winner === "player") {
    playerPoints += 1;
  }
}

// Printing current round //
function printCurrentRound(currentRound) {
  currentRoundPara.textContent = `Current Round Is : ${currentRound}`;
}

// Print player picks with emojis //
function printPlayersPicks(playerSelection, computerSelection) {
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

  playerPickPara.innerHTML = `${convertPlayerToEmoji}`;
  computerPickPara.innerHTML = `${convertComputerToEmoji}`;
}

// Print round winner //

function printRoundWinner(winner, playerSelection, computerSelection) {
  winner === "tie"
    ? (printRoundMessage.textContent = "It's A Tie")
    : (printRoundMessage.textContent = `The Winner Of This Round Is: ${winner.toUpperCase()}`);

  winner === "tie"
    ? (roundWinnerInsturctions.textContent = `You both picked ${playerSelection}`)
    : winner === "player"
    ? (roundWinnerInsturctions.textContent = `${playerSelection} beats ${computerSelection}`)
    : (roundWinnerInsturctions.textContent = `${computerSelection} beats ${playerSelection}`);
}

// Print current score //

function printScore(playerPoints, computerPoints) {
  playerScorePara.textContent = `Player Points: ${playerPoints}`;
  computerScorePara.textContent = `Computer Points:${computerPoints}`;
}

// Calculate game winner //
function calcGameWinner() {
  if (computerPoints > playerPoints) {
    return "computer";
  } else if (computerPoints === playerPoints) {
    return "tie";
  } else {
    return "player";
  }
}

// Printing Winner //
function printWinner(winner) {
  winner === "tie"
    ? (winnerMessage.textContent = "It's a tie!")
    : (winnerMessage.textContent = `The Winner Is ${winner}`);
  modal.classList.toggle("hidden");
  wrapper.classList.toggle("modal-active");
  playAgainBtn.addEventListener("click", resetGameScore);

  activeBackgroundOverlay.classList.toggle("hidden");
  activeBackgroundOverlay.addEventListener("click", hidemodal);

  playerSelectionBtns.forEach((btn) => {
    btn.addEventListener("click", toggleModal);
  });
}

// Reset Score //

function resetGameScore() {
  currentRoundPara.textContent = "Current Round Is : 0";
  computerScorePara.textContent = "Computer Points: 0";
  playerScorePara.textContent = "Player Points: 0";
  playerPickPara.textContent = "?";
  computerPickPara.textContent = "?";
  printRoundMessage.textContent = "Choose your pick";
  roundWinnerInsturctions.textContent = "First to 5 wins";
  currentRound = 0;
  computerPoints = 0;
  playerPoints = 0;

  playerSelectionBtns.forEach((btn) => {
    btn.removeEventListener("click", toggleModal);
    btn.addEventListener("click", game);
  });
  modal.classList.toggle("hidden");
  wrapper.classList.toggle("modal-active");
  activeBackgroundOverlay.classList.add("hidden");
  activeBackgroundOverlay.removeEventListener("click", hidemodal);
}

//////// Utility Functions //////

// Convert first letter to capital case //
function converToFirstLetter(str) {
  str = str.split("");
  str[0] = str[0].toUpperCase();
  return str.join("");
}

// Remove Listeners //

function removeListeners() {
  playerSelectionBtns.forEach((btn) => {
    btn.removeEventListener("click", game);
  });
}

// Toggle Modal //
function toggleModal() {
  modal.classList.remove("hidden");
  wrapper.classList.toggle("modal-active");
}

// Hide Modal //
function hidemodal(e) {
  if (modal.classList.value === "modal") {
    modal.classList.toggle("hidden");
    wrapper.classList.toggle("modal-active");
  }
}
