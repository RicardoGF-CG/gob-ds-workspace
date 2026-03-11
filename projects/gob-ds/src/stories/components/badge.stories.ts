import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from '../../lib/badge/badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip of state style Tremor. Used in tables and lists to indicate the state of an item.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'neutral', 'default', 'error'],
      description: 'Variant of color according to the state',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Badge size',
    }
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

// Interactive story
export const Default: Story = {
  args: { variant: 'default', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<cg-badge [variant]="variant" [size]="size">Default</cg-badge>`,
  }),
};

// All variants together
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <cg-badge variant="success">Success</cg-badge>
        <cg-badge variant="warning">Warning</cg-badge>
        <cg-badge variant="neutral">Neutral</cg-badge>
        <cg-badge variant="default">Default</cg-badge>
        <cg-badge variant="error">Error</cg-badge>
      </div>
    `,
  }),
};

// Sizes
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <cg-badge variant="success" size="sm">Success SM</cg-badge>
        <cg-badge variant="success" size="md">Success MD</cg-badge>
      </div>
    `,
  }),
};

// Table
export const Table: Story = {
  render: () => ({
    template: `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <th style="text-align: left; padding: 8px 16px; color: #6B7280; font-weight: 500;">Owner</th>
            <th style="text-align: left; padding: 8px 16px; color: #6B7280; font-weight: 500;">Status</th>
            <th style="text-align: left; padding: 8px 16px; color: #6B7280; font-weight: 500;">Region</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Ricardo Gonzalez</td>
            <td style="padding: 12px 16px;"><cg-badge variant="success">Success</cg-badge></td>
            <td style="padding: 12px 16px; color: #6B7280;">US-West 1</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Bruno Gonzalez</td>
            <td style="padding: 12px 16px;"><cg-badge variant="warning">Warning</cg-badge></td>
            <td style="padding: 12px 16px; color: #6B7280;">US-West 2</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Sanjuana Flores</td>
            <td style="padding: 12px 16px;"><cg-badge variant="neutral">Neutral</cg-badge></td>
            <td style="padding: 12px 16px; color: #6B7280;">EU-North 1</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Ana García</td>
            <td style="padding: 12px 16px;"><cg-badge variant="default">Default</cg-badge></td>
            <td style="padding: 12px 16px; color: #6B7280;">EU-North 1</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; color: #111827;">Carlos López</td>
            <td style="padding: 12px 16px;"><cg-badge variant="error">Error</cg-badge></td>
            <td style="padding: 12px 16px; color: #6B7280;">EU-North 1</td>
          </tr>
        </tbody>
      </table>
    `,
  }),
  parameters: { layout: 'padded' },
};
