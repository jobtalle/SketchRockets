const Sky = function() {
    const clouds = new Clouds();

    this.update = timeStep => {
        clouds.update(timeStep);
    };

    this.draw = (context, xCenter, yCenter, radius) => {
        context.save();
        context.translate(xCenter, yCenter);
        context.rotate(Sky.ANGLE);

        clouds.drawBack(context, radius);
        clouds.drawFront(context, radius);

        context.restore();
    };
};

Sky.ANGLE = Math.PI * 1.6;