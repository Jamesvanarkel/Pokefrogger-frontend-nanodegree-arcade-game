// ///////////////////////////////////
// //             ENEMY             //
// ///////////////////////////////////

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.width = 101;
    this.height = 101;
    this.x = -101;
    this.y = Math.ceil(Math.random() * 5) * 83 - 83 * 0.3;
    this.speed = Math.floor(Math.random() * (400)) + 150;

}

Enemy.prototype.random = function(imgAr, path) {

    random_images_array = ['01.png', '02.png', '03.png'];

    path = path || 'images/enemies/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    this.sprite =  path + img ;

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // If the Enemy exeeds the window width it will be reset by the reset function
    if (this.x > window.innerWidth) {
        this.reset();
    };
}

Enemy.prototype.reset = function() {
    this.x = -110;
    this.y = Math.ceil(Math.random() * 5) * 83 - 83 * 0.3;
    this.speed = Math.floor(Math.random() * (400)) + 150;
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// ////////////////////////////////////
// //             PLAYER            //
// ///////////////////////////////////

var Player = function(){

    this.sprite = 'images/ash-back.png';
    this.x =  window.innerWidth / 2;
    this.width = 22;
    this.height = 27;

// Change the img sprite to the right instanse: source: http://stackoverflow.com/questions/15551490/change-image-on-keypress
    this.imgUp = 'images/ash-back.png';
    this.imgLeft = 'images/ash-left.png';
    this.imgRight = 'images/ash-right.png';
    this.imgDown = 'images/ash-front.png';


}

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(move){
      switch(move) {
        case 'left':
            if(this.x - 22 < -22) return;
            this.x -= 22;
            player.sprite = player.imgLeft; break; // left key
        break;
        case 'up':
            if(this.y - 100 < 0) return;
            this.y -= 22;
            player.sprite = player.imgUp; break; // up key
        break;
        case 'right':
            if(this.x + 101 > window.innerWidth - 201) return;
            this.x += 22;
            player.sprite = player.imgRight; break; // right key
        break;
        case 'down':
            if(this.y + 83 > window.innerHeight  ) return;
            this.y += 22;
            player.sprite = player.imgDown; break; // down key
        break;
        case 'space':
            ctx.fillText('Welcome to spaceMode', 10, 90);
            console.log('space');
        break;
    }
    this.render();
}

// ////////////////////////////////////
// //         Instaniates            //
// ///////////////////////////////////

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var myVar = setInterval (newEnemies, 2000);
var allEnemies = [];
var player = new Player();

for (wantedEnemies = 0; wantedEnemies < 8; wantedEnemies++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

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