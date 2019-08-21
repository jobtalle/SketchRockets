const Color = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
};

Color.prototype.toHex = function() {
    const componentToHex = component => {
        let hex = component.toString(16);

        return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" +
        componentToHex(Math.round(this.r * 255)) +
        componentToHex(Math.round(this.g * 255)) +
        componentToHex(Math.round(this.b * 255));
};

Color.prototype.multiply = function(f) {
    return new Color(
        this.r * f,
        this.g * f,
        this.b * f);
};

Color.fromHSV = (h, s, v) => {
    const c = v * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = v - c;

    switch(Math.floor(h * 6)) {
        case 1:
            return new Color(x + m, c + m, m);
        case 2:
            return new Color(m, c + m, x + m);
        case 3:
            return new Color(m, x + m, c + m);
        case 4:
            return new Color(x + m, m, c + m);
        case 5:
            return new Color(c + m, m, x + m);
        default:
            return new Color(c + m, x + m, m);
    }
};