class Code {

    private code : HTMLElement

    public x : number = 0
    public y : number = 0

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

    public update() : void {
        if(this.collected) {
            console.log("collected")
            this.code.remove()
            this.collected = false
        }
    }
}