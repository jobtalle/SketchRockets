const ProgramBarrage = function(rockets, offset) {
    const count = ProgramBarrage.COUNT_MIN +Math.floor((ProgramBarrage.COUNT_MAX - ProgramBarrage.COUNT_MIN + 1) * Math.pow(Math.random(), ProgramBarrage.COUNT_POWER));
    const aims = [];
    let delay = ProgramBarrage.DELAY;

    const spawn = () => {
        const body = new Body(new Palette());

        for (let i = 0; i < count; ++i) {
            const f = i / (count - 1);
            const y = offset * (-0.5 + f) * ProgramBarrage.SPACING;
            const aim = new AimChase(offset, 1, ProgramBarrage.Y_WIGGLE, 0, y);

            aims.push(aim);
            rockets.push(new Rocket(
                -offset,
                y * ProgramBarrage.POSITION_SCALE_INITIAL,
                offset,
                body,
                aim));
        }
    };

    this.update = timeStep => {
        if (delay !== 0) if ((delay -= timeStep) < 0) {
            delay = 0;

            spawn();
        }
    };

    this.finish = () => {
        for (const aim of aims)
            aim.disappear(1, -(aim.getY() / offset) * ProgramBarrage.SIDE_SPEED);
    };
};

ProgramBarrage.DELAY = 1.5;
ProgramBarrage.POSITION_SCALE_INITIAL = 0.1;
ProgramBarrage.SIDE_SPEED = 8;
ProgramBarrage.COUNT_MIN = 2;
ProgramBarrage.COUNT_MAX = 5;
ProgramBarrage.COUNT_POWER = 2.5;
ProgramBarrage.SPACING = 0.5;
ProgramBarrage.Y_WIGGLE = 0.3;