import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from '../../lib/breadcrumb/breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de navegacion tipo breadcrumb con separador ChevronRight de Lucide Icons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Inicio', url: '#' },
      { label: 'Proyectos', url: '#' },
      { label: 'Detalle del proyecto' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Inicio', url: '#' },
      { label: 'Configuracion' },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Inicio', url: '#' },
      { label: 'Administracion', url: '#' },
      { label: 'Usuarios', url: '#' },
      { label: 'Roles', url: '#' },
      { label: 'Permisos', url: '#' },
      { label: 'Detalle' },
    ],
  },
};
