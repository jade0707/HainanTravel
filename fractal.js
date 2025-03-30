class FractalRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.zoom = 1;
        this.iterations = 100;
        this.colorSpeed = 10;
        this.time = 0;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.getElementById('zoom').addEventListener('input', (e) => {
            this.zoom = parseFloat(e.target.value);
        });

        document.getElementById('iterations').addEventListener('input', (e) => {
            this.iterations = parseInt(e.target.value);
        });

        document.getElementById('colorSpeed').addEventListener('input', (e) => {
            this.colorSpeed = parseInt(e.target.value);
        });
    }

    mandelbrot(x0, y0) {
        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < this.iterations) {
            const xTemp = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xTemp;
            iteration++;
        }

        return iteration;
    }

    getColor(iteration) {
        if (iteration === this.iterations) return [0, 0, 0];
        
        const hue = (iteration * 10 + this.time * this.colorSpeed) % 360;
        const h = hue / 360;
        const s = 1;
        const l = 0.5;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c/2;

        let r, g, b;
        if (h < 1/6) { r = c; g = x; b = 0; }
        else if (h < 2/6) { r = x; g = c; b = 0; }
        else if (h < 3/6) { r = 0; g = c; b = x; }
        else if (h < 4/6) { r = 0; g = x; b = c; }
        else if (h < 5/6) { r = x; g = 0; b = c; }
        else { r = c; g = 0; b = x; }

        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        ];
    }

    render() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const imageData = this.ctx.createImageData(width, height);

        for (let px = 0; px < width; px++) {
            for (let py = 0; py < height; py++) {
                const x0 = (px - width / 2) / (width / 4) / this.zoom;
                const y0 = (py - height / 2) / (height / 4) / this.zoom;

                const iteration = this.mandelbrot(x0, y0);
                const [r, g, b] = this.getColor(iteration);
                const index = (py * width + px) * 4;
                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = 255;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    animate() {
        this.time++;
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

window.onload = () => {
    const canvas = document.getElementById('fractalCanvas');
    new FractalRenderer(canvas);
};