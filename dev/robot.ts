class Robot {

    private robot : HTMLElement

    private jumping: boolean = true

    private x: number
    private y: number

    private left : boolean = false
    private right: boolean = false
    private space: boolean = false

    private leftKey: number
    private rightKey: number
    private spaceKey: number

    private x_velo: number = 0
    private y_velo: number = 0

    public canvas: HTMLElement

    constructor() {
        this.robot = document.createElement("robot")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.robot)

        this.leftKey = 37
        this.rightKey = 39
        this.spaceKey = 32

        this.x = 200
        this.y = 630

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

    }

    private onKeyDown(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = true
                break;
            case this.rightKey:
                this.right = true
                break;
            case this.spaceKey:
                this.space = true
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = false
                break;
            case this.rightKey:
                this.right = false
                break;
            case this.spaceKey:
                this.space = false
                break;
        }
    }

    public update(){
        if(this.space && this.jumping == false){
            this.y_velo -= 40;
            this.jumping = true;
        }

        if(this.left){
            this.x_velo -= 1;
        }

        if(this.right){
            this.x_velo += 1;
        }

        this.y_velo += 1.7;
        this.x += this.x_velo;
        this.y += this.y_velo;
        this.x_velo *= 0.9;
        this.y_velo *= 0.9;

        if(this.y > 550 - 16 -32){
            this.jumping = false;
            this.y = 550 - 16 - 32;
            this.y_velo = 0;
        }

        if (this.x < -200){
            this.x = 1240
        } else if(this.x > 1240){
            this.x = -200
        }

        console.log(this.left)
        this.robot.style.transform = `translate(${this.x}px, ${this.y}px)`
    }


}