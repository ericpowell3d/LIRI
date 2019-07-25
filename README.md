# Liri-Node-App

### Overview

LIRI (Language Interpretation and Recognition Interface) is a command node app similar to SIRI, who is based on speech instead. LIRI takes in a command, followed by a parameter. [Here's an example of how it looks in action](screenshots/main.png)

- - -

### How It Works

* Inquirer will prompt the user for a command followed by a parameter. [Here's what it looks like when first started.](screenshots/start.png)

* Simply enter a command and watch the magic happen. [Here's one example of a command used by LIRI.](screenshots/command.png)

* After the command has been executed, the application will automatically return to the starting point (the input line).

### Commands

The list of commands are as follows...

1. `spotify-this-song`, `spotify`, `s`

    * The spotify command reads the parameter that proceeds it and returns a list of up to 20 songs.

    * The list includes the track name, artist, and album.

    * You can scroll through the list and press enter/return to play the song in your browser, or you may exit and return to the input line.

    * [Here's an example screenshot of the spotify command.](screenshots/spotify.png)

2. `concert-this`, `concert`, `c`

    * The concert command reads the parameter that proceeds it and returns a list of up to 20 upcoming concerts.

    * The list includes the venue name, location, and date.

    * No action is required to return to the input line.

    * [Here's an example screenshot of the concert command.](screenshots/concert.png)

3. `movie-this`, `movie`, `m`

    * The movie command reads the parameter that proceeds it and returns the closest result.

    * The values returned for the movie are the title, year, IMDB rating, Rotten Tomatoes rating, countries, languages, cast, and plot.

    * No action is required to return to the input line.

    * [Here's an example screenshot of the movie command.](screenshots/movie.png)

4. `do-what-it-says`, `random`, `dwis`, `r`

    * The random command doesn't take in any parameters. Instead, it pulls from the random.txt file, which contains a list of random commands.

    * The commands carried out by the random function are the same as the 3 above, but with a random parameter.

    * Depending on the executed command, you may need to perform another action to return to the input line.

    * [Here's an example screenshot of the random command.](screenshots/random.png)

- - -

### APIs Used

* Spotify - Fetches music metadata and urls for Spotify to play a track

* Bands In Town - Finds concerts and venues related to an artist

* OMDB - Gets movie data based on the search

### NPM Packages Used

* axios - Used to call the query urls for the concert and movie commands.

* chalk - Used to color the text in the command line.

* fs - Used to read and write to external files.

* inquirer - Used to capture input and create lists.

* moment - Used to format the dates for concerts.

* node-spotify-api - Used to gather artist and track information.

* opn - Used to open urls in your default browser directly from node.

### Extra Features

* If no parameters are entered after a command, a default value will be chosen and executed. [Here's an example screenshot of the default parameters for all commands.](screenshots/default.png)

* A log.txt file is stored that keeps track of every command you input. This file is included in the directory.

* If a parameter is not recognized, it will return with an error like you can see [Here.](screenshots/error.png)

* [An exit command was also added.](screenshots/exit.png)

- - -

### Usage

In order to clone and use the app, you need to install the included node_modules in the package.json file. You will also need to create your own Spotify developer credentials and generate your client_id and client_secret. In addition, you'll need a Bands In Town app ID & OMDb API key. Once all of your keys are generated, create a .env file in the main directory and place the following code, filling the assignments with your generated values...

```js
# Spotify Keys
SPOTIFY_ID = // Your Spotify ID goes here
SPOTIFY_SECRET = // Your Spotify secret goes here

# Bands In Town Key
BIT_ID = // Your Bands In Town app ID goes here

# OMDb Key
OMDB_KEY = // Your OMDb API key goes here
```

You should be good to run the program in your preferred command window.