var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ScoreBoardView {
    constructor() {
        this.$form = null;
        this.$nameField = null;
        this.$scoreField = null;
        this.currentScore = null;
        console.log("ScoreBoardView created");
    }
    createForm(score) {
        this.createform = document.createElement("form");
        this.createform.setAttribute("action", "");
        this.createform.setAttribute("method", "post");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.createform);
        let heading = document.createElement('h2');
        heading.innerHTML = "You did it!";
        this.createform.appendChild(heading);
        var line = document.createElement('hr');
        this.createform.appendChild(line);
        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);
        var namelabel = document.createElement('label');
        namelabel.innerHTML = "Your Name : ";
        this.createform.appendChild(namelabel);
        var inputelement = document.createElement('input');
        inputelement.setAttribute("type", "text");
        inputelement.setAttribute("name", "dname");
        this.createform.appendChild(inputelement);
        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);
        var usernamelabel = document.createElement('label');
        usernamelabel.innerHTML = "Score : ";
        this.createform.appendChild(usernamelabel);
        var heading2 = document.createElement('h2');
        heading2.innerHTML = `${score}`;
        this.createform.appendChild(heading2);
        var linebreak = document.createElement('br');
        this.createform.appendChild(linebreak);
    }
    addScore(name, score) {
        console.log(name + " " + score);
        let list = document.querySelector("#scores");
        const newli = document.createElement("li");
        newli.innerHTML = `${name} ${score}`;
    }
    getScore() {
        let score = localStorage.getItem('score');
        if (score) {
            return JSON.parse(score);
        }
        else {
            return [];
        }
    }
    fillFieldsFromLocalStorage() {
        if (localStorage.getItem('name') !== null) {
            this.$nameField.value = localStorage.getItem('name');
            this.$scoreField.value = localStorage.getItem('score');
        }
    }
    submitHandler(e) {
        e.preventDefault();
        localStorage.setItem('name', this.$nameField.value);
        this.currentScore.push(this.$scoreField.value);
        localStorage.setItem('score', JSON.stringify(this.currentScore));
    }
}
class GameObject {
    constructor(xStart, yStart, name, game) {
        this._x = 0;
        this._y = 0;
        this.xVelo = 0;
        this.yVelo = 0;
        this.leftKey = 0;
        this.rightKey = 0;
        this.left = false;
        this.right = false;
        this.jumping = true;
        this.xscale = 1;
        this.yscale = 1;
        this.backgroundmoving = true;
        this.spawn(xStart, yStart, name);
        this.gameInstance = game;
        this._name = name;
        this.leftKey = 65;
        this.rightKey = 68;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.draw();
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
    spawn(xStart, yStart, name) {
        this._div = document.createElement(name);
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._div.id = name;
        this._x = xStart;
        this._y = yStart;
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
    update() {
        let bgmoving = this.gameInstance.checkBackgroundCanmove(this.left, this.right);
        if (bgmoving) {
            if (this._name !== "robot") {
                if (this.left) {
                    this.xVelo += 1;
                }
                if (this.right) {
                    this.xVelo -= 1;
                }
                this._x += this.xVelo;
                this.xVelo *= 0.9;
            }
        }
        else {
            if (this._name === "robot") {
                if (this.right) {
                    this.xVelo += 1;
                }
                if (this.left) {
                    this.xVelo -= 1;
                }
            }
        }
        this.draw();
    }
    draw() {
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(${this.xscale}, ${this.yscale})`;
    }
}
class Robot extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
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
            this.xscale = -1;
        }
        if (this.right) {
            this.xscale = 1;
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
        if (this._x < 0) {
            this._x = 0;
            this.xVelo = 0;
        }
        super.update();
    }
}
class Code extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
        this.collisionRobotCode = false;
        this.collected = false;
        super.draw();
    }
    update() {
        if (this.collected) {
            console.log("collected");
            this._div.remove();
            this.collected = false;
        }
        super.update();
    }
    getFutureRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Enemy1 extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
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
        super.update();
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Enemy2 extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
        this.alive = true;
    }
    update() {
        this.yVelo += 1.4;
        this._y += this.yVelo;
        this.yVelo *= 0.90;
        if (this._y > 600) {
            this._y = 600;
            this.yVelo = 0;
        }
        super.update();
    }
    jump() {
        this.jumping = true;
        this.yVelo -= 40;
    }
    kill() {
        this.alive = false;
        this._div.remove();
    }
}
class Tree extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
        this.fixed = false;
        super.draw();
    }
    update() {
        if (this.fixed) {
            this._div.classList.add("fixed");
            this.fixed = false;
        }
        super.update();
    }
}
class Background extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
    }
}
class Game {
    constructor() {
        this.gameobjects = [];
        this.timer = 0;
        this.realtimer = 0;
        this.realtimerup = 0;
        this.maxtimer = 0;
        this.score = 0;
        this.playingTerminal = false;
        this.terminalCount = 0;
        this.finished = false;
        this.div = document.createElement("div");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.batterydiv = document.getElementsByTagName("battery")[0];
        for (let i = 0; i < 2; i++) {
            let randomX = 400 * i * Math.random() + 200;
            let randomY = Math.random() * 200 + 100;
            let randomXSpeed = 0.1;
            let randomCloudNumber = Math.floor(Math.random() * (4 - 1)) + 1;
            let randomCloud = "cloud" + randomCloudNumber;
            this.gameobjects.push(new Cloud(randomX, randomY, randomCloud, randomXSpeed, this));
        }
        this.background = new Background(0, 0, "background", this);
        this.gameobjects.push(this.background);
        this.gameobjects.push(new Tree(1200, 400, "tree", this));
        this.gameobjects.push(new Tree(1600, 400, "tree", this));
        this.gameobjects.push(new Tree(2000, 400, "tree", this));
        this.gameobjects.push(new Tree(2800, 400, "tree", this));
        this.gameobjects.push(new Tree(3200, 400, "tree", this));
        this.gameobjects.push(new Tree(4300, 400, "tree", this));
        this.gameobjects.push(new Tree(5100, 400, "tree", this));
        this.gameobjects.push(new Tree(5400, 400, "tree", this));
        this.gameobjects.push(new Tree(5500, 400, "tree", this));
        this.gameobjects.push(new Tree(6200, 400, "tree", this));
        this.gameobjects.push(new Tree(6600, 400, "tree", this));
        this.gameobjects.push(new Tree(7000, 400, "tree", this));
        this.gameobjects.push(new Tree(7600, 400, "tree", this));
        this.gameobjects.push(new Tree(8300, 400, "tree", this));
        this.gameobjects.push(new Sign(2500, 400, "sign", this));
        this.gameobjects.push(new Checkpoint(3700, 470, "checkpoint", this));
        this.gameobjects.push(new Enemy1(3000, 630, "enemy1", this));
        this.gameobjects.push(new Enemy1(4400, 630, "enemy1", this));
        this.gameobjects.push(new Enemy2(4800, 630, "enemy2", this));
        this.gameobjects.push(new Enemy2(5300, 630, "enemy2", this));
        this.gameobjects.push(new Enemy2(6000, 630, "enemy2", this));
        this.gameobjects.push(new Code(1200, 500, "code", this));
        this.gameobjects.push(new Endpoint(8000, 470, "endpoint", this));
        this.robot = new Robot(200, 600, "robot", this);
        this.timer = 0;
        this.realtimer = 300;
        this.maxtimer = this.realtimer;
        this.gameLoop();
    }
    gameLoop() {
        this.timerUpdate();
        if (!this.playingTerminal) {
            for (const gameobject of this.gameobjects) {
                if (gameobject instanceof Enemy2) {
                    if (this.realtimerup >= 3) {
                        gameobject.jump();
                        this.realtimerup = 0;
                    }
                }
                this.checkRobotCollisions();
                gameobject.update();
            }
            this.robot.update();
        }
        else {
            this.currentTerminal.update();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    timerUpdate() {
        this.timer++;
        if (this.timer > (60 * 2.75)) {
            this.realtimer--;
            this.realtimerup++;
            let timeperc = Math.round(100 * this.realtimer / this.maxtimer);
            document.getElementsByTagName("timerperc")[0].innerHTML = `${timeperc}%`;
            this.timer = 0;
        }
        if (this.realtimer <= 0) {
            this.reset();
        }
        if (this.realtimer <= this.maxtimer / 100 * 10) {
            this.batterydiv.className = "shutter";
        }
        else if (this.realtimer <= this.maxtimer / 100 * 25) {
            this.batterydiv.className = "red";
        }
        else if (this.realtimer <= this.maxtimer / 100 * 50) {
            this.batterydiv.className = "orange";
        }
        else if (this.realtimer <= this.maxtimer / 100 * 75) {
            this.batterydiv.className = "yellow";
        }
        else if (this.realtimer <= this.maxtimer / 100 * 100) {
            this.batterydiv.className = "green";
        }
    }
    checkRobotCollisions() {
        for (const gameObject of this.gameobjects)
            if (this.checkCollision(this.robot.getFutureRectangle(), gameObject.getRectangle())) {
                if (gameObject instanceof Code) {
                    gameObject.collected = true;
                    this.updateScore(1);
                    switch (this.terminalCount) {
                        case 0:
                            this.launchGameTerminal1();
                            break;
                    }
                }
                if (gameObject instanceof Checkpoint) {
                    this.realtimer = this.maxtimer + 1;
                    gameObject.reached = true;
                }
                if (gameObject instanceof Endpoint) {
                    this.realtimer = this.maxtimer + 1;
                    gameObject.reached = true;
                    if (!this.finished) {
                        this.reachedEndPoint();
                    }
                    this.finished = true;
                }
                if (gameObject instanceof Tree) {
                    gameObject.fixed = true;
                }
                if (gameObject instanceof Enemy1) {
                    this.updateScore(1);
                    gameObject.kill();
                }
                if (gameObject instanceof Enemy2) {
                    this.updateScore(1);
                    gameObject.kill();
                }
            }
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
    checkBackgroundCanmove(left, right) {
        let bgposition = this.background.getRectangle();
        if (bgposition.left >= 0 && left == true) {
            return false;
        }
        if (bgposition.width - window.innerWidth < bgposition.x && right == true) {
            return false;
        }
        return true;
    }
    updateScore(addScoreAmount) {
        this.score += addScoreAmount;
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`;
    }
    launchGameTerminal1() {
        this.playingTerminal = true;
        console.log("TERMINAL STARTING");
        this.currentTerminal = new GameTerminal1(this);
        this.playingTerminal = true;
        this.terminalCount = 1;
    }
    reachedEndPoint() {
        this.scoreboardview = new ScoreBoardView();
        this.scoreboardview.createForm(this.score);
    }
    reset() {
        location.reload();
    }
}
window.addEventListener("load", () => new Game());
class Checkpoint extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
        this.reached = false;
    }
    update() {
        if (this.reached) {
            console.log("collected");
            this._div.classList.add("green");
            this.reached = false;
        }
        super.update();
    }
}
class Cloud extends GameObject {
    constructor(xStart, yStart, name, speed, game) {
        super(xStart, yStart, name, game);
        this.xspeed = 0;
        this.xspeed = speed;
    }
    update() {
        this._x += this.xspeed;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
    }
}
class Endpoint extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
        this.reached = false;
    }
    update() {
        if (this.reached) {
            this.reached = false;
        }
        super.update();
    }
}
class Sign extends GameObject {
    constructor(xStart, yStart, name, game) {
        super(xStart, yStart, name, game);
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
        this._y = 600;
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
        if (newPosX > 0 && newPosX + 400 < 1600)
            this._x = newPosX;
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.3)`;
    }
    getRectangle() {
        return this._div.getBoundingClientRect();
    }
}
class Terminal1Block {
    constructor(x = 0, y = 0) {
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.blockSpeed = 20;
        this._div = document.createElement("Terminal1Block");
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = x;
        this._y = y;
    }
    get div() { return this._div; }
    get x() { return this._x; }
    get y() { return this._y; }
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
        this.countdown = 0;
        this.blinkBool = false;
        this.chosenBlock = false;
        this.totalBlinks = 3;
        console.log("TERMINAL CLASS STARTED");
        this._div = document.createElement("div");
        this.gameInstance = gameInstance;
        let game = document.getElementsByTagName("gameterminal1")[0];
        game.appendChild(this._div);
        this.xKey = 100;
        this.player = new Terminal1Player();
        this.block = new Terminal1Block(70, -400);
        this.block2 = new Terminal1Block(720, -400);
        this.background = new Terminal1Background();
        this.border = new Terminal1Border();
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.update();
        this.terminalCountdown(4);
    }
    update() {
        this.player.update();
        this.block.update();
        this.block2.update();
        this.checkBlockPlayerCollision(this.player);
        console.log(this.chosenBlock);
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
    delay(delay) {
        return new Promise(r => {
            setTimeout(r, delay);
        });
    }
    blockBlinker(r, type) {
        this.chosenBlock = true;
        if (type == "start") {
            this.blinkInterval = setInterval(function () {
                if (this.blinkBool) {
                    r.classList.add('terminal-block-blink');
                    this.blinkBool = false;
                }
                else {
                    r.classList.remove('terminal-block-blink');
                    this.blinkBool = true;
                }
            }, 500);
        }
        else if (type == "stop") {
            this.chosenBlock = true;
            this.blinkBool = false;
            clearInterval(this.blinkInterval);
            r.classList.remove("terminal-block-blink");
        }
    }
    getRandomBlockBlink() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.chosenBlock) {
                this.blinkBool = true;
                let randomNumber = Math.floor(Math.random() * 2) + 0;
                let getRandomBlock = document.getElementsByTagName("terminal1block")[randomNumber];
                this.blockBlinker(getRandomBlock, "start");
                for (let i = this.totalBlinks; i > 0; i--) {
                    yield this.delay(1000);
                    this.totalBlinks = this.totalBlinks - 1;
                    console.log(this.totalBlinks);
                    if (this.totalBlinks == 0) {
                        console.log("stop");
                        this.blockBlinker(getRandomBlock, "stop");
                    }
                }
            }
        });
    }
    terminalCountdown(getSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            this.countdown = getSeconds;
            for (let i = getSeconds; i > 0; i--) {
                yield this.delay(1000);
                this.countdown = this.countdown - 1;
                document.getElementsByTagName("message")[0].innerHTML = `${this.countdown}`;
                if (this.countdown == 0) {
                    document.getElementsByTagName("message")[0].innerHTML = '';
                    this.terminalTimer(0);
                    this.getRandomBlockBlink();
                }
            }
        });
    }
    terminalTimer(getSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timer = getSeconds;
            for (let i = getSeconds; i >= 0; i++) {
                yield this.delay(1000);
                this.timer = this.timer + 1;
            }
        });
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
        console.log("GAME OVER");
        document.getElementsByTagName("message")[0].innerHTML = `Game Over`;
        this.killAll();
        this.gameInstance.playingTerminal = false;
        this.gameInstance.reset();
    }
    gameWin() {
        this.killAll();
        this.gameInstance.playingTerminal = false;
    }
    finnishGame() {
        this.killAll();
        this.gameInstance.playingTerminal = false;
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