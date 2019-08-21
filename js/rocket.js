const Rocket = function(x, y) {
    const angleCompensation = 2;
    const noiseX = cubicNoiseConfig(Math.random());
    const noiseY = cubicNoiseConfig(Math.random());
    const vxFactor = 4;
    let noiseDist = 0;
    let angle = 0;
    let velocity = 0;
    let xAim = 0;
    let yAim = 0;

    this.update = (timeStep, skySpeed) => {
        noiseDist += timeStep * Rocket.NOISE_SCALE;
        xAim = Rocket.AIM_DISTANCE + (cubicNoiseSample1(noiseX, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_X * 2;
        yAim = (cubicNoiseSample1(noiseY, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_Y * 2;

        velocity += (xAim - x - Rocket.AIM_DISTANCE) * vxFactor * timeStep;
        velocity *= 0.99;

        angle = Math.atan2((yAim - y) * angleCompensation, xAim - x + skySpeed);
        x += Math.cos(angle) * velocity * timeStep;
        y += Math.sin(angle) * (velocity + skySpeed) * timeStep;
    };

    this.draw = context => {
        context.save();
        context.translate(x, y);
        context.rotate(angle);

        context.fillStyle = "#ce3927";
        context.beginPath();
        context.rect(-70, -20, 140, 40);
        context.fill();

        context.restore();
    };
};

Rocket.NOISE_SCALE = 2.6;
Rocket.AIM_DISTANCE = 800;
Rocket.AIM_WIGGLE_X = 256;
Rocket.AIM_WIGGLE_Y = 300;