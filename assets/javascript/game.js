var movies = [{
   title: "AVENGERS",
   img: "https://indiehoy.com/wp-content/uploads/2019/02/avengers-endgame-3.jpg",
   sound: "abc"
},
{
   title: "IT",
   img: "https://cdn.images.express.co.uk/img/dynamic/36/590x/IT-movie-sequel-news-940882.jpg",
   sound: "abc"
},
{
   title: "LION KING",
   img: "https://images-na.ssl-images-amazon.com/images/I/81MdzK4jw%2BL._SL1500_.jpg",
   sound: "abc"
},
{
   title: "SPIDER MAN",
   img: "https://tanhispano.com/wp-content/uploads/2019/01/spider-man-far-from-home-e1547630582536.jpg",
   sound: "abc"
}
];

var computerChoice;
var wins = 0;
var guessesLeft = -1;
var pressedKeyCode;
var lastKey = "@";
var pressedKey;
var pressedKeys = "@";
var movieDiscovered;
var slashes = 0;
var winText = document.getElementById("winners");
var guessesText = document.getElementById("guessesLeft");
var pressedText = document.getElementById("pressedKey");
var movieNameText = document.getElementById("movieNameComplete");

function setCharAt(str, index, chr) {
   if (index > str.length - 1)
      return str;
   return str.substr(0, index) + chr + str.substr(index + 1);
}

document.onclick = function (event) {

   if (guessesLeft === -1) {

      computerChoice = Math.floor((Math.random() * movies.length));
      guessesLeft = 15;
      slashes = 0;
      movieDiscovered = movies[computerChoice].title;
      for (var i = 0; i < movies[computerChoice].title.length; i++) {
         movieDiscovered = setCharAt(movieDiscovered, i, "_");
         slashes++;
      }
   }

   winText.textContent = "WINS: 0";
   guessesText.textContent = "GUESSES REMAINING: " + guessesLeft;
   pressedText.textContent = "";
   movieNameText.textContent = movieDiscovered;

}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

   if (guessesLeft === -1) {

      computerChoice = Math.floor((Math.random() * movies.length));
      guessesLeft = 15;
      slashes = 0;
      movieDiscovered = movies[computerChoice].title;
      for (var i = 0; i < movies[computerChoice].title.length; i++) {
         movieDiscovered = setCharAt(movieDiscovered, i, "_");
         slashes++;
      }
   }
   if (guessesLeft === 15) {
      pressedText.textContent = "";
      winText.textContent = "WINS: 0";
      guessesText.textContent = "GUESSES REMAINING: 15";
      guessesLeft = 15;
      movieDiscovered = movies[computerChoice].title;
      slashes = 0;
      for (var i = 0; i < movies[computerChoice].title.length; i++) {
         if (movieDiscovered[i] === " ") {
            movieDiscovered = setCharAt(movieDiscovered, i, " ");
         }
         else {
            movieDiscovered = setCharAt(movieDiscovered, i, "_");
            slashes++;
         }
      }
   }
   // Determines which key was pressed in ASCII code.
   pressedKey = event.key.toUpperCase();
   pressedKeyCode = (pressedKey.charCodeAt(0));

   lastKey = false;
   for (var i = 0; i < pressedKeys.length; i++) {
      if (pressedKey === pressedKeys[i]) {
         lastKey = true;
      }
   }

   if (pressedKeyCode >= 65 && pressedKeyCode <= 90 && pressedKey.length === 1 && lastKey === false) {
      lastKey = pressedKey;
      if (guessesLeft === 15) {
         pressedText.textContent = pressedKey;
         pressedKeys = pressedKey;
      }
      else {
         pressedText.textContent = pressedText.textContent + "," + pressedKey;
         pressedKeys = pressedKeys + pressedKey;
      }

      for (var i = 0; i < movieDiscovered.length; i++) {
         if (pressedKey === movies[computerChoice].title[i]) {
            movieDiscovered = setCharAt(movieDiscovered, i, pressedKey);
            slashes--;
         }
      }

      guessesLeft--;

      if (slashes <= 0 && guessesLeft >= 0) {
         wins++;
         guessesLeft = 15;
         pressedKey = "";
         pressedText.textContent = "";
         pressedKeys = "";
         document.getElementById("movieFile").src = movies[computerChoice].img;
         document.getElementById("movieAudio").src = movies[computerChoice].img;
         computerChoice = Math.floor((Math.random() * movies.length));
         movieDiscovered = movies[computerChoice].title;
         slashes = 0;
         for (var i = 0; i < movies[computerChoice].title.length; i++) {
            if (movieDiscovered[i] === " ") {
               movieDiscovered = setCharAt(movieDiscovered, i, " ");
            }
            else {
               movieDiscovered = setCharAt(movieDiscovered, i, "_");
               slashes++;
            }
         }
      }
      if (guessesLeft <= 0) {
         guessesLeft = 15;
         pressedKey = "";
         pressedKeys = "";
         pressedText.textContent = "";
         document.getElementById("movieFile").src = movies[computerChoice].img;
         computerChoice = Math.floor((Math.random() * movies.length));
         movieDiscovered = movies[computerChoice].title;
         slashes = 0;
         for (var i = 0; i < movies[computerChoice].title.length; i++) {
            if (movieDiscovered[i] === " ") {
               movieDiscovered = setCharAt(movieDiscovered, i, " ");
            }
            else {
               movieDiscovered = setCharAt(movieDiscovered, i, "_");
               slashes++;
            }
         }
      }
   }

   winText.textContent = "WINS: " + wins;
   guessesText.textContent = "GUESSES REMAINING: " + guessesLeft;
   movieNameText.textContent = movieDiscovered;

};


