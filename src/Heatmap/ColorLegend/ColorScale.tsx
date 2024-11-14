import { useEffect, useRef } from "react";
import { ColorProps, Data } from "../../constants/types";
import { width, height, margin, legendWidth, legendHeight, legendMargin } from "../../constants/constants";

const ColorScale = ({ colorScale, data }: ColorProps) => {
  const legendRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const legend = legendRef.current;
    if (legend === null) {
      console.error("legend is null");
    }
  }, [colorScale]);

  return (
    <g
      ref={legendRef}
      id="legend"
      className="color-scale"
      style={{
        width: legendWidth + legendMargin.left + legendMargin.right,
        height: legendHeight + legendMargin.top + legendMargin.bottom,
      }}
      transform={`translate(${width / 2}, ${
        height + margin.top + margin.bottom
      })`}
    >
      <g>
        {data.map((d: Data, i: number) => (
          <rect
            key={`${d.year}-${d.month}-${i}`}
            fill={colorScale(d.variance)}
          />
        ))}
      </g>
    </g>
  );
};

export default ColorScale;
