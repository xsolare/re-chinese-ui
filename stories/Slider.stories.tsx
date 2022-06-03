import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';

import { ThemeProvider } from '@emotion/react';
import type { ThemeTypes } from '#/shared/theme';
import { themeDark, themeBlue, theme as themeLight } from '#/shared/theme';

import type { SliderProps, RangeSlider } from '#/components';
import { Slider } from '#/components';

const meta: Meta = {
  title: 'Slider',
  component: Slider,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;

interface StoriesSliderProps extends Omit<SliderProps, 'onChange' | 'value'> {
  theme: ThemeTypes;
}
const Template: Story<StoriesSliderProps> = ({
  range,
  theme = themeLight,
  ...props
}: StoriesSliderProps) => {
  const [value, setValue] = useState<RangeSlider>(range[2]);

  const onChange = (v: RangeSlider) => setValue(v);

  return (
    <ThemeProvider theme={theme}>
      <Slider {...props} range={range} value={value} onChange={onChange} />
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  range: [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 }
  ]
};

export const Dark = Template.bind({});
Dark.args = {
  theme: themeDark,
  range: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]
};

export const Blue = Template.bind({});
Blue.args = {
  theme: themeBlue,
  range: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]
};
