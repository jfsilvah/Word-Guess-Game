var movies = [{
   title: "AVENGERS",
   img: "https://indiehoy.com/wp-content/uploads/2019/02/avengers-endgame-3.jpg",
},
{
   title: "IT",
   img: "https://cdn.images.express.co.uk/img/dynamic/36/590x/IT-movie-sequel-news-940882.jpg",
},
{
   title: "LION KING",
   img: "https://images-na.ssl-images-amazon.com/images/I/81MdzK4jw%2BL._SL1500_.jpg",
},
{
   title: "SPIDER MAN",
   img: "https://tanhispano.com/wp-content/uploads/2019/01/spider-man-far-from-home-e1547630582536.jpg",
}
];

var computerChoice;
var wins = 0;
var guessesLeft = -1;
var pressedKeyCode;
var lastKey = "@";
var letterExists;
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

      letterExists = false;
      computerChoice = Math.floor((Math.random() * movies.length));
      guessesLeft = 10;
      slashes = 0;
      movieDiscovered = movies[computerChoice].title;
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

   winText.textContent = "WINS: 0";
   guessesText.textContent = "GUESSES REMAINING: " + guessesLeft;
   pressedText.textContent = "";
   movieNameText.textContent = movieDiscovered;

}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

   // Determines which key was pressed in ASCII code.
   pressedKey = event.key.toUpperCase();
   pressedKeyCode = (pressedKey.charCodeAt(0));
   letterExists = false;
   console.log(pressedKeys.length);
   if (pressedKeyCode >= 65 && pressedKeyCode <= 90 && pressedKey.length === 1) {
      if (guessesLeft === -1) {

         computerChoice = Math.floor((Math.random() * movies.length));
         guessesLeft = 10;
         slashes = 0;
         movieDiscovered = movies[computerChoice].title;
         for (var i = 0; i < movies[computerChoice].title.length; i++) {
            movieDiscovered = setCharAt(movieDiscovered, i, "_");
            slashes++;
         }
      }
      if (guessesLeft === 10 && pressedKeys.length <= 1 &&pressedKeys[0] === "@") {
         pressedText.textContent = "";
         winText.textContent = "WINS: 0";
         guessesText.textContent = "GUESSES REMAINING: 10";
         guessesLeft = 10;
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

      lastKey = false;
      for (var i = 0; i < pressedKeys.length; i++) {
         if (pressedKey === pressedKeys[i]) {
            lastKey = true;
         }
      }

      if (pressedKeyCode >= 65 && pressedKeyCode <= 90 && pressedKey.length === 1 && lastKey === false) {
         console.log(pressedKeys.length);
         if (guessesLeft === 10 && pressedKeys.length <= 1 && pressedKeys[0] === "@") {
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
               letterExists = true;
            }
         }

         if (letterExists === false){
             guessesLeft--;
         }

         if (slashes <= 0 && guessesLeft >= 0) {
            wins++;
            var sounds = new Audio('assets/sounds/winner.mp3');
            sounds.play();
            console.log("sonido");
            guessesLeft = 10;
            pressedKey = "";
            pressedText.textContent = "";
            pressedKeys = "@";
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
            var sounds = new Audio('assets/sounds/loser.mp3');
            sounds.play();
            guessesLeft = 10;
            pressedKey = "";
            pressedKeys = "@";
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
   }
};

