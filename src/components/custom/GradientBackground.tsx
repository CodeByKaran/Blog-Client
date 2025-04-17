import React from "react";

const colors = [
  "rgba(75, 0, 130, 0.5)",
  "rgba(0, 0, 139, 0.5)",
  "rgba(89, 27, 195, 0.5)",
];

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${colors[1]} 0%, transparent 50%),radial-gradient(circle at 120% 120%, ${colors[2]} 0%, transparent 50%)`,
        }}
      ></div>
    </div>
  );
};

export default GradientBackground;
