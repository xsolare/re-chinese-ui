import React, { forwardRef, useRef, useState } from 'react';
import { SliderItemStyled, SliderListStyled, SliderStyled } from './Slider.style';
import SliderTip from './SliderTip';

//* - INTERFACE ------------------------------------------------------------------------- *//
export interface RangeSlider {
  value: number | string;
}
export interface SliderProps {
  width?: string;
  range: RangeSlider[];
  value: RangeSlider;
  onChange: (value: RangeSlider) => void;
}

//* - COMPONENT ------------------------------------------------------------------------- *//
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (props: SliderProps, ref: React.Ref<HTMLDivElement>) => {
    const { width = '100%', range, value, onChange } = props;

    const [index, setIndex] = useState<number>(range.indexOf(value));

    const sliderListRef = useRef(null);

    const handleOnClick = (item: RangeSlider, i: number) => () => {
      setIndex(i);
      onChange(item);
    };

    return (
      <SliderStyled width={width} ref={ref}>
        <SliderListStyled ref={sliderListRef}>
          {range.map((item, i) => {
            return (
              <SliderItemStyled
                onClick={handleOnClick(item, i)}
                key={item.value}
                isSelected={value === item}>
                {item.value}
              </SliderItemStyled>
            );
          })}
          <SliderTip index={index} range={range} sliderListRef={sliderListRef} />
        </SliderListStyled>
      </SliderStyled>
    );
  }
);
