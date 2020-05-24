import Canvas from "./lib/Canvas.js";
import { DeltaTime, Color, Direction, Keys, Vector2 } from "./lib/Utilities.js";
import { RectShape, Shape, CircleShape } from "./lib/Shapes.js";
import Random from "./lib/Random.js"

let canvas = new Canvas('myCanvas', innerWidth - 5, innerHeight - 5);
let mouse = {x: 0, y: 0};
function Particle(velocity = new Vector2(0, 0), circle = new CircleShape(0, 0, 5, Shape.Fill)){ 
    this.velocity = velocity;
    this.body = circle;
    this.radians = 0;

    this.update = (dt) => {
        this.radians += this.velocity * dt.sec;
        this.body.x = this.body.x + Math.cos(this.radians) * 5;
        this.body.y = this.body.y + Math.sin(this.radians) * 5;
    };

    this.draw = function() { this.body.draw(canvas.ctx); };
};

let particles = [];
function init() {
    // var initialisation
    for (let i = 0; i < 15; i++) {
        particles[i] = new Particle(Random.int(2, 4), new CircleShape(Random.int(200, 225), Random.int(200, 215), 5, Shape.Fill));
        particles[i].body.setColor(Random.element([Color.Blue, Color.Cyan, Color.Purple]));
    }

    // eventListener initialisation
    canvas.c.addEventListener('mousemove', onMouseMove);

    // functions initialisation
    function onMouseMove(evt = new MouseEvent()) {
        mouse.x = evt.clientX;
        mouse.y = evt.clientY;
    }
}

function update(dt = new DeltaTime()) {
    particles.forEach((particle) => {
        particle.update(dt);
    });
}

function draw() {
    canvas.clear(Color.LightGray);
    particles.forEach((particle) => {
        particle.draw();
    });
}

canvas.onInit = init;
canvas.onUpdate = update;
canvas.onDraw = draw;
canvas.mainLoop(60);