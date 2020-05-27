class Tree {

    private tree : HTMLElement
    public x : number
    public y : number

    public fixed : boolean = false

    constructor() {
        this.tree = document.createElement("tree")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.tree)

        this.x = 500
        this.y = 400

        this.tree.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public update() {
        if(this.fixed) {
            this.tree.classList.add("fixed")
            this.fixed = false
        }

    }
}