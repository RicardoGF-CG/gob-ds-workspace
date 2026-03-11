import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from '../../lib/select/select.component';

const options: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, disabled: true },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { label: 'Mexico', value: 'mx' },
      { label: 'Spain', value: 'es' },
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    disabled: true,
    options: options,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading data...',
    loading: true,
    options: options,
  },
};

export const WithSearch: Story = {
  args: {
    label: 'Internal search',
    showSearch: true,
    options: options,
  },
};

export const Required: Story = {
  args: {
    label: 'Required field',
    required: true,
    options: options,
  },
};

export const DisabledOptions: Story = {
  args: {
    label: 'Disabled options',
    options: [
      { label: 'Available 1', value: 1 },
      { label: 'Disabled (Already selected)', value: 2, disabled: true },
      { label: 'Disabled (System)', value: 3, disabled: true },
      { label: 'Available 2', value: 4 },
    ],
  },
};
