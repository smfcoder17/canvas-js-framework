import { LinearGradient, Vector2, Shadow } from "./Utilities.js";

export {RectShape, CircleShape, ConvexShape};

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
    }

    /**
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
        return new Vector2(this.x, this.y);
    }

    set position(position = new Vector2())
    {
        if (!position instanceof Vector2) {
            throw new Error(`Expecting a ${Vector2.name} received ${typeof position}`);
        }
        this.x = position.x;
        this.y = position.y;
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

    setThickness(value)
    {
        this.thickness = value;
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
        ctx.lineCap = Shape.Butt;
        ctx.lineJoin = Shape.Miter;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    }
};

class RectShape extends Shape
{
    width = 0; height = 0;
    borderColor = '';
    transform = {
        rotate: 0,
        origin: new Vector2(0, 0),
        scale: new Vector2(1, 1)
    };

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

    setRotation(deg)
    {
        this.transform.rotate = (Math.PI/180)*deg;
    }

    setBorderColor(color) {
        this.borderColor = color;
    }

    setOrigin(x, y)
    {
        this.transform.origin.x = x;
        this.transform.origin.y = y;
    }

    draw(context)
    {
        let color = this.color, borderColor = this.borderColor;
        if (this.color instanceof LinearGradient) {
            color = this.color.getCanvasGradient(context, -this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
        }
        if (this.borderColor instanceof LinearGradient) {
            borderColor = this.color.getCanvasGradient(context, -this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
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
            context.strokeStyle = borderColor;
            context.strokeRect(-this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
        }
        else if (this.style == Shape.Fill | Shape.Stroke)
        {
            context.fillStyle = color;
            context.fillRect(-this.transform.origin.x, -this.transform.origin.y, this.width, this.height);
            context.strokeStyle = borderColor;
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
    borderColor = '';

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

    setBorderColor(color) {
        this.borderColor = color;
    }

    draw(context)
    {
        let color = this.color, borderColor = this.borderColor;
        if (this.color instanceof LinearGradient) {
            color = this.color.getCanvasGradient(context, this.x, this.y, this.radius, this.radius / 2);
        }
        if (this.borderColor instanceof LinearGradient) {
            borderColor = this.color.getCanvasGradient(context, this.x, this.y, this.radius, this.radius / 2);
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
            context.strokeStyle = borderColor;
            context.stroke();
        }
        else if (this.style == Shape.Fill | Shape.Stroke)
        {
            context.fillStyle = color;
            context.strokeStyle = borderColor;
            context.stroke();
            context.fill();
        }

        //reset
        this.resetContext(context);
    }
}

class ConvexShape extends Shape
{
    points = [new Vector2()];
    transform = {
        rotate: 0,
        origin: new Vector2(0, 0),
        scale: new Vector2(1, 1)
    }

    constructor(x, y, nbOfPoints, style = Shape.Fill || Shape.Stroke)
    {
        super(x, y);
        this.setStyle(style);

        this.points = [];
        for (let i = 0; i < Math.abs(nbOfPoints); i++) {
            this.points.push(new Vector2());
        }
    }

    setPoint(index, position = new Vector2())
    {
        if (index >= 0 && index < this.points.length)
        {
            if (!(position instanceof Vector2) && (position.x == undefined || position.y == undefined))
            { 
                throw new Error(`position must be an instanceof ${Vector2.name}`); 
            }
            this.points[index] = position;
            return;
        }
        throw new Error(`Out of range, must be between [0, ${this.points.length - 1}]`); 
    }

    setRotation(deg)
    {
        this.transform.rotate = (Math.PI/180)*deg;
    }

    /**
     * Set how two connecting lines are joined together on the polygon.
     * @param {string} value Possible values are Shape.Bevel | Shape.Round | Shape.Miter 
     */
    setLineJoin(value)
    {
        this.lineJoin = value;
    }

    /**
     * Set how lines end on the polygon.
     * @param {string} value Possible values are Shape.Butt | Shape.Round | Shape.Square 
     */
    setLineCap(value)
    {
        this.lineCap = value;
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
        context.lineJoin = this.lineJoin;
        context.lineCap = this.lineCap;
        
        this.points.forEach((point, index) => {
            context.lineTo(point.x, point.y);
        });

        context.closePath();
        if (this.style == Shape.Fill) {
            context.fillStyle = color;
            context.fill();
        }
        else if (this.style == Shape.Stroke)
        {
            context.strokeStyle = color;
            context.stroke();
        }

        //context.translate(-(this.x), -(this.y));
        context.restore();

        //reset
        this.resetContext(context);
    }
}