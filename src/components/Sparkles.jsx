"use client";
import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    background: {
      color: {
        value: background || "#000",
      },
    },
    particles: {
      number: {
        density: {
          enable: true,
          area: particleDensity || 100,
        },
        value: 100,
      },
      color: {
        value: particleColor || "#fff",
      },
      size: {
        value: { min: minSize || 0.1, max: maxSize || 1 },
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      opacity: {
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
        value: { min: 0.1, max: 1 },
      },
    },
  };

  if (init) {
    return (
      <Particles
        id={id}
        className={className}
        options={options}
      />
    );
  }

  return <></>;
};