import * as Utils from './Utilities.js'
import {Canvas} from './Canvas.js'
import {RectShape, CircleShape, Shape} from './Shapes.js'

let canvas = new Canvas('myCanvas', window.innerWidth - 10, window.innerHeight - 10);

let v = {x: 0, y: 0};
let circle = new CircleShape(100, 100, 15, Shape.Fill);
circle.setColor(Utils.Color.rgb(230, 230, 50));
circle.setShadow(Utils.Shadow(2, 2, 5, Utils.Color.Teal));

let rect2 = new RectShape(1, 1, 300, 200, Shape.Fill);
rect2.setColor(Utils.Color.LGradient(Utils.Direction.Right, 0, Utils.Color.Blue, 1, Utils.Color.Purple));
rect2.setOrigin(rect2.width / 2, rect2.height / 2);
rect2.setRotation(0);

canvas.onInit = () => {
    document.addEventListener('keydown', (evt = new KeyboardEvent()) => {
        v = {x: 0, y: 0};
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
};

let r = 0;
canvas.onUpdate = (dt) => {
    circle.move(v.x, v.y);
    r++;
    //rect2.setRotation(r);
};

canvas.onDraw = () => {
    canvas.clear();
    rect2.draw(canvas.ctx);
    circle.draw(canvas.ctx);
};

canvas.mainLoop(60);
