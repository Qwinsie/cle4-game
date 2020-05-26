class Robot {

    private robot : HTMLElement
    public x : number
    public y : number
    private xspeed : number = 1
    private yspeed : number = 1

    constructor() {
        this.robot = document.createElement("robot")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.robot)

        this.x = 100
        this.y = 500

        this.robot.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}