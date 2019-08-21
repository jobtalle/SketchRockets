const Nozzle = function(width) {
    const length = width * (Nozzle.LENGTH_MIN + (Nozzle.LENGTH_MAX - Nozzle.LENGTH_MIN) * Math.random());
    const widths = [];
    const segments = Math.ceil(length / Nozzle.RESOLUTION);
    const step = length / segments;
    const inset = length * (Nozzle.INSET_MIN + (Nozzle.INSET_MAX - Nozzle.INSET_MIN) * Math.random());

    const make = () => {
        const nosePower = Nozzle.NOSE_POWER_MIN + (Nozzle.NOSE_POWER_MAX - Nozzle.NOSE_POWER_MIN) * Math.random();

        for (let i = 0; i < segments; ++i) {
            const f = (i + 1) * step / length;

            widths.push(width * Math.pow(Math.cos((f * 0.5 - 0.5) * Math.PI), nosePower));
        }
    };

    this.getLength = () => length;
    this.getInset = () => inset;

    this.draw = context => {
        context.save();

        context.translate(inset, 0);

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

        for (let i = Math.ceil(inset / step) - 1; i < widths.length; ++i) {
            context.beginPath();
            context.moveTo(-(i + 1) * step, -widths[i]);
            context.lineTo(-(i + 1) * step, widths[i]);
            context.stroke();
        }

        context.restore();
    };

    make();
};

Nozzle.STROKE = "#3b3b3b";
Nozzle.LENGTH_MIN = 1.5;
Nozzle.LENGTH_MAX = 4;
Nozzle.RESOLUTION = 8;
Nozzle.NOSE_POWER_MIN = 0.2;
Nozzle.NOSE_POWER_MAX = 1.4;
Nozzle.INSET_MIN = 0.1;
Nozzle.INSET_MAX = 0.4;