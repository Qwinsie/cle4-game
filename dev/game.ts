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

        this.tree = new Tree
        this.robot = new Robot
        this.enemy1 = new Enemy1
        this.enemy2 = new Enemy2
        this.code = new Code


        this.gameLoop()
    }

    private gameLoop() {
        if (this.checkCollisionEnemy2(this.robot.getFutureRectangle(), this.enemy2.getRectangle())) {
            //collision event
            console.log("collision enemy2")
        }

        if(this.checkCollisionCodeCloud(this.robot.getFutureRectangle(), this.code.getRectangle())){
            console.log("collision code!")
            this.code.hideCodeCloud()
        }
        if (this.checkCollision(this.robot.getFutureRectangle(), this.code.getRectangle())) {
            //collision event code wolkje
            this.code.collected = true
            this.tree.fixed = true
        }

        this.tree.update()
        this.enemy1.update()
        this.enemy2.update()
        this.robot.update()
        this.code.update()

        requestAnimationFrame(()=>this.gameLoop())
    }

    checkCollisionEnemy2(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
    }
    
    checkCollisionCodeCloud(a: ClientRect, b:ClientRect){
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}
window.addEventListener("load", () => new Game())