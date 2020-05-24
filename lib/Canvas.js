import { Color, DeltaTime } from "./Utilities.js";

export default class Canvas {
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
            let dt = new DeltaTime(Math.abs(this.lastTime - Date.now()));
            this.lastTime = Date.now();
            this.updateFunc(dt);
            //this.drawFunc();
            
        }, 1000/framerate);
        this.drawLoop = setInterval(this.drawFunc, 0);
    }

    stopLoop()
    {
        clearInterval(this.loop);
        clearInterval(this.drawLoop);
        this.running = false;
    }

    /**
     * @returns {HTMLCanvasElement} the html element corresponding to this canvas.
     */
    get c()
    {
        return this.canvas;
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

    clear(color = Color.White)
    {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

}
