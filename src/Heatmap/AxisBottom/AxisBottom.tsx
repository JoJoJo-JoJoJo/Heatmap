import { useMemo } from "react";
import { AxisProps } from "../../constants/types";

const AxisBottom = ({ scale, pxPerTick }: AxisProps) => {
  const ticks = useMemo(
    () =>
      scale.ticks().map((val) => ({
        val,
        xOffset: scale(val),
      })),
    [scale]
  );

  return <></>;
};

export default AxisBottom;
