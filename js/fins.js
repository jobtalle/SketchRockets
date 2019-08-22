const Fins = function(length, width, widths, step) {
    const count = Fins.COUNT_MIN + Math.floor((Fins.COUNT_MAX - Fins.COUNT_MIN + 1) * Math.pow(Math.random(), Fins.COUNT_POWER));
    const segments = Math.max(Fins.SEGMENTS_MIN, Math.ceil(length * (Fins.LENGTH_MIN + (Fins.LENGTH_MAX - Fins.LENGTH_MIN) * Math.random()) / step));
    const spacing = 1 / count;
    const spins = new Array(count);
    const offsets = new Array(segments);
    const shift = Fins.SHIFT_MIN + (Fins.SHIFT_MAX - Fins.SHIFT_MIN) * Math.random();
    let maxWidth = width;
    let frontThreshold = 0;

    const makeOvershoot = () => {
        return Math.random() < Fins.POWER_OVERSHOOT_CHANCE ? Fins.POWER_OVERSHOT_MIN + (Fins.POWER_OVERSHOT_MAX - Fins.POWER_OVERSHOT_MIN) * Math.random() : 1;
    };

    const makeOffsetsTriangle = () => {
        const offset = width * (Fins.OFFSET_MIN + (Fins.OFFSET_MAX - Fins.OFFSET_MIN) * Math.random());
        const multiplier = makeOvershoot();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(1, multiplier * i / (segments - 1));

            offsets[i] = offset * f;
        }
    };

    const makeOffsetsPower = () => {
        const power = Fins.POWER_MIN + (Fins.POWER_MAX - Fins.POWER_MIN) * Math.random();
        const offset = width * (Fins.OFFSET_MIN + (Fins.OFFSET_MAX - Fins.OFFSET_MIN) * Math.random());
        const multiplier = makeOvershoot();

        for (let i = 0; i < segments; ++i) {
            const f = Math.min(1, multiplier * i / (segments - 1));

            offsets[i] = offset * Math.pow(f, power);
        }
    };

    const makeOffsets = () => {
        if (Math.random() < Fins.TRIANGLE_CHANCE)
            makeOffsetsTriangle();
        else
            makeOffsetsPower();

        for (let i = 0; i < segments; ++i) {
            const w = widths[widths.length - 1 - i] + offsets[segments - 1 - i];

            if (w > maxWidth)
                maxWidth = w;
        }
    };

    const drawFin = (context, spin) => {
        const s = Math.sin(spin * Math.PI * 2);

        context.beginPath();
        context.moveTo(
            -widths.length * step,
            -widths[widths.length - 1] * s);

        for (let i = 1; i < segments; ++i)
            context.lineTo(
                (-widths.length + i) * step,
                -widths[widths.length - 1 - i] * s);

        for (let i = segments; i-- > 0;)
            context.lineTo(
                (-widths.length + i) * step + (segments - i - 1) * shift,
                (-widths[widths.length - 1 - i] - offsets[segments - i - 1]) * s);

        context.closePath();
        context.fill();
        context.stroke();
    };

    const setSpins = spin => {
        for (let i = 0; i < count; ++i)
            spins[i] = -0.5 + (spin + i * spacing) % 1;

        spins.sort((a, b) => Math.abs(b) - Math.abs(a));
        frontThreshold = 0;

        for (const spin of spins) if (Math.abs(spin) > 0.25)
            ++frontThreshold;
    };

    this.getMaxWidth = () => maxWidth;

    this.drawBack = (context, spin, fill, stroke) => {
        setSpins(spin);

        context.fillStyle = fill;
        context.strokeStyle = stroke;

        for (let i = 0; i < frontThreshold; ++i)
            drawFin(context, spins[i]);
    };

    this.drawFront = (context, fill, stroke) => {
        context.fillStyle = fill;
        context.strokeStyle = stroke;

        for (let i = frontThreshold; i < spins.length; ++i)
            drawFin(context, spins[i]);
    };

    makeOffsets();
};

Fins.TRIANGLE_CHANCE = 0.3;
Fins.SEGMENTS_MIN = 3;
Fins.POWER_OVERSHOOT_CHANCE = 0.7;
Fins.POWER_OVERSHOT_MIN = 1.2;
Fins.POWER_OVERSHOT_MAX = 2;
Fins.LENGTH_MIN = 0.3;
Fins.LENGTH_MAX = 0.7;
Fins.COUNT_MIN = 3;
Fins.COUNT_MAX = 7;
Fins.COUNT_POWER = 3;
Fins.OFFSET_MIN = 0.5;
Fins.OFFSET_MAX = 2.5;
Fins.POWER_MIN = 0.4;
Fins.POWER_MAX = 2;
Fins.SHIFT_MIN = -6;
Fins.SHIFT_MAX = 3;