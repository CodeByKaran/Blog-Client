import React from "react";

const colors = ["rgba(89, 27, 195, 0.2)"];

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${colors[0]} 0%, transparent 50%)`,
        }}
      ></div>
    </div>
  );
};

export default GradientBackground;
