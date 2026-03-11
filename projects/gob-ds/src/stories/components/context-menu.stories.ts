import type { Meta, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from '../../lib/context-menu/context-menu.component';
import { Eye, Pencil, Copy, Trash2, FileDown, FileText, Printer, Archive } from 'lucide-angular';

const meta: Meta<ContextMenuComponent> = {
  title: 'Components/Context Menu',
  component: ContextMenuComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown menu component with support for Lucide icons. Activated by clicking a trigger button.',
      },
    },
  },
  argTypes: {
    align: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Dropdown menu alignment',
    },
  },
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

const defaultItems = [
  { label: 'View details' },
  { label: 'Edit', icon: Pencil },
  { label: 'Duplicate', icon: Copy },
  { label: '', divider: true },
  { label: 'Delete', icon: Trash2, danger: true },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    align: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-context-menu [items]="items" [align]="align">
        &#8943;
      </sf-context-menu>
    `,
  }),
};

export const WithoutIcons: Story = {
  args: {
    items: [
      { label: 'View details' },
      { label: 'Edit' },
      { label: 'Duplicate' },
      { label: '', divider: true },
      { label: 'Delete', danger: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-context-menu [items]="items">
        &#8943;
      </sf-context-menu>
    `,
  }),
};

export const WithTextTrigger: Story = {
  args: {
    items: [
      { label: 'Export to CSV', icon: FileDown },
      { label: 'Export to PDF', icon: FileText },
      { label: 'Print', icon: Printer },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-context-menu [items]="items">
        Acciones &#9662;
      </sf-context-menu>
    `,
  }),
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'View details', icon: Eye },
      { label: 'Edit', icon: Pencil, disabled: true },
      { label: '', divider: true },
      { label: 'Archive', icon: Archive },
      { label: 'Delete', icon: Trash2, danger: true, disabled: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-context-menu [items]="items">
        &#8943;
      </sf-context-menu>
    `,
  }),
};

export const RightAligned: Story = {
  args: {
    items: defaultItems,
    align: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: flex-end; width: 300px;">
        <sf-context-menu [items]="items" align="right">
          &#8943;
        </sf-context-menu>
      </div>
    `,
  }),
};

export const InTable: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    props: {
      menuItems: [
        { label: 'Ver detalle', icon: Eye },
        { label: 'Editar', icon: Pencil },
        { label: '', divider: true },
        { label: 'Eliminar', icon: Trash2, danger: true },
      ],
    },
    template: `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <th style="text-align: left; padding: 8px 16px; color: #6B7280; font-weight: 500;">Nombre</th>
            <th style="text-align: left; padding: 8px 16px; color: #6B7280; font-weight: 500;">Estado</th>
            <th style="text-align: right; padding: 8px 16px; color: #6B7280; font-weight: 500;"></th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Ricardo Gonzalez</td>
            <td style="padding: 12px 16px; color: #6B7280;">Activo</td>
            <td style="padding: 12px 16px; text-align: right;">
              <sf-context-menu [items]="menuItems" align="right">&#8943;</sf-context-menu>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="padding: 12px 16px; color: #111827;">Ana Garcia</td>
            <td style="padding: 12px 16px; color: #6B7280;">Inactivo</td>
            <td style="padding: 12px 16px; text-align: right;">
              <sf-context-menu [items]="menuItems" align="right">&#8943;</sf-context-menu>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};
