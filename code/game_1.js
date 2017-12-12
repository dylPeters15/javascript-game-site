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
        this._upButton.onclick = function() {
            _self._gameArea.up();
        };

        this._downButton = document.createElement("BUTTON");
        this._downButton.textContent = "Down";
        this._downButton.onclick = function() {
            _self._gameArea.down();
        };

        this._startButton = document.createElement("BUTTON");
        this._startButton.textContent = "Start";
        this._startButton.onclick = function() {
            _self._gameArea.start();
        };

        this._resetButton = document.createElement("BUTTON");
        this._resetButton.textContent = "Reset";
        this._resetButton.onclick = function() {
            _self._gameArea.reset();
        };

        this._displayItem.appendChild(this._gameArea.displayItem);
        this._displayItem.appendChild(this._upButton);
        this._displayItem.appendChild(this._downButton);
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
        this._running = false;

        this._playerBlock = new PlayerBlock(30, 30, "red", 10, 120, 5, 5);

        this.reset();
    }
    get displayItem() {
        return this._canvas;
    }
    start() {
        console.log("start");
        this._running = true;

        var _self = this;
        this._interval = setInterval(function() {
            _self._updateGameArea(_self);
        }, 20);
    }
    reset() {
        console.log("reset");
        this._running = false;

        clearInterval(this._interval);
        this._interval = null;

        this._playerBlock = new PlayerBlock(30, 30, "red", 10, 120, 5, 5);

        this._drawCanvas(this);
    }
    up() {
        console.log("up");
        if (this._running) {
            this._playerBlock.up();
            this._drawCanvas(this);
        }
    }
    down() {
        console.log("down");
        if (this._running) {
            this._playerBlock.down();
            this._drawCanvas(this);
        }
    }
    _updateGameArea(_self) {
        console.log("Update");
        //console.log(_self);
        _self._drawCanvas(_self);
    }
    _drawCanvas(_self) {
        _self._canvas.getContext("2d").clearRect(0, 0, _self._canvas.width, _self._canvas.height);
        _self._playerBlock.drawOnCanvas(_self._canvas);
    }
}

class AbstractMethodException {
    constructor() {
        this._description = "Cannot run abstract method.";
    }
    get description() {
        return this._description;
    }
}

class AbstractComponent {
    constructor(width, height, color, x, y) {
        this._width = width;
        this._height = height;
        this._color = color;
        this._x = x;
        this._y = y;
    }
    drawOnCanvas(canvas) {
        throw new AbstractMethodException();
    }
    get width() {
        return this._width
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
}

class RectangleComponent extends AbstractComponent {
    constructor(width, height, color, x, y) {
        super(width, height, color, x, y);
    }
    drawOnCanvas(canvas) {
        var context = canvas.getContext("2d");
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class PlayerBlock extends RectangleComponent {
    constructor(width, height, color, x, y, xStep, yStep) {
        super(width, height, color, x, y);
        this._xStep = xStep;
        this._yStep = yStep;
    }
    get xStep() {
        return this._xStep;
    }
    set xStep(xStep) {
        this._xStep = xStep;
    }
    get yStep() {
        return this._yStep;
    }
    set yStep(yStep) {
        this._yStep = yStep;
    }
    up() {
        this.y -= this.yStep;
    }
    down() {
        this.y += this.yStep
    }
    left() {
        this.x -= this.xStep;
    }
    right() {
        this.x += this.xStep;
    }
}

class ConstantSpeedRectangleComponent extends RectangleComponent {
    constructor(width, height, color, x, y, xVel, yVel) {
        super(width, height, color, x, y);
        this._xVel = xVel;
        this._yVel = yVel;
    }
    get xVel() {
        return this._xVel;
    }
    set xVel(xVel) {
        this._xVel = xVel;
    }
    get yVel() {
        return this._yVel;
    }
    set yVel(yVel) {
        this._yVel = yVel;
    }
    update(timeElapsed) {
        this.x = this.x + timeElapsed * this.xVel;
        this.y = this.y + timeElapsed * this.yVel;
    }
}

class ScoreComponent extends AbstractComponent {
    constructor(width, height, color, x, y) {
        super(width, height, color, x, y);
        this._score = 0;
    }
    drawOnCanvas(canvas) {
        var context = canvas.getContext("2d");
        context.font = this.width + this.height;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    }
    get score() {
        return this._score;
    }
    set score(newScore) {
        this._score = newScore;
    }
    get text() {
        return "Score: " + this.score;
    }
}