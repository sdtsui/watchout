// start slingin' some d3 here.

var Flotsam = function(){

}


var Enemy = function(x,y, imgURL){
  this.height = 50;
  this.width = 50;

  if (x===undefined){
    x = getRandomInt(0, gameBoardWidth-this.width);
  }
  if (y===undefined){
    y = getRandomInt(0, gameBoardHeight-this.height);
  }

  this.x = x;
  this.y = y;
  this.imgURL = imgURL;
}

Enemy.prototype = Object.create(Flotsam.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.move = function(){
  this.x = getRandomInt(0, gameBoardWidth-this.width);
  this.y = getRandomInt(0, gameBoardHeight-this.height);
}


var Player = function(){}

var createEnemies = function (num){
  for (var i=0; i<num; i++){
    var enemy = new Enemy( undefined, undefined ,"asteroid.png");
    enemies.push(enemy);
  }
  d3.select("svg").selectAll("image").data(enemies)
    .enter()
    .append("image")//.attr("xlink:href", function(d){return d.imgURL;})
    .attr(
      {
        "class" : "enemy",
        "xlink:href": function(d){return d.imgURL;},
        "x": function(d){return d.x+"px";},
        "y": function(d){return d.y+"px";},
        "height": function(d){return d.height},
        "width":function(d){return d.width}
      });
};

var moveEnemiesToRandomLocation = function (){
  enemies.forEach(function(enemy){
    enemy.move();
  });
  d3.selectAll("image.enemy").data(enemies)
    .transition()
    .duration(1000)
    .attr(
      {
        "x": function(d){return d.x+"px";},
        "y": function(d){return d.y+"px";},
      });
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
