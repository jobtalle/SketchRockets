const Rocket = function(x, y, trailLength) {
    const length = Rocket.LENGTH_MIN + (Rocket.LENGTH_MAX - Rocket.LENGTH_MIN) * Math.random();
    const body = new Body(length);
    const trail = new Trail(trailLength);
    const angleCompensation = 3;
    const noiseX = cubicNoiseConfig(Math.random());
    const noiseY = cubicNoiseConfig(Math.random());
    const vxFactor = 4;
    let vx = 0;
    let vy = 0;
    let noiseDist = 0;
    let angle = 0;
    let velocity = 0;

    this.update = (timeStep, skySpeed) => {
        noiseDist += timeStep * Rocket.NOISE_SCALE;

        const xAim = Rocket.AIM_DISTANCE + (cubicNoiseSample1(noiseX, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_X * 2;
        const yAim = (cubicNoiseSample1(noiseY, noiseDist) - 0.5) * Rocket.AIM_WIGGLE_Y * 2;

        velocity += ((xAim - x - Rocket.AIM_DISTANCE) * vxFactor - velocity * Rocket.DAMPING) * timeStep;

        angle = Math.atan2((yAim - y) * angleCompensation, xAim - x + skySpeed);

        vx = Math.cos(angle) * velocity;
        vy = Math.sin(angle) * (velocity + skySpeed);

        x += vx * timeStep;
        y += vy * timeStep;

        trail.update(timeStep, skySpeed + Rocket.TRAIL_SPEED);
        trail.append(x - Math.cos(angle) * length * 0.5 - body.getTrailOffset(), y - Math.sin(angle) * length * 0.5, -vy);
    };

    this.draw = context => {
        trail.draw(context);

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        body.draw(context, vy);

        context.restore();
    };
};

Rocket.TRAIL_SPEED = 300;
Rocket.NOISE_SCALE = 2.2;
Rocket.AIM_DISTANCE = 800;
Rocket.AIM_WIGGLE_X = 100;
Rocket.AIM_WIGGLE_Y = 300;
Rocket.DAMPING = 0.7;
Rocket.LENGTH_MIN = 50;
Rocket.LENGTH_MAX = 150;