const Rocket = function(x, y, trailLength, body, aim) {
    const trail = new Trail(trailLength);
    const vxFactor = 4;
    const spinSpeed = Rocket.SPIN_SPEED_MIN + (Rocket.SPIN_SPEED_MAX - Rocket.SPIN_SPEED_MIN) * Math.random();
    let spin = 0;
    let vx = 0;
    let vy = 0;
    let angle = 0;
    let velocity = 0;

    this.update = (timeStep, skySpeed) => {
        aim.update(timeStep);

        spin += spinSpeed * timeStep;

        if (spin < 0)
            ++spin;
        else if (spin > 1)
            --spin;

        velocity += ((aim.getX() - x - Rocket.ANGLE_AIM_DISTANCE) * vxFactor - velocity * Rocket.DAMPING) * timeStep;

        angle = Math.atan2((aim.getY() - y) * Rocket.ANGLE_COMPENSATION, aim.getX() - x + skySpeed);

        vx = Math.cos(angle) * velocity;
        vy = Math.sin(angle) * (velocity + skySpeed);

        x += vx * timeStep;
        y += vy * timeStep;

        trail.update(timeStep, skySpeed + Rocket.TRAIL_SPEED);
        trail.append(x - Math.cos(angle) * body.getTrailOffset(), y - Math.sin(angle) * body.getTrailOffset(), -vy);
    };

    this.draw = context => {
        trail.draw(context);

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        body.draw(context, vy, spin);

        context.restore();
    };
};

Rocket.ANGLE_AIM_DISTANCE = 800;
Rocket.ANGLE_COMPENSATION = 3;
Rocket.TRAIL_SPEED = 300;
Rocket.DAMPING = 0.7;
Rocket.SPIN_SPEED_MIN = -0.7;
Rocket.SPIN_SPEED_MAX = 0.7;