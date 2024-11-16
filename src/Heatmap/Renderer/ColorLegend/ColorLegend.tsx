import {
  height,
  innerLegendTicks,
  margin,
  tickSpacing,
  width,
} from "../../../constants/constants";
import { ColorProps } from "../../../constants/types";
import "./ColorLegend.css";

const ColorLegend = ({ scale, baseTemp }: ColorProps) => {
  const ticks = scale.domain();
  const add = (ticks[1] - ticks[0]) / (innerLegendTicks + 1);

  for (let j = 1; j < innerLegendTicks + 1; j++) {
    ticks.push(ticks[0] + add * j);
  }

  ticks.push(ticks.splice(1, 1)[0]);

  return (
    <g
      id="legend"
      className="legend"
      dy="2.5em"
      transform={`translate(${width / 2 - tickSpacing * 3}, ${
        height + margin.left
      })`}
    >
      {ticks.map((dVal, i) => (
        <g key={`${dVal}__${i}`} transform={`translate(${i * tickSpacing}, 0)`}>
          <rect
            x="-10"
            className="color-rect"
            fill={scale(dVal)}
            rx="2"
            ry="2"
            width="20"
            height="20"
          />
          <text textAnchor="middle" className="color-text" dy="2.5em">
            {"~" + (dVal + baseTemp).toFixed(2)}
          </text>
        </g>
      ))}
      <text
        className="legend-title"
        x={tickSpacing * 2.5}
        y={-20}
        textAnchor="middle"
      >
        Temp. variance (°C)
      </text>
    </g>
  );
};

export default ColorLegend;
