class Tree {

    private tree : HTMLElement
    public _x : number = 0
    public _y : number = 0

    public fixed : boolean = false

    constructor(x:number,y:number) {
        this.createTree(x,y)
   }

    private createTree(x:number,y:number) {
        this.tree = document.createElement("tree")
         let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.tree)

        this._x = x
        this._y = y

        this.tree.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public update() {
        if(this.fixed) {
            this.tree.classList.add("fixed")
            this.fixed = false
        }
    }
}