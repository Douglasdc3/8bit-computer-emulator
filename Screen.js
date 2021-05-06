class Screen {
    constructor() {
        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext("2d");

        this.width = this.context.width = 800;
        this.height = this.context.height = 400;

        this.screen = this.context.createImageData(this.context.width, this.context.height);
    }

    start() {
        this._initialise();
        this._redraw();
    }

    _redraw() {
        // Request animation frames
        window.requestAnimationFrame(() => this._redraw());

        // Draw the image data to the canvas
        this.context.putImageData(this.screen, 0, 0);
    }

    _initialise() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let index = (y * this.width + x) * 4;

                this.screen.data[index] = 0;
                this.screen.data[index + 1] = 0;
                this.screen.data[index + 2] = 255;
                this.screen.data[index + 3] = 255;
            }
        }
    }
}
