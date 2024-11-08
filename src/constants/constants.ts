import { marginProps } from "./types";

const margin: marginProps = { top: 0, right: 0, bottom: 0, left: 0 };
const width: number = 1000 - margin.left - margin.right;
const height: number = 500 - margin.top - margin.bottom;

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

export { margin, width, height, url };
