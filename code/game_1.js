function start() {
    console.log("loading");
    var jumpGame = new JumpGame();
    document.body.appendChild(jumpGame.displayItem);
    console.log("loaded");
}



class JumpGame {
    constructor() {
        var _self = this;

        this._displayItem = document.createElement("div");

        this._gameArea = new GameArea();

        this._upButton = document.createElement("BUTTON");
        this._upButton.textContent = "Up";
        this._upButton.onclick = function(){
            _self._gameArea.up();
        };

        this._startButton = document.createElement("BUTTON");
        this._startButton.textContent = "Start";
        this._startButton.onclick = function(){
            _self._gameArea.start();
        };

        this._resetButton = document.createElement("BUTTON");
        this._resetButton.textContent = "Reset";
        this._resetButton.onclick = function(){
            _self._gameArea.reset();
        };

        this._displayItem.appendChild(this._gameArea.displayItem);
        this._displayItem.appendChild(this._upButton);
        this._displayItem.appendChild(this._startButton);
        this._displayItem.appendChild(this._resetButton);
    }
    get displayItem() {
        return this._displayItem;
    }
}

class GameArea {
    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = 480;
        this._canvas.height = 270;
        this._frameNo = 0;
        this._gravity = 0.05;
        this._interval = null;
        this.reset();
    }
    get displayItem() {
        return this._canvas;
    }
    start() {
        console.log("start");
        
        this._interval = setInterval(this._updateGameArea, 20);
    }
    reset() {
        console.log("reset");

        clearInterval(this._interval);
        this._interval = null;
        
        this._canvas.getContext("2d").fillStyle = "red";
        this._canvas.getContext("2d").fillRect(10, 120, 30, 30);
    }
    up() {
        console.log("up");
    }
    _updateGameArea(){
        console.log("Update");
    }
}

/*
class AbstractMethodException {
    constructor() {
        this._description = "Cannot run abstract method.";
    }
    get description() {
        return this._description;
    }
}

class AbstractComponent {
    constructor(width, height, color, x, y){
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
    }
    update(params) {
        throw new AbstractMethodException();
    }
}

class TextComponent {
    constructor(width, height, color, x, y){
        super(width, height, color, x, y);
    }
    update(params){

    }
}

class Component {
    constructor(width, height, color, x, y, type){
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }
    update() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    hitBottom() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
*/

/*class GameArea {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        //this.interval = setInterval(updateGameArea, 20);
    }
    start() {
        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Component {
    constructor(width, height, color, x, y, type){
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }
    update() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    hitBottom() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

*/