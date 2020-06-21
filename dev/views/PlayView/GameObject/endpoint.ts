class Endpoint extends GameObject {

    public reached : boolean = false

    constructor(xStart: number, yStart: number, name : string, game:Game) {
        super(xStart,yStart,name, game)
    }
    
    public update() : void {
        // When Endpoint is reached 
        if(this.reached) {
            console.log("collected")
            this.reached = false
        }

        super.update()
    }
}