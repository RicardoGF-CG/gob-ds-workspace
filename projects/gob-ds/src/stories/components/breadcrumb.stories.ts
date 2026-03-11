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
        component: 'Navigation component type breadcrumb with ChevronRight separator from Lucide Icons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', url: '#' },
      { label: 'Projects', url: '#' },
      { label: 'Project details' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', url: '#' },
      { label: 'Configuration' },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', url: '#' },
      { label: 'Administration', url: '#' },
      { label: 'Users', url: '#' },
      { label: 'Roles', url: '#' },
      { label: 'Permissions', url: '#' },
      { label: 'Details' },
    ],
  },
};
