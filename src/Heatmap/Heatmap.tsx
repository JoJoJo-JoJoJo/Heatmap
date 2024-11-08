import { useMemo } from "react";
import { height, width } from "../constants/constants";
import { Data, HeatmapProps } from "../constants/types";
import * as d3 from "d3";

const Heatmap = ({ data }: HeatmapProps) => {
  const xGroups: string[] = useMemo(
    () => [...new Set(data.map((d: Data) => d.year.toString()))],
    [data]
  );

  const yGroups: string[] = useMemo(
    () => [
      ...new Set(
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
    () => d3.scaleBand().domain(xGroups).range([0, width]).padding(0.01),
    [xGroups]
  );

  const y = useMemo(
    () => d3.scaleBand().domain(yGroups).range([height, 0]).padding(0.01),
    [yGroups]
  );

  const color = d3.scaleSequential().interpolator(d3.interpolateInferno);
  //? .domain([min, max])

  return (
    <div id="heatmap" className="heatmap">
      <svg width={width} height={height}></svg>
    </div>
  );
};

export default Heatmap;
