const Body = function(palette) {
    const length = Body.LENGTH_MIN + (Body.LENGTH_MAX - Body.LENGTH_MIN) * Math.random();
    const widths = [];
    const nose = (Body.NOSE_MIN + (Body.NOSE_MAX - Body.NOSE_MIN) * Math.random()) * length;
    const segments = Math.ceil((length + nose) / Body.RESOLUTION);
    const step = (length + nose) / segments;
    const width = Math.min(length * (Body.WIDTH_MIN + (Body.WIDTH_MAX - Body.WIDTH_MIN) * Math.random()), Body.WIDTH_MAX_PIXELS);
    let maxWidth = width;
    let nozzle = null;
    let fins = null;

    const makeWidthsRound = () => {
        const bodyPower = Body.BODY_POWER_MIN + (Body.BODY_POWER_MAX - Body.BODY_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(((i + 1) * step) / (length + nose), 1);
            const w = width * Math.pow(Math.cos((f * (0.5 + 1 / 3) - 0.5) * Math.PI) * 2, bodyPower);

            if (w > maxWidth)
                maxWidth = w;

            widths.push(w);
        }

        nozzle = new Nozzle(width);
        fins = new Fins(length + nozzle.getLength(), width, widths, step);
    };

    const makeWidthsTube = () => {
        const nosePower = Body.NOSE_POWER_MIN + (Body.NOSE_POWER_MAX - Body.NOSE_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(((i + 1) * step) / nose, 1);

            widths.push(width * Math.pow(Math.cos((f * 0.5 - 0.5) * Math.PI), nosePower));
        }

        nozzle = new Nozzle(width);
        fins = new Fins(length, width, widths, step);
    };

    const makeWidths = () => {
        if (Math.random() < 0.5)
            makeWidthsRound();
        else
            makeWidthsTube();
    };

    this.getTrailOffset = () => (length + nozzle.getLength() - nozzle.getInset()) * 0.5;
    this.getTrailWidth = () => width;

    this.draw = (context, vy, spin) => {
        const gradientBody = context.createLinearGradient(0, -maxWidth, 0, maxWidth);
        const gradientFins = context.createLinearGradient(0, -fins.getMaxWidth(), 0, fins.getMaxWidth());

        gradientBody.addColorStop(0, palette.colorBodyShade);
        gradientBody.addColorStop(0.5, palette.colorBody);
        gradientBody.addColorStop(1, palette.colorBodyShade);

        gradientFins.addColorStop(0, palette.colorFin);
        gradientFins.addColorStop(0.5, palette.colorFinShade);
        gradientFins.addColorStop(1, palette.colorFin);

        context.save();

        context.translate(nose + length * 0.5, 0);

        fins.drawBack(context, spin, gradientFins, Body.STROKE);
        nozzle.draw(context, -length + nozzle.getInset() - nose, vy);
        drawTube(context, widths, step, gradientBody, Body.STROKE);
        fins.drawFront(context, gradientFins, Body.STROKE);

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
Body.LENGTH_MIN = 50;
Body.LENGTH_MAX = 150;