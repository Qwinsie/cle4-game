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

        this.x = 250
        this.y = 250


        this.code.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.1)`

        
    }

    protected getRectangle() {
        return this.code.getBoundingClientRect()
    }
}