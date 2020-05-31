class Robot {
    // Fields
    private _div : HTMLElement

    private _x : number = 0
    private _y : number = 0

    private xVelo : number = 0
    private yVelo : number = 0

    private flip : number = 1

    // Inputs
    private leftKey : number = 0
    private rightKey : number = 0
    private downKey : number = 0
    private spaceKey : number = 0
    private spaceKey2 : number = 0

    private left : boolean = false
    private right : boolean = false
    private duck : boolean = false
    private space : boolean = false
    
    private jumping : boolean = false


    // Properties
    public get div(): HTMLElement           { return this._div }

    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }


    // Constructor
    constructor(xStart : number, yStart : number) {
        this.leftKey = 65
        this.rightKey = 68
        this.downKey = 83
        this.spaceKey = 32
        this.spaceKey2 = 87

        this.spawnRobot(xStart, yStart)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    
    // Functions

    // Init Functions
    private spawnRobot(xStart: number, yStart: number) {
        this._div = document.createElement("robot")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = xStart
        this._y = yStart

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    // Loop Functions
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

    public update(){
        if(this.space && this.jumping == false){
            this.yVelo -= 40;
            this.jumping = true;
        }

        if(this.left){
            this.xVelo -= 1;
            this.flip = -1
        }

        if(this.right){
            this.xVelo += 1;
            this.flip = 1
        }

        if(this.duck){
            this._div.classList.add("robot-duck")
        } else {
            this._div.classList.remove("robot-duck")
        }

        this.yVelo += 1.7;
        this._x += this.xVelo;
        this._y += this.yVelo;
        this.xVelo *= 0.9;
        this.yVelo *= 0.9;

        if(this._y > 600 - 16 -32){
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.yVelo = 0;
        }

        if (this._x < -200){
            this._x = 1240
        } else if(this._x > 1240){
            this._x = -200
        }

        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scalex(${this.flip})`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public getFutureRectangle(){
        let rect = this._div.getBoundingClientRect()
        rect.x += this.xVelo
        return rect
    }
}