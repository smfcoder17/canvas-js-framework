
/**
 * Color object
 * @enum {string}
 */
export const Color = {
    LightBlue: "#3498DB",
    Blue: "#0597F2",
    Indigo: "#6610f2",
    Purple: "#6f42c1",
    Pink: "#e83e8c",
    Red: "#E74C3C",
    Orange: "#fd7e14",
    Yellow: "#ffc107",
    Green: "#28a745",
    Teal: "#20c997",
    Cyan: "#17a2b8",
    White: "#F7FBFC",
    Gray: "#6c757d",
    LightGray: "#ECF0F1",
    Black: "#000",
    Dark: "#2D2D2D",
    LGradient: function(direction = Direction.Bottom, ...args) { // (position, color, position, color)
        let res = [];
        for (let i = 0; i < args.length; i+=2) {
            res.push({
                position: args[i],
                color: args[i + 1]
            })
        }

        return new LinearGradient(direction, res);
    },
    /**
     * rgb color
     * @param {number} red in [0, 255]
     * @param {number} green in [0, 255]
     * @param {number} blue in [0, 255]
     */
    rgb: function(red, green, blue) {
        return `rgb(${red},${green},${blue})`;
    },
    /**
     * rgb color
     * @param {number} red in [0, 255]
     * @param {number} green in [0, 255]
     * @param {number} blue in [0, 255]
     * @param {number} alpha in [0, 1]
     */
    rgba: function(red, green, blue, alpha) {
        return `rgb(${red}, ${green}, ${blue}, ${alpha})`;
    }
};

/**
 * Represents Keys codes.
 * @readonly
 * @enum {number}
 */
export const Keys = {
    Unknown: -1, A: 65, 
    B: 66, C: 67, D: 68, E: 69, F: 70, 
    G: 71, H: 72, I: 73, J: 74, K: 75, 
    L: 76, M: 77, N: 78, O: 79, P: 80, 
    Q: 81, R: 82, S: 83, T: 84, U: 85, 
    V: 86, W: 87, X: 88, Y: 89, Z: 90, 
    Num0: 48, Num1: 49, Num2: 50, Num3: 51, Num4: 52,
    Num5: 53, Num6: 54, Num7: 55, Num8: 56, Num9: 57,
    Escape: 27, Control: 17, Shift: 16,
    Alt: 18, System: 91, 
    Left: 37, Right: 39, Up: 38, Down: 40,
    Numpad0: 96, Numpad1: 97, Numpad2: 98, Numpad3: 99,
    Numpad4: 100, Numpad5: 101, Numpad6: 102, Numpad7: 103,
    Numpad8: 104, Numpad9: 105,
    LBracket: 219, RBracket: 221, Semicolon: 186, 
    Comma: 188, Period: 190, Quote: 222 
    // Slash, Backslash, Tilde,
    // Equal, Hyphen, Space, Enter: 13,
    // Backspace, Tab, PageUp, PageDown,
    // End, Home, Insert, Delete,
    // Add, Subtract, Multiply, Divide,
}

/**
 * list of Directions values
 * @readonly
 * @enum {number}
 */
export const Direction = {
    Top: 1,
    Right: 2,
    Bottom: 3,
    Left: 4,
    TopRight: 5,
    TopLeft: 6,
    BottomRight: 7,
    BottomLeft: 8
}

/**
 * create a shadow object
 * @param {number} x the shadow x offset
 * @param {number} y the shadow y offset
 * @param {number} blur the shadow blur
 * @param {number} color the shadow color
 */
export function Shadow(x, y, blur, color)
{
    return {
        x: x,
        y: y,
        blur: blur,
        color: color
    };
}


export class LinearGradient
{
    direction = Direction.Right;
    values = [];

    /**
     * Create a LinearGradient Color
     * @param {Direction} direction the direction of the gradient
     * @param {{position:number, color:string}[]} values different positions and colors in the gradient. position is in range [0.0 - 1.0]
     */
    constructor(direction, values = []) {
        if (Object.values(Direction).includes(direction)) {
            this.direction = direction;
        }
        values.map((element) => {
            if (element.position != undefined && element.color != undefined)
                return element;
        });
        this.values = values;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w width
     * @param {number} h height
     * @returns {CanvasGradient} the canvas gradient representing this LinearGradient
     */
    getCanvasGradient(context, x, y, w, h)
    {
        let color;

        if (this.direction == Direction.Top) {
            color = context.createLinearGradient(x, y + h, x, y);
        }
        else if (this.direction == Direction.Right) {
            color = context.createLinearGradient(x, y, x + w, y);
        }
        else if (this.direction == Direction.Bottom) {
            color = context.createLinearGradient(x, y, x, y + h);
        }
        else if (this.direction == Direction.Left) {
            color = context.createLinearGradient(x + w, y, x, y);
        }
        else if (this.direction == Direction.TopRight) {
            color = context.createLinearGradient(x, y + h, x + w, y);
        }
        else if (this.direction == Direction.TopLeft) {
            color = context.createLinearGradient(x + w, y + h, x, y);
        }
        else if (this.direction == Direction.BottomRight) {
            color = context.createLinearGradient(x, y, x + w, y + h);
        }
        else if (this.direction == Direction.BottomLeft) {
            color = context.createLinearGradient(x + w, y, x, y + h);
        }


        this.values.forEach(element => {
            color.addColorStop(element.position, element.color);
        });
        return color;
    }
}


export const Vector2 = function(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

export const Vector3 = function(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
}

export function degToRad(deg) { return (Math.PI/180)*deg; }
export function radToDef(rad) { return (180/Math.PI)*rad; }

/**
 * Represents the time between two call of Canvas.update
 * @param {number} ms time elapsed in ms since last onUpdate.
 */
export const DeltaTime = function(ms) {
    this.ms = ms;
    this.sec = ms / 1000.0;
}