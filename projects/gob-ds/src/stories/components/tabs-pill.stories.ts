import type { Meta, StoryObj } from '@storybook/angular';
import { TabsPillComponent, TabsPillItem } from '../../lib/tabs-pill/tabs-pill.component';

const tabs: TabsPillItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

const meta: Meta<TabsPillComponent> = {
  title: 'Components/TabsPill',
  component: TabsPillComponent,
  tags: ['autodocs'],
  argTypes: {
    activeTabId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<TabsPillComponent>;

export const Default: Story = {
  args: {
    tabs: tabs,
    activeTabId: 'overview',
  },
};

export const LargeLabels: Story = {
  args: {
    tabs: [
      { id: 1, label: 'Dashboard' },
      { id: 2, label: 'Advanced Statistics' },
      { id: 3, label: 'Global Configuration' },
    ],
    activeTabId: 1,
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: 1, label: 'Active' },
      { id: 2, label: 'Disabled', disabled: true },
      { id: 3, label: 'Next' },
    ],
    activeTabId: 1,
  },
};
