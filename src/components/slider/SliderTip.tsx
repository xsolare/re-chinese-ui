import React, { useMemo } from 'react';
import type { FC } from 'react';
import useElementSize from '#/hooks/events/useElementSize';
import type { RangeSlider } from './Slider';

interface Props {
  index: number;
  range: RangeSlider[];
  sliderListRef: React.MutableRefObject<HTMLDivElement | null>;
}

const SliderTip: FC<Props> = (props: Props) => {
  const { index, range, sliderListRef } = props;

  const [sliderTipRef, { width }] = useElementSize();

  const baseWidth = useMemo(() => {
    if (!sliderListRef?.current) return null;
    return (
      ((sliderListRef.current.getBoundingClientRect().width * 100) / range.length - 1) /
      100
    ).toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.length, sliderListRef.current]);

  if (baseWidth) {
    return (
      <div
        ref={sliderTipRef}
        style={{
          left: `${(width || +baseWidth) * index}px`,
          width: `${100.0 / range.length}%`
        }}
      />
    );
  }
  return null;
};

export default React.memo(SliderTip);
