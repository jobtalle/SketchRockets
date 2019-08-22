const ProgramBarrage = function(rockets, offset) {
    const count = ProgramBarrage.COUNT_MIN +Math.floor((ProgramBarrage.COUNT_MAX - ProgramBarrage.COUNT_MIN + 1) * Math.pow(Math.random(), ProgramBarrage.COUNT_POWER));
    const body = new Body(new Palette());
    const aims = [];

    const spawn = () => {
        for (let i = 0; i < count; ++i) {
            const f = i / (count - 1);
            const y = offset * (-0.5 + f) * ProgramBarrage.SPACING;
            const aim = new AimChase(offset, 1, ProgramBarrage.Y_WIGGLE, 0, y);

            aims.push(aim);
            rockets.push(new Rocket(
                -offset,
                y,
                offset,
                body,
                aim));
        }
    };

    this.update = timeStep => {

    };

    this.finish = () => {
        for (const aim of aims)
            aim.disappear();
    };

    spawn();
};

ProgramBarrage.COUNT_MIN = 2;
ProgramBarrage.COUNT_MAX = 5;
ProgramBarrage.COUNT_POWER = 2.5;
ProgramBarrage.SPACING = 0.5;
ProgramBarrage.Y_WIGGLE = 0.3;