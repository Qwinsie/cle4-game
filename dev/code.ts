class Code{
    // Fields
    private _div : HTMLElement

    private _x : number
    private _y : number
    protected collisionRobotCode: boolean = false

    public collected : boolean = false

    
    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    // Constructor
    constructor(xStart: number, yStart: number) {
        this.spawnCode(xStart, yStart)
    }


    // Functions

    // Init Functions
    private spawnCode(xStart: number, yStart: number) {
        this._div = document.createElement("code")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = xStart
        this._y = yStart

        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`
    }

    // Loop Functions
    public update() : void {

        if(this.collected) {
            console.log("collected")
            this._div.remove()
            this.collected = false
        }
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public getFutureRectangle(){
        return this._div.getBoundingClientRect()
    }

}