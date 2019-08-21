const Rockets = function() {
    const rockets = [];
    let offset = 0;

    const spawn = () => {
        rockets.push(new Rocket(
            -500,
            -Rockets.X_OFFSET + Math.random() * Rockets.X_OFFSET * 2));
    };

    this.setOffset = newOffset => offset = newOffset;

    this.update = (timeStep, skySpeed) => {
        for (const rocket of rockets)
            rocket.update(timeStep, radius, skySpeed);
    };

    this.draw = context => {
        for (const rocket of rockets)
            rocket.draw(context);
    };

    spawn();
};

Rockets.X_OFFSET = 300;