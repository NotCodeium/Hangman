const wordBank = ['Mario', 'Zelda', 'Halo', 'Fortnite', 'Minecraft', 'Skyrim', 'Overwatch', 'Pacman', 'Sonic', 'Pokemon', 'Tetris', 'Starcraft', 'Fallout', 'Warcraft', 'Destiny', 'Assassin', 'Portal', 'Resident', 'Metroid', 'MetalGear', 'League', 'Borderlands', 'Bioshock', 'MassEffect', 'FinalFantasy', 'KingdomHearts', 'StreetFighter', 'MortalKombat', 'GrandTheftAuto', 'DarkSouls'];
let targetWord = '';
let guessedLetters = [];
let incorrectGuesses = 0;
let winCount = 0;
let lossCount = 0;
let winStreak = 0;
let gameOver = false; // Added flag to track game over state

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex].toLowerCase();
}

function displayWord() {
  return targetWord
    .split('')
    .map(char => (guessedLetters.includes(char) ? char : '_'))
    .join(' ');
}

function isGameWon() {
  return targetWord.split('').every(char => guessedLetters.includes(char));
}

function drawStickman() {
  const stickman = [
    '   ____',
    '   |  |',
    `   ${incorrectGuesses >= 1 ? 'O' : ' '}`,
    `   ${incorrectGuesses >= 2 ? '|' : ' '}`,
    `   ${incorrectGuesses >= 3 ? '/' : ' '} ${incorrectGuesses >= 4 ? '\\' : ' '}`,
  ];
  return stickman.join('\n');
}

function updateDisplay() {
  document.getElementById('word-display').textContent = displayWord();
  document.getElementById('guessed-letters').textContent = `Guessed Letters: ${guessedLetters.join(', ')}`;
  document.getElementById('incorrect-guesses').innerHTML = drawStickman();
  updateCounters();
}

function showResult(message) {
  document.getElementById('result-message').textContent = message;
}

function updateCounters() {
  document.getElementById('winCount').textContent = winCount;
  document.getElementById('lossCount').textContent = lossCount;
  document.getElementById('winStreak').textContent = winStreak;
}

function startGame() {
  targetWord = getRandomWord();
  guessedLetters = [];
  incorrectGuesses = 0;
  gameOver = false; // Reset the game over state
  updateDisplay();
  showResult('');
}

function makeGuess(letter) {
  if (gameOver) return; // Check if the game is over before processing a new guess

  const guessedLetter = letter.toLowerCase();

  if (!guessedLetter.match(/[a-z]/)) {
    alert('Please enter a valid letter.');
    return;
  }

  if (guessedLetters.includes(guessedLetter)) {
    alert('You guessed that one already.');
    return;
  }

  guessedLetters.push(guessedLetter);

  if (targetWord.includes(guessedLetter)) {
    if (isGameWon()) {
      winCount++;
      winStreak++;
      gameOver = true; // Set the game over state
      showResult(`YOOO! YOU WON!!! The word was: ${targetWord}`);
    } else {
      updateDisplay();
    }
  } else {
    incorrectGuesses++;

    if (incorrectGuesses === 4) {
      lossCount++;
      winStreak = 0;
      gameOver = true; // Set the game over state
      showResult(`Game Over! The word was: ${targetWord}`);
    } else {
      updateDisplay();
    }
  }
}

function redoGame() {
  startGame();
}

function createLetterButtons() {
  const letterButtonsContainer = document.getElementById('letter-buttons');
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const letterButton = document.createElement('button');
    letterButton.textContent = letter;
    letterButton.classList.add('letter-button');
    letterButton.addEventListener('click', () => makeGuess(letter));
    letterButtonsContainer.appendChild(letterButton);
    if (i % 9 === 0) {
      letterButtonsContainer.appendChild(document.createElement('br')); // Add line break every 9 buttons
    }
  }
}

// Initial start
startGame();
createLetterButtons();