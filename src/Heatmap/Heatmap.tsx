import { useMemo } from "react";
import { height, margin, width } from "../constants/constants";
import { Data, HeatmapProps } from "../constants/types";
import * as d3 from "d3";
import "./Heatmap.css";
import ColorLegend from "./ColorLegend/ColorLegend";

const Heatmap = ({ data, baseTemp }: HeatmapProps) => {
  const xGroups: string[] = useMemo(
    () => [...new Set(data.map((d: Data) => d.year.toString()))],
    [data]
  );

  const yGroups: string[] = useMemo(
    () => [
      ...new Set(
        // ? Using a Set means that any repeated values are removed
        data.map((d: Data) => {
          const date = new Date(d.year, d.month - 1);
          const month = date.toLocaleString("default", { month: "long" });
          return month;
        })
      ),
    ],
    [data]
  );

  const [minY, maxY] = d3.extent(data, (d: Data) => d.year);

  const cDomain: [number, number] = d3.extent(
    data,
    (d: Data) => d.variance
  ) as [number, number];

  const x = useMemo(
    () => d3.scaleBand().domain(xGroups).range([0, width]).padding(0.05),
    [xGroups]
  );

  const y = useMemo(
    () => d3.scaleBand().domain(yGroups).range([0, height]).padding(0.01),
    [yGroups]
  );

  const color = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain(cDomain);

  const xLabels = xGroups.map((year: string, i: number) => {
    const PX = x(year) ?? 0;
    return (
      (parseInt(year) % 25 === 0 ||
        year === minY?.toString() ||
        year === maxY?.toString()) && (
        <text
          className="x-labels"
          key={i}
          x={PX + x.bandwidth() / 2}
          y={height + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
        >
          {year}
        </text>
      )
    );
  });

  const yLabels = yGroups.map((month: string, i: number) => {
    const PY = y(month) ?? 0;
    return (
      <text
        className="y-labels"
        key={`${month}-${i}`}
        x={-10}
        y={PY + y.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {month}
      </text>
    );
  });

  /**
   * ? Tooltip layout:
   * * year - month
   * * baseTemp + variance
   * * variance
   */

  return (
    <div id="heatmap" className="heat-map">
      <legend id="legend" className="color-scale"></legend>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g
          className="g"
          width={width}
          height={height}
          transform={`translate(${[margin.left, margin.top].join(", ")})`}
        >
          {data.map((d: Data, i: number) => {
            if (d == null) return;
            const date = new Date(d.year, d.month - 1);
            const month = date.toLocaleString("default", { month: "long" });
            return (
              <rect
                className="cell"
                key={i}
                r={4}
                rx={5}
                x={x(d.year.toString())}
                y={y(month)}
                width={x.bandwidth()}
                height={y.bandwidth()}
                fill={color(d.variance)}
                data-month={d.month - 1}
                data-year={d.year}
                data-temp={baseTemp + d.variance}
              />
            );
          })}
          <g id="x-axis">{xLabels}</g>
          <g id="y-axis">{yLabels}</g>
        </g>
        {/* <ColorLegend colorScale={color} /> */}
      </svg>
    </div>
  );
};

export default Heatmap;
