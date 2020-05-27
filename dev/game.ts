class Game {

    private robot : Robot
    private enemy1 : Enemy1
    private enemy2 : Enemy2
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
        this.enemy2 = new Enemy2
        this.code = new Code

        this.gameLoop()
    }

    private gameLoop() {
        this.enemy1.update()
        this.enemy2.update()
        this.robot.update()
        
        requestAnimationFrame(()=>this.gameLoop())
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }
    
}
window.addEventListener("load", () => new Game())