import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ColorProps } from "../../constants/types";
import {
  legendHeight,
  legendWidth,
  legendMargin,
  margin,
} from "../../constants/constants";
import { Tick } from "./Ticks";
import "./ColorLegend.css";

const ColorLegend = ({ colorScale }: ColorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const domain = colorScale.domain(); // data variance range
  const max = domain[domain.length - 1];
  const x = d3.scaleLinear().range([0, legendWidth]).domain([0, max]);

  const ticks = x
    .ticks(5)
    .map((tick) => <Tick key={`_${tick}`} tick={tick} scaleX={x} />);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.error("Canvas element is null.");
      return;
    }

    setTimeout(() => {
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get 2D context.");
        return;
      }
      
      for (let i = 0; i < legendWidth + margin.left + margin.right; ++i) {
        context.fillStyle = colorScale((max * i) / legendWidth);
        context.fillRect(i, 0, 1, legendHeight + margin.top + margin.bottom);
      }
    }, 100);
  }, [colorScale, max]);

  return (
    <g
      style={{
        width: legendWidth + legendMargin.left + legendMargin.right,
        height: legendHeight + legendMargin.top + legendMargin.bottom,
      }}
    >
      <g
        style={{
          position: "relative",
          transform: `translate(${legendMargin.left}px, ${legendMargin.top}px)`,
        }}
      >
        <canvas ref={canvasRef} width={legendWidth} height={legendHeight} />
        <svg
          width={legendWidth}
          height={legendHeight}
          style={{ position: "absolute", top: legendHeight, left: (legendWidth / 2), overflow: "visible" }}
        >
          {ticks}
        </svg>
      </g>
    </g>
  );
};

export default ColorLegend;
