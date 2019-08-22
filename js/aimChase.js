const AimChase = function() {
    const noiseX = cubicNoiseConfig(Math.random());
    const noiseY = cubicNoiseConfig(Math.random());
    let noiseDist = 0;
    let x = 0;
    let y = 0;
    let xOffset = 0;
    let vx = 0;
    let disappearing = false;

    this.disappear = () => {
        disappearing = true;
    };

    this.update = timeStep => {
        noiseDist += timeStep * AimChase.NOISE_SCALE;
        xOffset += vx * timeStep;

        if (disappearing)
            vx += AimChase.DISAPPEAR_ACCELERATION * timeStep;

        x = AimChase.AIM_DISTANCE + (cubicNoiseSample1(noiseX, noiseDist) - 0.5) * AimChase.WIGGLE_X * 2 + xOffset;
        y = (cubicNoiseSample1(noiseY, noiseDist) - 0.5) * AimChase.WIGGLE_Y * 2;
    };

    this.getX = () => x;
    this.getY = () => y;
};

AimChase.AIM_DISTANCE = 800;
AimChase.WIGGLE_X = 150;
AimChase.WIGGLE_Y = 300;
AimChase.NOISE_SCALE = 2.2;
AimChase.DISAPPEAR_ACCELERATION = -60;