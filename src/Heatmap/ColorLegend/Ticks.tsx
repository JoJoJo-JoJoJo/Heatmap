import { legendHeight } from "../../constants/constants";
import { TickProps } from "../../constants/types";

export const Tick = ({ tick, scaleX }: TickProps) => (
  <rect>
    <line
      x1={scaleX(tick)}
      x2={scaleX(tick)}
      y1={0}
      y2={legendHeight + 10}
      stroke="#dedede"
    />
    <text
      x={scaleX(tick)}
      y={legendHeight + 20}
      fontSize={9}
      textAnchor="middle"
    >
      {tick}
    </text>
  </rect>
);
