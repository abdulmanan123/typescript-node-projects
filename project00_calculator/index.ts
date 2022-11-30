#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import {createSpinner} from "nanospinner";
import { type } from 'os';

const log = console.log;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

let again = true;

type answersType = {
    operation: "Addition" | "Subtraction" | "Multiplication" | "Division",
    firstNumber: "number", 
    secondNumber: "number" 
}

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      `Let's start calculation \n`
    );
  
    await sleep();
    rainbowTitle.stop();
}

async function calculation() {
    const answers: answersType = await inquirer.prompt([{
        name: 'firstNumber',
        type: 'input',
        message: 'Enter first number: ',
        validate: function (input) {
            return !(Number(input)) ? "You enter an invalid number." : true;
        }
    },
    {
        name: 'operation',
        type: 'list',
        message: 'Which operation you want to perform?',
        choices: ['Addition', 'Subtraction', 'Multiplication', 'Division']
    },
    {
        name: 'secondNumber',
        type: 'input',
        message: 'Enter second number: ',
        validate: function (input) {
            return !(Number(input)) ? "You enter an invalid number." : true;
        }
    }]);

    let firstNumber = Number(answers.firstNumber);
    let secondNumber = Number(answers.secondNumber);

    switch(answers.operation) {
        case "Addition":
            log(chalk.green(`Your answer is ${firstNumber} + ${secondNumber} =  `) + chalk.bgGreen(`${firstNumber + secondNumber}`));
            break;
        case "Subtraction":
            log(chalk.red(`Your answer is ${firstNumber} - ${secondNumber} = ${firstNumber - secondNumber}`));
            break;
        case "Multiplication":
            log(chalk.gray(`Your answer is ${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber}`));
            break;
        case "Division":
            log(chalk.blue(`Your answer is ${firstNumber} / ${secondNumber} = ${firstNumber / secondNumber}`));
            break;        
        default:
            log(chalk.red(`Please select correct option`));
            break;

    }

    const {confirm} = await inquirer.prompt([{
        name: 'confirm',
        type: 'confirm',
        message: 'Do you want another calculation?'
    }]);

    again = confirm;
}

console.clear();
await welcome();

do {
    await calculation();
}while(again);

