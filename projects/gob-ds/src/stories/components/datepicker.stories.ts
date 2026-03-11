import { Meta, StoryObj } from '@storybook/angular';
import { DatepickerComponent } from '../../lib/datepicker/datepicker.component';

const meta: Meta<DatepickerComponent> = {
    title: 'Components/Datepicker',
    component: DatepickerComponent,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Input size',
            table: { defaultValue: { summary: 'md' } },
        },
        state: {
            control: { type: 'select' },
            options: ['default', 'error', 'success', 'disabled'],
            description: 'Datepicker state',
            table: { defaultValue: { summary: 'default' } },
        },
        label: { control: 'text', description: 'Label' },
        placeholder: { control: 'text', description: 'Placeholder' },
        required: { control: 'boolean', description: 'Required' },
        helperText: { control: 'text', description: 'Helper text' },
        minDate: { control: 'date', description: 'Min date' },
        maxDate: { control: 'date', description: 'Max date' },
        dateChange: { action: 'dateChange' },
    },
    args: {
        label: 'Date',
        placeholder: 'dd/mm/aaaa',
        size: 'md',
        state: 'default',
        required: false,
        helperText: '',
    },
};

export default meta;
type Story = StoryObj<DatepickerComponent>;

export const Default: Story = {
    args: { label: 'Date of birth', placeholder: 'dd/mm/aaaa' },
};

export const WithHelperText: Story = {
    args: { label: 'Date of start', helperText: 'Select the date on which the project begins' },
};

export const Required: Story = {
    args: { label: 'Date of birth', required: true, helperText: 'This field is required' },
};

export const ErrorState: Story = {
    args: { label: 'Date of expiration', state: 'error', helperText: 'The date entered is invalid' },
};

export const SuccessState: Story = {
    args: { label: 'Date of confirmation', state: 'success', helperText: 'Date confirmed correctly' },
};

export const Disabled: Story = {
    args: { label: 'Date blocked', state: 'disabled', helperText: 'This field is not available' },
};

export const Small: Story = {
    args: { label: 'Date', size: 'sm', placeholder: 'dd/mm/aaaa' },
};

export const Large: Story = {
    args: { label: 'Date', size: 'lg', placeholder: 'dd/mm/aaaa' },
};

export const WithMinMaxDate: Story = {
    args: {
        label: 'Date of reservation',
        helperText: 'You can only reserve within the next 30 days',
        minDate: new Date(),
        maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:20px; padding:20px;">
                <app-datepicker size="sm" label="Small (sm)"  placeholder="dd/mm/aaaa"></app-datepicker>
                <app-datepicker size="md" label="Medium (md)" placeholder="dd/mm/aaaa"></app-datepicker>
                <app-datepicker size="lg" label="Large (lg)"  placeholder="dd/mm/aaaa"></app-datepicker>
            </div>
        `,
    }),
};

export const AllStates: Story = {
    render: () => ({
        template: `
            <div style="display:flex; flex-direction:column; gap:20px; padding:20px;">
                <app-datepicker state="default"  label="Default"  helperText="Normal state"></app-datepicker>
                <app-datepicker state="error"    label="Error"    helperText="Invalid date"></app-datepicker>
                <app-datepicker state="success"  label="Success"  helperText="Valid date"></app-datepicker>
                <app-datepicker state="disabled" label="Disabled" helperText="Field not available"></app-datepicker>
            </div>
        `,
    }),
};