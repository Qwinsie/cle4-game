class Robot {

    private robot : HTMLElement

    private jumping : boolean = true

    private _x : number = 0
    private _y : number = 0

    private left : boolean = false
    private right : boolean = false
    private duck : boolean = false
    private space : boolean = false

    private leftKey : number = 0
    private rightKey : number = 0
    private downKey : number = 0
    private spaceKey : number = 0
    private spaceKey2 : number = 0

    private x_velo : number = 0
    private y_velo : number = 0

    private flip : number = 1

    public canvas : HTMLElement

    constructor(x:number,y:number) {
        this.leftKey = 65
        this.rightKey = 68
        this.downKey = 83
        this.spaceKey = 32
        this.spaceKey2 = 87

        this.createRobot(x,y)
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private createRobot(x:number,y:number) {
        this.robot = document.createElement("robot")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.robot)
        this._x = x
        this._y = y
        this.robot.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    private onKeyDown(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = true
                break;
            case this.rightKey:
                this.right = true
                break;
            case this.downKey:
                this.duck = true
                break;
            case this.spaceKey:
                this.space = true
                break;
            case this.spaceKey2:
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
            case this.downKey:
                this.duck = false
                break;
            case this.spaceKey:
                this.space = false
                break;
            case this.spaceKey2:
                this.space = false
                break;
        }
    }

    getFutureRectangle(){
        let rect = this.robot.getBoundingClientRect()
        rect.x += this.x_velo
        return rect
    }

    public update(){
        if(this.space && this.jumping == false){
            this.y_velo -= 40;
            this.jumping = true;
        }

        if(this.left){
            this.x_velo -= 1;
            this.flip = -1
        }

        if(this.right){
            this.x_velo += 1;
            this.flip = 1
        }

        if(this.duck){
            this.robot.classList.add("robot-duck")
        } else {
            this.robot.classList.remove("robot-duck")
        }

        this.y_velo += 1.7;
        this._x += this.x_velo;
        this._y += this.y_velo;
        this.x_velo *= 0.9;
        this.y_velo *= 0.9;

        if(this._y > 600 - 16 -32){
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.y_velo = 0;
        }

        if (this._x < -200){
            this._x = 1240
        } else if(this._x > 1240){
            this._x = -200
        }

        this.robot.style.transform = `translate(${this._x}px, ${this._y}px) scalex(${this.flip})`
    }
}