const Sky = function() {
    const clouds = new Clouds();
    const rockets = new Rockets();

    this.setOffset = offset => rockets.setOffset(offset);

    this.update = timeStep => {
        clouds.update(timeStep, Sky.SPEED);
        rockets.update(timeStep, Sky.SPEED);
    };

    this.draw = (context, xCenter, yCenter, radius) => {
        context.save();
        context.translate(xCenter, yCenter);
        context.rotate(Sky.ANGLE);
        context.translate(radius * Sky.VIEW_SHIFT, 0);

        clouds.drawBack(context, radius);
        rockets.draw(context);
        clouds.drawFront(context, radius);

        context.restore();
    };
};

Sky.ANGLE = Math.PI * 1.6;
Sky.SPEED = 800;
Sky.VIEW_SHIFT = 0.2;