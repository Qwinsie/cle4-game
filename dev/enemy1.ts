class Enemy1 {

    private enemy1 : HTMLElement
    private _x: number = 0
    private _y: number = 0

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    private leftspeed : number = 0
    private rightspeed : number = 0

    public canvas : HTMLElement

    constructor(x:number,y:number) {
        this.createEnemy1(x,y)
    }

    private createEnemy1(x:number,y:number) {
        this.enemy1 = document.createElement("enemy1")
        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.enemy1)

        this._x = x
        this._y = y

        this.enemy1.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public getRectangle() {
        return this.enemy1.getBoundingClientRect()
    }

    public update() {
    this.leftspeed =+ 1

    let newX = this._x - this.leftspeed + this.rightspeed
        // check of het monster binnen het beeld blijft
        if (newX < (1440 - this.enemy1.clientWidth)){
         this._x = newX
        }
        if (newX < 0 - this.enemy1.clientWidth) {
            this.enemy1.remove()
        }
        this.enemy1.style.transform = `translate(${this._x}px, ${this._y}px)`
    }
}