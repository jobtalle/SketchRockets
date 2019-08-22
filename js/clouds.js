const Clouds = function() {
    const layerBack = document.createElement("canvas");
    const layerFront = document.createElement("canvas");
    let shiftBack = 0;
    let shiftFront = 0;

    const paintLayer = canvas => {
        canvas.width = canvas.height = Clouds.RESOLUTION;

        const context = canvas.getContext("2d");
        const imageData = context.createImageData(canvas.width, canvas.height);
        const octaves = [];
        let noises = [];
        let falloff = Clouds.FALLOFF;
        let amp = (((falloff - 1) * Math.pow(falloff, Clouds.OCTAVES)) / (Math.pow(falloff, Clouds.OCTAVES) - 1)) / falloff;

        for (let i = 0; i < Clouds.OCTAVES; amp /= falloff, ++i) {
            octaves.push(amp);
            noises.push(cubicNoiseConfig(
                Math.random(),
                Clouds.RESOLUTION / (Clouds.PHASE / Clouds.SCALE),
                Clouds.RESOLUTION / (Clouds.PHASE / Clouds.SCALE)));
        }

        for (let y = 0; y < canvas.height; ++y) for (let x = 0; x < canvas.width; ++x) {
            const index = y * canvas.width + x << 2;
            let transparency = 0;

            for (let i = 0; i < octaves.length; ++i) {
                const scale = 1 / (Clouds.PHASE / Clouds.SCALE) * (i + 1);

                transparency += octaves[i] * Math.max(0, cubicNoiseSample2(noises[i], x * scale, y * scale) - Clouds.DEADZONE);
            }

            imageData.data[index] = imageData.data[index + 1] = imageData.data[index + 2] = 255;
            imageData.data[index + 3] = Math.floor(Math.pow(transparency, Clouds.POWER) * 256 * Clouds.ALPHA);
        }

        context.putImageData(imageData, 0, 0);
    };

    const drawLayer = (context, radius, layer, shift) => {
        radius /= Clouds.SCALE;

        context.save();
        context.scale(Clouds.SCALE, Clouds.SCALE);

        context.fillStyle = context.createPattern(layer, "repeat");
        context.beginPath();
        context.rect(-radius, -radius, radius + radius, radius + radius);

        context.translate(shift, 0);
        context.fill();
        context.translate(-shift, 0);

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

Clouds.RESOLUTION = 256;
Clouds.PHASE = 512;
Clouds.OCTAVES = 4;
Clouds.FALLOFF = 1.65;
Clouds.DEADZONE = 0.55;
Clouds.POWER = 0.65;
Clouds.SCALE = 8;
Clouds.SPEED_SCALE_BACK = 0.7;
Clouds.SPEED_SCALE_FRONT = 1.2;
Clouds.ALPHA = 0.9;