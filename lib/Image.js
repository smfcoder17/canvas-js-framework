import { Vector2 } from "./Utilities.js";

export {CImage as Image};

class CImage
{
    x = 0; y = 0;

    constructor(x, y, w, h, url)
    {
        this.img = new Image();
        this.img.src = url;
        this.setPosition(x, y);
        this.setSize(w, h);
    }

    get position() {
        return new Vector2(this.x, this.y);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(width, height) {
        this.w = width;
        this.h = height;
    }

    draw(ctx)
    {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}