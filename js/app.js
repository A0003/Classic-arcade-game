// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
}

//Player movement

Player.prototype.handleInput = function (keyPress) {
     if (keyPress == 'left' && this.x > 0) {
        this.x -=100;
    }

    if (keyPress == 'right' && this.x < 400) {
        this.x +=100;
    }

    if (keyPress == 'up' && this.y > -20) {
        this.y -=80;
    }

    if (keyPress == 'down' && this.y < 380) {
        this.y +=80;
    }

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Success

var winningPosition = false;


function success () {
    winningPosition = true;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player (200, 380);
var allEnemies = [];

function createEnemies () {
    for (var i = 0; i < 5; i++) {
        var enemy = new Enemy(enemySpawn(), enemyLocation(), enemySpeed());
        allEnemies.push(enemy);

      }
  };

createEnemies();

//Collisions

window.setInterval(function checkEnemy() {
  for (var k = 0; k < allEnemies.length; k++) {
      if (allEnemies[k].x > 505) {
        allEnemies.splice(k, 1);
        var nextWave = new Enemy(enemySpawn(), enemyLocation(), enemySpeed());
        allEnemies.push(nextWave);
        }
    }
                winningPosition = false;
                player.resetPlayer();
                collisions();

            }, 50);


function collisions () {
  for (var i = 0; i < allEnemies.length; i++) {
      if (allEnemies[i].y > player.y-20 && allEnemies[i].y < player.y+20 && allEnemies[i].x < player.x+60 && allEnemies[i].x > player.x-60) {
        player.y = 380;

              }
          }
      }

//Enemy speed

var spawnSpeed;

function enemySpeed () {
    spawnSpeed = (Math.random()*250)+100;
    return spawnSpeed;

}

//Enemy location

function enemyLocation() {
    tier = Math.round(Math.random()*3);
    if (tier === 3) {
        return 225;
    }
    else if (tier === 2) {
        return 140;
    }
    else if (tier === 1) {
        return 55;
    }
    else {
        return enemyLocation();
    }
}

var spawn;


function enemySpawn() {
     spawn = -Math.round((Math.random()*1000)+10);
         for (var j = 0; j < allEnemies.length; j++) {
            if (spawn > (allEnemies[j].x - 100) && spawn < (allEnemies[j].x + 100)) {
                enemySpawn();
            } else {
                return spawn;
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
