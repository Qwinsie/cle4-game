class Code {
    constructor(xStart, yStart) {
        this.collisionRobotCode = false;
        this.collected = false;
        this.spawnCode(xStart, yStart);
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawnCode(xStart, yStart) {
        this._div = document.createElement("code");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = xStart;
        this._y = yStart;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`;
    }
    update() {
        if (this.collected) {
            console.log("collected");
            this._div.remove();
            this.collected = false;
        }
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
    getFutureRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Enemy1 {
    constructor(xStart, yStart) {
        this._x = 0;
        this._y = 0;
        this.xVelo = 0;
        this.yVelo = 0;
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.alive = true;
        this.spawnEnemy1(xStart, yStart);
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawnEnemy1(xStart, yStart) {
        this._div = document.createElement("enemy1");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = xStart;
        this._y = yStart;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    update() {
        this.leftspeed = +1;
        let newX = this._x - this.leftspeed + this.rightspeed;
        if (newX < (1440 - this._div.clientWidth)) {
            this._x = newX;
        }
        if (newX < 0 - this._div.clientWidth) {
            this._div.remove();
        }
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Enemy2 {
    constructor(xStart, yStart) {
        this._x = 0;
        this._y = 0;
        this.xVelo = 0;
        this.yVelo = 0;
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.alive = true;
        this.spaceKey = 0;
        this.space = false;
        this.jumping = true;
        this.spaceKey = 88;
        this.spawnEnemy2(xStart, yStart);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawnEnemy2(xStart, yStart) {
        this._div = document.createElement("enemy2");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = xStart;
        this._y = yStart;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = true;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = false;
                break;
        }
    }
    update() {
        if (this.space && this.jumping == false) {
            this.yVelo -= 50;
            this.jumping = true;
        }
        this.yVelo += 1.2;
        this._y += this.yVelo;
        this.yVelo *= 0.95;
        if (this._y > 600) {
            this.jumping = false;
            this._y = 600;
            this.yVelo = 0;
        }
        let newX = this._x - this.leftspeed + this.rightspeed;
        if (newX < this._x || newX > this._x || this._y <= 600) {
            if (newX > 0 && newX < (1440 - this._div.clientWidth)) {
                this._x = newX;
            }
            this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
        }
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Robot {
    constructor(xStart, yStart) {
        this._x = 0;
        this._y = 0;
        this.xVelo = 0;
        this.yVelo = 0;
        this.flip = 1;
        this.leftKey = 0;
        this.rightKey = 0;
        this.downKey = 0;
        this.spaceKey = 0;
        this.spaceKey2 = 0;
        this.left = false;
        this.right = false;
        this.duck = false;
        this.space = false;
        this.jumping = false;
        this.leftKey = 65;
        this.rightKey = 68;
        this.downKey = 83;
        this.spaceKey = 32;
        this.spaceKey2 = 87;
        this.spawnRobot(xStart, yStart);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawnRobot(xStart, yStart) {
        this._div = document.createElement("robot");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = xStart;
        this._y = yStart;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.left = true;
                break;
            case this.rightKey:
                this.right = true;
                break;
            case this.downKey:
                this.duck = true;
                break;
            case this.spaceKey:
                this.space = true;
                break;
            case this.spaceKey2:
                this.space = true;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.left = false;
                break;
            case this.rightKey:
                this.right = false;
                break;
            case this.downKey:
                this.duck = false;
                break;
            case this.spaceKey:
                this.space = false;
                break;
            case this.spaceKey2:
                this.space = false;
                break;
        }
    }
    update() {
        if (this.space && this.jumping == false) {
            this.yVelo -= 40;
            this.jumping = true;
        }
        if (this.left) {
            this.xVelo -= 1;
            this.flip = -1;
        }
        if (this.right) {
            this.xVelo += 1;
            this.flip = 1;
        }
        if (this.duck) {
            this._div.classList.add("robot-duck");
        }
        else {
            this._div.classList.remove("robot-duck");
        }
        this.yVelo += 1.7;
        this._x += this.xVelo;
        this._y += this.yVelo;
        this.xVelo *= 0.9;
        this.yVelo *= 0.9;
        if (this._y > 600 - 16 - 32) {
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.yVelo = 0;
        }
        if (this._x < -200) {
            this._x = 1240;
        }
        else if (this._x > 1240) {
            this._x = -200;
        }
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scalex(${this.flip})`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
    getFutureRectangle() {
        let rect = this._div.getBoundingClientRect();
        rect.x += this.xVelo;
        return rect;
    }
}
class Tree {
    constructor(xStart, yStart) {
        this._x = 0;
        this._y = 0;
        this.fixed = false;
        this.spawnTree(xStart, yStart);
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawnTree(xStart, yStart) {
        this._div = document.createElement("tree");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = xStart;
        this._y = yStart;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    update() {
        if (this.fixed) {
            this._div.classList.add("fixed");
            this.fixed = false;
        }
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Game {
    constructor() {
        this.score = 0;
        this.enemy1killed = false;
        this.enemy2killed = false;
        this.playingTerminal1 = false;
        this.div = document.createElement("div");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.tree = new Tree(500, 400);
        this.robot = new Robot(200, 600);
        this.enemy1 = new Enemy1(1000, 630);
        this.enemy2 = new Enemy2(1200, 630);
        this.code = new Code(500, 200);
        this.gameLoop();
    }
    gameLoop() {
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy2.getRectangle()) && !this.enemy2killed) {
            console.log("collision");
            this.updateScore(1);
            this.enemy2.kill();
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy1.getRectangle()) && !this.enemy1killed) {
            console.log("collision");
            this.updateScore(1);
            this.enemy1.kill();
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.code.getRectangle())) {
            this.code.collected = true;
            this.launchGameTerminal1();
            this.tree.fixed = true;
            this.updateScore(1);
        }
        this.tree.update();
        this.enemy1.update();
        this.enemy2.update();
        this.robot.update();
        this.code.update();
        if (!this.playingTerminal1) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    updateScore(addScoreAmount) {
        this.score += addScoreAmount;
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`;
    }
    launchGameTerminal1() {
        let gameTerminal1;
        console.log("TERMINAL STARTING");
        gameTerminal1 = new GameTerminal1(this);
        console.log("TERMINAL STARTED");
    }
}
window.addEventListener("load", () => new Game());
class Terminal1Player {
    constructor() {
        this.rightSpeed = 0;
        this.leftSpeed = 0;
        this.speed = 10;
        this._div = document.createElement("Terminal1Player");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this.rightKey = 68;
        this.leftKey = 65;
        this._x = 0;
        this._y = 700;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = this.speed;
                break;
            case this.rightKey:
                this.rightSpeed = this.speed;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
        }
    }
    update() {
        let newPosX = this._x - this.leftSpeed + this.rightSpeed;
        if (newPosX > 0 && newPosX + 100 < window.innerWidth)
            this._x = newPosX;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.3)`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Terminal1Block {
    constructor() {
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.blockSpeed = 20;
        this._div = document.createElement("Terminal1Block");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this.upkey = 80;
        this.downkey = 76;
        this._x = 0;
        this._y = -500;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = this.blockSpeed;
                break;
            case this.downkey:
                this.downSpeed = this.blockSpeed;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    }
    update() {
        let newPosY = this._y - this.upSpeed + this.downSpeed;
        this._y = newPosY;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class GameTerminal1 {
    constructor(gameInstance) {
        this.score = 0;
        console.log("TERMINAL CLASS STARTED");
        this._div = document.createElement("div");
        this.gameInstance = gameInstance;
        let game = document.getElementsByTagName("gameterminal1")[0];
        game.appendChild(this._div);
        this.xKey = 88;
        this.player = new Terminal1Player();
        this.block = new Terminal1Block();
        this.gameInstance.playingTerminal1 = true;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.gameLoop();
    }
    gameLoop() {
        this.player.update();
        this.block.update();
        this.checkBlockPlayerCollision(this.player);
        console.log("onegameloop");
        if (this.gameInstance.playingTerminal1) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.xKey:
                this.finnishGame();
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.xKey:
                break;
        }
    }
    checkBlockPlayerCollision(player) {
        let hit = this.checkCollision(player.getRectangle(), this.block.getRectangle());
        if (hit) {
            this.updateScore(-1);
            this.gameOver();
        }
    }
    updateScore(addScoreAmount) {
        this.score += addScoreAmount;
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    gameOver() {
        console.log("YOU HAVE DIED");
        document.getElementsByTagName("message")[0].innerHTML = `YOU HAVE DIED`;
    }
    finnishGame() {
        this.gameInstance.playingTerminal1 = false;
        this.gameInstance.gameLoop();
    }
}
//# sourceMappingURL=main.js.map