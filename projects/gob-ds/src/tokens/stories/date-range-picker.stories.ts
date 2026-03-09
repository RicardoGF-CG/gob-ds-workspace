import { Meta, StoryObj } from '@storybook/angular';
import { DateRangePickerComponent } from '../../lib/date-range-picker/date-range-picker.component';

const meta: Meta<DateRangePickerComponent> = {
    title: 'Components/DateRangePicker',
    component: DateRangePickerComponent,
    tags: ['autodocs'],
    argTypes: {
        startPlaceholder: { control: 'text', description: 'Placeholder fecha inicio' },
        endPlaceholder: { control: 'text', description: 'Placeholder fecha fin' },
        hint: { control: 'text', description: 'Texto de ayuda' },
        error: { control: 'text', description: 'Mensaje de error' },
        required: { control: 'boolean', description: 'Campo requerido' },
        disabled: { control: 'boolean', description: 'Campo deshabilitado' },
        rangeChange: { action: 'rangeChange' },
    },
    args: {
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
        hint: '',
        error: '',
        required: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<DateRangePickerComponent>;

export const Default: Story = {};

export const WithHint: Story = {
    args: { hint: 'Selecciona el rango de fechas.' },
};

export const ErrorState: Story = {
    args: { error: 'El rango de fechas no es válido.' },
};

export const Disabled: Story = {
    args: { disabled: true },
};

export const WithMinMaxDate: Story = {
    args: {
        hint: 'Solo los próximos 30 días.',
        minDate: new Date(),
        maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
};