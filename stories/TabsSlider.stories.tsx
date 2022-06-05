import React, { useState } from 'react';
import type { Meta, Story } from '@storybook/react';

import { ThemeProvider } from '@emotion/react';
import type { ThemeTypes } from '#/shared/theme';
import { theme as themeLight, themeBlue, themeDark } from '#/shared/theme';

import type { TabsSliderProps, OptionsTabsSlider } from '#/components';
import { TabsSlider } from '#/components';

const meta: Meta = {
  title: 'TabsSlider',
  component: TabsSlider,
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

//* - 1 ---------------------------------------------------------------- *//

interface StoriesProps extends Omit<TabsSliderProps<OptionsTabsSlider>, 'onChange' | 'value'> {
  themesAvailable: ThemeTypes[];
  theme: 0 | 1 | 2;
}
const Template: Story<StoriesProps> = ({
  options,
  themesAvailable,
  theme,
  ...props
}: StoriesProps) => {
  const [value, setValue] = useState<OptionsTabsSlider>(options[2]);

  const onChange = (v: OptionsTabsSlider) => setValue(v);

  return (
    <ThemeProvider theme={themesAvailable[theme]}>
      <TabsSlider {...props} options={options} value={value} onChange={onChange} />
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  themesAvailable: [themeLight, themeBlue, themeDark],
  theme: 0,
  options: [{ value: 'Settings' }, { value: 'News' }, { value: 'Permission' }, { value: 'Home' }]
};

//* - 2 ---------------------------------------------------------------- *//

export interface OptiosTypes extends OptionsTabsSlider {
  additional: { url: string };
}
interface StoriesSecondProps extends Omit<TabsSliderProps<OptiosTypes>, 'onChange' | 'value'> {
  themesAvailable: ThemeTypes[];
  theme: 0 | 1 | 2;
}
const TemplateSecond: Story<StoriesSecondProps> = ({
  options,
  themesAvailable,
  theme,
  ...props
}: StoriesSecondProps) => {
  const [value, setValue] = useState<OptiosTypes>(options[2]);

  const onChange = (v: OptiosTypes) => {
    setValue(v);
  };

  return (
    <ThemeProvider theme={themesAvailable[theme]}>
      <TabsSlider {...props} options={options} value={value} onChange={onChange} />
    </ThemeProvider>
  );
};

export const RenderOption = TemplateSecond.bind({});
RenderOption.args = {
  themesAvailable: [themeLight, themeBlue, themeDark],
  theme: 0,
  options: [
    { value: 'Settings', additional: { url: 'https://stackoverflow.com/' } },
    { value: 'News', additional: { url: 'https://stackoverflow.com/' } },
    { value: 'Permission', additional: { url: 'https://stackoverflow.com/' } },
    { value: 'Home', additional: { url: 'https://stackoverflow.com/' } }
  ],
  renderOption: (ggd) => <a href={ggd.additional.url}>{ggd.value}</a>
};
