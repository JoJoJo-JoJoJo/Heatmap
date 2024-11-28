import React from "react";
import { height } from "../../../constants/constants";
import { HeatTickProps } from "../../../constants/types";

const HeatTickX = ({ tickValue, scale, innerHeight = height }: HeatTickProps) => (
  <g className="tick" transform={`translate(${scale(tickValue)}, ${innerHeight})`}>
    <line y2="5" />
    <text
      style={{ textAnchor: "middle" }}
      className="tick-label"
      dy=".71em"
      y="9"
    >
      {tickValue}
    </text>
  </g>
);

export default React.memo(HeatTickX);
