class Game {

    private robot : Robot
    private enemy1 : Enemy1
    private tree : Tree
    public canvas : HTMLElement
    private code : Code

    constructor() {
        this.canvas = document.createElement("canvas")

        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.canvas)

        this.robot = new Robot
        this.tree = new Tree
        this.enemy1 = new Enemy1
        this.code = new Code

        this.gameLoop()
    }

    private gameLoop() {
        this.enemy1.update()
        requestAnimationFrame(()=>this.gameLoop())
    }
    
}
window.addEventListener("load", () => new Game())