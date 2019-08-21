const Clouds = function() {
    const layerBack = document.createElement("canvas");
    const layerFront = document.createElement("canvas");
    let shiftBack = 0;
    let shiftFront = 0;

    const paintLayer = canvas => {
        canvas.width = canvas.height = Clouds.RESOLUTION;

        const context = canvas.getContext("2d");

        for (let i = 0; i < 20; ++i) {
            context.fillStyle = "rgba(255,255,255,0.18)";

            context.beginPath();
            context.arc(Math.random() * canvas.width, Math.random() * canvas.height, 32, 0, Math.PI * 2);
            context.fill();
        }
    };

    const drawLayer = (context, radius, layer, shift) => {
        radius /= Clouds.SCALE;

        context.save();
        context.scale(Clouds.SCALE, Clouds.SCALE);

        for (let y = Math.floor(-radius / Clouds.RESOLUTION) * Clouds.RESOLUTION; y < radius; y += Clouds.RESOLUTION)
            for (let x = Math.floor(-radius / Clouds.RESOLUTION) * Clouds.RESOLUTION + shift; x < radius; x += Clouds.RESOLUTION)
                context.drawImage(layer, x, y);

        context.restore();
    };

    this.update = (timeStep, skySpeed) => {
        if ((shiftBack -= timeStep * skySpeed * Clouds.SPEED_SCALE_BACK / Clouds.SCALE) < -Clouds.RESOLUTION)
            shiftBack += Clouds.RESOLUTION;

        if ((shiftFront -= timeStep * skySpeed * Clouds.SPEED_SCALE_FRONT / Clouds.SCALE) < -Clouds.RESOLUTION)
            shiftFront += Clouds.RESOLUTION;
    };

    this.drawBack = (context, radius) => {
        drawLayer(context, radius, layerBack, shiftBack);
    };

    this.drawFront = (context, radius) => {
        drawLayer(context, radius, layerFront, shiftFront);
    };

    paintLayer(layerBack);
    paintLayer(layerFront);
};

Clouds.RESOLUTION = 512;
Clouds.SCALE = 2;
Clouds.SPEED_SCALE_BACK = 0.6;
Clouds.SPEED_SCALE_FRONT = 1.2;