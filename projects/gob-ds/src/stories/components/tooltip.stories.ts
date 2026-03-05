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
        component: 'Tooltip similar a shadcn. Se muestra al hacer hover o focus sobre el elemento hijo. Soporta posiciones: top, bottom, left, right.',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Texto del tooltip' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tooltip',
    },
    delay: {
      control: 'number',
      description: 'Delay en milisegundos antes de mostrar',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;

export const Default: Story = {
  args: {
    text: 'Este es un tooltip',
    position: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 60px;">
        <ds-tooltip [text]="text" [position]="position">
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
            font-size: 14px;
          ">Hover me</button>
        </ds-tooltip>
      </div>
    `,
  }),
};

export const Posiciones: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; padding: 80px;">
        <ds-tooltip text="Arriba" position="top">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Top</button>
        </ds-tooltip>
        <ds-tooltip text="Abajo" position="bottom">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Bottom</button>
        </ds-tooltip>
        <ds-tooltip text="Izquierda" position="left">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Left</button>
        </ds-tooltip>
        <ds-tooltip text="Derecha" position="right">
          <button style="padding: 8px 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-default); cursor: pointer;">Right</button>
        </ds-tooltip>
      </div>
    `,
  }),
};

export const ConDelay: Story = {
  args: {
    text: 'Aparece con delay de 500ms',
    position: 'top',
    delay: 500,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 60px;">
        <ds-tooltip [text]="text" [position]="position" [delay]="delay">
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            background: var(--color-bg-default);
            cursor: pointer;
          ">Hover (con delay)</button>
        </ds-tooltip>
      </div>
    `,
  }),
};

export const EnIconos: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; padding: 60px;">
        <ds-tooltip text="Configuración" position="bottom">
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
        </ds-tooltip>
        <ds-tooltip text="Notificaciones" position="bottom">
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
        </ds-tooltip>
        <ds-tooltip text="Perfil de usuario" position="bottom">
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
        </ds-tooltip>
      </div>
    `,
  }),
};
