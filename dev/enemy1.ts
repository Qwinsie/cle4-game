class Enemy1 {

    private enemy1 : HTMLElement
    public x : number
    public y : number

    private leftkey: number
    private rightkey: number

    private leftspeed : number = 0
    private rightspeed : number = 0

    public canvas : HTMLElement

    constructor() {
        this.enemy1 = document.createElement("enemy1")

        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.enemy1)
        // 65 = A, 68 = D
        this.leftkey = 65
        this.rightkey = 68

        this.x = 1000
        this.y = 630

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 10
                break
            case this.rightkey:
                this.rightspeed = 10
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 0
                break
            case this.rightkey:
                this.rightspeed = 0
                break
        }
    }

    public update() {
        let newX = this.x - this.leftspeed + this.rightspeed
        // check of het monster binnen het beeld blijft
        if (newX > 0 && newX + 100 < (1440 - this.enemy1.clientWidth)){
         this.x = newX
        }
        this.enemy1.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}