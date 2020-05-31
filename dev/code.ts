class Code{

    private code : HTMLElement

    public _x : number
    public _y : number
    protected collisionRobotCode: boolean = false

    public collected : boolean = false

    constructor(x:number,y:number) {
        this.createCode(x,y)
    }

    private createCode(x:number,y:number) {
        this.code = document.createElement("code")
        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.code)

        this._x = x
        this._y = y

        this.code.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`
    }

    public getRectangle() {
        return this.code.getBoundingClientRect()
    }

    public getFutureRectangle(){
        let rect = this.code.getBoundingClientRect()
        return rect
    }

    public update() : void {

        if(this.collected) {
            console.log("collected")
            this.code.remove()
            this.collected = false
        }
    }
}