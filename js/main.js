let foreground;
let cnvs;
let skyColors;
let fireworks;
let origin;

function preload() {
    foreground = loadImage('/../assets/Foreground_White.png');
}

function setup() {
    cnvs = createCanvas(800, 600);
    skyColors = [color('#0a1f3f'), color('#050f1e'), color('#000')];
    origin = createVector(width / 2, height);
    fireworks = [];

    firework = new Firework(origin, createVector(50, 50));
}

function draw() {
    push();
    gradientBackground(height, 300, skyColors[0], skyColors[1]);
    gradientBackground(300, 0, skyColors[1], skyColors[2]);
    pop();

    if(frameCount % 15 == 0 && random() <= 0.50) {
        fireworks.push(new Firework(origin.copy(), createVector(random(width - 100) + 50, random(200) + 50)));
    }

    for(let i = fireworks.length - 1; i >= 0; i--) {
        let firework = fireworks[i];
        firework.update();
        firework.draw();

        if(firework.isExpired()) {
            fireworks.splice(i, 1);
        }
    }

    push();
    translate(0, height - 200);
    tint(10, 10, 10);
    image(foreground, 0, 0);
    pop();
}


function gradientBackground(y1, y2, c1, c2) {
    for(let i = y1; i >= y2; i--) {
        let inter = map(i, y2, y1, 0, 1);
        let c = lerpColor(c2, c1, inter);
        stroke(c);
        line(0, i, width, i);
    }
}