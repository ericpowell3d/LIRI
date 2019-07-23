var inquirer = require("inquirer");
var chalk = require('chalk');
var trackArray = [1, 2, 3, 4, 5];

function fix() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: chalk.hex('#00ff80')("Choose a song to play in the spotify web client..."),
            choices: trackArray
        }
    ]).then(result => {
        console.log(`\nSELECTED -- ${result.choice} --`)
    }).catch(error => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.close();

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (ch, key) => {
  if (key.ctrl && key.name === 'c') process.exit();
  console.log(key);
});
var run = function () {
    rl.resume();
    rl.question(chalk.hex('#ffffff').bgHex('#404040')('Input a command:') + ' ', (input) => {
        fix();
    });
}
run();