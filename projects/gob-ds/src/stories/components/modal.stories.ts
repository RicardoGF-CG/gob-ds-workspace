import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from '../../lib/modal/modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal with header (title + brand divider), projected content and footer with actions.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Modal maximum width',
    },
    closeOnOverlayClick: { control: 'boolean' },
    disableClose: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Add personal objective',
    size: 'md',
  },
  render: (args) => ({
    props: {
      ...args,
      onClose: () => {},
    },
    template: `
      <sf-modal
        [open]="open"
        [title]="title"
        [size]="size"
        [closeOnOverlayClick]="closeOnOverlayClick"
        (openChange)="open = $event"
      >
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 14px; font-weight: 500; color: var(--color-text-primary);">Description</label>
          <textarea
            placeholder="Write here..."
            maxlength="500"
            rows="6"
            style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--color-border);
              border-radius: 8px;
              font-size: 14px;
              font-family: var(--font-family-sans);
              resize: vertical;
              color: var(--color-text-primary);
              box-sizing: border-box;
            "
          ></textarea>
          <span style="font-size: 13px; color: var(--color-text-tertiary); text-align: right;">0/500 characters used</span>
        </div>

        <div modal-footer>
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            background: var(--color-neutral-50);
            color: var(--color-text-primary);
            font-size: 14px;
            cursor: pointer;
            margin-right: 8px;
          ">Cancel</button>
          <button style="
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            background: var(--color-brand-700);
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          ">Add</button>
        </div>
      </sf-modal>
    `,
  }),
};

export const Small: Story = {
  args: {
    open: true,
    title: 'Confirm action',
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-modal [open]="open" [title]="title" size="sm" (openChange)="open = $event">
        <p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">
          Are you sure you want to continue with this action? This operation cannot be undone.
        </p>
        <div modal-footer>
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            background: var(--color-bg-default);
            color: var(--color-text-primary);
            font-size: 14px;
            cursor: pointer;
          ">Cancel</button>
          <button style="
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            background: var(--color-brand-700);
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          ">Confirm</button>
        </div>
      </sf-modal>
    `,
  }),
};

export const Big: Story = {
  args: {
    open: true,
    title: 'Detalles del registro',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <sf-modal [open]="open" [title]="title" size="lg" (openChange)="open = $event">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="font-size: 13px; color: var(--color-text-tertiary); display: block; margin-bottom: 4px;">Nombre</label>
              <input type="text" value="Ricardo Gonzalez" style="
                width: 100%;
                padding: 8px 12px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                font-size: 14px;
                box-sizing: border-box;
              " />
            </div>
            <div>
              <label style="font-size: 13px; color: var(--color-text-tertiary); display: block; margin-bottom: 4px;">Correo</label>
              <input type="email" value="ricardo@email.com" style="
                width: 100%;
                padding: 8px 12px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                font-size: 14px;
                box-sizing: border-box;
              " />
            </div>
          </div>
          <div>
            <label style="font-size: 13px; color: var(--color-text-tertiary); display: block; margin-bottom: 4px;">Notas</label>
            <textarea rows="4" style="
              width: 100%;
              padding: 12px;
              border: 1px solid var(--color-border);
              border-radius: 8px;
              font-size: 14px;
              resize: vertical;
              box-sizing: border-box;
            ">Text example</textarea>
          </div>
        </div>
        <div modal-footer>
          <button style="
            padding: 8px 16px;
            border: 1px solid var(--color-border);
            border-radius: 8px;
            background: var(--color-bg-default);
            color: var(--color-text-primary);
            font-size: 14px;
            cursor: pointer;
          ">Cancel</button>
          <button style="
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            background: var(--color-brand-700);
            color: white;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          ">Save</button>
        </div>
      </sf-modal>
    `,
  }),
};
