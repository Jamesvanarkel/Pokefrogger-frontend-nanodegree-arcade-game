var score = 0;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Enemies move from right to left. With diffrent speeds
    //When a Enemy hit the character needs to move back to the starting point.
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -2;
    this.y = Math.ceil(Math.random() * 3) * 83 - 83 * 0.3;
    this.speed = 100;
    this.sprite = 'images/enemy-bug.png';


}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.x =  200;
    this.y = 380;

    this.sprite = 'images/enemy-bug.png';
}

Player.prototype.update = function(){
//
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(move){
  switch(move) {
        case 'left':
            if(this.x - 101 < -101) return;
            this.x -= 101;
        break;
        case 'up':
            if(this.y - 83 < 0) return;
            this.y -= 83;
        break;
        case 'right':
            if(this.x + 101 > 505 - 101) return;
            this.x += 101;
        break;
        case 'down':
            if(this.y + 83 > 606 - (83 * 2)) return;
            this.y += 83;
        break;
        case 'space':
            ctx.fillText('Welcome to spaceMode', 10, 90);
            console.log('space');
        break;
    }
    this.render();

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
        player.handleInput(allowedKeys[e.keyCode]);
});