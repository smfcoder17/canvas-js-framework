import * as Utils from '../lib/Utilities.js'
import Canvas from '../lib/Canvas.js'
import Random from '../lib/Random.js'
import {RectShape, CircleShape, Shape, PolygonShape} from '../lib/Shapes.js'

let canvas = new Canvas('myCanvas', window.innerWidth - 10, window.innerHeight - 10);
let entities = [];
let mouse = new Utils.Vector2();
const NB_ENTITIES = 600;

function init() {
    document.addEventListener('keydown', (evt = new KeyboardEvent()) => {
        if (evt.keyCode == Utils.Keys.Escape) {
            canvas.stopLoop();
        }
        else if (evt.keyCode == Utils.Keys.Left) {
            v.x = -5;
        }
        else if (evt.keyCode == Utils.Keys.Right) {
            v.x = 5;
        }
        else if (evt.keyCode == Utils.Keys.Down) {
            v.y = 5;
        }
        else if (evt.keyCode == Utils.Keys.Up) {
            v.y = -5;
        }
    });

    canvas.c.addEventListener('mousemove', (ev) => {
        mouse.x = ev.x;
        mouse.y = ev.y;
    });

    console.log(Shape.Fill | Shape.Stroke);

    for (let i = 0; i < NB_ENTITIES; i++) {
        let radius = Random.int(1, 2);
        //let color = Utils.Color.rgba(Random.int(0, 50), Random.int(100, 255), Random.int(150, 255), Random.float(1, 1));
        let color = Random.element([Utils.Color.Red, Utils.Color.Dark, Utils.Color.Blue, Utils.Color.LightBlue]);
        //let bColor = Utils.Color.rgba(Random.int(50, 200), Random.int(0, 200), Random.int(50, 200), Random.float(0.5, 1));
        let pos = new Utils.Vector2(Random.int(radius, canvas.width - radius), Random.int(radius, canvas.height - radius));
        let entity =  {
            r: radius,
            obj: new CircleShape(pos.x, pos.y, radius, Random.element([ Shape.Fill | Shape.Stroke])),
            v: new Utils.Vector2(Random.element([-1, 1]), Random.element([-1, 1]))
        };
        entity.obj.setColor(color);
        //entity.obj.thickness = Random.int(1, 3);
        //entity.obj.setBorderColor(bColor);
        entities.push(entity);
    }
    console.log(entities);
}

function update(dt = new Utils.DeltaTime()) {
    let maxRadius = 40, range = 70;
    entities.forEach(entity => {
        if (entity.obj.x <= 0 || entity.obj.x >= canvas.width) {
            entity.v.x *= -1;
        }
        if (entity.obj.y <= 0 || entity.obj.y >= canvas.height) {
            entity.v.y *= -1;
        }
        entity.obj.move(entity.v.x, entity.v.y);

        // effect
        if (mouse != undefined)
        {
            if (entity.obj.x >= mouse.x - range && entity.obj.x <= mouse.x + range
                && entity.obj.y >= mouse.y - range && entity.obj.y <= mouse.y + range) 
            {
                let r = (entity.obj.radius < maxRadius) ? (entity.obj.radius + (dt.sec * range)) : maxRadius;
                entity.obj.setRadius(r);
            }
            else if (entity.obj.radius != entity.r){
                let r = (entity.obj.radius > entity.r) ? Math.abs(entity.obj.radius - (dt.sec * maxRadius)) : entity.r;
                entity.obj.setRadius(r);
            }

        }
    });
}

function draw() {
    canvas.clear(Utils.Color.LightGray);
    entities.forEach(entity => {
        entity.obj.draw(canvas.ctx);
    });
}

canvas.onInit = init;
canvas.onUpdate = update;
canvas.onDraw = draw;
canvas.mainLoop(60);