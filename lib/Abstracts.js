import { Vector2 } from "./Utilities.js";

export {Drawable}

/**
 * Represent an abstract class
 */
class AbstractClass 
{
    constructor()
    {
        if (new.target === Drawable) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
    }
}

/**
 * Abstract base class for objects that can be drawn
 */
class Drawable extends AbstractClass
{
    /**
     * draw the object on the target.
     * @param {CanvasRenderingContext2D} target 
     */
    draw(target) {}
}


class Transformable extends AbstractClass
{
    transform = {
        rotate: 0,
        scale: new Vector2(1, 1),
        position: new Vector2(0, 0),
        origin: new Vector2(0, 0)
    }

    setPosition(x, y)
    {
        this.transform.position = new Vector2(x, y);
    }

    setRotation(deg)
    {
        this.transform.rotate = (Math.PI/180)*deg;
    }

    setScale(x = 1, y = 1)
    {
        this.transform.scale = new Vector2(x, y);
    }

    setOrigin(x, y)
    {
        this.transform.origin = new Vector2(x, y);
    }

    move(x, y)
    {
        this.transform.position.x += x;
        this.transform.position.y += y;
    }

    scale(x, y)
    {
        this.transform.scale.x *= x;
        this.transform.scale.y *= y;
    }

    rotate(deg)
    {
        this.transform.rotate += (Math.PI/180)*deg;
    }

    getPosition()
    {
        return this.transform.position;
    }

    getRotation(deg)
    {
        return this.transform.rotate;
    }

    getScale(x, y)
    {
        return this.transform.scale;
    }

    getOrigin(x, y)
    {
        return this.transform.origin;
    }
}