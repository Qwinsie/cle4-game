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
            this.tree.fixed = true;
            this.updateScore(1);
        }
        this.tree.update();
        this.enemy1.update();
        this.enemy2.update();
        this.robot.update();
        this.code.update();
        requestAnimationFrame(() => this.gameLoop());
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
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map