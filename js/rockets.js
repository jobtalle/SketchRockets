const Rockets = function() {
    const rockets = [];
    let offset = 0;
    let program = null;
    let programTimer = 0;

    const cue = programName => {
        programTimer = Rockets.PROGRAM_DURATIONS[programName].min + (Rockets.PROGRAM_DURATIONS[programName].max - Rockets.PROGRAM_DURATIONS[programName].min) * Math.random();

        switch (programName) {
            case Rockets.PROGRAM_ASCENT:
                program = new ProgramAscent(rockets, offset);

                break;
            case Rockets.PROGRAM_BARRAGE:
                program = new ProgramBarrage(rockets, offset);

                break;
            case Rockets.PROGRAM_HELIX:
                program = new ProgramHelix(rockets, offset);

                break;
        }
    };

    this.setOffset = newOffset => offset = newOffset;

    this.update = (timeStep, skySpeed) => {
        if (program)
            program.update(timeStep);

        if ((programTimer -= timeStep) < 0) {
            if (program)
                program.finish();

            cue(Rockets.PROGRAMS[Math.floor(Math.random() * Rockets.PROGRAMS.length)]);
        }

        for (let i = rockets.length; i-- > 0;) {
            rockets[i].update(timeStep, skySpeed);

            if (rockets[i].getX() < -offset)
                rockets.splice(i, 1);
        }
    };

    this.draw = context => {
        for (const rocket of rockets)
            rocket.draw(context);
    };
};

Rockets.PROGRAM_ASCENT = "ascent";
Rockets.PROGRAM_BARRAGE = "barrage";
Rockets.PROGRAM_HELIX = "helix";
Rockets.PROGRAMS = [
    Rockets.PROGRAM_BARRAGE,
    Rockets.PROGRAM_BARRAGE,
    Rockets.PROGRAM_ASCENT,
    Rockets.PROGRAM_ASCENT,
    Rockets.PROGRAM_HELIX
];
Rockets.PROGRAM_DURATIONS = {
    "ascent": {
        "min": 4,
        "max": 11
    },
    "barrage": {
        "min": 6,
        "max": 11
    },
    "helix": {
        "min": 7,
        "max": 13
    }
};
Rockets.X_OFFSET = 300;