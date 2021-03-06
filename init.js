var svg = document.getElementById("gameboard");
gameBoardWidth = +svg.getAttribute("width");
gameBoardHeight = +svg.getAttribute("height");
var numEnemies = 15;
var players = []; // stores all players
var enemies = []; // stores all enemies
var idCounter = 0; // This counter increments to create unique ids.
var currentScore = 0;
var highScore = 0;
var collisions = 0;

// Start game with one player.
createPlayers(1);

// Place enemies on board.
createEnemies(numEnemies, {imgURL: 'FredFace.png'});

// Create interval to move enemies to a random location every second.
var gameTimer = setInterval(function(){
  moveEnemiesToRandomLocation();
  incrementScoreboard();
} , 1000);

// Create interval to check for collisions 60 times per second.

var collisionTimer = setInterval(function(){
  enemies.forEach(function(enemy){
    enemy.checkForCollisions();
  });
},17);


// Set up scoreboard.
updateScoreboard();
