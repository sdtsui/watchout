// start slingin' some d3 here.

var Flotsam = function(){

}


var Enemy = function(x,y, imgURL){

  if (x===undefined){
    x = Math.random()*gameBoardWidth;
  }
  if (y===undefined){
    y = Math.random()*gameBoardHeight;
  }

  this.x = x;
  this.y = y;
  this.imgURL = imgURL;
  this.height = "50px";
  this.width = "50px";
}

Enemy.prototype = Object.create(Flotsam.prototype);
Enemy.prototype.constructor = Enemy;


var Player = function(){}

var createEnemies = function (num){
  var enemies = [];

  for (var i=0; i<num; i++){
    var enemy = new Enemy( undefined, undefined ,"asteroid.png");
    enemies.push(enemy);
  }
  d3.select("svg").selectAll("image").data(enemies)
    .enter()
    .append("image")//.attr("xlink:href", function(d){return d.imgURL;})
    .attr(
      {
        "xlink:href": function(d){return d.imgURL;},
        "x": function(d){return d.x;},
        "y": function(d){return d.y;},
        "height": function(d){return d.height},
        "width":function(d){return d.width}
      });
};

