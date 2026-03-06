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
      { id: 1, label: 'Panel de Control' },
      { id: 2, label: 'Estadísticas Avanzadas' },
      { id: 3, label: 'Configuración Global' },
    ],
    activeTabId: 1,
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: 1, label: 'Activo' },
      { id: 2, label: 'Deshabilitado', disabled: true },
      { id: 3, label: 'Siguiente' },
    ],
    activeTabId: 1,
  },
};
