"use client";
import React, { useRef, useEffect } from "react";
import p5 from "p5";

const PlusIcon = (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7581 0.149414V9.8418H21.4504V11.7578H11.7581V21.4502H9.84204V11.7578H0.149658V9.8418H9.84204V0.149414H11.7581Z"
            fill="white" stroke="white" strokeWidth="0.3" />
    </svg>
);

const ParticleWaterfall: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<p5 | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (s: p5) => {
            let particles: Particle[] = [];
            let gravity: p5.Vector;
            let particleCount = 300;
            const particleSize = 10;

            let spacing = 1;
            let deltaTime = 1 / 60;
            const mousePrev = s.createVector(0, 0);
            const mouseVel = s.createVector(0, 0);

            class Particle {
                pos: p5.Vector;
                vel: p5.Vector;
                acc: p5.Vector;
                color: p5.Color;
                lastPos: p5.Vector;
                densityFactor: number;
                rotation: number;
                rotationVel: number;
                shapeType: "circle" | "star";

                constructor(x: number, y: number) {
                    this.pos = s.createVector(x, y);
                    this.vel = s.createVector(s.random(-20, 20), s.random(-20, 20));
                    this.acc = s.createVector(0, 0);
                    this.color = s.color(255);
                    this.lastPos = this.pos.copy();
                    this.densityFactor = 0;
                    this.rotation = s.random(s.TWO_PI);
                    this.rotationVel = s.random(-0.1, 0.1);
                    this.shapeType = s.random(["circle", "star"]) as "circle" | "star";
                }

                update() {
                    this.lastPos.set(this.pos);
                    this.rotation += this.rotationVel * deltaTime;

                    // gravity
                    const gravityScale = s.map(this.densityFactor, 0, 5, 1, 0.7);
                    this.acc.add(p5.Vector.mult(gravity, gravityScale));

                    // mouse interaction
                    if (
                        s.mouseX >= 0 &&
                        s.mouseX <= s.width &&
                        s.mouseY >= 0 &&
                        s.mouseY <= s.height
                    ) {
                        const d = s.dist(this.pos.x, this.pos.y, s.mouseX, s.mouseY);

                        if (d < 250) {
                            const densityScale = s.map(this.densityFactor, 0, 5, 1, 0.85);
                            const force = mouseVel.copy().mult(5 * densityScale);

                            const strength = Math.pow(s.map(d, 0, 250, 1, 0), 1.7);
                            force.mult(strength);

                            this.acc.add(force);
                            this.rotationVel = mouseVel.mag() * 0.01 * s.random(-1, 1);
                        }
                    }

                    const damping = this.pos.y > s.height - particleSize * 2 ? 0.92 : 0.985;
                    this.vel.add(this.acc.mult(deltaTime * 15));
                    this.vel.mult(damping);

                    this.pos.add(p5.Vector.mult(this.vel, deltaTime * 11.5));

                    // boundaries
                    const b = particleSize;
                    if (this.pos.x < b) this.pos.x = b, (this.vel.x *= -0.45);
                    if (this.pos.x > s.width - b) this.pos.x = s.width - b, (this.vel.x *= -0.45);
                    if (this.pos.y < b) this.pos.y = b, (this.vel.y *= -0.45);
                    if (this.pos.y > s.height - b) this.pos.y = s.height - b, (this.vel.y *= -0.45);

                    this.acc.set(0, 0);
                    this.densityFactor = 0;
                }

                draw() {
                    s.noStroke();
                    s.fill(this.color);

                    s.push();
                    s.translate(
                        (this.pos.x + this.lastPos.x) * 0.5,
                        (this.pos.y + this.lastPos.y) * 0.5
                    );
                    s.rotate(this.rotation);

                    if (this.shapeType === "circle") {
                        s.circle(0, 0, particleSize);
                    } else {
                        drawStar(0, 0, particleSize / 2, particleSize / 1.5, 5);
                    }

                    s.pop();
                }

                interact(other: Particle) {
                    const dx = other.pos.x - this.pos.x;
                    const dy = other.pos.y - this.pos.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    const EPSILON = 0.0001;
                    const safe_d = d + EPSILON;

                    if (d < spacing) {
                        const densityIncrease = s.map(d, 0, spacing, 1.2, 0.1);
                        this.densityFactor += densityIncrease;
                        other.densityFactor += densityIncrease;

                        const force = s.createVector(-dx / safe_d, -dy / safe_d);
                        const overlap = spacing - d;

                        this.pos.add(force.copy().mult(overlap * 0.15));
                        other.pos.sub(force.copy().mult(overlap * 0.15));

                        const avgVel = s.createVector(
                            (this.vel.x + other.vel.x) * 0.5,
                            (this.vel.y + other.vel.y) * 0.5
                        );

                        this.vel.lerp(avgVel, 0.18);
                        other.vel.lerp(avgVel, 0.18);
                    }
                }
            }

            const drawStar = (
                x: number,
                y: number,
                r1: number,
                r2: number,
                n: number
            ) => {
                const angle = s.TWO_PI / n;
                const half = angle / 2;

                s.beginShape();
                for (let a = 0; a < s.TWO_PI; a += angle) {
                    s.vertex(x + s.cos(a) * r2, y + s.sin(a) * r2);
                    s.vertex(
                        x + s.cos(a + half) * r1,
                        y + s.sin(a + half) * r1
                    );
                }
                s.endShape(s.CLOSE);
            };

            const updateSettings = () => {
                const w = s.windowWidth;

                if (w <= 600) {
                    particleCount = 95;
                    spacing = particleSize * 7;
                } else if (w <= 900) {
                    particleCount = 150;
                    spacing = particleSize * 8;
                } else {
                    particleCount = 300;
                    spacing = particleSize * 10;
                }
            };

            const setupParticles = () => {
                particles = [];
                const cols = Math.floor((s.width * 0.95) / spacing);
                const rows = Math.ceil(particleCount / cols);
                const startX = (s.width - cols * spacing) * 0.5;
                const startY = s.height * 0.05;

                let count = 0;
                for (let r = 0; r < rows && count < particleCount; r++) {
                    for (let c = 0; c < cols && count < particleCount; c++) {
                        particles.push(
                            new Particle(
                                startX + c * spacing + s.random(-5, 5),
                                startY + r * spacing + s.random(-5, 5)
                            )
                        );
                        count++;
                    }
                }
            };

            s.setup = () => {
                s.createCanvas(s.windowWidth, s.windowHeight);
                s.frameRate(60);

                gravity = s.createVector(0, 2.0);
                updateSettings();
                setupParticles();
            };

            s.draw = () => {
                s.background("#000000");
                deltaTime = 1 / s.frameRate();

                mouseVel.set(s.mouseX - mousePrev.x, s.mouseY - mousePrev.y);
                mousePrev.set(s.mouseX, s.mouseY);

                // spatial hashing grid for interactions
                const gridSize = spacing;
                const grid: Record<string, number[]> = {};

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.update();

                    const gx = (p.pos.x / gridSize) | 0;
                    const gy = (p.pos.y / gridSize) | 0;
                    const k = gx + "," + gy;

                    (grid[k] ??= []).push(i);
                }

                for (const key in grid) {
                    const [gx, gy] = key.split(",").map(Number);

                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const neighKey = `${gx + dx},${gy + dy}`;
                            if (!grid[neighKey]) continue;

                            for (const ai of grid[key]) {
                                for (const bi of grid[neighKey]) {
                                    if (ai !== bi) particles[ai].interact(particles[bi]);
                                }
                            }
                        }
                    }
                }

                particles.forEach((p) => p.draw());
            };

            s.windowResized = () => {
                s.resizeCanvas(s.windowWidth, s.windowHeight);
                updateSettings();
                setupParticles();
            };
        };

        sketchRef.current = new p5(sketch, containerRef.current);
        return () => sketchRef.current?.remove();
    }, []);

    return (

        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#040506] via-[#02121a] to-black"
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">

                <div className="relative inline-block px-10 py-12">

                    <span className="absolute -top-8 -left-8 select-none">{PlusIcon}</span>
                    <span className="absolute -top-8 -right-8 select-none">{PlusIcon}</span>
                    <span className="absolute -bottom-8 -left-8 select-none">{PlusIcon}</span>
                    <span className="absolute -bottom-8 -right-8 select-none">{PlusIcon}</span>

                    <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 select-none">
                        {PlusIcon}
                    </span>

                    <p
                        className="absolute -top-8  left-1/2    -translate-x-1/2   text-white font-Aeonik uppercase
                text-[clamp(0.9rem,3vw,1.25rem)] tracking-wide
                flex items-center justify-center gap-4"
                    >
                        IS YOUR BIG IDEA READY TO GO WILD?
                    </p>

                    <a
                        href="#contact"
                        className="relative inline-block text-white font-Aeonik leading-none 
                text-[clamp(3rem,12vw,10rem)] after:absolute after:bottom-0 after:left-0 after:h-1 
                after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
                    >
                        <div>Let’s work</div>
                        <div>together!</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ParticleWaterfall;
