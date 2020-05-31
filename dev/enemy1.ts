class Enemy1 {
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
    // no inputs


    // Properties
    public get div() : HTMLElement           { return this._div }

    public get x() : number                  { return this._x }
    public get y() : number                  { return this._y }


    // Constructor
    constructor(xStart : number, yStart : number) {
        this.spawnEnemy1(xStart, yStart)
    }


    // Functions

    // Init Functions
    private spawnEnemy1(xStart : number, yStart : number) {
        this._div = document.createElement("enemy1")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = xStart
        this._y = yStart

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }


    // Loop Functions
    public update() {
    this.leftspeed =+ 1

    let newX = this._x - this.leftspeed + this.rightspeed
        // check of het monster binnen het beeld blijft
        if (newX < (1440 - this._div.clientWidth)){
         this._x = newX
        }
        if (newX < 0 - this._div.clientWidth) {
            this._div.remove()
        }
        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
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