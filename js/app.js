// ///////////////////////////////////
// //             ENEMY             //
// ///////////////////////////////////

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.width = 61;
    this.height = 60;
    this.x = -101;
    this.y = Math.ceil(Math.random() * 9) * 61 - 61 * 0.3;
    this.speed = Math.floor(Math.random() * (400)) + 150; // left to right

    this.path = 'images/enemies/'; // default path of image here

    this.num = Math.floor(Math.random() * ((0 - 151) + 1) + 151); // generate a number between 1 and 151
    this.sprite = this.path + this.num + ".png"; //make the image string
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    // If the Enemy exeeds the window width it will be reset by the reset function
    if (this.x > window.innerWidth) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = -110;
    this.y = Math.ceil(Math.random() * 5) * 83 - 83 * 0.3;
    this.speed = Math.floor(Math.random() * (400)) + 150;

    //regenerate sprite so it is a diffrent Pokémon
    this.path = 'images/enemies/'; // default path of image here

    this.num = Math.floor(Math.random() * ((0 - 151) + 1) + 151); // generate a number between 1 and 151
    this.sprite = this.path + this.num + ".png"; //make the image string
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ////////////////////////////////////
// //             PLAYER            //
// ///////////////////////////////////

var Player = function() {
    this.sprite = 'images/ash-back.png';
    this.width = 22;
    this.height = 27;

    // Change the img sprite to the right instanse: source: http://stackoverflow.com/questions/15551490/change-image-on-keypress
    this.imgUp = 'images/ash-back.png';
    this.imgLeft = 'images/ash-left.png';
    this.imgRight = 'images/ash-right.png';
    this.imgDown = 'images/ash-front.png';
};

Player.prototype.handleInput = function(move) {
    switch (move) {
        case 'left':
            if (this.x - 42 < -22) return;
            this.x -= 22;
            player.sprite = player.imgLeft;
            break; // left key
            break;
        case 'up':
            if (this.y - 64 < 0) return;
            this.y -= 22;
            player.sprite = player.imgUp;
            break; // up key
            break;
        case 'right':
            if (this.x + 31 > window.innerWidth) return;
            this.x += 22;
            player.sprite = player.imgRight;
            break; // right key
            break;
        case 'down':
            if (this.y + 40 > window.innerHeight) return;
            this.y += 22;
            player.sprite = player.imgDown;
            break; // down key
        case 'space': // WIP don't know what i want to do yet. Something with gifs orso.. Pokegifs!
            ctx.fillText('Welcome to spaceMode', 100, 100);
            console.log('space');
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ////////////////////////////////////
// //         Pokeball              //
// ///////////////////////////////////

var Pokeball = function() {
    this.sprite = 'images/pokeball.png';
    this.width = 16;
    this.height = 16;
    this.x = Math.floor(Math.random() * innerWidth);
    this.y = Math.floor(Math.random() * innerHeight);
};

Pokeball.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Pokeball.prototype.reset = function() {
    this.y = Math.floor(Math.random() * innerHeight);
    this.x = Math.floor(Math.random() * innerWidth);
};

// ////////////////////////////////////
// //         Scoreboard            //
// ///////////////////////////////////

var Scoreboard = function() {
    this.sprite = 'images/score-holder.png';
    this.x = 0;
    this.y = 0;

};

Scoreboard.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// ////////////////////////////////////
// //            Score              //
// ///////////////////////////////////

var Score = function() {
    this.content = 0;
    this.x = 62;
    this.y = 25;
};

Score.prototype.render = function() {
    ctx.fillText(this.content, this.x, this.y);
};



// ////////////////////////////////////
// //            Level              //
// ///////////////////////////////////

var Level = function() {
    this.content = 1;
    this.x = 62;
    this.y = 44;
};

Level.prototype.render = function() {
    ctx.fillText(this.content, this.x, this.y);
};

// ////////////////////////////////////
// //         Instaniates            //
// ///////////////////////////////////

var allEnemies = [];
var player = new Player();
var pokeball = new Pokeball();
var scoreboard = new Scoreboard();
var gameScore = new Score();
var levelGame = new Level();

for (wantedEnemies = 0; wantedEnemies < 2; wantedEnemies++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

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