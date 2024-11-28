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

type loading = number | "Loading...";

type HeaderProps = {
  min: number | loading;
  max: number | loading;
  baseTemp: number | loading;
};

type HeatmapProps = {
  baseTemp: number;
  data: Data[];
};

type RendererProps = {
  data: Data[];
  setHoveredCell: React.Dispatch<React.SetStateAction<InteractData | null>>;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  baseTemp: number;
};

interface InteractData {
  readonly year: string;
  readonly monthName: string;
  readonly variance: number | string;
  readonly xPos: number | string;
  readonly yPos: number | string;
}

// interface DOMRect extends DOMRectReadOnly {
//   height: number;
//   width: number;
//   x: number;
//   y: number;
// };

type AxisProps = {
  scale: ScaleBand<string>;
  pxPerTick: number;
};

type ColorProps = {
  scale: d3.ScaleSequential<string, never>;
  readonly baseTemp: number;
};

type HeatTickProps = {
  tickValue: string;
  scale: d3.ScaleBand<string>;
  innerHeight?: number;
};

type TickProps = {
  tick: number;
  scaleX: d3.ScaleLinear<number, number, never>;
};

type RectProps = {
  color: string;
};

interface TooltipProps extends InteractData {
  readonly baseTemp: number;
  isHovered: boolean;
}

export type {
  marginProps,
  HeaderProps,
  loading,
  Data,
  DataProps,
  HeatmapProps,
  // DOMRect,
  InteractData,
  AxisProps,
  ColorProps,
  HeatTickProps,
  TickProps,
  RectProps,
  TooltipProps,
  RendererProps,
};
