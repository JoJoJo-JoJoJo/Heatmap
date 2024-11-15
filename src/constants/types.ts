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
  scale: d3.ScaleSequential<string, never>;
};

type HeatTickProps = {
  tickValue: string;
  scale: d3.ScaleBand<string>;
  innerSize: number;
}

type TickProps = {
  tick: number;
  scaleX: d3.ScaleLinear<number, number, never>;
};

type RectProps = {
  color: string;
}

export type {
  marginProps,
  Data,
  DataProps,
  HeatmapProps,
  AxisProps,
  ColorProps,
  HeatTickProps,
  TickProps,
  RectProps
};
