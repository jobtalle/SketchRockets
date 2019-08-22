const ProgramAscent = function(rockets, offset) {
    const rocket = new Rocket(
        -offset,
        ProgramAscent.Y_OFFSET_MIN + (ProgramAscent.Y_OFFSET_MAX - ProgramAscent.Y_OFFSET_MIN) * Math.random(),
        offset,
        new Body(new Palette()),
        new AimChase());

    this.update = timeStep => {

    };

    this.finish = () => {

    };

    rockets.push(rocket);
};

ProgramAscent.Y_OFFSET_MIN = -400;
ProgramAscent.Y_OFFSET_MAX = -ProgramAscent.Y_OFFSET_MIN;