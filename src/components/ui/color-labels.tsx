import React from "react";

type Color = {
  name: string;
  value: string;
};

const colors: Color[] = [
  { name: "red", value: "#ef4444" },
  { name: "orange", value: "#f97316" },
  { name: "yellow", value: "#eab308" },
  { name: "green", value: "#22c55e" },
  { name: "blue", value: "#3b82f6" },
  { name: "indigo", value: "#6366f1" },
  { name: "violet", value: "#8b5cf6" },
  { name: "purple", value: "#a855f7" },
];

function ColorPicker() {
  return (
    <div className="w-full flex items-center gap-1">
      {colors.map((c) => (
        <span
          key={c.name}
          className="w-4 h-4 rounded"
          style={{ background: c.value }}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
