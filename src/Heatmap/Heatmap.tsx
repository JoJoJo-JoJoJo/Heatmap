import React, { useEffect, useRef, useState } from "react";
import { HeatmapProps, InteractData } from "../constants/types";
import Tooltip from "./Tooltip/Tooltip";
import Renderer from "./Renderer/Renderer";

const Heatmap = ({ data, baseTemp }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractData | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [clientRect, setClientRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setClientRect(rect);
    }
  }, [containerRef]);

  const validYear = hoveredCell?.year ?? "Loading...";
  const validMonthName = hoveredCell?.monthName ?? "Loading...";
  const validVariance = hoveredCell?.variance ?? "Loading...";
  const validXPos = hoveredCell?.xPos ?? "Loading...";
  const validYPos = hoveredCell?.yPos ?? "Loading...";

  return (
    <div ref={containerRef} id="heatmap" className="heat-map">
      <Renderer
        baseTemp={baseTemp}
        data={data}
        setHoveredCell={setHoveredCell}
        setIsHovered={setIsHovered}
      />
      <Tooltip
        year={validYear}
        monthName={validMonthName}
        baseTemp={baseTemp}
        variance={validVariance}
        xPos={
          typeof validXPos === "number" && clientRect !== null
            ? validXPos + clientRect.x / 4
            : validXPos
        }
        yPos={
          typeof validYPos === "number" && clientRect !== null
            ? validYPos + clientRect.y / 4
            : validXPos
        }
        isHovered={isHovered}
      />
    </div>
  );
};

export default React.memo(Heatmap);
