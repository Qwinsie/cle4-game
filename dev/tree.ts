class Tree {
    // Fields
    private _div : HTMLElement
    private tree : HTMLElement

    private _x : number = 0
    private _y : number = 0

    public fixed : boolean = false

    // Inputs
    // no inputs


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    // Constructor
    constructor(xStart: number, yStart: number) {
        this.spawnTree(xStart, yStart)
   }

   
    // Functions

    // Init Functions
    private spawnTree(xStart: number, yStart: number) {
        this._div = document.createElement("tree")
         let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = xStart
        this._y = yStart

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    // Loop Functions
    public update() {
        if(this.fixed) {
            this._div.classList.add("fixed")
            this.fixed = false
        }
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }
}