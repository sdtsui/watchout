// start slingin' some d3 here.

var Flotsam = function(){

}


var Enemy = function(x,y, imgURL){
  this.id = idCounter++;
  this.height = 50;
  this.width = 50;

  if (x===undefined){
    x = getRandomInt(0, gameBoardWidth - this.width);
  }
  if (y===undefined){
    y = getRandomInt(0, gameBoardHeight - this.height);
  }

  this.x = x;
  this.y = y;
  this.imgURL = imgURL;
  this.collided = false;  // toggle to count only one collision per overlap
}

Enemy.prototype = Object.create(Flotsam.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.move = function(){
  this.x = getRandomInt(0, gameBoardWidth - this.width);
  this.y = getRandomInt(0, gameBoardHeight - this.height);
}
Enemy.prototype.checkForCollisions = function(){
  var img = d3.selectAll('image.enemy').data([this], function(d) {return d.id});
  var enemy = this;
  var x1 = +img.attr('x').slice(0, -2);
  var y1 = +img.attr('y').slice(0, -2);
  var width = this.width;
  players.forEach(function(player){
    var x2 = player.x;
    var y2 = player.y;
    var distance = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    if (distance < (player.width + width) / 2) {
      if (!this.collided) {
        this.collided = true;
        handleCollision();
      }
    } else {
      enemy.collided = false;
    }
  }, this)

}
var incrementScoreboard = function(){
  currentScore++;
  updateScoreboard();
}

var updateScoreboard = function(){
  d3.selectAll("div.high span").text(highScore);
  d3.selectAll("div.current span").text(currentScore);
  d3.selectAll("div.collisions span").text(collisions);

};

var handleCollision = function(){
  if (currentScore > highScore){
    highScore = currentScore;
  }
  currentScore = 0;
  collisions++;
  updateScoreboard();
}

var Player = function(x, y, imgURL){
  this.id = idCounter++;
  this.height = 50;
  this.width = 50;

  if (x===undefined){
    x = (gameBoardWidth - this.width) / 2;
  }
  if (y===undefined){
    y = (gameBoardHeight - this.height) / 2;
  }

  this.x = x;
  this.y = y;
  this.imgURL = imgURL;

}

var createEnemies = function (num){
  for (var i=0; i<num; i++){
    var enemy = new Enemy( undefined, undefined ,"asteroid.png");
    enemies.push(enemy);
  }
  d3.select("svg").selectAll("image")
    .data(enemies, function(d){return d.id;})
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
  d3.selectAll("image.enemy").data(enemies, function(d){return d.id;})
    .transition()
    .duration(1000)
    .attr(
      {
        "x": function(d){return d.x+"px";},
        "y": function(d){return d.y+"px";},
      });
}


var createPlayers = function(numPlayers) {
  // Create new players
  for(var i = 0; i < numPlayers; i++) {
    var player = new Player(undefined, undefined, "Player.png");
    players.push(player);
  }
  // Add Players to the gameboard
  d3.select('svg').selectAll('image.player')
    .data(players, function(d) {return d.id;})
    .enter()
    .append('image')
    .attr(
      {
        "class" : "player",
        "xlink:href": function(d){return d.imgURL;},
        "x": function(d){return d.x+"px";},
        "y": function(d){return d.y+"px";},
        "height": function(d){return d.height},
        "width":function(d){return d.width}
      })
    // .on('mousedown', dragLockPlayer);
    //.call(drag);
  d3.select('svg').on('mousemove', function(){
    var mousePosition = d3.mouse(this);
    var player = players[0];
    player.x = mousePosition[0] - player.width / 2;
    player.y = mousePosition[1] - player.height / 2;
    d3.selectAll('image.player')
      .attr(
        {
          'x': function(d){return d.x},
          'y': function(d){return d.y}
        });
  });
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// var dragLockPlayer = function(e){
//   console.log(e);
//   d3.select('image.player').on('mousemove', movePlayer);


// }

// var movePlayer = function(player){
//   // d3.select('image.player')
//   console.dir(this);

//   // var player = d3.select('image.player').???
//   player.x = d3.mouse(this)[0] - player.width / 2;
//   player.y = d3.mouse(this)[1] - player.height / 2;

//   d3.select('image.player').attr(
//   {
//     "x": function(d){return d.x+"px";},
//     "y": function(d){return d.y+"px";},
//   })

// }

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select('image.player').attr(
    {
      'x': function(d){return d.x+'px';},
      'y': function(d){return d.y+'px';}
    });
  });
