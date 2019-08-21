const Rocket = function(x, y, trailLength) {
    const trail = new Trail(trailLength);
    const length = 140;
    const angleCompensation = 3;
    const noiseX = cubicNoiseConfig(Math.random());
    const noiseY = cubicNoiseConfig(Math.random());
    const vxFactor = 4;
    let noiseDist = 0;
    let angle = 0;
    let velocity = 0;
    let xAim = 0;
    let yAim = 0;

    this.update = (timeStep, skySpeed) => {
        trail.update(timeStep, skySpeed + Rocket.TRAIL_SPEED);
        trail.append(x - Math.cos(angle) * length * 0.5, y - Math.sin(angle) * length * 0.5);

        noiseDist += timeStep * Rocket.NOISE_SCALE;
        xAim = Rocket.AIM_DISTANCE + (cubicNoiseSample1(noiseX, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_X * 2;
        yAim = (cubicNoiseSample1(noiseY, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_Y * 2;

        velocity += (xAim - x - Rocket.AIM_DISTANCE) * vxFactor * timeStep;
        velocity -= velocity * Rocket.DAMPING * timeStep;

        angle = Math.atan2((yAim - y) * angleCompensation, xAim - x + skySpeed);
        x += Math.cos(angle) * velocity * timeStep;
        y += Math.sin(angle) * (velocity + skySpeed) * timeStep;
    };

    this.draw = context => {
        trail.draw(context);

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        context.fillStyle = "#ce3927";
        context.beginPath();
        context.rect(-length * 0.5, -20, length, 40);
        context.fill();

        context.restore();
    };
};

Rocket.TRAIL_SPEED = 200;
Rocket.NOISE_SCALE = 2.2;
Rocket.AIM_DISTANCE = 800;
Rocket.AIM_WIGGLE_X = 100;
Rocket.AIM_WIGGLE_Y = 300;
Rocket.DAMPING = 0.5;