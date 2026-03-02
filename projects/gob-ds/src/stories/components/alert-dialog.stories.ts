import type { Meta, StoryObj } from '@storybook/angular';
import { AlertDialogComponent } from '../../lib/alert-dialog/alert-dialog.component';

const meta: Meta<AlertDialogComponent> = {
  title: 'Components/AlertDialog',
  component: AlertDialogComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    variant: { control: 'radio', options: ['default', 'destructive'] },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    closeOnOverlayClick: { control: 'boolean' },
    disableClose: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<AlertDialogComponent>;

export const Playground: Story = {
  args: {
    open: true,
    title: 'Are you absolutely sure?',
    description: 'This action cannot be undone. This will permanently delete your account from our servers.',
    variant: 'destructive',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    closeOnOverlayClick: true,
    disableClose: false,
  },
  render: (args) => ({
    props: {
      ...args,
      openChange: (v: boolean) => (args.open = v),
      confirm: () => console.log('confirm'),
      cancel: () => console.log('cancel'),
    },
    template: `
      <div style="width: 520px; display:flex; justify-content:center;">
        <ds-alert-dialog
          [open]="open"
          (openChange)="openChange($event)"
          [title]="title"
          [description]="description"
          [variant]="variant"
          [confirmText]="confirmText"
          [cancelText]="cancelText"
          [closeOnOverlayClick]="closeOnOverlayClick"
          [disableClose]="disableClose"
          (confirm)="confirm()"
          (cancel)="cancel()"
        />
      </div>
    `,
  }),
};