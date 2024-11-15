import { useMemo } from "react";
import { height, margin, tickSpacing, width } from "../constants/constants";
import { Data, HeatmapProps } from "../constants/types";
import * as d3 from "d3";
import "./Heatmap.css";
import ColorLegend from "./ColorLegend/ColorLegend";
import HeatTickY from "./Axis/HeatTickY";
import HeatTickX from "./Axis/HeatTickX";

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

  const x = useMemo(
    () => d3.scaleBand().domain(xGroups).range([0, width]).padding(0.05),
    [xGroups]
  );

  const y = useMemo(
    () => d3.scaleBand().domain(yGroups).range([0, height]).padding(0.01),
    [yGroups]
  );

  const cDomain: [number, number] = d3.extent(
    data,
    (d: Data) => d.variance
  ) as [number, number];

  const color = useMemo(
    () =>
      d3.scaleSequential().interpolator(d3.interpolateInferno).domain(cDomain),
    [cDomain]
  );

  const xLabels = x.domain().map((tickValue, i: number) => {
    if (i % 4 !== 1) return;
    return (
      <HeatTickX
        key={`${i}__${tickValue}`}
        tickValue={tickValue}
        scale={x}
        innerSize={height}
      />
    );
  });

  const yLabels = y
    .domain()
    .map((tickValue, i: number) => (
      <HeatTickY
        key={`${i}__${tickValue}`}
        tickValue={tickValue}
        scale={y}
        innerSize={width}
      />
    ));

  /**
   * ? Tooltip layout:
   * * year - month
   * * baseTemp + variance
   * * variance
   */

  return (
    <div id="heatmap" className="heat-map">
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
        style={{ position: "relative" }}
      >
        <g
          className="g"
          width={width}
          height={height}
          transform={`translate(${[margin.left, margin.top].join(", ")})`}
        >
          <g id="x-axis">{xLabels}</g>
          <g id="y-axis">{yLabels}</g>
          <g
            dy="2.5em"
            transform={`translate(${width / 2 - tickSpacing * 3}, ${
              height + margin.left
            })`}
          >
            <ColorLegend scale={color} />
            <text
              className="legend-title"
              x={tickSpacing * 2.5}
              y={-20}
              textAnchor="middle"
            >Temp. variance (°C)</text>
          </g>
          {data.map((d: Data, i: number) => {
            if (d == null) return;
            const date = new Date(d.year, d.month - 1);
            const month = date.toLocaleString("default", { month: "long" });
            return (
              <rect
                className="cell"
                key={i}
                rx={2}
                ry={2}
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
        </g>
      </svg>
    </div>
  );
};

export default Heatmap;
