const ProgramHelix = function(rockets, offset) {
    const speed = ProgramHelix.SPEED_MIN + (ProgramHelix.SPEED_MAX - ProgramHelix.SPEED_MIN) * Math.random();
    const aims = [
        new AimChase(
            offset,
            1,
            1,
            0,
            0),
        new AimChase(
            offset,
            1,
            1,
            0,
            0)
    ];

    let angle = 0;

    const spawn = () => {
        const body = new Body(new Palette());

        rockets.push(new Rocket(
            -offset,
            0,
            offset,
            body,
            aims[0]));
        rockets.push(new Rocket(
            -offset,
            0,
            offset,
            body,
            aims[1]));
    };

    this.update = timeStep => {
        angle += timeStep * speed;

        aims[0].setXOffset(offset * ProgramHelix.X_OFFSET * Math.sin(angle));
        aims[0].setYOffset(offset * ProgramHelix.Y_OFFSET * Math.sin(angle));
        aims[1].setXOffset(offset * ProgramHelix.X_OFFSET * Math.sin(-angle));
        aims[1].setYOffset(offset * ProgramHelix.Y_OFFSET * Math.sin(-angle));
    };

    this.finish = () => {
        aims[0].disappear(1, 0);
        aims[1].disappear(1, 0);
    };

    spawn();
};

ProgramHelix.SPEED_MIN = 1.5;
ProgramHelix.SPEED_MAX = 2.5;
ProgramHelix.X_OFFSET = 0.2;
ProgramHelix.Y_OFFSET = 0.3;