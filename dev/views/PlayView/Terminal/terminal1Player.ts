class Terminal1Player {
    // Fields
    private _div : HTMLElement
    private _x : number
    private _y : number

    private rightSpeed : number = 0
    private leftSpeed : number = 0

    private speed : number = 10

    // Inputs
    private rightKey : number
    private leftKey : number


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    // Constructor
    constructor() {
        this._div = document.createElement("Terminal1Player")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this.rightKey = 68
        this.leftKey = 65

        this._x = 0
        this._y = 600

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    // Loop Functions
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = this.speed
                break
            case this.rightKey:
                this.rightSpeed = this.speed
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0
                break
            case this.rightKey:
                this.rightSpeed = 0
                break
        }
    }

    public update() {
        let newPosX = this._x - this.leftSpeed + this.rightSpeed

        // Checks if player is still inside the screen
        if (newPosX > 0 && newPosX + 400 < 1600) this._x = newPosX

        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.3)`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }
}