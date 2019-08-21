const Body = function(length) {
    const widths = [];
    const nose = (Body.NOSE_MIN + (Body.NOSE_MAX - Body.NOSE_MIN) * Math.random()) * length;
    const segments = Math.ceil((length + nose) / Body.RESOLUTION);
    const step = (length + nose) / segments;
    const width = Math.min(length * (Body.WIDTH_MIN + (Body.WIDTH_MAX - Body.WIDTH_MIN) * Math.random()), Body.WIDTH_MAX_PIXELS);
    let nozzle = null;
    let fins = null;

    const makeWidthsRound = () => {
        const bodyPower = Body.BODY_POWER_MIN + (Body.BODY_POWER_MAX - Body.BODY_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(((i + 1) * step) / (length + nose), 1);

            widths.push(width * Math.pow(Math.cos((f * (0.5 + 1 / 3) - 0.5) * Math.PI) * 2, bodyPower));
        }

        nozzle = new Nozzle(width);
        fins = new Fins(length + nozzle.getLength(), widths, step);
    };

    const makeWidthsTube = () => {
        const nosePower = Body.NOSE_POWER_MIN + (Body.NOSE_POWER_MAX - Body.NOSE_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(((i + 1) * step) / nose, 1);

            widths.push(width * Math.pow(Math.cos((f * 0.5 - 0.5) * Math.PI), nosePower));
        }

        nozzle = new Nozzle(width);
        fins = new Fins(length, widths, step);
    };

    const makeWidths = () => {
        if (Math.random() < 0.5)
            makeWidthsRound();
        else
            makeWidthsTube();
    };

    this.getTrailOffset = () => (length + nozzle.getLength()) * 0.5 - nozzle.getInset();

    this.draw = (context, vy, spin) => {
        context.save();

        nozzle.draw(context, -length * 0.5 + nozzle.getInset(), vy);

        context.translate(nose + length * 0.5, 0);

        fins.drawBack(context, spin);
        drawTube(context, widths, step, "red", Body.STROKE);
        fins.drawFront(context, spin);

        context.restore();
    };

    makeWidths();
};

Body.STROKE = Nozzle.STROKE;
Body.NOSE_POWER_MIN = 0.4;
Body.NOSE_POWER_MAX = 1;
Body.BODY_POWER_MIN = 0.5;
Body.BODY_POWER_MAX = 1;
Body.WIDTH_MIN = 0.08;
Body.WIDTH_MAX = 0.15;
Body.WIDTH_MAX_PIXELS = 28;
Body.RESOLUTION = 16;
Body.NOSE_MIN = 0.2;
Body.NOSE_MAX = 0.7;