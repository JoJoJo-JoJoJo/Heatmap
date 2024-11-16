import { HeatTickProps } from "../../../constants/types";

const HeatTickY = ({ tickValue, scale }: HeatTickProps) => {
  const band = scale(tickValue);
  if (!band) {
    throw new TypeError("'band' cannot be undefined.");
  }

  return (
    <g transform={`translate(0, ${band + scale.bandwidth() / 2})`}>
      <line className="tick" x2="-5" y2="0" />
      <text textAnchor="end" className="tick-label" dy=".32em" x="-9" y="0">
        {tickValue}
      </text>
    </g>
  );
};

export default HeatTickY;
