class Flare {
    constructor(position, velocity, life, flareColor) {
        this.position = position;
        this.velocity = velocity;
        this.life = life;
        this.flareColor = flareColor;
        this.expired = false;
    }

    update() {
        this.velocity.add(0, 0.15);
        this.velocity.limit(2.5);
        this.position.add(this.velocity);

        if(this.life < 0) {
            this.expired = true;
        }
        this.life--;
    }

    draw() {
        push();
        strokeWeight(2);
        stroke(this.flareColor);
        translate(this.position.x, this.position.y);
        point(0, 0);
        pop();
    }

    isExpired() {
        return this.expired;
    }
}