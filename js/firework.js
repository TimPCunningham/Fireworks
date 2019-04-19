class Firework {
    constructor(origin, destination) {
        this.destination = destination;
        this.pos = origin;
        this.speed = 3;
        this.expired = false;
        this.exploded = false;
        this.vel = p5.Vector.sub(this.destination, this.pos).mult(0.01);
        this.flares = [];
    }

    update() {
        if(!this.exploded) {
            this.pos.add(this.vel);
            if(p5.Vector.dist(this.destination, this.pos) <= 0.01) {
                this.exploded = true;
                this.spawnFlares();
            }
        } else {
            for(let x = this.flares.length - 1; x >= 0; x--) {
                let flare = this.flares[x];
                flare.update();
                this.expired = this.expired && flare.isExpired();

                if(flare.isExpired()) {
                    this.flares.splice(x, 1);
                }
            }
        }
    }

    draw() {
        if(!this.exploded) {
            push();
                stroke(255, 128);
                strokeWeight(4);
                translate(this.pos.x, this.pos.y);
                point(0, 0);
            pop();
        } else {
            for(let flare of this.flares) {
                flare.draw();
            }
        }
    }

    spawnFlares() {
        let c = color(random(255), random(255), random(255));
        for(let x = 0; x < 40; x++) {
            let life = Math.floor(random() * 80) + 30;
            let velocity = p5.Vector.random2D().mult(random(-5, 5));

            this.flares.push(new Flare(this.pos.copy(), velocity, life, c));
        }
    }

    isExpired() {
        return this.expired;
    }
}