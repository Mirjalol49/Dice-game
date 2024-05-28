// !Selecting Elements

//? Player 1 and Player 2 boxes
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

//? Main scores
let score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

//? Current Scores
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

//? Dice Img
const diceImg = document.querySelector(".dice");

//? Reset Game
const btnNew = document.querySelector(".control-newgame");

//? Roll the dice btn
const btnRoll = document.querySelector(".control-roll");

//? Control the turn btn
const btnPass = document.querySelector(".control-pass");

let scores, currentScore, activePlayer, playing;

const resetGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset current scores
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset overall scores
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Hide the dice
  diceImg.classList.add("hidden");

  // Remove winner class and set the active player
  player1.classList.remove("player-winner");
  player2.classList.remove("player-winner");
  player1.classList.add("active-player");
  player2.classList.remove("active-player");
};
resetGame();

//! Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".player--0").classList.toggle("active-player");
  document.querySelector(".player--1").classList.toggle("active-player");
};

//! Rolling the dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //! 1. Generating random dice number
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    console.log(randomDice);

    //! 2. Display dice
    diceImg.classList.remove("hidden");
    diceImg.src = `./images/dice--${randomDice}.png`;

    //! 3. Check the dice
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //!Switch to next player
      switchPlayer();
    }
  }
});

// Adding current score to overall score
btnPass.addEventListener("click", function () {
  if (playing) {
    // 1. Add score to active player's current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Adjust this threshold as per your game rules
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active-player");
      diceImg.classList.add("hidden");
    } else {
      // 3. Switch the player
      switchPlayer();
    }
  }
});

//! Reset the game function
btnNew.addEventListener("click", resetGame);
