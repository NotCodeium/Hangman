import readline from 'readline';
import wordBank from './word-bank.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex].toLowerCase();
};

const displayWord = (word, guessedLetters) => {
  let displayedWord = '';
  for (const char of word) {
    if (guessedLetters.includes(char)) {
      displayedWord += char;
    } else {
      displayedWord += '_';
    }
  }
  return displayedWord;
};

const drawStickman = (incorrectGuesses) => {
  const stickman = [
    '   O',
    '   |',
    '  /|\\',
    '  / \\',
  ];

  console.log('\nIncorrect Guesses:');
  for (let i = 0; i < incorrectGuesses; i++) {
    console.log(stickman[i]);
  }
};

const isGameWon = (word, guessedLetters) => {
  return word.split('').every(char => guessedLetters.includes(char));
};

const startGame = () => {
  let wins = 0;
  let losses = 0;

  const playRound = () => {
    const targetWord = getRandomWord();
    const guessedLetters = [];
    let incorrectGuesses = 0;

    console.log('Welcome to Hangman!');
    console.log('Press ctrl + c to stop the game.');

    const playAgain = () => {
      rl.question('Do you want to play again? (yes/no): ', answer => {
        if (answer.toLowerCase() === 'yes') {
          playRound();
        } else {
          console.log('Thanks for playing!');
          console.log('Wins:', wins);
          console.log('Losses:', losses);
          rl.close();
        }
      });
    };

    const playOneRound = () => {
      console.log('\nWord:', displayWord(targetWord, guessedLetters));
      console.log('Guessed Letters:', guessedLetters.join(', '));
      console.log('Incorrect Guesses Left:', 4 - incorrectGuesses);

      rl.question('Guess a letter: ', answer => {
        const guessedLetter = answer.toLowerCase();

        if (guessedLetters.includes(guessedLetter)) {
          console.log('You guessed that one already...');
        } else if (targetWord.includes(guessedLetter)) {
          guessedLetters.push(guessedLetter);
          if (isGameWon(targetWord, guessedLetters)) {
            console.log('YOOO! YOU WON!!!  The word was:', targetWord);
            wins++;
            playAgain();
          } else {
            playOneRound();
          }
        } else {
          incorrectGuesses++;
          drawStickman(incorrectGuesses);

          if (incorrectGuesses === 6) {
            console.log('Game Over!  The word was:', targetWord);
            losses++;
            playAgain();
          } else {
            console.log('Hey! Look!  A man is being drawn!');
            playOneRound();
          }
        }
      });
    };

    playOneRound();
  };

  playRound();
};

startGame();