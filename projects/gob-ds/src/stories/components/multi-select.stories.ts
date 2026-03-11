import type { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectComponent, MultiSelectOption } from '../../lib/multi-select/multi-select.component';

const options: MultiSelectOption[] = [
  { label: 'a10', value: 'a10' },
  { label: 'c12', value: 'c12' },
  { label: 'b5', value: 'b5' },
  { label: 'd20', value: 'd20' },
  { label: 'e8', value: 'e8' },
];

const meta: Meta<MultiSelectComponent> = {
  title: 'Components/MultiSelect',
  component: MultiSelectComponent,
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
type Story = StoryObj<MultiSelectComponent>;

export const Default: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Select tags',
    options: options,
    value: ['a10', 'c12'],
  },
};

export const Empty: Story = {
  args: {
    label: 'Filter by Category',
    placeholder: 'Select categories...',
    options: options,
    value: [],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    disabled: true,
    options: options,
    value: ['a10'],
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
    label: 'Search options',
    showSearch: true,
    options: options,
  },
};
