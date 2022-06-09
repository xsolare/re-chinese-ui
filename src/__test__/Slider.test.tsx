/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import type { RangeSlider, SliderProps } from '../components/index';
import { Slider } from '../components/index';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

const setValue = jest.fn();
const useStateMock: any = (value: any) => [value, setValue];
jest.spyOn(React, 'useState').mockImplementation(useStateMock);

//* - TEST ------------------------------------------------------------------------- *//
describe('Test slider component', () => {
  const range: RangeSlider[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 }
  ];
  const [value] = React.useState(range[0]);
  const props: SliderProps = {
    value,
    onChange: (v: RangeSlider) => setValue(v),
    range
  };

  it('should have primary className with default props', () => {
    render(<Slider {...props} />);

    fireEvent.click(screen.getByText('3'));

    expect(value.value).toBe(1);
  });
});
