var Spotify = require('node-spotify-api');
var fs = require('fs');
// var spotify = new Spotify({
//     id: '',
//     secret: ''
// });
var request = require('request');

//Get input fromt he user and store ina  variable

var userinput = process.argv[2];
var updata = process.argv[3];





function commandHandler(command, data) {
    //Process the input provided to determine if it is a valid command
    if (command === 'get-tweets') {
        console.log('getting tweets');

        //We need t write a functoin that gets 20 tweetss
    } else if (command === 'movie-this') {
        console.log('getting movies');
        movieThis(data || 'Mr. Nobody');

    } else if (command === 'spotify-this-song') {
        console.log('getting spotify songs');
        searchSpotify(data || 'All the small things');
    } else if (command === 'do') {
        console.log('getting do');
        doWhatFileSays();


    } else {
        console.log('That command is not valid.');
    }
};

commandHandler(userinput, updata);

function movieThis(searchCrit) {
    request('http://www.omdbapi.com/?apikey=trilogy&s=' + searchCrit, function(error, response, body) {
        if (!error) {
            console.log('body:', JSON.parse(response.body).Search[0]);
            //Next step is too console log out neatly all the data they ahve askled for in the instructions
        }




    });
}

//If it is a valid command we need to do what that comman should do

function doWhatFileSays() {
    fs.readFile('random.txt', "utf8", function(err, data) {
        if (err) throw err;
        var fileDataArray = data.split(' ');
        var newCommandArray = fileDataArray.splice(0, 1)
        var newCommand = newCommandArray[0];
        var songData = fileDataArray.join(' ');

        commandHandler(newCommand, songData);
    });
}

function searchSpotify(searchCrit) {

    spotify.search({ type: 'track', query: searchCrit }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    });
}