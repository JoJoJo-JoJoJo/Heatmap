import { marginProps } from "./types";

const margin: marginProps = { top: 20, right: 20, bottom: 20, left: 60 };
const width: number = 900 - margin.left - margin.right;
const height: number = 400 - margin.top - margin.bottom;

const legendMargin: marginProps = { top: 20, right: 0, bottom: 20, left: 0 };
const legendWidth: number = 900 - legendMargin.left - legendMargin.right;
const legendHeight: number = 400 - legendMargin.top - legendMargin.bottom;

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

export { margin, legendMargin, width, height, legendWidth, legendHeight, url };
