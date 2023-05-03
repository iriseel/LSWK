class Bouncer {
    constructor(ball, lyrics) {
        this.ball = ball;
        this.spans = [];
        this.positions = [];
        this.lyrics = lyrics || [];
        this.counter = 0;
    }

    init(element) {
        this.element = element || this.element;
        this.text = this.lyrics[this.counter];
        this.words = this.text.split(" ").filter((word) => word);
        this.element.innerHTML = "";
        const fragment = document.createDocumentFragment();
        const space = document.createElement("span");
        space.classList.add("space");
        space.textContent = " ";
        this.words.forEach((word, i) => {
            const span = document.createElement("span");
            span.classList.add("word");
            span.textContent = word;
            fragment.appendChild(span);
            if (i < this.words.length - 1) {
                fragment.appendChild(space.cloneNode(true));
            }
        });
        this.element.appendChild(fragment);
        this.spans = Array.from(this.element.querySelectorAll(".word"));
        this.spans.forEach((span, i) => {
            const rect = span.getBoundingClientRect();
            const nextRect = this.spans[i + 1]?.getBoundingClientRect();
            const from = {
                x: rect.left + rect.width / 2,
                y: rect.top,
            };
            const to = {
                x: nextRect?.left + nextRect?.width / 2,
                y: nextRect?.top,
            };
            const arc = {
                x: (from.x + to.x) / 2,
                y: (from.y + to.y) / 2 - 100,
            };

            this.positions.push({ from, to, arc });
        });
        this.ball.style.transform = `translate(${this.positions[0].from.x}px, ${this.positions[0].from.y}px)`;
    }

    changeText(text) {
        this.text = text;
        this.words = this.text.split(/\s+/).filter((word) => word);
        this.reset();
        if (!this.element) return;
    }

    bounce(from, to, arc) {
        let start = null;
        const ball = this.ball;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = elapsed / 1000;
            arc.x -= Math.random() * 0.5;
            const x = this.quadraticBezier(progress, from.x, arc.x, to.x);
            const y = this.quadraticBezier(progress, from.y, arc.y, to.y);
            ball.style.transform = `translate(${x}px, ${y}px)`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animate() {
        this.positions.forEach((position, i) => {
            const timeout = i * 1000;
            setTimeout(() => {
                this.bounce(position.from, position.to, position.arc);
            }, timeout);
            if (i === this.positions.length - 1) {
                this.counter++;
                if (this.counter > this.lyrics.length - 1) this.counter = 0;
                this.init();
            }
        });
    }

    reset() {
        this.element.innerHTML = this.text;
        // this.ball.parentNode.removeChild(this.ball);
    }

    quadraticBezier(p, n1, n2, n3) {
        const u = 1 - p;
        const tt = u * u;
        const t = 2 * u * p;
        const pp = p * p;
        return n1 * tt + n2 * t + n3 * pp;
    }
}
