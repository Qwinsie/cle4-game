class Game {

    private robot : Robot
    private enemy1 : Enemy1
    private enemy2 : Enemy2
    private tree : Tree
    private code : Code

    public canvas : HTMLElement

    private score : number = 0
    private enemy1killed : boolean = false
    private enemy2killed : boolean = false

    constructor() {
        this.canvas = document.createElement("canvas")

        let game =document.getElementsByTagName("game")[0]
        game.appendChild(this.canvas)

        this.tree = new Tree(500,400)
        this.robot = new Robot(200,600)
        this.enemy1 = new Enemy1(1000,630)
        this.enemy2 = new Enemy2(1200,630)
        this.code = new Code(500,200)

        this.gameLoop()
    }

    private gameLoop() {
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy2.getRectangle()) && !this.enemy2killed) {
            //collision event enemy2
            console.log("collision")
            
            this.updateScore(1)
            this.enemy2killed = true
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.enemy1.getRectangle()) && !this.enemy1killed) {
            //collision event enemy1
            console.log("collision")
            
            this.updateScore(1)
            this.enemy1killed = true
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.code.getRectangle())) {
            //collision event code wolkje
            this.code.collected = true
            this.tree.fixed = true
            this.updateScore(1)
        }

        this.tree.update()
        this.enemy1.update()
        this.enemy2.update()
        this.robot.update()
        this.code.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }

    updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }
    
}
window.addEventListener("load", () => new Game())