import type { Meta, StoryObj } from '@storybook/angular';
import { NavigatorComponent } from '../../lib/navigator/navigator.component';

const meta: Meta<NavigatorComponent> = {
  title: 'Components/Navigator',
  component: NavigatorComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<NavigatorComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', url: '#' },
      { label: 'Reports', url: '#' },
      { label: 'Detail' },
    ],
  },
};
