class Screen {
    static colors = [
        [0, 0, 0, 255],
        [255, 255, 255, 255],
        [255, 0, 0, 255],
        [0, 255, 0, 255],
        [0, 0, 255, 255],
    ];

    constructor(computer) {
        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext("2d");
        this.computer = computer;

        this.setPixelated(this.context);

        this.width = this.context.width = 100;
        this.height = this.context.height = 100;
        this.canvas.style.width = (this.width * 10) + 'px';
        this.canvas.style.height = (this.height * 10) + 'px';

        this.screen = this.context.createImageData(this.context.width, this.context.height);
    }

    setPixelated(context) {
        context['imageSmoothingEnabled'] = false;       /* standard */
        context['mozImageSmoothingEnabled'] = false;    /* Firefox */
        context['oImageSmoothingEnabled'] = false;      /* Opera */
        context['webkitImageSmoothingEnabled'] = false; /* Safari */
        context['msImageSmoothingEnabled'] = false;     /* IE */
    }

    start() {
        this._initialise();
        this._redraw();
    }

    _redraw() {
        // Request animation frames
        window.requestAnimationFrame(() => this._redraw());

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let pixelIndex = y * this.width + x;
                let index = (y * this.width + x) * 4;

                let colorIndex = this.computer.memory.get(0x2008 | pixelIndex) || 0
                let color = Screen.colors[colorIndex];

                this.screen.data[index] = color[0];
                this.screen.data[index + 1] = color[1];
                this.screen.data[index + 2] = color[2];
                this.screen.data[index + 3] = color[3];
            }
        }

        // Draw the image data to the canvas
        this.context.putImageData(this.screen, 0, 0);
    }

    _initialise() {
        console.log(this.computer.memory, 0x2008 + 10000);
        let pixelIndex;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let index = (y * this.width + x) * 4;
                pixelIndex = y * this.width + x;

                let rand = Math.floor(Math.random() * (Screen.colors.length));
                let color = Screen.colors[rand];

                this.screen.data[index] = color[0];
                this.screen.data[index + 1] = color[1];
                this.screen.data[index + 2] = color[2];
                this.screen.data[index + 3] = color[3];
            }
        }

        console.log('pi ' + pixelIndex);

    }
}
