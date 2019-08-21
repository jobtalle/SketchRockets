const Fins = function(length, widths, step) {
    const count = Fins.COUNT_MIN + Math.floor((Fins.COUNT_MAX - Fins.COUNT_MIN + 1) * Math.random());
    const segments = Math.max(2, Math.ceil(length * (Fins.LENGTH_MIN + (Fins.LENGTH_MAX - Fins.LENGTH_MIN) * Math.random()) / step));
    const spacing = 1 / count;
    const spins = new Array(count);
    let frontThreshold = 0;

    const drawFin = (context, spin) => {
        context.save();
        context.scale(1, Math.sin(spin * Math.PI * 2));

        context.fillStyle = "lime";
        context.beginPath();

        context.moveTo(
            -widths.length * step,
            -widths[widths.length - 1]);

        for (let i = 1; i < segments; ++i)
            context.lineTo(
                (-widths.length + i) * step,
                -widths[widths.length - 1 - i]);

        for (let i = segments; i-- > 0;)
            context.lineTo(
                (-widths.length + i) * step,
                -widths[widths.length - 1 - i] - 20);

        context.closePath();
        context.fill();

        context.strokeStyle = "green";
        context.stroke();

        context.restore();
    };

    const setSpins = spin => {
        for (let i = 0; i < count; ++i)
            spins[i] = -0.5 + (spin + i * spacing) % 1;

        spins.sort((a, b) => Math.abs(b) - Math.abs(a));
        frontThreshold = 0;

        for (const spin of spins) if (Math.abs(spin) > 0.25)
            ++frontThreshold;
    };

    this.drawBack = (context, spin) => {
        setSpins(spin);

        for (let i = 0; i < frontThreshold; ++i)
            drawFin(context, spins[i]);
    };

    this.drawFront = (context, spin) => {
        for (let i = frontThreshold; i < spins.length; ++i)
            drawFin(context, spins[i]);
    };
};

Fins.LENGTH_MIN = 0.1;
Fins.LENGTH_MAX = 0.5;
Fins.COUNT_MIN = 3;
Fins.COUNT_MAX = 7;