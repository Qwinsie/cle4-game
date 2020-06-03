class Enemy2 {
    // Fields
    private _div : HTMLElement

    private _x : number = 0
    private _y : number = 0

    private xVelo : number = 0
    private yVelo : number = 0

    private leftspeed : number = 0
    private rightspeed : number = 0

    private alive : boolean = true

    // Inputs
    private spaceKey : number = 0

    private space : boolean = false

    private jumping : boolean = true


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    constructor(xStart : number, yStart : number) {
        this.spaceKey = 88

        this.spawnEnemy2(xStart, yStart)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
}

    // Functions

    // Init Functions
    private spawnEnemy2(xStart : number, yStart : number) {
        this._div = document.createElement("enemy2")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = xStart
        this._y = yStart

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    // Loop Functions
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = true
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = false
                break
        }
    }

    public update() {
        if(this.jumping == false){
            this.yVelo -= 40;
            this.jumping = true;
        }

        this.yVelo += 1.0;
        this._y += this.yVelo;
        this.yVelo *= 0.98;

        // Land on the ground
        if(this._y > 600){
            this.jumping = false;
            this._y = 600;
            this.yVelo = 0;
        }

        // Moving Enemy left OR right
        let newX = this._x - this.leftspeed + this.rightspeed

        if (newX < this._x || newX > this._x || this._y <= 600){
            if (newX > 0 && newX < (1440 - this._div.clientWidth)) {
                this._x = newX
            }
            this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
        }
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public kill() {
        this.alive = false
        this._div.remove()
    }
}