class Terminal1Block {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game
   

    private _x : number
    private _y : number

    private downSpeed : number = 0
    private upSpeed : number = 0

    private blockSpeed : number = 20
    private block1Down : boolean = true

    // Inputs
    private downkey : number
    private upkey : number


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    // Construtor
    constructor(x : number = 0,  
                y : number = 0,
                ) {
        this._div = document.createElement("Terminal1Block")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)


        this._x = x
        this._y = y

        

        this.update()

    }

    public makeBlockMove(f:boolean, down:number){
        if(f){
            this.downSpeed = down
            this.block1Down = true
            return this.block1Down
        }
    }



    public update() {
        let newPosY = this._y - this.upSpeed + this.downSpeed

        // if (newPosY > 0 && newPosY + 100 < window.innerHeight) 

        this._y = newPosY

        if(this._y == 100){
            this.downSpeed = 0
            this._y = 70
        }


        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }
}

// 866.88 width height: 978.24