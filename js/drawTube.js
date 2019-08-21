const drawTube = (context, widths, step, fill, stroke) => {
    context.beginPath();
    context.moveTo(0, 0);

    for (let i = 0; i < widths.length; ++i)
        context.lineTo(-(i + 1) * step, -widths[i]);

    for (let i = widths.length; i-- > 0;)
        context.lineTo(-(i + 1) * step, widths[i]);

    context.closePath();

    context.fillStyle = fill;
    context.fill();

    context.strokeStyle = stroke;
    context.stroke();
};