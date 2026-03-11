import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipComponent } from '../../lib/tooltip/tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltip similar to shadcn. It shows up when hovering or focusing on the child element. Supports positions: top, bottom, left, right.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Tooltip text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 60px;">
        <sf-tooltip [text]="text" [position]="position">
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
            font-size: 14px;
          ">Hover me</button>
        </sf-tooltip>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 80px;">
        <sf-tooltip text="Top" position="top">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Top</button>
        </sf-tooltip>
        <sf-tooltip text="Bottom" position="bottom">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Bottom</button>
        </sf-tooltip>
        <sf-tooltip text="Left" position="left">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Left</button>
        </sf-tooltip>
        <sf-tooltip text="Right" position="right">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Right</button>
        </sf-tooltip>
      </div>
    `,
  }),
};

export const WithDelay: Story = {
  args: {
    text: 'Appears with 500ms delay',
    position: 'top',
    delay: 500,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 60px;">
        <sf-tooltip [text]="text" [position]="position" [delay]="delay">
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
          ">Hover (with delay)</button>
        </sf-tooltip>
      </div>
    `,
  }),
};

export const InIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; padding: 60px;">
        <sf-tooltip text="Configuration" position="bottom">
          <button style="
            width: 36px; height: 36px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          ">⚙</button>
        </sf-tooltip>
        <sf-tooltip text="Notifications" position="bottom">
          <button style="
            width: 36px; height: 36px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          ">🔔</button>
        </sf-tooltip>
        <sf-tooltip text="User profile" position="bottom">
          <button style="
            width: 36px; height: 36px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          ">👤</button>
        </sf-tooltip>
      </div>
    `,
  }),
};
