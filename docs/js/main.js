class Code {
    constructor(x, y) {
        this.collisionRobotCode = false;
        this.collected = false;
        this.createCode(x, y);
    }
    createCode(x, y) {
        this.code = document.createElement("code");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.code);
        this._x = x;
        this._y = y;
        this.code.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`;
    }
    getRectangle() {
        return this.code.getBoundingClientRect();
    }
    getFutureRectangle() {
        let rect = this.code.getBoundingClientRect();
        return rect;
    }
    update() {
        if (this.collected) {
            console.log("collected");
            this.code.remove();
            this.collected = false;
        }
    }
}
class Enemy1 {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.createEnemy1(x, y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    createEnemy1(x, y) {
        this.enemy1 = document.createElement("enemy1");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.enemy1);
        this._x = x;
        this._y = y;
        this.enemy1.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    getRectangle() {
        return this.enemy1.getBoundingClientRect();
    }
    update() {
        this.leftspeed = +1;
        let newX = this._x - this.leftspeed + this.rightspeed;
        if (newX < (1440 - this.enemy1.clientWidth)) {
            this._x = newX;
        }
        if (newX < 0 - this.enemy1.clientWidth) {
            this.enemy1.remove();
        }
        this.enemy1.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
}
class Enemy2 {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this.space = false;
        this.spaceKey = 0;
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.y_velo = 0;
        this.jumping = true;
        this.spaceKey = 88;
        this.createEnemy2(x, y);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    createEnemy2(x, y) {
        this.enemy2 = document.createElement("enemy2");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.enemy2);
        this._x = x;
        this._y = y;
        this.enemy2.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    getRectangle() {
        return this.enemy2.getBoundingClientRect();
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
            this.y_velo -= 50;
            this.jumping = true;
        }
        this.y_velo += 1.2;
        this._y += this.y_velo;
        this.y_velo *= 0.95;
        if (this._y > 600) {
            this.jumping = false;
            this._y = 600;
            this.y_velo = 0;
        }
        let newX = this._x - this.leftspeed + this.rightspeed;
        if (newX < this._x || newX > this._x || this._y <= 600) {
            if (newX > 0 && newX < (1440 - this.enemy2.clientWidth)) {
                this._x = newX;
            }
            this.enemy2.style.transform = `translate(${this._x}px, ${this._y}px)`;
        }
    }
}
class Game {
    constructor() {
        this.score = 0;
        this.enemy1killed = false;
        this.enemy2killed = false;
        this.canvas = document.createElement("canvas");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.canvas);
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
            this.enemy2killed = true;
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy1.getRectangle()) && !this.enemy1killed) {
            console.log("collision");
            this.updateScore(1);
            this.enemy1killed = true;
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
}
window.addEventListener("load", () => new Game());
class Robot {
    constructor(x, y) {
        this.jumping = true;
        this._x = 0;
        this._y = 0;
        this.left = false;
        this.right = false;
        this.duck = false;
        this.space = false;
        this.leftKey = 0;
        this.rightKey = 0;
        this.downKey = 0;
        this.spaceKey = 0;
        this.spaceKey2 = 0;
        this.x_velo = 0;
        this.y_velo = 0;
        this.flip = 1;
        this.leftKey = 65;
        this.rightKey = 68;
        this.downKey = 83;
        this.spaceKey = 32;
        this.spaceKey2 = 87;
        this.createRobot(x, y);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    createRobot(x, y) {
        this.robot = document.createElement("robot");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.robot);
        this._x = x;
        this._y = y;
        this.robot.style.transform = `translate(${this._x}px, ${this._y}px)`;
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
    getFutureRectangle() {
        let rect = this.robot.getBoundingClientRect();
        rect.x += this.x_velo;
        return rect;
    }
    update() {
        if (this.space && this.jumping == false) {
            this.y_velo -= 40;
            this.jumping = true;
        }
        if (this.left) {
            this.x_velo -= 1;
            this.flip = -1;
        }
        if (this.right) {
            this.x_velo += 1;
            this.flip = 1;
        }
        if (this.duck) {
            this.robot.classList.add("robot-duck");
        }
        else {
            this.robot.classList.remove("robot-duck");
        }
        this.y_velo += 1.7;
        this._x += this.x_velo;
        this._y += this.y_velo;
        this.x_velo *= 0.9;
        this.y_velo *= 0.9;
        if (this._y > 600 - 16 - 32) {
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.y_velo = 0;
        }
        if (this._x < -200) {
            this._x = 1240;
        }
        else if (this._x > 1240) {
            this._x = -200;
        }
        this.robot.style.transform = `translate(${this._x}px, ${this._y}px) scalex(${this.flip})`;
    }
}
class Tree {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this.fixed = false;
        this.createTree(x, y);
    }
    createTree(x, y) {
        this.tree = document.createElement("tree");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.tree);
        this._x = x;
        this._y = y;
        this.tree.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
    update() {
        if (this.fixed) {
            this.tree.classList.add("fixed");
            this.fixed = false;
        }
    }
}
//# sourceMappingURL=main.js.map