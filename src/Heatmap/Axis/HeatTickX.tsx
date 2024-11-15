import { HeatTickProps } from "../../constants/types";

const HeatTickX = ({ tickValue, scale, innerSize }: HeatTickProps) => (
  <g transform={`translate(${scale(tickValue)}, ${innerSize})`}>
    <line y2="5" className="tick" />
    <text style={{ textAnchor: "middle" }} className="tick-label" dy=".71em" y={innerSize + 3}>
      {tickValue}
    </text>
  </g>
);

export default HeatTickX;
