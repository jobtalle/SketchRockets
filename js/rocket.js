const Rocket = function(x, y) {
    let angle = 0;

    this.update = (timeStep, radius) => {

    };

    this.draw = context => {
        context.save();
        context.translate(x, y);
        context.rotate(angle);

        context.fillStyle = "#ce3927";
        context.beginPath();
        context.rect(-70, -20, 140, 40);
        context.fill();

        context.restore();
    };
};