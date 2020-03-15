import { LinearGradient } from "./Utilities.js";

export {RectShape, CircleShape};

export class Shape 
{
    static Fill = 1;
    static Stroke = 2;
    static Butt = 'butt';
    static Round = 'round';
    static Square = 'square';
    static Bevel = 'bevel';
    static Miter = 'miter';

    x = 0; y = 0;
    color = '#000';
    style = Shape.Fill;
    thickness = 1;
    shadow = undefined;

    constructor(x, y)
    {
        this.setPosition(x, y);
    }

    setColor(color)
    {
        this.color = color;
        console.log(color);
    }

    /**
     * 
     * @param {number} style values Shape.Fill | Shape.Stroke
     */
    setStyle(style = Shape.Fill)
    {
        this.style = style;
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    get position()
    {
        return { x: this.x, y: this.y };
    }

    setShadow(shadow)
    {
        if (typeof shadow == 'object' && shadow.x != undefined && shadow.y != undefined && shadow.blur != undefined && shadow.color != undefined) {
            this.shadow = shadow;
        }
    }

    setupContext(ctx)
    {
        ctx.lineWidth = this.thickness;
        if (this.shadow != undefined) {
            ctx.shadowOffsetX = this.shadow.x;
            ctx.shadowOffsetY = this.shadow.y;
            ctx.shadowBlur = this.shadow.blur;
            ctx.shadowColor = this.shadow.color;
        }
    }
    resetContext(ctx)
    {
        ctx.lineWidth = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    }
};

class RectShape extends Shape
{
    width = 0; height = 0;
    transform = {
        rotate: 0,
        origin: {x: 0, y: 0},
        scale: {x: 1, y: 1}
    }

    constructor(x, y, width, height, style = Shape.Fill)
    {
        super(x, y);
        this.setSize(width, height);
        this.setStyle(style);
    }

    /**
    * set the size of the rectangle shape
    * @param {number} w width
    * @param {number} h height
    */
    setSize(w, h)
    {
        this.width = w;
        this.height = h;
    }

    setThickness(value)
    {
        this.thickness = value;
    }

    /**
    * move the rectangle by the given offset
    * @param {Number} offsetX the distance on x
    * @param {Number} offsetY the distance on y
    */
    move(offsetX, offsetY)
    {
        this.x += offsetX;
        this.y += offsetY;
    }

    setRotation(deg)
    {
        this.transform.rotate = (Math.PI/180)*deg;
    }

    setOrigin(x, y)
    {
        this.transform.origin.x = x;
        this.transform.origin.y = y;
    }

    draw(context)
    {
        let color = this.color;
        if (this.color instanceof LinearGradient) {
            color = this.color.getCanvasGradient(context, -this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
        }
        
        context.save();
        context.beginPath();
        context.translate(this.transform.origin.x + this.x, this.transform.origin.y + this.y);
        context.rotate(this.transform.rotate);
        context.scale(this.transform.scale.x, this.transform.scale.y);
        this.setupContext(context);
        if (this.style == Shape.Fill) {
            context.fillStyle = color;
            context.fillRect(-this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
        }
        else if (this.style == Shape.Stroke)
        {
            context.strokeStyle = color;
            context.strokeRect(-this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
        }

        //context.translate(-(this.x), -(this.y));
        context.restore();

        //reset
        this.resetContext(context);
    }
}

class CircleShape extends Shape
{
    radius = 0;

    constructor(x, y, radius, style)
    {
        super(x, y);
        this.setRadius(radius);
        this.setStyle(style);
    }

    setRadius(r)
    {
        this.radius = r;
    }

    setThickness(value)
    {
        this.thickness = value;
    }

    move(offsetX, offsetY)
    {
        this.x += offsetX;
        this.y += offsetY;
    }

    draw(context)
    {
        let color = this.color;
        if (this.color instanceof LinearGradient) {
            color = this.color.getCanvasGradient(context, this.x, this.y, this.radius, this.radius / 2);
        }
        
        context.beginPath();
        this.setupContext(context);
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.style == Shape.Fill) {
            context.fillStyle = color;
            context.fill();
        }
        else if (this.style == Shape.Stroke)
        {
            context.strokeStyle = color;
            context.stroke();
        }

        //reset
        this.resetContext(context);
    }
}