import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Color = {
  name: string;
  value: string;
};

type TColorPicker = {
  value: string | null;
  onChange: (shade: string) => void;
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

function ColorPicker({ value, onChange }: TColorPicker) {
  const [color, setColor] = useState<string | null>(value);

  const handleShade = (shade: string) => {
    setColor(shade);
    onChange(shade);
  };

  return (
    <div className="w-full flex items-center gap-2">
      {colors.map((c) => (
        <span
          key={c.name}
          className={cn(
            "w-4 h-4 rounded-full ring-background ring-offset-background ring-2 ring-offset-1",
            {
              " ring-red-500": c.name === color && color === "red",
              " ring-orange-500": c.name === color && color === "orange",
              " ring-yellow-500": c.name === color && color === "yellow",
              " ring-green-500": c.name === color && color === "green",
              " ring-blue-500": c.name === color && color === "blue",
              " ring-indigo-500": c.name === color && color === "indigo",
              " ring-violet-500": c.name === color && color === "violet",
              " ring-purple-500": c.name === color && color === "purple",
            }
          )}
          style={{ background: c.value }}
          onClick={() => handleShade(c.name as string)}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
