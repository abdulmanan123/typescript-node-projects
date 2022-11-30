#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let winScore = 0;
let loseScore = 0;
let score = 0;
let again = true;
let welcomeMessage = async () => {
    const rainbowTitle = chalkAnimation.rainbow(`Welcome to Guess Number Game \n \n`);
    await sleep();
    rainbowTitle.stop();
};
const guessNumberGame = async () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    log(`randomNumber: ${randomNumber}`);
    const { guessNumber } = await inquirer.prompt([
        {
            'name': 'guessNumber',
            'type': 'input',
            'message': 'Please enter any number from 0 to 10.',
            validate: function (input) {
                return isNaN(input) || (input < 0 || input > 10) ? "You enter an invalid number." : true;
            }
        }
    ]);
    if (Number(guessNumber) === randomNumber) {
        winScore += 10;
        log(chalk.green('Yahoo! you guess the right number.'));
    }
    else {
        loseScore -= 5;
        log(chalk.red('Ops! number not matched.'));
    }
    const { retry } = await inquirer.prompt([
        {
            name: "retry",
            message: "Do you want to try it again?",
            type: "confirm",
        }
    ]);
    again = retry;
    if (!again) {
        if (loseScore < 0) {
            loseScore = Math.abs(loseScore);
            if (winScore <= loseScore) {
                score = 0;
            }
            else {
                score = winScore - loseScore;
            }
        }
        if (score > 40) {
            log(chalk.green(`Your Score is ${score}`));
        }
        else {
            log(chalk.red(`Your Score is ${score}`));
        }
    }
};
console.clear();
await welcomeMessage();
do {
    await guessNumberGame();
} while (again);
