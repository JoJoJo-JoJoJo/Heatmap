import { tickSpacing } from "../../constants/constants";
import { ColorProps } from "../../constants/types";

const ColorLegend = ({ scale }: ColorProps) => {
  const ticks = scale.domain();
  const range = ticks[1] - ticks[0];
  const add = range / 5;

  for (let j = 0; j < 4; j++) {
    ticks.push(ticks[0] + (add * j));
  }

  return ticks.map((dVal, i) => (
    <g id="legend" transform={`translate(${i * tickSpacing}, 0)`}>
      <rect x="-10" fill={scale(dVal)} width="20" height="20" />
      <text textAnchor="middle" dy="2.5em">{dVal.toFixed(2)}</text>
    </g>
  ));
};

export default ColorLegend;
