import { marginProps } from "./types";

const margin: marginProps = { top: 20, right: 20, bottom: 170, left: 80 };
const width: number = 900 - margin.left - margin.right;
const height: number = 600 - margin.top - margin.bottom;

const innerLegendTicks = 4;
const tickSpacing: number = 60;

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

export { margin, width, height, url, tickSpacing, innerLegendTicks };
