const Rockets = function() {
    const rockets = [];
    let offset = 0;
    let program = null;
    let programTimer = 0;

    const cue = program => {
        programTimer = Rockets.PROGRAM_DURATIONS[program].min + (Rockets.PROGRAM_DURATIONS[program].max - Rockets.PROGRAM_DURATIONS[program].min) * Math.random();

        switch (program) {
            case Rockets.PROGRAM_ASCENT:
                program = new ProgramAscent(rockets, offset);

                break;
            case Rockets.PROGRAM_TWINS:
                program = new ProgramAscent(rockets, offset);

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

        for (const rocket of rockets)
            rocket.update(timeStep, radius, skySpeed);
    };

    this.draw = context => {
        for (const rocket of rockets)
            rocket.draw(context);
    };
};

Rockets.PROGRAM_ASCENT = "ascent";
Rockets.PROGRAM_TWINS = "twins";
Rockets.PROGRAMS = [
    Rockets.PROGRAM_ASCENT,
    Rockets.PROGRAM_TWINS
];
Rockets.PROGRAM_DURATIONS = {
    "ascent": {
        "min": 4,
        "max": 8
    },
    "twins": {
        "min": 4,
        "max": 12
    }
};
Rockets.X_OFFSET = 300;