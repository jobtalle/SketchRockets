const ProgramAscent = function(rockets, offset) {
    const aim = new AimChase();

    this.update = timeStep => {

    };

    this.finish = () => {
        aim.disappear();
    };

    rockets.push(new Rocket(
        -offset,
        ProgramAscent.Y_OFFSET_MIN + (ProgramAscent.Y_OFFSET_MAX - ProgramAscent.Y_OFFSET_MIN) * Math.random(),
        offset,
        new Body(new Palette()),
        aim));
};

ProgramAscent.Y_OFFSET_MIN = -400;
ProgramAscent.Y_OFFSET_MAX = -ProgramAscent.Y_OFFSET_MIN;