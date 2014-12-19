var svg = document.getElementById("gameboard");
gameBoardWidth = +svg.getAttribute("width");
gameBoardHeight = +svg.getAttribute("height");
var numEnemies = 5;
createEnemies(numEnemies);
