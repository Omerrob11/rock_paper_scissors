// Global Variables
let currentRound = 0;
let computerPoints = 0;
let playerPoints = 0;

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
    // printPlayAgainBtn();
    removeListeners();
  }
}

// Listening for player selection //

let buttons = document.querySelectorAll(".player-selection__btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", game);
});

// Getting player choice in terms of game option //
function getPlayerChoice(e) {
  let converEmojiToString = e.target.textContent
    .trim()
    .codePointAt(0)
    .toString(16);

  let convertToGameOption = null;

  // let emo = String.fromCodePoint("0x" + converEmojiToString);

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
  let currentRoundPara = document.querySelector(".round-number__current");
  currentRoundPara.textContent = `Current Round Is : ${currentRound}`;
}

// Print player picks with emojis //
function printPlayersPicks(playerSelection, computerSelection) {
  let playerPickPara = document.querySelector(".picks_player__emoji");
  let computerPickPara = document.querySelector(".picks__computer__emoji");

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
  let printRoundMessage = document.querySelector(".round-winner__message");
  winner === "tie"
    ? (printRoundMessage.textContent = "It's A Tie")
    : (printRoundMessage.textContent = `The Winner Of This Round Is: ${winner.toUpperCase()}`);

  let exlpainWinner = document.querySelector(".round-winner__instructions");
  winner === "tie"
    ? (exlpainWinner.textContent = `You both picked ${playerSelection}`)
    : winner === "player"
    ? (exlpainWinner.textContent = `${playerSelection} beats ${computerSelection}`)
    : (exlpainWinner.textContent = `${computerSelection} beats ${playerSelection}`);
}

// Print current score //

function printScore(playerPoints, computerPoints) {
  let playerScorePara = document.querySelector(".score__player");
  let computerScorePara = document.querySelector(".score__computer");

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
  let modal = document.querySelector(".modal");
  let winnerMessage = document.querySelector(".winner-display__message");
  let playAgainBtn = document.querySelector(".play-again-button");
  let wrapper = document.querySelector(".wrapper");
  let activeBackgroundOverlay = document.querySelector(".background-overlay");

  winner === "tie"
    ? (winnerMessage.textContent = "It's a tie!")
    : (winnerMessage.textContent = `The Winner Is ${winner}`);
  modal.classList.toggle("hidden");
  wrapper.classList.toggle("modal-active");
  playAgainBtn.addEventListener("click", resetGameScore);

  activeBackgroundOverlay.classList.toggle("hidden");
  activeBackgroundOverlay.addEventListener("click", hidemodal);
  let buttons = document.querySelectorAll(".player-selection__btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", toggleModal);
  });
}

// Reset Score //

function resetGameScore() {
  let currentRoundReset = document.querySelector(".round-number__current");
  currentRoundReset.textContent = "Current Round Is : 0";

  let computerScoreReset = document.querySelector(".score__computer");
  computerScoreReset.textContent = "Computer Points: 0";

  let playerPointsReset = document.querySelector(".score__player");
  playerPointsReset.textContent = "Player Points: 0";

  let picksComputerMessageReset = document.querySelector(
    ".picks__computer__message"
  );
  picksComputerMessageReset.textContent = "Computer Selected: ";

  let pickPlayerEmojiReset = document.querySelector(".picks_player__emoji");
  pickPlayerEmojiReset.textContent = "?";

  let picksComputerEmojiReset = document.querySelector(
    ".picks__computer__emoji"
  );
  picksComputerEmojiReset.textContent = "?";

  let roundWinnerMessageReset = document.querySelector(
    ".round-winner__message"
  );
  roundWinnerMessageReset.textContent = "Choose your pick";

  let roundWinnerInstructions = document.querySelector(
    ".round-winner__instructions"
  );
  roundWinnerInstructions.textContent = "First to 5 wins";

  currentRound = 0;

  computerPoints = 0;
  playerPoints = 0;

  let buttons = document.querySelectorAll(".player-selection__btn");
  buttons.forEach((btn) => {
    btn.removeEventListener("click", toggleModal);
    btn.addEventListener("click", game);
  });

  let modal = document.querySelector(".modal");
  modal.classList.toggle("hidden");

  let wrapper = document.querySelector(".wrapper");
  wrapper.classList.toggle("modal-active");

  let activeBackgroundOverlay = document.querySelector(".background-overlay");
  activeBackgroundOverlay.classList.add("hidden");
  activeBackgroundOverlay.removeEventListener("click", hidemodal);
}
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

let exlpainWinner = document.querySelector(".round-winner__instructions");

// Picks
let playerPickPara = document.querySelector(".picks_player__emoji");
let computerPickPara = document.querySelector(".picks__computer__emoji");

// Round Number
let currentRoundPara = document.querySelector(".round-number__current");

// Player selection
// let buttons = document.querySelectorAll(".player-selection__btn");

//////// Utility Functions //////

// Convert first letter to capital case //
function converToFirstLetter(str) {
  str = str.split("");
  str[0] = str[0].toUpperCase();
  return str.join("");
}

// Remove Listeners //

function removeListeners() {
  let allPlayerSelectionBtn = document.querySelectorAll(
    ".player-selection__btn"
  );
  console.log(allPlayerSelectionBtn);
  allPlayerSelectionBtn.forEach((btn) => {
    btn.removeEventListener("click", game);
  });
}

// Toggle Modal //
function toggleModal() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  let wrapper = document.querySelector(".wrapper");
  wrapper.classList.toggle("modal-active");
}

// Hide Modal //
function hidemodal(e) {
  let modal = document.querySelector(".modal");
  let wrapper = document.querySelector(".wrapper");
  console.log("hidingggg");
  if (modal.classList.value === "modal") {
    modal.classList.toggle("hidden");
    wrapper.classList.toggle("modal-active");
  }
}
