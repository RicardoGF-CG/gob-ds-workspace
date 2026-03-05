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
        component: 'Indicador de carga con ícono giratorio (spinner). Opcionalmente puede mostrar texto a la derecha.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del spinner',
    },
    text: {
      control: 'text',
      description: 'Texto opcional junto al spinner',
    },
  },
};

export default meta;
type Story = StoryObj<LoaderComponent>;

export const Default: Story = {
  args: { size: 'md' },
};

export const ConTexto: Story = {
  args: {
    size: 'md',
    text: 'Cargando datos...',
  },
};

export const Tamanos: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <ds-loader size="sm" text="Pequeño" />
        <ds-loader size="md" text="Mediano" />
        <ds-loader size="lg" text="Grande" />
      </div>
    `,
  }),
};

export const SoloSpinner: Story = {
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

export const EnBoton: Story = {
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
        Procesando...
      </button>
    `,
  }),
};
