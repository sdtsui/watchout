var svg = document.getElementById("gameboard");
gameBoardWidth = +svg.getAttribute("width");
gameBoardHeight = +svg.getAttribute("height");
var numEnemies = 20;
var enemies = [];
createEnemies(numEnemies);

// Create interval to move enemies to a random location every second.
var gameTimer = setInterval(function(){
  moveEnemiesToRandomLocation();
} , 1000);
