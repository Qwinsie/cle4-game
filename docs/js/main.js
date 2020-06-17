class GameObject {
    constructor(xStart, yStart, name) {
        this._x = 0;
        this._y = 0;
        this.xVelo = 0;
        this.yVelo = 0;
        this.leftKey = 0;
        this.rightKey = 0;
        this.left = false;
        this.right = false;
        this.jumping = true;
        this.backgroundmoving = true;
        this.spawn(xStart, yStart, name);
        this.leftKey = 65;
        this.rightKey = 68;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    get name() { return this.name; }
    spawn(xStart, yStart, name) {
        this._div = document.createElement(`${name}`);
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._div.id = `${name}`;
        this._x = xStart;
        this._y = yStart;
        console.log(`${name} has been created`);
    }
    onKeyDown(e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.left = true;
                break;
            case this.rightKey:
                this.right = true;
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
        }
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
    update(name) {
        if (this.backgroundmoving == true) {
            if (name !== "robot") {
                if (this.left) {
                    this.xVelo += 1;
                }
                if (this.right) {
                    this.xVelo -= 1;
                }
                this._x += this.xVelo;
                this.xVelo *= 0.9;
                if (name !== "code") {
                    this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
                }
                else {
                    this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`;
                }
            }
        }
        else {
            if (name == "robot") {
                if (this.left) {
                    this.xVelo += 1;
                }
                if (this.right) {
                    this.xVelo -= 1;
                }
                this._x += this.xVelo;
                this.xVelo *= 0.9;
                this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
            }
        }
    }
}
class Robot extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        this.flip = 1;
        this.downKey = 0;
        this.spaceKey = 0;
        this.spaceKey2 = 0;
        this.duck = false;
        this.space = false;
        this.downKey = 83;
        this.spaceKey = 32;
        this.spaceKey2 = 87;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
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
        let rect = this._div.getBoundingClientRect();
        rect.x += this.xVelo;
        return rect;
    }
    update() {
        if (this.space && this.jumping == false) {
            this.yVelo -= 40;
            this.jumping = true;
        }
        if (this.left) {
            this.flip = -1;
        }
        if (this.right) {
            this.flip = 1;
        }
        if (this.duck) {
            this._div.classList.add("robot-duck");
        }
        else {
            this._div.classList.remove("robot-duck");
        }
        this.yVelo += 1.4;
        this._x += this.xVelo;
        this._y += this.yVelo;
        this.xVelo *= 0.9;
        this.yVelo *= 0.95;
        if (this._y > 600 - 16 - 32) {
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.yVelo = 0;
        }
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scaleX(${this.flip})`;
    }
}
class Code extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        this.collisionRobotCode = false;
        this.collected = false;
    }
    update() {
        if (this.collected) {
            console.log("collected");
            this._div.remove();
            this.collected = false;
        }
        super.update("code");
    }
    getFutureRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Enemy1 extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.alive = true;
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
        super.update("enemy1");
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Enemy2 extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        this.leftspeed = 0;
        this.rightspeed = 0;
        this.alive = true;
    }
    update() {
        if (this.jumping == false) {
            this.yVelo -= 40;
            this.jumping = true;
        }
        this.yVelo += 1.4;
        this._y += this.yVelo;
        this.yVelo *= 0.90;
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
            super.update("enemy2");
        }
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Tree extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        this.fixed = false;
    }
    update() {
        if (this.fixed) {
            this._div.classList.add("fixed");
            this.fixed = false;
        }
        super.update("tree");
    }
}
class Background extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
        super.update("background");
    }
}
class Game {
    constructor() {
        this.gameobjects = [];
        this.score = 0;
        this.timer = 0;
        this.playingTerminal1 = false;
        this.upKey = 87;
        this.downKey = 83;
        this.leftKey = 65;
        this.rightKey = 68;
        this.oneKey = 74;
        this.twoKey = 75;
        this.threeKey = 76;
        this.fourKey = 73;
        this.fiveKey = 79;
        this.sixKey = 80;
        this.spaceKey = 32;
        this.escapeKey = 27;
        this.div = document.createElement("div");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        for (let i = 0; i < 5; i++) {
            let randomX = 400 * i * Math.random() + 200;
            let randomY = Math.random() * 200 + 100;
            let randomXSpeed = 0.1;
            let randomCloudNumber = Math.floor(Math.random() * (4 - 1)) + 1;
            let randomCloud = "cloud" + randomCloudNumber;
            this.gameobjects.push(new Cloud(randomX, randomY, randomCloud, randomXSpeed));
        }
        this.gameobjects.push(new Background(0, 0, "background"));
        this.gameobjects.push(new Tree(1200, 400, "tree"));
        this.gameobjects.push(new Checkpoint(2000, 470, "checkpoint"));
        this.gameobjects.push(new Enemy1(3000, 630, "enemy1"));
        this.gameobjects.push(new Enemy2(3500, 630, "enemy2"));
        this.gameobjects.push(new Code(1000, 200, "code"));
        this.gameobjects.push(new Sign(700, 400, "sign"));
        this.gameobjects.push(new Robot(500, 600, "robot"));
        this.gameLoop();
    }
    gameLoop() {
        for (const gameobject of this.gameobjects) {
            gameobject.update(`${gameobject}`);
            if (gameobject instanceof Robot) {
                let robot = gameobject;
                for (const gameObjectWithoutRobot of this.gameobjects)
                    if (this.checkCollision(robot.getFutureRectangle(), gameObjectWithoutRobot.getRectangle())) {
                        if (gameObjectWithoutRobot instanceof Code) {
                            gameObjectWithoutRobot.collected = true;
                            this.updateScore(1);
                            this.launchGameTerminal1();
                        }
                        if (gameObjectWithoutRobot instanceof Tree) {
                            gameObjectWithoutRobot.fixed = true;
                        }
                        if (gameObjectWithoutRobot instanceof Enemy1) {
                            this.updateScore(1);
                            gameObjectWithoutRobot.kill();
                        }
                        if (gameObjectWithoutRobot instanceof Enemy2) {
                            this.updateScore(1);
                            gameObjectWithoutRobot.kill();
                        }
                    }
                if (!this.playingTerminal1) {
                    requestAnimationFrame(() => this.gameLoop());
                }
            }
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
    reset() {
    }
}
window.addEventListener("load", () => new Game());
class Checkpoint extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
    }
}
class Cloud extends GameObject {
    constructor(xStart, yStart, name, speed) {
        super(xStart, yStart, name);
        this.xspeed = 0;
        this.xspeed = speed;
    }
    update() {
        this._x += this.xspeed;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
}
class Sign extends GameObject {
    constructor(xStart, yStart, name) {
        super(xStart, yStart, name);
    }
}
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
        if (newPosX > 0 && newPosX + 400 < window.innerWidth)
            this._x = newPosX;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.3)`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Terminal1Block {
    constructor(x = 0, upkey = 73, downkey = 74, y = -800) {
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.blockSpeed = 20;
        this._div = document.createElement("Terminal1Block");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this.upkey = upkey;
        this.downkey = downkey;
        this._x = x;
        this._y = y;
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
        this.xKey = 100;
        this.player = new Terminal1Player();
        this.block = new Terminal1Block(100);
        this.block2 = new Terminal1Block(1000, 79, 75);
        this.background = new Terminal1Background();
        this.border = new Terminal1Border();
        this.gameInstance.playingTerminal1 = true;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.gameLoop();
    }
    gameLoop() {
        this.player.update();
        this.block.update();
        this.block2.update();
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
        let hit2 = this.checkCollision(player.getRectangle(), this.block2.getRectangle());
        if (hit) {
            this.updateScore(-1);
            this.gameOver();
        }
        if (hit2) {
            this.updateScore(2);
            this.gameWin();
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
        this.killAll();
        this.gameInstance.playingTerminal1 = false;
        this.gameInstance.reset();
        this.gameInstance.gameLoop();
    }
    gameWin() {
        this.killAll();
        this.gameInstance.playingTerminal1 = false;
        this.gameInstance.gameLoop();
    }
    finnishGame() {
        this.killAll();
        this.gameInstance.playingTerminal1 = false;
        this.gameInstance.gameLoop();
    }
    killAll() {
        this.block.div.remove();
        this.block2.div.remove();
        this.player.div.remove();
        this.background.div.remove();
        this.border.div.remove();
    }
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
}
class Terminal1Background {
    constructor() {
        this._div = document.createElement("terminalBackground");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
}
class Terminal1Border {
    constructor() {
        this._div = document.createElement("terminalBorder");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
}
//# sourceMappingURL=main.js.map