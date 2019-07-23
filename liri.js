require("dotenv").config();
var axios = require("axios");
var chalk = require('chalk');
var fs = require('fs');
var inquirer = require("inquirer");
var keys = require("./keys.js");
var moment = require('moment');
var opn = require('opn');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function spotifyThis(terms) {
    spotify.search({
        type: 'track',
        query: terms
    }).then(function (response) {
        if (response.tracks.items[0] === undefined) {
            console.log(chalk.hex('#ff0000')("\nNo tracks found!"));
            run();
        }
        else {
            console.log('\r');
            var trackArray = ['{EXIT}'];
            var urlArray = [undefined]
            for (let i = 0; i < 20; i++) {
                if (response.tracks.items[i] === undefined) {
                    break;
                }
                else {
                    trackArray.push(`TRACK: ${response.tracks.items[i].name} | ARTIST: ${response.tracks.items[i].artists[0].name} | ALBUM: ${response.tracks.items[i].album.name}`);
                    urlArray.push(response.tracks.items[i].external_urls.spotify);
                }
            }
            inquirer.prompt([
                {
                    type: "list",
                    name: "choice",
                    message: chalk.hex('#00ff80')("Choose a song to play in the spotify web client..."),
                    choices: trackArray
                }
            ]).then(function (result) {
                let getIndex = trackArray.indexOf(result.choice);
                let getUrl = urlArray[getIndex];
                if (getUrl !== undefined) opn(getUrl);
                console.log(`\nSELECTED -- ${result.choice} --`);
                run();
            }).catch(function (error) {
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
    }).catch(function (error) {
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
function concertThis(terms) {
    axios.get(`https://rest.bandsintown.com/artists/${terms}/events?app_id=codingbootcamp`)
        .then(function (response) {
            if (!response) {
                console.log(chalk.hex('#ff0000')("\nNo concerts found!"));
            }
            else {
                for (let i = 0; i < 20; i++) {
                    if (response.data[i] === undefined) {
                        break;
                    }
                    else {
                        console.log("\nVENUE: " + chalk.hex('#00ff80')(response.data[i].venue.name));
                        if (response.data[i].venue.region) console.log("LOCATION: " + chalk.hex('#0080ff')(response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country));
                        else console.log("LOCATION: " + chalk.hex('#0080ff')(response.data[i].venue.city + ", " + response.data[i].venue.country));
                        console.log("DATE: " + chalk.hex('#ffff00')(moment(response.data[i].datetime).format("MM/DD/YYYY")));
                    }
                }
            }
            run();
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(chalk.hex('#ff0000')("\nNo concerts found!"));
            }
            // console.log(error.config);
            run();
        });
}
function movieThis(terms) {
    axios.get(`http://www.omdbapi.com/?t=${terms}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
            if (response.data.Title === undefined) {
                console.log(chalk.hex('#ff0000')("\nMovie not found!"));
            }
            else {
                console.log("\nTITLE: " + chalk.hex('#00ff80')(response.data.Title));
                console.log("YEAR: " + chalk.hex('#0080ff')(response.data.Year));
                console.log("IMDB RATING: " + chalk.hex('#ffff00')(response.data.Ratings[0].Value));
                console.log("ROTTEN TOMATOES RATING: " + chalk.hex('#ff8000')(response.data.Ratings[1].Value));
                console.log("COUNTRIES: " + chalk.hex('#ff0080')(response.data.Country));
                console.log("LANGUAGES: " + chalk.hex('#8000ff')(response.data.Language));
                console.log("CAST: " + chalk.hex('#8080a0')(response.data.Actors));
                console.log("PLOT: " + chalk.hex('#80a080')(response.data.Plot));
            }
            run();
        })
        .catch(function (error) {
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
            run();
        });
}
function randomThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) return console.log(error);

        let dataArray = data.split('\r\n');
        let randomInput = dataArray[Math.floor(Math.random() * dataArray.length)];

        randomInput = randomInput.split(' ');
        let randomCommand = randomInput[0].toLowerCase();
        let randomTerms = randomInput.slice(1).join(" ").toLowerCase();

        if (randomCommand === "spotify-this-song" || randomCommand === "spotify" || randomCommand === "s") {
            console.log(chalk.hex('#ff4000').bgHex('#401000')(`RANDOM COMMAND: 'spotify-this-song' | RANDOM TERMS: '${randomTerms}'`));
            spotifyThis(randomTerms);
        }
        else if (randomCommand === "concert-this" || randomCommand === "concert" || randomCommand === "c") {
            console.log(chalk.hex('#ff4000').bgHex('#401000')(`RANDOM COMMAND: 'concert-this' | RANDOM TERMS: '${randomTerms}'`));
            concertThis(randomTerms);
        }
        else if (randomCommand === "movie-this" || randomCommand === "movie" || randomCommand === "m") {
            console.log(chalk.hex('#ff4000').bgHex('#401000')(`RANDOM COMMAND: 'movie-this' | RANDOM TERMS: '${randomTerms}'`));
            movieThis(randomTerms);
        }
        else {
            console.log("Command not recognized!");
        }
    });
}

function log(command, terms) {
    fs.appendFile(`log.txt`, `${command} ${terms}\n`, (err) => {
        if (err) throw err;
    });
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function run() {
    console.log('\r');
    rl.resume();
    rl.question(chalk.hex('#ffffff').bgHex('#404040')('Input a command:') + ' ', (input) => {
        console.log('\r');
        rl.pause();

        input = input.split(" ");
        let command = input[0].toLowerCase();
        let terms = input.slice(1).join(" ").toLowerCase();

        if (command === "spotify-this-song" || command === "spotify" || command === "s") {
            console.log(chalk.hex('#00ff80').bgHex('#004020')(`COMMAND: 'spotify-this-song' | TERMS: '${terms}'`));
            spotifyThis(terms);
            log(command, terms);
        }
        else if (command === "concert-this" || command === "concert" || command === "c") {
            console.log(chalk.hex('#0080ff').bgHex('#002040')(`COMMAND: 'concert-this' | TERMS: '${terms}'`));
            concertThis(terms);
            log(command, terms);
        }
        else if (command === "movie-this" || command === "movie" || command === "m") {
            console.log(chalk.hex('#00ffff').bgHex('#004040')(`COMMAND: 'movie-this' | TERMS: '${terms}'`));
            movieThis(terms);
            log(command, terms);
        }
        else if (command === "do-what-it-says" || command === "random" || command === "dwis" || command === "r") {
            randomThis();
        }
        else {
            console.log("Command not recognized!");
        }
    });
}
run();