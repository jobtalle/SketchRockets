const ProgramAscent = function(rockets, offset) {
    const aim = new AimChase(offset, 1, 1, 0, 0);

    this.update = timeStep => {

    };

    this.finish = () => {
        aim.disappear();
    };

    rockets.push(new Rocket(
        -offset,
        -offset + offset * 2 * Math.random(),
        offset,
        new Body(new Palette()),
        aim));
};