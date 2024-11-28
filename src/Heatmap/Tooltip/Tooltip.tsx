import React from "react";
import { TooltipProps } from "../../constants/types";
import "./Tooltip.css";

const Tooltip = ({
  year,
  monthName,
  baseTemp,
  variance,
  xPos,
  yPos,
  isHovered
}: TooltipProps) => {
  return (
    <div
      id="tooltip"
      className="tooltip"
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: xPos,
        top: yPos,
        opacity: isHovered ? 0.7 : 0,
      }}
      data-year={year}
    >
      <div
        style={{
          position: "absolute",
        }}
      >
        <p>
          {year} - {monthName}
        </p>
        <p>{typeof variance === "string" ? variance : (baseTemp + variance).toFixed(2)}</p>
        <p>{variance}</p>
      </div>
    </div>
  );
};

export default React.memo(Tooltip);
