"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Image from "next/image";

interface PhysicsFaceProps {
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
  size: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PhysicsFace: React.FC<PhysicsFaceProps> = ({
  src,
  alt,
  initialX,
  initialY,
  size,
  containerRef,
}) => {
  const faceRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [rotation, setRotation] = useState(0);
  const bodyRef = useRef<Matter.Body | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!faceRef.current || !containerRef.current) return;

    const { Engine, World, Bodies, Events, Runner } = Matter;

    // Get or create engine (shared across all faces)
    let engine: Matter.Engine;
    if (!window.physicsEngine) {
      engine = Engine.create();
      engine.world.gravity.y = 0.2; // Light gravity
      engine.world.gravity.x = 0;
      engine.world.gravity.scale = 0.001;
      window.physicsEngine = engine;
      engineRef.current = engine;

      // Create boundaries once for the container
      const createBoundaries = () => {
        if (!containerRef.current) return [];
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        return [
          Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, render: { visible: false } }),
          Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, render: { visible: false } }),
          Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, render: { visible: false } }),
          Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, render: { visible: false } }),
        ];
      };

      const boundaries = createBoundaries();
      World.add(engine.world, boundaries);
      window.physicsBoundaries = boundaries;

      // Run engine
      const runner = Runner.create();
      Runner.run(runner, engine);
      window.physicsRunner = runner;
    } else {
      engine = window.physicsEngine;
    }

    // Create face body (circular)
    const body = Bodies.circle(initialX, initialY, size / 2, {
      restitution: 0.6, // Bounciness
      friction: 0.1,
      frictionAir: 0.02,
      density: 0.001,
      inertia: Infinity, // Prevent rotation
    });
    bodyRef.current = body;

    // Add to world
    World.add(engine.world, [body]);

    // Update position on each frame
    const updatePosition = () => {
      if (body) {
        setPosition({ x: body.position.x, y: body.position.y });
        setRotation(body.angle);
      }
    };

    Events.on(engine, "afterUpdate", updatePosition);

    // Cleanup
    return () => {
      Events.off(engine, "afterUpdate", updatePosition);
      if (body && engine) {
        World.remove(engine.world, body);
      }
    };
  }, [initialX, initialY, size, containerRef]);

  return (
    <div
      ref={faceRef}
      className="absolute pointer-events-auto select-none"
      style={{
        left: `${position.x - size / 2}px`,
        top: `${position.y - size / 2}px`,
        transform: `rotate(${rotation}rad)`,
        width: `${size}px`,
        height: `${size}px`,
        cursor: "grab",
        willChange: "transform",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

// Extend Window interface for physics engine
declare global {
  interface Window {
    physicsEngine?: Matter.Engine;
    physicsBoundaries?: Matter.Body[];
    physicsRunner?: Matter.Runner;
    physicsMouseConstraint?: Matter.MouseConstraint;
  }
}

export default PhysicsFace;
