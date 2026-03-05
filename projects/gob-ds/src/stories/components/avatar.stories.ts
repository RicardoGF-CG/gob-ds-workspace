import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from '../../lib/avatar/avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar que muestra las iniciales del nombre o una imagen. Si la imagen falla, se muestran las iniciales como fallback.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Nombre para generar iniciales' },
    src: { control: 'text', description: 'URL de la imagen del avatar' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del avatar',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const ConIniciales: Story = {
  args: {
    name: 'Ricardo Gonzalez',
    size: 'md',
  },
};

export const ConImagen: Story = {
  args: {
    name: 'Ana García',
    src: 'https://i.pravatar.cc/150?img=5',
    size: 'md',
  },
};

export const Tamanos: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <ds-avatar name="Ricardo Gonzalez" size="xs" />
        <ds-avatar name="Ricardo Gonzalez" size="sm" />
        <ds-avatar name="Ricardo Gonzalez" size="md" />
        <ds-avatar name="Ricardo Gonzalez" size="lg" />
        <ds-avatar name="Ricardo Gonzalez" size="xl" />
      </div>
    `,
  }),
};

export const VariosUsuarios: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 8px;">
        <ds-avatar name="Ana García" size="md" />
        <ds-avatar name="Carlos López" size="md" />
        <ds-avatar name="Bruno Gonzalez" size="md" />
        <ds-avatar name="Sanjuana Flores" size="md" />
        <ds-avatar name="María" size="md" />
      </div>
    `,
  }),
};

export const FallbackDeImagen: Story = {
  args: {
    name: 'Error Image',
    src: 'https://invalid-url-that-will-fail.com/avatar.png',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando la imagen falla al cargar, se muestran las iniciales como fallback.',
      },
    },
  },
};

export const EnLista: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <ds-avatar name="Ricardo Gonzalez" size="sm" />
          <div>
            <div style="font-size: 16px; font-weight: 500; color: var(--color-text-primary);">Ricardo Gonzalez</div>
            <div style="font-size: 14px; color: var(--color-text-tertiary);">ricardo@email.com</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <ds-avatar name="Ana García" src="https://i.pravatar.cc/150?img=5" size="sm" />
          <div>
            <div style="font-size: 16px; font-weight: 500; color: var(--color-text-primary);">Ana García</div>
            <div style="font-size: 14px; color: var(--color-text-tertiary);">ana@email.com</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <ds-avatar name="Carlos López" size="sm" />
          <div>
            <div style="font-size: 16px; font-weight: 500; color: var(--color-text-primary);">Carlos López</div>
            <div style="font-size: 14px; color: var(--color-text-tertiary);">carlos@email.com</div>
          </div>
        </div>
      </div>
    `,
  }),
};
