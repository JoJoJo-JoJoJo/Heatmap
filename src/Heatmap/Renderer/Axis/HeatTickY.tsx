import React from "react";
import { HeatTickProps } from "../../../constants/types";

const HeatTickY = ({ tickValue, scale }: HeatTickProps) => {
  const band = scale(tickValue);
  if (!band) {
    throw new TypeError("'band' cannot be undefined.");
  }

  return (
    <g className="tick" transform={`translate(0, ${band + scale.bandwidth() / 2})`}>
      <line x2="-6" y2="0" />
      <text textAnchor="end" className="tick-label" dy=".32em" x="-9" y="0">
        {tickValue}
      </text>
    </g>
  );
};

export default React.memo(HeatTickY);
