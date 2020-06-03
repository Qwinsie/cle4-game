class Terminal1Border {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private _x : number
    private _y : number


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }

        // Construtor
        constructor() {
            this._div = document.createElement("terminalBorder")
    
            let game = document.getElementsByTagName("game")[0]
            game.appendChild(this._div)
        }
}