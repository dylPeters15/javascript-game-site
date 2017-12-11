function start() {
    console.log("start");
    var jumpGame = new JumpGame();
    document.body.appendChild(jumpGame.getDisplayItem());
    jumpGame.startGame();
}










class JumpGame {
    constructor() {
        this.gameDiv = document.createElement("div");
        this.myGamePiece = new Component(30, 30, "red", 10, 120);
        this.myGamePiece.gravity = 0.05;
        this.myScore = new Component("30px", "Consolas", "black", 280, 40, "text");
        this.myGameArea = new GameArea();
    }
    getDisplayItem(){
        return this.gameDiv;
    }
    startGame() {
        this.myGameArea.start();
    }
    updateGameArea() {
        var x, height, gap, minHeight, maxHeight, minGap, maxGap;
        for (i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                return;
            } 
        }
        this.myGameArea.clear();
        this.myGameArea.frameNo += 1;
        if (this.myGameArea.frameNo == 1 || everyinterval(150)) {
            x = this.myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myScore.text="SCORE: " + this.myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }
    everyinterval(n) {
        return (this.myGameArea.frameNo / n) % 1 == 0;
    }
    accelerate(n) {
        myGamePiece.gravity = n;
    }
}

class GameArea {
    constructor() {
        this.canvas = document.createElement("canvas");
    }
    start() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
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

