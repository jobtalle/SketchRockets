const TIME_STEP_MAX = 0.1;
const LINE_WIDTH = 3;

const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("renderer");
const sky = new Sky();
let lastDate = new Date();
let radius = 0;

const resize = () => {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    radius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) * 0.5;
    sky.setOffset(radius);
};

const update = timeStep => {
    sky.update(timeStep);

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = "round";

    sky.draw(context, canvas.width * 0.5, canvas.height * 0.5, radius);
};

const loopFunction = () => {
    const date = new Date();

    update(Math.min((date - lastDate) * 0.001, TIME_STEP_MAX));
    requestAnimationFrame(loopFunction);

    lastDate = date;
};

window.onresize = resize;

resize();
requestAnimationFrame(loopFunction);