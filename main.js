import Canvas from "./lib/Canvas.js";
import { DeltaTime, Color, Direction, Keys, Vector2 } from "./lib/Utilities.js";
import { RectShape, Shape, CircleShape } from "./lib/Shapes.js";
import Random from "./lib/Random.js"
import { Image } from "./lib/Image.js";

let canvas = new Canvas('myCanvas', innerWidth - 5, innerHeight - 5);
let mouse = {x: 0, y: 0};
let img = new Image(0, 0, 290, 309, "/js/examples/res/pp.png");
let img2 = new Image(0, 0, 300, 150, "/js/examples/res/img2.png");

function init() {
    canvas.attach(img2);
    canvas.attach(img);

    // eventListener initialisation
    canvas.c.addEventListener('mousemove', onMouseMove);

    // functions initialisation
    function onMouseMove(evt = new MouseEvent()) {
        mouse.x = evt.clientX;
        mouse.y = evt.clientY;
    }
}

function update(dt = new DeltaTime()) {
    img2.setPosition(mouse.x, mouse.y);
}

function draw() {
    canvas.clear(Color.White);
    canvas.drawEntities();
}

canvas.onInit = init;
canvas.onUpdate = update;
canvas.onDraw = draw;
canvas.mainLoop(60);