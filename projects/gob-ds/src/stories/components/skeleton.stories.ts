import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from '../../lib/skeleton/skeleton.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Animated placeholder to indicate content loading. Supports variants: text, circular, rectangular and rounded.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Skeleton shape',
    },
    width: { control: 'text', description: 'Skeleton width' },
    height: { control: 'text', description: 'Skeleton height' },
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Default: Story = {
  args: {
    variant: 'text',
    width: '200px',
    height: '16px',
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <ds-skeleton variant="text" width="100%" height="16px" />
        <ds-skeleton variant="text" width="75%" height="16px" />
        <ds-skeleton variant="text" width="50%" height="16px" />
        <ds-skeleton variant="circular" width="48px" height="48px" />
        <ds-skeleton variant="rectangular" width="100%" height="120px" />
        <ds-skeleton variant="rounded" width="100%" height="60px" />
      </div>
    `,
  }),
};

export const CardSkeleton: Story = {
  render: () => ({
    template: `
      <div style="
        width: 320px;
        padding: 16px;
        border: 1px solid var(--color-border-subtle);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      ">
        <ds-skeleton variant="rounded" width="100%" height="160px" />
        <ds-skeleton variant="text" width="70%" height="20px" />
        <ds-skeleton variant="text" width="100%" height="14px" />
        <ds-skeleton variant="text" width="90%" height="14px" />
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
          <ds-skeleton variant="circular" width="32px" height="32px" />
          <ds-skeleton variant="text" width="120px" height="14px" />
        </div>
      </div>
    `,
  }),
};

export const ListSkeleton: Story = {
  render: () => ({
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
        @for (i of [1,2,3,4]; track i) {
          <div style="display: flex; gap: 12px; align-items: center;">
            <ds-skeleton variant="circular" width="40px" height="40px" />
            <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
              <ds-skeleton variant="text" width="60%" height="14px" />
              <ds-skeleton variant="text" width="40%" height="12px" />
            </div>
          </div>
        }
      </div>
    `,
  }),
};
