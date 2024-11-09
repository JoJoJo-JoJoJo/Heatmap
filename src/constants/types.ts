import { ScaleBand } from "d3";

type marginProps = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

type Data = {
  readonly year: number;
  readonly month: number;
  readonly variance: number;
};

interface DataProps {
  readonly baseTemperature: number;
  readonly monthlyVariance: Data[];
}

type HeatmapProps = {
  baseTemp: number;
  data: Data[];
};

type AxisProps = {
  scale: ScaleBand<string>;
  pxPerTick: number;
};

type ColorProps = {
  colorScale: d3.ScaleSequential<string, never>;
};

export type { marginProps, Data, DataProps, HeatmapProps, AxisProps, ColorProps };
