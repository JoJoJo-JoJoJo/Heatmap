import { useMemo } from "react";
import { AxisProps } from "../../constants/types";

const AxisBottom = ({ scale, pxPerTick }: AxisProps) => {
  const range: [number, number] = scale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numTicksTarget = Math.floor(width / pxPerTick);

    // ? Property `val` is the data value being shown on the axis.
    return scale.ticks(numTicksTarget).map((val: string) => ({
      val,
      xOffset: scale(val),
    }));
  }, [pxPerTick, range, scale]);

  return (
    <>
      
    </>
  )
};

export default AxisBottom;
