#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const log = console.log;
let score = 0;
let again = true;
let welcomeMessage = async () => {
    let rainbowTitle = chalkAnimation.rainbow('Welcome to Guess Number Game');
    setTimeout(() => {
        rainbowTitle.stop(); // Animation stops
    }, 2000);
};
const guessNumberGame = async () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    //log(`randomNumber: ${randomNumber}`);
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
        score += 10;
        log(chalk.green('Yahoo! you guess the right number.'));
    }
    else {
        if (score >= 5) {
            score -= 5;
        }
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
        if (score > 40) {
            log(chalk.green(`Your Score is ${score}`));
        }
        else {
            log(chalk.red(`Your Score is ${score}`));
        }
    }
};
await welcomeMessage();
do {
    await guessNumberGame();
} while (again);
