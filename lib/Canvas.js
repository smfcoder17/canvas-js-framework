
export class Canvas {
    ctx = null;
    canvas = null;
    running = false;
    width = 720;
    height = 640;
    initFunc = ()=>{};
    updateFunc = (dt)=>{};
    drawFunc = ()=>{};

    constructor(canvasId, width = 720, height = 640)
    {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx = this.canvas.getContext("2d");
    }

    /*
        @param 
    */
    mainLoop(framerate = 30)
    {
        this.running = true;
        this.initFunc();
        this.lastTime = Date.now();

        this.loop = setInterval(() => {
            let dt = Math.abs(this.lastTime - Date.now());
            this.lastTime = Date.now();
            this.updateFunc(dt);
            this.drawFunc();
            
        }, 1000/framerate);
    }

    stopLoop()
    {
        clearInterval(this.loop);
        this.running = false;
    }

    get context()
    {
        return this.ctx;
    }

    set onUpdate(callback)
    {
        this.updateFunc = callback;
    }

    set onDraw(callback)
    {
        this.drawFunc = callback;
    }

    set onInit(callback)
    {
        this.initFunc = callback;
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

}
