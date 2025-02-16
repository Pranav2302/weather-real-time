"use client";
import React from "react";

export const GridPattern = ({ width = 100, height = 100, className, squares = [[0, 1]], ...props }) => {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x="50%"
          y="50%"
          patternTransform="translate(-25 -25)"
        >
          {squares.map(([x, y], index) => (
            <rect
              key={`${x}-${y}-${index}`}
              width={Math.floor(width / 2)}
              height={Math.floor(height / 2)}
              x={x * width}
              y={y * height}
              className="animate-pulse"
              fill="currentColor"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};