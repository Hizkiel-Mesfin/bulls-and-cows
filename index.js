// Modules
const readline = require("readline-sync");
const emoji = require("node-emoji");
const chalk = require("chalk");

// Secret number generator
const secretNumGenerator = () => {
  const random = Math.floor(Math.random() * 9000 + 1000);
  return random === +[...new Set(random.toString())].join("")
    ? random
    : secretNumGenerator();
};

// Global variables
let secretNum = secretNumGenerator();
console.log(secretNum);
// let secStr = secretNum.toString();
let trialCounter = 1;

// Gets player's name
const playerName = readline.question("Player's name (Optional) => ", {
  defaultInput: "Human player",
});
console.log(chalk.bgBlueBright(`Let's waste your time ${playerName}!`));

// Difficulty level
const diffLevel = require("readline-sync"),
  levels = ["Easy", "Medium", "Hard"],
  index = diffLevel.keyInSelect(levels, "What level would you like to play?");

let diffChoice = levels[index];

// Main function
const bullsAndDogs = () => {
  // Get user input
  const guessedNum = readline.question(
    chalk.cyan("Guess the secret number =>  ")
  );

  // Validate user input
  if (guessedNum.length !== 4) {
    console.log(
      chalk.bold.blue("ERROR"),
      `Number should be four digits long. `
    );
    bullsAndDogs();
  } else if (guessedNum !== [...new Set(guessedNum)].join("")) {
    console.log(
      chalk.bold.blue("ERROR"),
      `The guessed number shouldn't have repeated digits.  `
    );
    bullsAndDogs();
  } else if (isNaN(guessedNum)) {
    console.log(chalk.bold.blue("ERROR"), `The input should only be a number`);
    bullsAndDogs();
  }
  // No matches found
  else if (
    guessedNum.split("").every((el) => !secretNum.toString().includes(el)) &&
    guessedNum.length === 4
  ) {
    console.log(emoji.emojify(":cry:"), `No numbers match. Please try again!`);
    trialCounter++;
    diffChoice === "Easy" || diffChoice === "Medium" || diffChoice === "Hard"
      ? gameOver()
      : bullsAndDogs();
  }
  // Hint
  else if (
    guessedNum.length === 4 &&
    +guessedNum !== secretNum &&
    guessedNum.split("").some((el) => secretNum.toString().includes(el))
  ) {
    let bullCounter = 0;
    let cowCounter = 0;
    guessedNum.split("").forEach((el, i) => {
      if (
        secretNum.toString().includes(el) &&
        secretNum.toString().indexOf(el) === i
      ) {
        return bullCounter++;
      } else if (
        secretNum.toString().includes(el) &&
        secretNum.toString().indexOf(el) !== i
      ) {
        return cowCounter++;
      }
    });
    console.log(
      emoji.emojify(":thumbsup:"),
      ` Almost there: ${bullCounter} ${
        bullCounter === 1 ? "bull" : "bulls"
      } and ${cowCounter} ${cowCounter === 1 ? "cow" : "cows"}`
    );
    trialCounter++;
    diffChoice === "Easy" || diffChoice === "Medium" || diffChoice === "Hard"
      ? gameOver()
      : bullsAndDogs();
  }
  // Win the game
  else if (guessedNum == secretNum) {
    console.clear();
    console.log(
      emoji.emojify(":tada:"),
      chalk.yellowBright(`You won the game ${playerName}!`),
      emoji.emojify(":tada:")
    );
    console.log(`You got it after ${trialCounter} attempts.`);
    const playAgain = readline.question("Would you like to play again y/n?  ");

    // Player wants to play again
    if (playAgain === "y") {
      console.clear();
      secretNum = secretNumGenerator();
      console.log(secretNum);
      trialCounter = 1;
      bullsAndDogs();
    }
    // Player doesn't want to play again
    else if (playAgain === "n") {
      const confirm = readline.question("Are you sure? y/n  ");
      if (confirm === "n") {
        console.clear();
        console.log(secretNum);
        bullsAndDogs();
      } else if (confirm === "y") {
        console.clear();
        setTimeout(() => {
          console.log("Thanks for playing!");
        }, 1000);

        setTimeout(() => {
          console.log(`Bye ${playerName}!`);
        }, 2000);
      }
    }
  }
};

bullsAndDogs();

// Game over functon
function gameOver() {
  if (diffChoice === "Easy" && trialCounter > 7) {
    console.clear();
    console.log(
      emoji.emojify(":cry:"),
      `Game over ${playerName}! Max amount of attempts for easy level is 7`
    );
    const over = readline.question("Play again y/n ? =>  ");
    if (over === "y") {
      console.clear();
      trialCounter = 1;
      console.log(secretNum);
      bullsAndDogs();
    } else if (over === "n") {
      console.clear();
      setTimeout(() => {
        console.log("Thanks for playing!");
      }, 1000);

      setTimeout(() => {
        console.log(`Bye ${playerName}!`);
      }, 2000);
    }
  } else if (diffChoice === "Medium" && trialCounter > 5) {
    console.clear();
    console.log(
      emoji.emojify(":cry:"),
      `Game over ${playerName}! Max amount of attempts for medium level is 5`
    );
    const over = readline.question("Play again y/n ? =>  ");
    if (over === "y") {
      console.clear();
      trialCounter = 1;
      console.log(secretNum);
      bullsAndDogs();
    } else if (over === "n") {
      console.clear();
      setTimeout(() => {
        console.log("Thanks for playing!");
      }, 1000);

      setTimeout(() => {
        console.log(`Bye ${playerName}!`);
      }, 2000);
    }
  } else if (diffChoice === "Hard" && trialCounter > 3) {
    console.clear();
    console.log(
      emoji.emojify(":cry:"),
      `Game over ${playerName}! Max amount of attempts for hard level is 3`
    );
    const over = readline.question("Play again y/n ? =>  ");
    if (over === "y") {
      console.clear();
      trialCounter = 1;
      console.log(secretNum);
      bullsAndDogs();
    } else if (over === "n") {
      console.clear();
      setTimeout(() => {
        console.log("Thanks for playing!");
      }, 1000);

      setTimeout(() => {
        console.log(`Bye ${playerName}!`);
      }, 2000);
    }
  } else {
    bullsAndDogs();
  }
}
