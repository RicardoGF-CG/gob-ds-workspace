import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from '../../lib/select/select.component';

const options: SelectOption[] = [
  { label: 'Opción 1', value: 1 },
  { label: 'Opción 2', value: 2 },
  { label: 'Opción 3', value: 3, disabled: true },
  { label: 'Opción 4', value: 4 },
  { label: 'Opción 5', value: 5 },
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
    label: 'País',
    placeholder: 'Selecciona un país',
    options: [
      { label: 'México', value: 'mx' },
      { label: 'España', value: 'es' },
      { label: 'Estados Unidos', value: 'us' },
      { label: 'Canadá', value: 'ca' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    disabled: true,
    options: options,
  },
};

export const Loading: Story = {
  args: {
    label: 'Cargando datos...',
    loading: true,
    options: options,
  },
};

export const WithSearch: Story = {
  args: {
    label: 'Búsqueda interna',
    showSearch: true,
    options: options,
  },
};

export const Required: Story = {
  args: {
    label: 'Campo obligatorio',
    required: true,
    options: options,
  },
};

export const DisabledOptions: Story = {
  args: {
    label: 'Opciones bloqueadas',
    options: [
      { label: 'Disponible 1', value: 1 },
      { label: 'Bloqueada (Ya seleccionada)', value: 2, disabled: true },
      { label: 'Bloqueada (Sistema)', value: 3, disabled: true },
      { label: 'Disponible 2', value: 4 },
    ],
  },
};
