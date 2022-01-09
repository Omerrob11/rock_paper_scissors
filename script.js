// Create a function called computerPlay
// The funtion return rock paper scicorss randomally

// Write a function that plays a single round of rock paper scicoors
// THE function take 2 paramaters -> playerselection and computer selection
// The function should return a string that declars the winnder of the round - "you lose, paper beats rock"
// Make your functions player selection paramter case insensitive
// Return the result of that function code

// Write a new function called game()
// Use the playround function inside of this one to play 5 round game that keeps score and reports a winner or loser at the end.
//

// Number.isNaN(Number(choice)) === false
let playerChoice = prompt(
  "Please choose between Rock, Paper, Scicorrs"
).toLowerCase();

if (
  playerChoice !== "paper" &&
  playerChoice !== "rock" &&
  playerChoice !== "scicorss"
) {
  console.log("Error, please provide correctly spelled answer");
  // Here, prompt call the function that call it again
} else {
  console.log("sucsuss");
  let compuetrChoice = random();
  console.log(compuetrChoice + " computer choice");
  console.log(playerChoice + " playerChoice");
  let winner = calcWinner(playerChoice, compuetrChoice);
  console.log(winner);
}

function random() {
  let min = 1;
  let max = 3;
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomNumber === 1) {
    return "paper";
  } else if (randomNumber === 2) {
    return "rock";
  } else {
    return "scicorss";
  }
}

function calcWinner(playerChoice, computerChoice) {
  let playerWonMessage = "You Won! What a great player oyu are";

  let computerWonMessage = "Computer Won. May the loosers be winners soon";

  let tieMessage = "It's a tie!";

  if (
    (computerChoice === "rock" && playerChoice === "paper") ||
    (computerChoice === "scicorss" && playerChoice === "rock") ||
    (computerChoice === "paper" && playerChoice === "scicorrs")
  ) {
    return playerWonMessage;
  } else if (playerChoice === computerChoice) {
    return tieMessage;
  } else {
    return computerWonMessage;
  }
}
