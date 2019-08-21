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
            noises.push(cubicNoiseConfig(Math.random(), Clouds.PHASES, Clouds.PHASES));
        }

        for (let y = 0; y < canvas.height; ++y) for (let x = 0; x < canvas.width; ++x) {
            const index = y * canvas.width + x << 2;
            let transparency = 0;

            for (let i = 0; i < octaves.length; ++i) {
                const scale = Clouds.PHASES / Clouds.RESOLUTION * (i + 1);

                transparency += octaves[i] * Math.max(0, cubicNoiseSample2(noises[i], 4 + x * scale, 4 + y * scale) - Clouds.DEADZONE);
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
Clouds.PHASES = 8;
Clouds.OCTAVES = 3;
Clouds.FALLOFF = 1.7;
Clouds.DEADZONE = 0.55;
Clouds.POWER = 0.6;
Clouds.SCALE = 5;
Clouds.SPEED_SCALE_BACK = 0.6;
Clouds.SPEED_SCALE_FRONT = 1.2;
Clouds.ALPHA = 0.9;