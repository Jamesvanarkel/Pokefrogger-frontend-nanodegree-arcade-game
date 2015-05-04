/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
"use strict";
var rowImages = [],
    numRows = Math.round(window.innerHeight / 16),
    numCols = Math.round(window.innerWidth / 16),
    row, col;

var startOne = ['images/water.png', 'images/water.png', 'images/water.png', 'images/first-water.png', ];
var startTwo = ['images/ice2.png', 'images/ice2.png', 'images/ice2.png', 'images/last_ice.png', ];
var startThree = ['images/rock/other.png', 'images/rock/other.png', 'images/rock/topbeforelast.png', 'images/rock/toplast.png', ];


var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;
    var canvasY = canvas.height;
    var canvasX = canvas.width;

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    doc.body.appendChild(canvas);

    /* resize the canvas to fill browser window dynamically */
    window.addEventListener('resize', resizeCanvas, true);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


    }
    /* If the window is resized this function will fire
     * And all entities in reset will fire,
     * if the pokeball x cordinate is bigger that the canvas it will
     * be reset.
     */
    window.onresize = function(){

        reset();
        /* recalculate the width of canvas */
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        /* append the width to the variable that is used to move the enemy and hero around */
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        /** Recalculate the number of Rows and Colls if the
        *   resize is active
        **/
        numRows = Math.round(window.innerHeight / 16);
        numCols = Math.round(window.innerWidth / 16);

        if (pokeball.x > canvasX) {
            pokeball.reset();
        };
    }


    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function checkCollisions() {
        /** Find minimum distance between player and enemy. If minimum distance is
        small enough, consider it to be a collision and reset the game. */
        var colideX = 0.5 * enemy.width;
        var colideY = enemy.height;

        var xPlayer = player.x;
        var yPlayer = player.y;

        allEnemies.forEach(function(enemy) {
            if (Math.abs(xPlayer - enemy.x) < colideX && Math.abs(yPlayer - enemy.y) < colideX) {
                alert("Bang! YOU GOT FROGGED!");
                reset();
            }
        });
    }
    /** function to check if Player collides with Pokeball if so the score
    should be plussed */
    function checkScore() {
        var pokeballX = pokeball.width;
        var pokeballY = pokeball.height;

        var playerX = player.x;
        var playerY = player.y;

        if (Math.abs(playerX - pokeball.x) < pokeballX && Math.abs(playerY - pokeball.y) < pokeballY) {
            score();
        }
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();

        makeStage();
        resizeCanvas();

        checkScore();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
    }


    function score() {
        /** sets the pokeball on a random position when fired.*/
        pokeball.y = Math.floor(Math.random() * innerHeight);
        pokeball.x = Math.floor(Math.random() * innerWidth);

        /** adds 10 to the score.*/
        gameScore.content += 10;

        if (levelGame.content == 1 && gameScore.content == 50) { // LEVEL 2 instances

            levelGame.content += 1; // level gives a plus
            gameScore.content = 0; // Score is reset to 0.

        }

        if (levelGame.content == 2 && gameScore.content == 100) { // LEVEL 3 instances

            levelGame.content += 1; // level gives a plus
            gameScore.content = 0; // Score is reset to 0.

        }
    }


    function render() {
        if (pokeball.y < 62) { // Pokeball can't be spawn in water
            console.log("shots fired");
            pokeball.y = 64;
        }
        for (col = 0; col < numCols; col++) {
            for (row = 0; row < numRows; row++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 16, row * 16);
            }
        }
        renderEntities();
    }

    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        scoreboard.render();
        gameScore.render();
        levelGame.render();

        player.render();
        pokeball.render();
    }

    function makeStage() {

        var levelOneArray = ['images/PokeRoad.png', 'images/playerStart.png'];
        var levelTwoArray = ['images/ice2.png', 'images/ice1.png'];
        var levelThreeArray = ['images/rock/other.png'];


        var level;

        if (levelGame.content == 1 ) { /** LEVEL 1 instances */
            rowImages = [];
            rowImages = startOne;
            level = levelOneArray;
        }

        if (levelGame.content == 2) { /** LEVEL 2 instances */
            rowImages = [];
            rowImages = startTwo;
            level = levelTwoArray;

        }

        if (levelGame.content == 3) { /** LEVEL 3 instances */
            rowImages = [];
            rowImages = startThree;
            level = levelThreeArray;

        }

        for (var i = 0; i < numRows; i++) {
            rowImages.push(level[Math.floor(Math.random() * level.length)]);
        }

        if (i = numRows) {
            for (var j = 0; j < 9; j++) {
                rowImages.pop();
            }
            rowImages.push('images/stairs.png', 'images/rockyroad.png', 'images/rockyroad.png', 'images/rockyroad.png', 'images/rockyroad.png', 'images/rockyroad.png');
        }
    }

    function reset() {
        resizeCanvas();

        player.x = window.innerWidth / 2;
        player.y = window.innerHeight / 1.05;
        gameScore.content = 0;

    }
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/ash-back.png',
        'images/ash-left.png',
        'images/ash-right.png',
        'images/ash-front.png',
        'images/enemies/1.png',
        'images/enemies/2.png',
        'images/enemies/3.png',
        'images/enemies/4.png',
        'images/enemies/5.png',
        'images/enemies/6.png',
        'images/enemies/7.png',
        'images/enemies/8.png',
        'images/enemies/9.png',
        'images/enemies/10.png',
        'images/enemies/11.png',
        'images/enemies/12.png',
        'images/enemies/13.png',
        'images/enemies/14.png',
        'images/enemies/15.png',
        'images/enemies/16.png',
        'images/enemies/17.png',
        'images/enemies/18.png',
        'images/enemies/19.png',
        'images/enemies/20.png',
        'images/enemies/21.png',
        'images/enemies/22.png',
        'images/enemies/23.png',
        'images/enemies/24.png',
        'images/enemies/25.png',
        'images/enemies/26.png',
        'images/enemies/27.png',
        'images/enemies/28.png',
        'images/enemies/29.png',
        'images/enemies/30.png',
        'images/enemies/31.png',
        'images/enemies/32.png',
        'images/enemies/33.png',
        'images/enemies/34.png',
        'images/enemies/35.png',
        'images/enemies/36.png',
        'images/enemies/37.png',
        'images/enemies/38.png',
        'images/enemies/39.png',
        'images/enemies/40.png',
        'images/enemies/41.png',
        'images/enemies/42.png',
        'images/enemies/43.png',
        'images/enemies/44.png',
        'images/enemies/45.png',
        'images/enemies/46.png',
        'images/enemies/47.png',
        'images/enemies/48.png',
        'images/enemies/49.png',
        'images/enemies/50.png',
        'images/enemies/51.png',
        'images/enemies/52.png',
        'images/enemies/53.png',
        'images/enemies/54.png',
        'images/enemies/55.png',
        'images/enemies/56.png',
        'images/enemies/57.png',
        'images/enemies/58.png',
        'images/enemies/59.png',
        'images/enemies/60.png',
        'images/enemies/61.png',
        'images/enemies/62.png',
        'images/enemies/63.png',
        'images/enemies/64.png',
        'images/enemies/65.png',
        'images/enemies/66.png',
        'images/enemies/67.png',
        'images/enemies/68.png',
        'images/enemies/69.png',
        'images/enemies/70.png',
        'images/enemies/71.png',
        'images/enemies/72.png',
        'images/enemies/73.png',
        'images/enemies/74.png',
        'images/enemies/75.png',
        'images/enemies/76.png',
        'images/enemies/77.png',
        'images/enemies/78.png',
        'images/enemies/79.png',
        'images/enemies/80.png',
        'images/enemies/81.png',
        'images/enemies/82.png',
        'images/enemies/83.png',
        'images/enemies/84.png',
        'images/enemies/85.png',
        'images/enemies/86.png',
        'images/enemies/87.png',
        'images/enemies/88.png',
        'images/enemies/89.png',
        'images/enemies/90.png',
        'images/enemies/91.png',
        'images/enemies/92.png',
        'images/enemies/93.png',
        'images/enemies/94.png',
        'images/enemies/95.png',
        'images/enemies/96.png',
        'images/enemies/97.png',
        'images/enemies/98.png',
        'images/enemies/99.png',
        'images/enemies/100.png',
        'images/enemies/101.png',
        'images/enemies/102.png',
        'images/enemies/103.png',
        'images/enemies/104.png',
        'images/enemies/105.png',
        'images/enemies/106.png',
        'images/enemies/107.png',
        'images/enemies/108.png',
        'images/enemies/109.png',
        'images/enemies/110.png',
        'images/enemies/111.png',
        'images/enemies/112.png',
        'images/enemies/113.png',
        'images/enemies/114.png',
        'images/enemies/115.png',
        'images/enemies/116.png',
        'images/enemies/117.png',
        'images/enemies/118.png',
        'images/enemies/119.png',
        'images/enemies/120.png',
        'images/enemies/121.png',
        'images/enemies/122.png',
        'images/enemies/123.png',
        'images/enemies/124.png',
        'images/enemies/125.png',
        'images/enemies/126.png',
        'images/enemies/127.png',
        'images/enemies/128.png',
        'images/enemies/129.png',
        'images/enemies/130.png',
        'images/enemies/131.png',
        'images/enemies/132.png',
        'images/enemies/133.png',
        'images/enemies/134.png',
        'images/enemies/135.png',
        'images/enemies/136.png',
        'images/enemies/137.png',
        'images/enemies/138.png',
        'images/enemies/139.png',
        'images/enemies/140.png',
        'images/enemies/141.png',
        'images/enemies/142.png',
        'images/enemies/143.png',
        'images/enemies/144.png',
        'images/enemies/145.png',
        'images/enemies/146.png',
        'images/enemies/147.png',
        'images/enemies/148.png',
        'images/enemies/149.png',
        'images/enemies/150.png',
        'images/enemies/151.png',
        'images/PokeRoad.png',
        'images/playerStart.png',
        'images/water.png',
        'images/first-water.png',
        'images/stairs.png',
        'images/overlay.png',
        'images/rockyroad.png',
        'images/left-bottom-rock.png',
        'images/left-center-rock.png',
        'images/left-top-rock.png',
        'images/right-bottom-rock.png',
        'images/right-center-rock.png',
        'images/right-top-rock.png',
        'images/center-center-rock.png',
        'images/pokeball.png',
        'images/score-holder.png',
        'images/ice1.png',
        'images/ice2.png',
        'images/first_ice.png',
        'images/last_ice.png',
        'images/rock/2.png',
        'images/rock/other.png',
        'images/rock/topbeforelast.png',
        'images/rock/toplast.png'

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);