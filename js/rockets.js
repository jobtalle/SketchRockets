const Rockets = function() {
    const rockets = [new Rocket(-500, 0)];
    let offset = 0;

    this.setOffset = newOffset => offset = newOffset;

    this.update = (timeStep, radius) => {
        for (const rocket of rockets)
            rocket.update(timeStep, radius);
    };

    this.draw = context => {
        for (const rocket of rockets)
            rocket.draw(context);
    };
};