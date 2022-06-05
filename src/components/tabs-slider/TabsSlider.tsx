import React, { useCallback, useEffect, useRef, useState } from 'react';
import useIsMounted from '#/hooks/events/useIsMounted';
import { TabsSliderItemStyled, TabsSliderListStyled, TabsSliderStyled } from './TabsSlider.style';

//* - INTERFACE ------------------------------------------------------------------------- *//
export interface OptionsTabsSlider<O = unknown> {
  value: string | number;
  additional?: O;
}

export interface TabsSliderProps<T extends OptionsTabsSlider<unknown>> {
  tipHight?: string;
  width?: string;
  renderOption?: (option: T) => React.ReactNode;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}
export interface TabsSliderTipProps {
  width: number;
  left: number;
}

//* - COMPONENT ------------------------------------------------------------------------- *//
const TabsSliderInput = <T extends OptionsTabsSlider>(
  props: TabsSliderProps<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const { tipHight = '4px', width = 'auto', options, value, onChange, renderOption } = props;
  const [tip, setTip] = useState<TabsSliderTipProps>({} as TabsSliderTipProps);

  const sliderListRef = useRef<HTMLUListElement | null>(null);

  const getInnerElementWidth = useCallback(
    (index: number): TabsSliderTipProps => {
      const elements: number[] = [];

      if (!sliderListRef.current) return { width: 0, left: 0 };
      const refs = sliderListRef.current.getElementsByTagName('li');

      options.forEach((_, key) =>
        elements.push(+refs[key].getBoundingClientRect().width.toFixed(2))
      );

      const sum = elements.reduce((prev, now, key) => {
        if (key >= index) return prev;
        return prev + now;
      }, 0);

      return { width: elements[index], left: sum };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, sliderListRef.current, sliderListRef.current?.clientWidth]
  );

  const handleOnClick = (item: T, i: number) => () => {
    onChange(item);
    setTip(getInnerElementWidth(i));
  };

  const isMounted = useIsMounted();
  useEffect(() => {
    setTip(getInnerElementWidth(options.indexOf(value)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return (
    <TabsSliderStyled width={width} ref={ref}>
      <TabsSliderListStyled tipHight={tipHight} ref={sliderListRef}>
        {isMounted() && <span style={{ ...tip }} />}

        {options.map((item, i) => {
          return (
            <TabsSliderItemStyled
              onClick={handleOnClick(item, i)}
              key={item.value}
              isSelected={value === item}>
              {renderOption ? renderOption(item) : item.value}
            </TabsSliderItemStyled>
          );
        })}
      </TabsSliderListStyled>
    </TabsSliderStyled>
  );
};

export const TabsSlider = React.forwardRef(TabsSliderInput) as <T extends OptionsTabsSlider>(
  p: TabsSliderProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
