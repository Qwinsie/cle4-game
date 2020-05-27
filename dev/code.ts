class Code {

    private code : HTMLElement

    public x : number
    public y : number

    public collected : boolean = false

    constructor() {
        this.createCode()
    }

    createCode() {
        this.code = document.createElement("code")

        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.code)

        this.x = 500
        this.y = 200

        this.code.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.2)`
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