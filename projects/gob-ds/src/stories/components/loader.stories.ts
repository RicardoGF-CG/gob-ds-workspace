import type { Meta, StoryObj } from '@storybook/angular';
import { LoaderComponent } from '../../lib/loader/loader.component';

const meta: Meta<LoaderComponent> = {
  title: 'Components/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading indicator with a rotating spinner icon. Optionally, it can display text to the right.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    text: {
      control: 'text',
      description: 'Optional text next to the spinner',
    },
  },
};

export default meta;
type Story = StoryObj<LoaderComponent>;

export const Default: Story = {
  args: { size: 'md' },
};

export const WithText: Story = {
  args: {
    size: 'md',
    text: 'Loading data...',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <ds-loader size="sm" text="Small" />
        <ds-loader size="md" text="Medium" />
        <ds-loader size="lg" text="Large" />
      </div>
    `,
  }),
};

export const OnlySpinner: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <ds-loader size="sm" />
        <ds-loader size="md" />
        <ds-loader size="lg" />
      </div>
    `,
  }),
};

export const InButton: Story = {
  parameters: { layout: 'centered' },
  render: () => ({
    template: `
      <button style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: var(--color-brand-500);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: not-allowed;
        opacity: 0.8;
      ">
        <ds-loader size="sm" />
        Processing...
      </button>
    `,
  }),
};
