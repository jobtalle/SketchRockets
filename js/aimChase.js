const AimChase = function(offset, xWiggle, yWiggle, xOffset, yOffset) {
    const noiseX = cubicNoiseConfig(Math.random());
    const noiseY = cubicNoiseConfig(Math.random());
    let noiseDist = 0;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let vxa = 0;
    let vya = 0;
    let disappearing = false;

    this.setXOffset = offset => xOffset = offset;
    this.setYOffset = offset => yOffset = offset;

    this.disappear = (dx, dy) => {
        vxa = dx;
        vya = dy;
        disappearing = true;
    };

    this.update = timeStep => {
        noiseDist += timeStep * AimChase.NOISE_SCALE;
        xOffset += vx * timeStep;
        yOffset += vy * timeStep;

        if (disappearing) {
            vx += AimChase.DISAPPEAR_ACCELERATION * vxa * timeStep;
            vy += AimChase.DISAPPEAR_ACCELERATION * vya * timeStep;
        }

        x = AimChase.AIM_DISTANCE + (cubicNoiseSample1(noiseX, noiseDist) - 0.5) * AimChase.WIGGLE_X * xWiggle * offset + xOffset;
        y = (cubicNoiseSample1(noiseY, noiseDist) - 0.5) * AimChase.WIGGLE_Y * yWiggle * offset + yOffset;
    };

    this.getX = () => x;
    this.getY = () => y;
};

AimChase.AIM_DISTANCE = 800;
AimChase.WIGGLE_X = 0.5;
AimChase.WIGGLE_Y = 0.5;
AimChase.NOISE_SCALE = 2.2;
AimChase.DISAPPEAR_ACCELERATION = -200;