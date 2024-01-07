const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guess-text b");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-agian");
const maxGuesses = 6;
let currentWord, worngGuessesCount, correctLetters;

const resetGame = () => {
  // reseting all game vaiables and UI elemnets 
  correctLetters = [];
  worngGuessesCount = 0;
  
  hangmanImage.src = `/src/images/hangman-${worngGuessesCount}.svg`;
  guessesText.innerText = `${worngGuessesCount} / ${maxGuesses} `;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModel.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modelText = isVictory
      ? `You found the word:`
      : `The correct answer is`;
    gameModel.querySelector("img").src = `/src/images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h4").innerText = `${
      isVictory ? "You won!" : "You LOST!!"
    }`;
    gameModel.querySelector(
      "p"
    ).innerHTML = `${modelText} <b>${currentWord}</ b>`;
    gameModel.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    // showing all clicked letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    worngGuessesCount++;
    hangmanImage.src = `/src/images/hangman-${worngGuessesCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${worngGuessesCount} / ${maxGuesses} `;

  if (worngGuessesCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// creating keyboard buttons
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
