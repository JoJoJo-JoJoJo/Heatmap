import { useState } from "react";
import { HeatmapProps, InteractData } from "../constants/types";
import Tooltip from "./Tooltip/Tooltip";
import Renderer from "./Renderer/Renderer";

const Heatmap = ({ data, baseTemp }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractData | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const validYear = hoveredCell?.year ?? "Loading...";
  const validMonthName = hoveredCell?.monthName ?? "Loading...";
  const validVariance = hoveredCell?.variance ?? "Loading...";
  const validXPos = hoveredCell?.xPos ?? "Loading...";
  const validYPos = hoveredCell?.yPos ?? "Loading...";

  return (
    <div id="heatmap" className="heat-map">
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
        xPos={validXPos}
        yPos={validYPos}
        isHovered={isHovered}
      />
    </div>
  );
};

export default Heatmap;
