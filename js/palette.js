const Palette = function() {
    const make = () => {
        const hueBody = Math.random();
        const hueFin = (hueBody + Palette.FIN_HUE_OFFSET + (1 - Palette.FIN_HUE_OFFSET * 2) * Math.random()) % 1;
        const colorBody = Color.fromHSV(hueBody, Palette.SATURATION, Palette.VALUE);
        const colorFin = Color.fromHSV(hueFin, Palette.SATURATION, Palette.VALUE);

        this.fillBody = colorBody.toHex();
        this.fillFin = colorFin.toHex();
    };

    make();
};

Palette.SATURATION = 0.5;
Palette.VALUE = 0.65;
Palette.FIN_HUE_OFFSET = 0.2;