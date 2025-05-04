// components/card/WeatherDetailCard.tsx
import React, { ReactNode } from "react"; // Import ReactNode

interface WeatherDetailCardProps {
  title: string;
  value: string | number | null | undefined;
  unit?: string; // Optional unit like "%" or "°C"
  icon: ReactNode; // Add an icon prop
}

export const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({
  title,
  value,
  unit,
  icon, // Use ReactNode for icon prop
}) => {
  // Handle potential null/undefined values gracefully
  const displayValue =
    value !== null && value !== undefined ? `${value}${unit || ""}` : "---";

  return (
    <div className="flex items-center bg-[#826558]/5 rounded-lg p-4 space-x-4">
      {/* Icon on the left */}
      <div className="text-3xl text-[#960000]">{icon}</div>
      {/* Title and Value on the right */}
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>{" "}
        {/* Smaller title */}
        <p className="text-xl font-semibold text-[#250505]">
          {displayValue}
        </p>{" "}
        {/* Larger value */}
      </div>
    </div>
  );
};
