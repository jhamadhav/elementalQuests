class Particle {
   constructor(color) {
      this.x = random(rad, w - rad);
      this.y = random(rad, h - rad);
      this.vx = random(-speed, speed);
      this.vy = random(-speed, speed);
      this.color = color;

      this.ring = false;
      this.ringR = 2 * rad;
      this.time = ringWidth;
   }

   update() {
      //for ring
      if (this.ring) {
         this.time -= ringSpeed;
         if (!stops.includes(this)) {
            score++;
            stops.push(this);
         }

         if (this.ringR < ringWidth) {
            //this.drawRing();
            this.ringR += ringSpeed;
         }

         if (this.ringR > ringWidth || this.time < 0) {
            this.ring = false;
            particles.splice(particles.indexOf(this), 1);
            stops.splice(stops.indexOf(this), 1);
         }
      }

      this.px = this.x;
      this.py = this.y;

      if (!this.ring) {
         this.ringCollid();
         this.x += this.vx;
         this.y += this.vy;
      }
   }

   bounce() {
      if (this.x > w - rad || this.x < rad) this.vx = -this.vx;

      if (this.y > h - rad || this.y < rad) this.vy = -this.vy;
   }

   draw() {
      if (this.ring) circle(this.x, this.y, this.ringR, this.color, false);

      circle(this.x, this.y, rad, this.color, true);
   }

   ringCollid() {
      for (let i = 0; i < stops.length; i++) {
         if (
            this.x < stops[i].x + stops[i].ringR + rad &&
            this.x > stops[i].x - stops[i].ringR - rad &&
            this.y < stops[i].y + stops[i].ringR + rad &&
            this.y > stops[i].y - stops[i].ringR - rad &&
            stops[i] != this
         ) {
            this.ring = true;
         }
      }
   }
}
