const Sky = function() {
    const clouds = new Clouds();
    const rockets = new Rockets();

    this.setOffset = offset => rockets.setOffset(offset);

    this.update = timeStep => {
        clouds.update(timeStep);
        rockets.update(timeStep);
    };

    this.draw = (context, xCenter, yCenter, radius) => {
        context.save();
        context.translate(xCenter, yCenter);
        context.rotate(Sky.ANGLE);

        clouds.drawBack(context, radius);
        rockets.draw(context);
        clouds.drawFront(context, radius);

        context.restore();
    };
};

Sky.ANGLE = Math.PI * 1.6;