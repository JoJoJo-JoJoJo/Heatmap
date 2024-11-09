import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ColorProps } from "../../constants/types";
import {
  legendHeight,
  legendWidth,
  legendMargin,
} from "../../constants/constants";

const ColorLegend = ({ colorScale }: ColorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const domain = colorScale.domain();
  const max = domain[domain.length - 1];
  const x = d3.scaleLinear().range([0, legendWidth]).domain([0, max]);

  const ticks = x.ticks(4).map((tick) => (
    <>
      <line
        x1={x(tick)}
        x2={x(tick)}
        y1={0}
        y2={legendHeight + 10}
        stroke="#dedede"
      />
      <text x={x(tick)} y={legendHeight + 20} fontSize={9} textAnchor="middle">
        {tick}
      </text>
    </>
  ));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) return;

    for (let i = 0; i < legendWidth; ++i) {
      context.fillStyle = colorScale((max * i) / legendWidth);
      context.fillRect(i, 0, 1, legendHeight);
    }
  }, [colorScale, max]);

  return (
    <div style={{ width: legendWidth, height: legendHeight }}>
      <div
        style={{
          position: "relative",
          transform: `translate(${legendMargin.left}px, ${legendMargin.top}px)`,
        }}
      >
        <canvas ref={canvasRef} width={legendWidth} height={legendHeight} />
        <svg
          width={legendWidth}
          height={legendHeight}
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
        >
          {ticks}
        </svg>
      </div>
    </div>
  );
};

export default ColorLegend;
