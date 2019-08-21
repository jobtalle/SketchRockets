const Trail = function(length) {
    const Point = function(x, y) {
        this.x = x;
        this.y = y;
        this.thickness = 0;
        this.expansionRate = Trail.EXPANSION_RATE_MIN + (Trail.EXPANSION_RATE_MAX - Trail.EXPANSION_RATE_MIN) * Math.random();
        this.life = 0;
    };

    Point.prototype.expand = function(timeStep) {
        this.life += timeStep;
        this.thickness += timeStep * this.expansionRate;
    };

    const points = [];

    this.append = (x, y) => {
        if (points.length < 2)
            points.unshift(new Point(x, y));
        else {
            const dx = points[0].x - points[1].x;
            const dy = points[0].y - points[1].y;

            if (dx * dx + dy * dy > Trail.RESOLUTION * Trail.RESOLUTION)
                points.unshift(new Point(x, y));
            else {
                points[0].x = x;
                points[0].y = y;
            }
        }

        if (points.length * Trail.RESOLUTION > length)
            points.pop();
    };

    this.update = (timeStep, speed) => {
        for (let i = 1; i < points.length; ++i) {
            points[i].expand(timeStep);

            points[i].x -= timeStep * speed;
        }
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
            context.lineTo(points[i].x, points[i].y + points[i].thickness * Math.sqrt(points[i].life));

        for (let i = points.length; i-- > 1;)
            context.lineTo(points[i].x, points[i].y - points[i].thickness * Math.sqrt(points[i].life));

        context.closePath();
        context.fill();
    };
};

Trail.COLORS = [
    "rgb(255,199,15)",
    "rgba(205,205,205,0.58)"
];
Trail.RESOLUTION = 32;
Trail.EXPANSION = 40;
Trail.EXPANSION_RATE_MIN = 100;
Trail.EXPANSION_RATE_MAX = 250;
Trail.LIGHT_RADIUS = 256;