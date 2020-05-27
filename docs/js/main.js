class Code {
    constructor() {
        this.collisionRobotCode = false;
        this.collected = false;
        this.createCode();
    }
    createCode() {
        this.code = document.createElement("code");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.code);
        this.x = 500;
        this.y = 200;
        this.code.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.2)`;
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
    constructor() {
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.enemy1 = document.createElement("enemy1");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.enemy1);
        this.leftkey = 65;
        this.rightkey = 68;
        this.x = 1200;
        this.y = 630;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.enemy1.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    getRectangle() {
        return this.enemy1.getBoundingClientRect();
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 10;
                break;
            case this.rightkey:
                this.rightspeed = 10;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 0;
                break;
            case this.rightkey:
                this.rightspeed = 0;
                break;
        }
    }
    update() {
        let newX = this.x - this.leftspeed + this.rightspeed;
        if (newX > 0 && newX < (1440 - this.enemy1.clientWidth)) {
            this.x = newX;
        }
        this.enemy1.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
class Enemy2 {
    constructor() {
        this.space = false;
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.y_velo = 0;
        this.jumping = true;
        this.enemy2 = document.createElement("enemy2");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.enemy2);
        this.leftkey = 90;
        this.rightkey = 67;
        this.spaceKey = 88;
        this.x = 1000;
        this.y = 600;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.enemy2.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    getRectangle() {
        return this.enemy2.getBoundingClientRect();
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 10;
                break;
            case this.rightkey:
                this.rightspeed = 10;
                break;
            case this.spaceKey:
                this.space = true;
                break;
        }
    }
    onKeyUp(e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 0;
                break;
            case this.rightkey:
                this.rightspeed = 0;
                break;
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
        this.y += this.y_velo;
        this.y_velo *= 0.95;
        if (this.y > 600) {
            this.jumping = false;
            this.y = 600;
            this.y_velo = 0;
        }
        let newX = this.x - this.leftspeed + this.rightspeed;
        if (newX < this.x || newX > this.x || this.y <= 600) {
            if (newX > 0 && newX < (1440 - this.enemy2.clientWidth)) {
                this.x = newX;
            }
            this.enemy2.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
        this.tree = new Tree;
        this.robot = new Robot;
        this.enemy1 = new Enemy1;
        this.enemy2 = new Enemy2;
        this.code = new Code;
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
    constructor() {
        this.jumping = true;
        this.left = false;
        this.right = false;
        this.duck = false;
        this.space = false;
        this.x_velo = 0;
        this.y_velo = 0;
        this.flip = 1;
        this.robot = document.createElement("robot");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.robot);
        this.leftKey = 37;
        this.rightKey = 39;
        this.downKey = 40;
        this.spaceKey = 32;
        this.x = 200;
        this.y = 600;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.robot.style.transform = `translate(${this.x}px, ${this.y}px)`;
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
        this.x += this.x_velo;
        this.y += this.y_velo;
        this.x_velo *= 0.9;
        this.y_velo *= 0.9;
        if (this.y > 600 - 16 - 32) {
            this.jumping = false;
            this.y = 600 - 16 - 32;
            this.y_velo = 0;
        }
        if (this.x < -200) {
            this.x = 1240;
        }
        else if (this.x > 1240) {
            this.x = -200;
        }
        this.robot.style.transform = `translate(${this.x}px, ${this.y}px) scalex(${this.flip})`;
    }
}
class Tree {
    constructor() {
        this.fixed = false;
        this.tree = document.createElement("tree");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.tree);
        this.x = 500;
        this.y = 400;
        this.tree.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    update() {
        if (this.fixed) {
            this.tree.classList.add("fixed");
            this.fixed = false;
        }
    }
}
//# sourceMappingURL=main.js.map