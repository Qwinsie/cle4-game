class Code {

    private code : HTMLElement
    public x : number
    public y : number

    constructor() {
        this.createCode()
    }

    createCode() {
        this.code = document.createElement("code")

        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.code)

        this.x = 0
        this.y = 0

        this.code.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.1)`
    }
}