const Palette = function() {
    const make = () => {
        const hueBody = Math.random();
        const hueFin = (hueBody + Palette.FIN_HUE_OFFSET + (1 - Palette.FIN_HUE_OFFSET * 2) * Math.random()) % 1;
        const colorBody = Color.fromHSV(hueBody, Palette.SATURATION, Palette.VALUE);
        const colorBodyShade = colorBody.multiply(Palette.DARK_MULTIPLIER);
        const colorFin = Color.fromHSV(hueFin, Palette.SATURATION, Palette.VALUE);
        const colorFinShade = colorFin.multiply(Palette.DARK_MULTIPLIER);

        this.colorBody = colorBody.toHex();
        this.colorBodyShade = colorBodyShade.toHex();
        this.colorFin = colorFin.toHex();
        this.colorFinShade = colorFinShade.toHex();
    };

    make();
};

Palette.DARK_MULTIPLIER = 0.7;
Palette.SATURATION = 0.5;
Palette.VALUE = 0.65;
Palette.FIN_HUE_OFFSET = 0.2;