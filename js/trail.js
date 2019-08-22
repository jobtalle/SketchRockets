const Trail = function(offset) {
    const Point = function(x, y, ySpeed) {
        this.x = x;
        this.y = y;
        this.ySpeed = ySpeed;
        this.thickness = Trail.THICKNESS_MIN + (Trail.THICKNESS_MAX - Trail.THICKNESS_MIN) * Math.random();
        this.life = 0;
    };

    Point.prototype.update = function(timeStep, speed) {
        this.life += timeStep;
        this.x -= timeStep * speed;
        this.y += timeStep * this.ySpeed;
    };

    const points = [];

    this.append = (x, y, ySpeed) => {
        if (points.length < 2)
            points.unshift(new Point(x, y, ySpeed));
        else {
            const dx = points[0].x - points[1].x;
            const dy = points[0].y - points[1].y;

            if (dx * dx + dy * dy > Trail.RESOLUTION * Trail.RESOLUTION)
                points.unshift(new Point(x, y, ySpeed));
            else {
                points[0].x = x;
                points[0].y = y;
            }

            while (points.length > 1 && points[points.length - 1].x < -offset - Trail.EXTRA_LENGTH)
                points.pop();
        }
    };

    this.update = (timeStep, speed) => {
        for (let i = 1; i < points.length; ++i)
            points[i].update(timeStep, speed);
    };

    this.draw = context => {
        const gradient = context.createRadialGradient(
            points[0].x,
            points[0].y,
            0,
            points[0].x,
            points[0].y,
            Trail.LIGHT_RADIUS);

        gradient.addColorStop(0, Trail.COLORS[0]);
        gradient.addColorStop(1, Trail.COLORS[1]);

        context.fillStyle = gradient;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; ++i)
            context.lineTo(points[i].x, points[i].y + points[i].thickness * Math.pow(points[i].life * Trail.EXPANSION, Trail.POWER));

        for (let i = points.length; i-- > 1;)
            context.lineTo(points[i].x, points[i].y - points[i].thickness * Math.pow(points[i].life * Trail.EXPANSION, Trail.POWER));

        context.closePath();
        context.fill();

        context.strokeStyle = Trail.STROKE;
        context.stroke();
    };
};

Trail.STROKE = "#939393";
Trail.COLORS = [
    "rgb(255,199,15)",
    "rgba(205,205,205,0.58)"
];
Trail.EXTRA_LENGTH = 128;
Trail.RESOLUTION = 48;
Trail.POWER = 0.7;
Trail.EXPANSION = 1.5;
Trail.THICKNESS_MIN = 50;
Trail.THICKNESS_MAX = 150;
Trail.LIGHT_RADIUS = 256;