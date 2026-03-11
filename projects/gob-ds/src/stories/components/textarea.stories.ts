import { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../lib/textarea/textarea.component';

const meta: Meta<TextareaComponent> = {
    title: 'Components/Textarea',
    component: TextareaComponent,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Field label',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        hint: {
            control: 'text',
            description: 'Help text',
        },
        error: {
            control: 'text',
            description: 'Error message (replaces hint)',
        },
        rows: {
            control: { type: 'number', min: 2, max: 20 },
            description: 'Number of visible rows',
            table: { defaultValue: { summary: '4' } },
        },
        maxlength: {
            control: { type: 'number', min: 0 },
            description: 'Character limit (0 = no limit)',
            table: { defaultValue: { summary: '0' } },
        },
        showCount: {
            control: 'boolean',
            description: 'Show character count',
            table: { defaultValue: { summary: 'false' } },
        },
        resize: {
            control: { type: 'select' },
            options: ['none', 'vertical', 'horizontal', 'both'],
            description: 'Resize control',
            table: { defaultValue: { summary: 'vertical' } },
        },
        required: {
            control: 'boolean',
            description: 'Required field',
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled field',
        },
    },
    args: {
        label: 'Description',
        placeholder: 'Write here...',
        hint: '',
        error: '',
        rows: 4,
        maxlength: 0,
        showCount: false,
        resize: 'vertical',
        required: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

const wrapper = 'style="max-width:480px; padding:24px;"';

// ─── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Description',
        placeholder: 'Write here...',
    },
};

// ─── With Hint ────────────────────────────────────────────────────────────────
export const WithHint: Story = {
    args: {
        label: 'Comments',
        placeholder: 'Add your comments...',
        hint: 'Your comment will be visible to the team.',
    },
};

// ─── Required ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Description',
        placeholder: 'This field is required',
        required: true,
        hint: 'This field is required.',
    },
};

// ─── Error ────────────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    args: {
        label: 'Description',
        placeholder: 'Write here...',
        error: 'This field cannot be empty.',
    },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Description',
        placeholder: 'Disabled field',
        disabled: true,
        hint: 'This field is disabled.',
    },
};

// ─── With Character Count ─────────────────────────────────────────────────────
export const WithCharCount: Story = {
    args: {
        placeholder: 'Write here...',
        maxlength: 7000,
        showCount: true,
        resize: 'none',
    },
};

// ─── No Resize ────────────────────────────────────────────────────────────────
export const NoResize: Story = {
    args: {
        label: 'Notes',
        placeholder: 'Without resize...',
        resize: 'none',
        hint: 'This field cannot be resized.',
    },
};

// ─── Rows variants ────────────────────────────────────────────────────────────
export const AllRows: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:24px; max-width:480px; padding:24px;">
                <ds-textarea label="2 rows"  placeholder="rows=2"  [rows]="2"></ds-textarea>
                <ds-textarea label="4 rows"  placeholder="rows=4"  [rows]="4"></ds-textarea>
                <ds-textarea label="8 rows"  placeholder="rows=8"  [rows]="8"></ds-textarea>
            </div>
        `,
    }),
};

// ─── All States ───────────────────────────────────────────────────────────────
export const AllStates: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:24px; max-width:480px; padding:24px;">
                <ds-textarea label="Default"   placeholder="Default"></ds-textarea>
                <ds-textarea label="With hint"  placeholder="With text hint" hint="Text hint visible here."></ds-textarea>
                <ds-textarea label="Error"     placeholder="With error" error="This field is required."></ds-textarea>
                <ds-textarea label="Disabled"  placeholder="Disabled" [disabled]="true" hint="Field is disabled."></ds-textarea>
            </div>
        `,
    }),
};