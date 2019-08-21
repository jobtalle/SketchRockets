const Nozzle = function(width) {
    const length = width * (Nozzle.LENGTH_MIN + (Nozzle.LENGTH_MAX - Nozzle.LENGTH_MIN) * Math.random());
    const widths = [];
    const segments = Math.ceil(length / Nozzle.RESOLUTION);
    const step = length / segments;

    const make = () => {
        const nosePower = Nozzle.NOSE_POWER_MIN + (Nozzle.NOSE_POWER_MAX - Nozzle.NOSE_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = (i + 1) * step / length;

            widths.push(width * Math.pow(Math.cos((f * 0.5 - 0.5) * Math.PI), nosePower));
        }
    };

    this.draw = context => {
        context.save();
        context.beginPath();
        context.moveTo(0, 0);

        for (let i = 0; i < widths.length; ++i)
            context.lineTo(-(i + 1) * step, -widths[i]);

        for (let i = widths.length; i-- > 0;)
            context.lineTo(-(i + 1) * step, widths[i]);

        context.closePath();

        context.fillStyle = "gray";
        context.fill();

        context.strokeStyle = Nozzle.STROKE;
        context.stroke();

        context.restore();
    };

    make();
};

Nozzle.STROKE = "#3b3b3b";
Nozzle.LENGTH_MIN = 1;
Nozzle.LENGTH_MAX = 2.5;
Nozzle.RESOLUTION = 16;
Nozzle.NOSE_POWER_MIN = 0.2;
Nozzle.NOSE_POWER_MAX = 0.9;