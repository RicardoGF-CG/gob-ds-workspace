import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent, TabItem } from '../../lib/tabs/tabs.component';

const tabs: TabItem[] = [
  { id: 1, label: 'Tablero de iniciativas', status: 'default' },
  { id: 2, label: 'Tablero de iniciativas', status: 'completed' },
  { id: 3, label: 'Tablero de iniciativas', status: 'error' },
  { id: 4, label: 'Tablero de iniciativas', disabled: true },
];

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    activeTabId: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 1, label: 'Summary', status: 'default' },
      { id: 2, label: 'Configuration', status: 'default' },
      { id: 3, label: 'Users', status: 'default' },
    ],
    activeTabId: 1,
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Default (Inactive)</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'default' }]" [activeTabId]="0"></ds-tabs>
        </div>
        
        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Active</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'default' }]" [activeTabId]="1"></ds-tabs>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Completed</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'completed' }]" [activeTabId]="0"></ds-tabs>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Active Completed</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'completed' }]" [activeTabId]="1"></ds-tabs>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Error</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'error' }]" [activeTabId]="0"></ds-tabs>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Error Active</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', status: 'error' }]" [activeTabId]="1"></ds-tabs>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: #666; font-size: 12px;">Disabled</p>
          <ds-tabs [tabs]="[{ id: 1, label: 'Summary', disabled: true }]" [activeTabId]="0"></ds-tabs>
        </div>
      </div>
    `,
  }),
};
