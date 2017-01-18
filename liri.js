// initializing all package requests
var fs = require("fs");
var request = require("request");
var spotify = require("spotify");
var twitter = require('twitter');

// registering the user input for what the should do
var action = process.argv[2];

// checks if the user has input additional arguments
var additionalArgs;
if (process.argv.length > 2) {

	additionalArgs = "";
	for(var i = 3; i < process.argv.length; i++){
		additionalArgs = additionalArgs + process.argv[i] + " ";
	}
}

switch (action){

	case "my-tweets":
		tweet()
		break;

	case "spotify-this-song":
		songName = process.argv[3];
		spotifySong(songName)
		break;

	case "movie-this":
		movieInfo()
		break;

	case "do-what-it-says":
		justDoIt()
		break;
}

// ======================================================================

//This function shows last 20 tweets and their timestamp.
function tweet(){
	//setting the twitter credentials from a separate file to a variable
	var credentials = require("./keys.js");

	//file return an object with property "twitterKeys", which is an object of credentials
	// assigning the keys to an instance of twitter client
	var client = new twitter(credentials.twitterKeys);

	var tweetCount = 20;

	//makes a request to twitter to fetch recent tweets
	client.get("statuses/user_timeline", {count: tweetCount} ,function(error, tweets, response){
		//shows an error, if an error occurs
		if (error){
			console.log(error);
			return;
		}
		//cycles through the results, and prints the timestamp and the tweet
		for(var i = 0; i < tweetCount; i++){
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
			console.log("");
		}

		return;

	}) //client.get callback function ends here

} // tweet function ends here

// =======================================================================

//this function shows information about a song that the user requests
//if a song is not provided, information about "the sign" by Ace of Base is shown
function spotifySong(){

	// if user specifies a song
	if (additionalArgs) {
		spotify.search({ type: 'track', query: additionalArgs, limit: 1 }, function(err, data) {
			//console log an error, if there is one.
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        		return;
    		}
			
			console.log("Artist(s):")
			// Loops through the array of artists, and console logs the names
			for (var i = 0; i < data.tracks.items[0].artists.length; i++){
				console.log(data.tracks.items[0].artists[i].name);
			} 
			console.log("");
			console.log("Song:");
			// console logs name of the song
			console.log(data.tracks.items[0].name);
			console.log("");
			console.log("Link:");
			// console logs preview URL for the song
			console.log(data.tracks.items[0].preview_url);
			console.log("");
			console.log("Album:")
			// console logs name of the album that the song is from
			console.log(data.tracks.items[0].album.name);

			return;
		}); // Callback function ends here
	}
	// if user does not specify a song
	else{
		spotify.search({ type: 'track', query: 'The Sign by Ace of Base', limit: 1 }, function(err, data) {
			//console log an error, if there is one.
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        		return;
    		}

			console.log("Artist(s):")
			// Loops through the array of artists, and console logs the names
			for (var i = 0; i < data.tracks.items[0].artists.length; i++){
				console.log(data.tracks.items[0].artists[i].name);
			} 
			console.log("");
			console.log("Song:");
			// console logs name of the song
			console.log(data.tracks.items[0].name);
			console.log("");
			console.log("Link:");
			// console logs preview URL for the song
			console.log(data.tracks.items[0].preview_url);
			console.log("");
			console.log("Album:")
			// console logs name of the album that the song is from
			console.log(data.tracks.items[0].album.name);

			return;
		}); // callback function ends here
	}


} //spotifySong function ends here

// =======================================================================

// This function shows information about a movie that a user inputs.
// If the user does not input the name of a movie, then the function would return information about Mr. Nobody

function movieInfo(){

	// if the user specifies a movie name
	if (additionalArgs){
		//delete the spaces at the ends, and replace the spaces in the middle
		// with + sign
		var movie = additionalArgs.trim().replace(/\s/g, "+");
		// built a query to pass to request npm
		var movieQuery = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&r=json";

		// run the request npm, and run a callback function
		request(movieQuery, function (error, response, body) {
  			
			// if there is no error, and the page responds
  			if (!error && response.statusCode == 200) {
  				// change the body into a JSON object
    			var info = JSON.parse(body);

    			//Title of the movie.
    			console.log("Title: " + info.Title);
				//Year the movie came out.
				console.log("Year: " + info.Year);
				//IMDB Rating of the movie.
				console.log("IMDB Rating: " + info.imdbRating);
				//Country where the movie was produced.
				console.log("Country: " + info.Country);
				//Language of the movie.
				console.log("Language: " + info.Language);
				//Plot of the movie.
				console.log("Plot: " + info.Plot);
				//Actors in the movie.
				console.log("Actors: " + info.Actors);
				//Rotten Tomatoes Rating.
				console.log("Rotten Tomatoes Rating: ");
				//Rotten Tomatoes URL.
				console.log("Rotten Tomatoes URL: ");
				return;

  			}
		}); // request ends here


	}
	// if the user does not specify a movie name.
	else {

		request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=full&r=json", function (error, response, body) {
  			
			// if there is no error, and the page responds
  			if (!error && response.statusCode == 200) {
  				// change the body into a JSON object
    			var info = JSON.parse(body);
    			
    			//Title of the movie.
    			console.log("Title: " + info.Title);
				//Year the movie came out.
				console.log("Year: " + info.Year);
				//IMDB Rating of the movie.
				console.log("IMDB Rating: " + info.imdbRating);
				//Country where the movie was produced.
				console.log("Country: " + info.Country);
				//Language of the movie.
				console.log("Language: " + info.Language);
				//Plot of the movie.
				console.log("Plot: " + info.Plot);
				//Actors in the movie.
				console.log("Actors: " + info.Actors);
				//Rotten Tomatoes Rating.
				console.log("Rotten Tomatoes Rating: ");
				//Rotten Tomatoes URL.
				console.log("Rotten Tomatoes URL: ");
				return;
			}
		}); //call back function ends here


	}

} //movieInfo function ends here.

// ===================================================================

// This function reads a file and carries out the commands in the file

function justDoIt(){

	fs.readFile("random.txt", "utf8", function(error, data){

		if (error){

			console.log(error);
			return;
		}


		var instructions = data.split(",");
		var action = instructions[0];
		if (instructions.length > 1){
			additionalArgs = instructions[1];
		}

		switch (action){

			case "my-tweets":
				tweet()
				break;

			case "spotify-this-song":
				spotifySong()
				break;

			case "movie-this":
				movieInfo()
				break;

		}

	}); //callback function ends here

} // justDoIt function ends here.